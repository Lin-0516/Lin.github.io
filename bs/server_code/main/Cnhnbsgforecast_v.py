#coding:utf-8
__author__ = "ila"
import base64, copy, logging, os, time, xlrd, json
from django.http import JsonResponse
from django.apps import apps
import datetime
from django.db.models.aggregates import Count,Sum
from django.db.models import Case, When, IntegerField, F
from django.forms import model_to_dict
from .models import cnhnbsgforecast
from urllib.parse import unquote
import configparser
from util.codes import *
from util.CustomJSONEncoder import CustomJsonEncoder
from util.auth import Auth
from util.common import Common
import util.message as mes
from django.db import connection
import random
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import redirect
from django.db.models import Q
from util.baidubce_api import BaiDuBce
from .models import config


rename={
        "title":"title",
        "leibie":"leibie",
        "turnover":"turnover",
        "jiage":"jiage",
    }
import pandas as pd
import joblib
import numbers
import pymysql
import numpy as np
import matplotlib
matplotlib.use('Agg')  # 在导入pyplot之前设置
from matplotlib import pyplot as plt
import matplotlib.font_manager as fm
from util.configread import config_read
import os
from sqlalchemy import create_engine
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler, MinMaxScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error,accuracy_score
from sklearn.feature_extraction import DictVectorizer
from sklearn.tree import DecisionTreeClassifier, export_graphviz
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.feature_extraction import DictVectorizer
from sklearn.metrics import classification_report, confusion_matrix,confusion_matrix, mean_squared_error, mean_absolute_error, r2_score
from sklearn.tree import DecisionTreeClassifier, export_graphviz
import seaborn as sns
pd.options.mode.chained_assignment = None  # default='warn'

#获取当前文件路径的根目录
parent_directory = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dbtype, host, port, user, passwd, dbName, charset,hasHadoop = config_read(os.path.join(parent_directory,"config.ini"))
#MySQL连接配置
mysql_config = {
    'host': host,
    'user':user,
    'password': passwd,
    'database': dbName,
    'port':port
}
def auto_figsize(x_data, base_width=8, base_height=6, width_per_point=0.2):
    """根据数据点数量自动调整画布宽度"""
    num_points = len(x_data)
    dynamic_width = base_width + width_per_point * num_points
    return (dynamic_width, base_height)

#获取预测可视化图表接口
def cnhnbsgforecast_forecastimgs(request):
    if request.method in ["POST", "GET"]:
        msg = {'code': normal_code, 'message': 'success'}
        # 指定目录
        directory = os.path.join(parent_directory, "templates", "file", "cnhnbsgforecast")
        # 获取目录下的所有文件和文件夹名称
        all_items = os.listdir(directory)
        # 过滤出文件（排除文件夹）
        files = [f'file/cnhnbsgforecast/{item}' for item in all_items if os.path.isfile(os.path.join(directory, item))]
        msg["data"] = files
        fontlist=[]
        for font in fm.fontManager.ttflist:
            fontlist.append(font.name)
        msg["message"]=fontlist
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def cnhnbsgforecast_forecast(request):
    if request.method in ["POST", "GET"]:
        msg = {'code': normal_code, "msg": mes.normal_code}
        #1.获取数据集
        req_dict = request.session.get("req_dict")
        connection = pymysql.connect(**mysql_config)
        query = "SELECT title,leibie,turnover, jiage FROM cnhnbsg"
        #2.处理缺失值
        data = pd.read_sql(query, connection).dropna()
        id = req_dict.pop('id',None)
        df = to_forecast(data,req_dict,None)
        #9.创建数据库连接,将DataFrame 插入数据库
        connection_string = f"mysql+pymysql://{mysql_config['user']}:{mysql_config['password']}@{mysql_config['host']}:{mysql_config['port']}/{mysql_config['database']}"
        engine = create_engine(connection_string)
        try:
            if req_dict :
            #遍历 DataFrame，并逐行更新数据库
                with engine.connect() as connection:
                    for index, row in df.iterrows():
                        sql = """
                        UPDATE cnhnbsgforecast SET
                        jiage = %(jiage)s
                        WHERE id = %(id)s
                        """
                        connection.execute(sql, {'id': id
                            , 'jiage': row['jiage']
                        })
            else:
                df.to_sql('cnhnbsgforecast', con=engine, if_exists='append', index=False)
            print("数据更新成功！")
        except Exception as e:
            print(f"发生错误: {e}")
        finally:
            engine.dispose()  # 关闭数据库连接
        return JsonResponse(msg, encoder=CustomJsonEncoder)
def to_forecast(data,req_dict,value):
    if len(data) < 5:
        print(f"的样本数量不足: {len(data)}")
        return pd.DataFrame()
    #3.处理特征值和目标值
    labels={}
    for key in data.keys():
        if pd.api.types.is_string_dtype(data[key]):
            label_encoder = LabelEncoder()
            labels[key] = label_encoder
            data[key] = label_encoder.fit_transform(data[key])
    #4.数据集划分
    X = data[[
        'title',
        'leibie',
        'turnover',
    ]]
    y = data[[
        'jiage',
    ]]
    x_train, x_test, y_train, y_test = train_test_split(X, y,test_size=0.2, random_state=22)
    #5.构建预测特征值
    #根据输入的特征值去预测
    if req_dict:
        req_dict = {rename.get(key, key): value for key, value in req_dict.items()}
        req_dict.pop('addtime',None)
        future_df = pd.DataFrame([req_dict])
        for key in future_df.keys():
           if key in labels:
               encoder = labels[key]
               values = future_df[key][0]
               try:
                   values = encoder.transform([values])[0]
               except ValueError as e: #处理未见过的标签
                   values = np.array([encoder.transform([v])[0] if v in encoder.classes_ else -1 for v in values]).sum()
               future_df[key][0] = values
    else:
        future_df = x_test
    #特征工程-标准化
    estimator_file = os.path.join(parent_directory, "cnhnbsgforecast.pkl")
    estimator = RandomForestRegressor(n_estimators=100, random_state=42)
    _, num_columns = y_train.shape
    if num_columns>=2:
        estimator.fit(x_train, y_train)
    else:
        estimator.fit(x_train, y_train.values.ravel())
    y_pred = estimator.predict(x_test)
    plt.rcParams['font.sans-serif'] = ['SimHei']  # 使用黑体 SimHei
    plt.rcParams['axes.unicode_minus'] = False  # 解决负号 '-' 显示为方块的问题
    # 绘制预测值与实际值的散点图
    plt.figure(figsize=(10, 6))
    plt.scatter(y_test, y_pred, alpha=0.5)
    plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], color='red', lw=2)
    plt.xlabel("实际值")
    plt.ylabel("预测值")
    plt.title("实际值与预测值(随机森林回归)")
    directory =os.path.join(parent_directory, "templates","file","cnhnbsgforecast","figure.png")
    os.makedirs(os.path.dirname(directory), exist_ok=True)
    plt.savefig(directory)
    plt.clf()
    plt.close()
    # 绘制特征重要性
    feature_importances = estimator.feature_importances_
    features = [
        'title',
        'leibie',
        'turnover',
    ]
    sns.barplot(x=feature_importances, y=features)
    plt.xlabel("重要性得分")
    plt.ylabel("特征")
    plt.title("特征重要性")
    if value!=None:
        directory =os.path.join(parent_directory, "templates","file","cnhnbsgforecast","{value}_figure.png")
        os.makedirs(os.path.dirname(directory), exist_ok=True)
        plt.savefig(directory)
    else:
        directory =os.path.join(parent_directory, "templates","file","cnhnbsgforecast","figure_other.png")
        os.makedirs(os.path.dirname(directory), exist_ok=True)
        plt.savefig(directory)
    plt.clf()
    plt.close()
    #保存模型
    joblib.dump(estimator, estimator_file)

    #7.进行预测
    y_predict = estimator.predict(future_df)
    if isinstance(y_predict[0], numbers.Number) or len(y_predict[0])<2:
        y_predict = np.mean(y_predict, axis=0)
        if not isinstance(y_predict, np.ndarray):
            y_predict = np.expand_dims(y_predict, axis=0)
    df = pd.DataFrame(y_predict, columns=[
        'jiage',
    ])
    df['jiage'] = df['jiage'].astype(float)
    df['jiage']=np.round(df['jiage'], 2)
    return df


def cnhnbsgforecast_default(request):

    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code,"msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        req_dict.update({"isdefault":"是"})
        data=cnhnbsgforecast.getbyparams(cnhnbsgforecast, cnhnbsgforecast, req_dict)
        if len(data)>0:
            msg['data']  = data[0]
        else:
            msg['data']  = {}
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def cnhnbsgforecast_page(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")

        global cnhnbsgforecast
        #当前登录用户信息
        tablename = request.session.get("tablename")

        q = Q()

        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  =cnhnbsgforecast.page(cnhnbsgforecast, cnhnbsgforecast, req_dict, request, q)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def cnhnbsgforecast_autoSort(request):
    '''
    ．智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
主要信息列表（如商品列表，新闻列表）中使用，显示最近点击的或最新添加的5条记录就行
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        if "clickNumber"  in cnhnbsgforecast.getallcolumn(cnhnbsgforecast,cnhnbsgforecast):
            req_dict['sort']='clickNumber'
        elif "browseduration"  in cnhnbsgforecast.getallcolumn(cnhnbsgforecast,cnhnbsgforecast):
            req_dict['sort']='browseduration'
        else:
            req_dict['sort']='clicktime'
        req_dict['order']='desc'
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = cnhnbsgforecast.page(cnhnbsgforecast,cnhnbsgforecast, req_dict)

        return JsonResponse(msg, encoder=CustomJsonEncoder)

#分类列表
def cnhnbsgforecast_lists(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":[]}
        msg['data'],_,_,_,_  = cnhnbsgforecast.page(cnhnbsgforecast, cnhnbsgforecast, {})
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def cnhnbsgforecast_query(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        try:
            query_result = cnhnbsgforecast.objects.filter(**request.session.get("req_dict")).values()
            msg['data'] = query_result[0]
        except Exception as e:

            msg['code'] = crud_error_code
            msg['msg'] = f"发生错误：{e}"
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def cnhnbsgforecast_list(request):
    '''
    前台分页
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        if req_dict.__contains__('vipread'):
            del req_dict['vipread']

        #获取全部列名
        columns=  cnhnbsgforecast.getallcolumn( cnhnbsgforecast, cnhnbsgforecast)
        #表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
        try:
            __foreEndList__=cnhnbsgforecast.__foreEndList__
        except:
            __foreEndList__=None

        #forrEndListAuth
        try:
            __foreEndListAuth__=cnhnbsgforecast.__foreEndListAuth__
        except:
            __foreEndListAuth__=None


        #authSeparate
        try:
            __authSeparate__=cnhnbsgforecast.__authSeparate__
        except:
            __authSeparate__=None

        if __foreEndListAuth__ =="是" and __authSeparate__=="是":
            tablename=request.session.get("tablename")
            if tablename!="users":
                try:
                    req_dict['userid']=request.session.get("params").get("id")
                except:
                    pass

        tablename = request.session.get("tablename")
        if tablename == "users" and req_dict.get("userid") != None:#判断是否存在userid列名
            del req_dict["userid"]
        else:
            __isAdmin__ = None

            allModels = apps.get_app_config('main').get_models()
            for m in allModels:
                if m.__tablename__==tablename:

                    try:
                        __isAdmin__ = m.__isAdmin__
                    except:
                        __isAdmin__ = None
                    break

            if __isAdmin__ == "是":
                if req_dict.get("userid"):
                    # del req_dict["userid"]
                    pass
            else:
                #非管理员权限的表,判断当前表字段名是否有userid
                if "userid" in columns:
                    try:
                        pass
                    except:
                            pass
        #当列属性authTable有值(某个用户表)[该列的列名必须和该用户表的登陆字段名一致]，则对应的表有个隐藏属性authTable为”是”，那么该用户查看该表信息时，只能查看自己的
        try:
            __authTables__=cnhnbsgforecast.__authTables__
        except:
            __authTables__=None

        if __authTables__!=None and  __authTables__!={} and __foreEndListAuth__=="是":
            for authColumn,authTable in __authTables__.items():
                if authTable==tablename:
                    try:
                        del req_dict['userid']
                    except:
                        pass
                    params = request.session.get("params")
                    req_dict[authColumn]=params.get(authColumn)
                    username=params.get(authColumn)
                    break
        
        if cnhnbsgforecast.__tablename__[:7]=="discuss":
            try:
                del req_dict['userid']
            except:
                pass


        q = Q()
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = cnhnbsgforecast.page(cnhnbsgforecast, cnhnbsgforecast, req_dict, request, q)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def cnhnbsgforecast_save(request):
    '''
    后台新增
    '''
    request.funname = __name__+"."+cnhnbsgforecast_save.__name__
    request.operation = "新增鹅肉价格预测"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        if 'clicktime' in req_dict.keys():
            del req_dict['clicktime']
        tablename=request.session.get("tablename")
        __isAdmin__ = None
        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__==tablename:

                try:
                    __isAdmin__ = m.__isAdmin__
                except:
                    __isAdmin__ = None
                break

        #获取全部列名
        columns=  cnhnbsgforecast.getallcolumn( cnhnbsgforecast, cnhnbsgforecast)
        if tablename!='users' and req_dict.get("userid")==None and 'userid' in columns  and __isAdmin__!='是':
            params=request.session.get("params")
            req_dict['userid']=params.get('id')

        if 'addtime' in req_dict.keys():
            del req_dict['addtime']

        idOrErr= cnhnbsgforecast.createbyreq(cnhnbsgforecast,cnhnbsgforecast, req_dict,"否")
        if idOrErr is Exception:
            msg['code'] = crud_error_code
            msg['msg'] = idOrErr
        else:
            msg['data'] = idOrErr

        return JsonResponse(msg, encoder=CustomJsonEncoder)

        error= cnhnbsgforecast.createbyreq(cnhnbsgforecast,cnhnbsgforecast, req_dict,"否")
        if error is Exception or (type(error) is str and "Exception" in error):
            msg['code'] = crud_error_code
            msg['msg'] = error

        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_add(request):
    '''
    前台新增
    '''
    request.funname = __name__+"."+cnhnbsgforecast_add.__name__
    request.operation = "新增鹅肉价格预测"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")

        #获取全部列名
        columns=  cnhnbsgforecast.getallcolumn( cnhnbsgforecast, cnhnbsgforecast)
        try:
            __authSeparate__=cnhnbsgforecast.__authSeparate__
        except:
            __authSeparate__=None

        if __authSeparate__=="是":
            tablename=request.session.get("tablename")
            if tablename!="users" and 'userid' in columns:
                try:
                    req_dict['userid']=request.session.get("params").get("id")
                except:
                    pass

        try:
            __foreEndListAuth__=cnhnbsgforecast.__foreEndListAuth__
        except:
            __foreEndListAuth__=None

        if __foreEndListAuth__ and __foreEndListAuth__!="否":
            tablename=request.session.get("tablename")
            if tablename!="users":
                req_dict['userid']=request.session.get("params").get("id")

        error= cnhnbsgforecast.createbyreq(cnhnbsgforecast,cnhnbsgforecast, req_dict,"否")
        if error is Exception or (type(error) is str and "Exception" in error):
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def cnhnbsgforecast_thumbsup(request,id_):
    '''
     点赞：表属性thumbsUp[是/否]，刷表新增thumbsupnum赞和crazilynum踩字段，
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        id_=int(id_)
        type_=int(req_dict.get("type",0))
        rets=cnhnbsgforecast.getbyid(cnhnbsgforecast,cnhnbsgforecast,id_)

        update_dict={
        "id":id_,
        }
        if type_==1:#赞
            update_dict["thumbsupNumber"]=int(rets[0].get('thumbsupNumber'))+1
        elif type_==2:#踩
            update_dict["crazilyNumber"]=int(rets[0].get('crazilyNumber'))+1
        error = cnhnbsgforecast.updatebyparams(cnhnbsgforecast,cnhnbsgforecast, update_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_info(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data = cnhnbsgforecast.getbyid(cnhnbsgforecast,cnhnbsgforecast, int(id_))
        if len(data)>0:
            msg['data']=data[0]
            if msg['data'].__contains__("reversetime"):
                msg['data']['reversetime'] = msg['data']['reversetime'].strftime("%Y-%m-%d %H:%M:%S")
        #浏览点击次数
        try:
            __browseClick__= cnhnbsgforecast.__browseClick__
        except:
            __browseClick__=None

        if __browseClick__=="是"  and  "clickNumber" in cnhnbsgforecast.getallcolumn(cnhnbsgforecast,cnhnbsgforecast):
            try:
                clickNumber=int(data[0].get("clickNumber",0))+1
            except:
                clickNumber=0+1
            click_dict={"id":int(id_),"clickNumber":clickNumber,"clicktime":datetime.datetime.now()}
            ret=cnhnbsgforecast.updatebyparams(cnhnbsgforecast,cnhnbsgforecast,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def cnhnbsgforecast_detail(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data =cnhnbsgforecast.getbyid(cnhnbsgforecast,cnhnbsgforecast, int(id_))
        if len(data)>0:
            msg['data']=data[0]
            if msg['data'].__contains__("addtime") and isinstance(msg['data']['addtime'], datetime.datetime):
                msg['data']['addtime'] = msg['data']['addtime'].strftime("%Y-%m-%d %H:%M:%S")

            if msg['data'].__contains__("reversetime"):
                if isinstance(msg['data']['reversetime'], datetime.datetime):
                    msg['data']['reversetime'] = msg['data']['reversetime'].strftime("%Y-%m-%d %H:%M:%S")
                else:
                    if msg['data']['reversetime'] != None:
                        reversetime = datetime.datetime.strptime(msg['data']['reversetime'], '%Y-%m-%d %H:%M:%S')
                        msg['data']['reversetime'] = reversetime.strftime("%Y-%m-%d %H:%M:%S")

        #浏览点击次数
        try:
            __browseClick__= cnhnbsgforecast.__browseClick__
        except:
            __browseClick__=None

        if __browseClick__=="是"   and  "clickNumber"  in cnhnbsgforecast.getallcolumn(cnhnbsgforecast,cnhnbsgforecast):
            try:
                clickNumber=int(data[0].get("clickNumber",0))+1
            except:
                clickNumber=0+1
            click_dict={"id":int(id_),"clickNumber":clickNumber,"clicktime":datetime.datetime.now()}

            ret=cnhnbsgforecast.updatebyparams(cnhnbsgforecast,cnhnbsgforecast,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_update(request):
    '''
    '''
    request.funname = __name__+"."+cnhnbsgforecast_update.__name__
    request.operation = "更新鹅肉价格预测"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")

        if req_dict.get("mima") and "mima" not in cnhnbsgforecast.getallcolumn(cnhnbsgforecast,cnhnbsgforecast) :
            del req_dict["mima"]
        try:
            del req_dict["clickNumber"]
        except:
            pass


        error = cnhnbsgforecast.updatebyparams(cnhnbsgforecast, cnhnbsgforecast, req_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error

        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_delete(request):
    '''
    批量删除
    '''
    request.funname = __name__+"."+cnhnbsgforecast_delete.__name__
    request.operation = "删除鹅肉价格预测"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")

        error=cnhnbsgforecast.deletes(cnhnbsgforecast,
            cnhnbsgforecast,
             req_dict.get("ids")
        )
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_vote(request,id_):
    '''
    浏览点击次数（表属性[browseClick:是/否]，点击字段（clickNumber），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1）
统计商品或新闻的点击次数；提供新闻的投票功能
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code}


        data= cnhnbsgforecast.getbyid(cnhnbsgforecast, cnhnbsgforecast, int(id_))
        for i in data:
            votenum=i.get('votenum')
            if votenum!=None:
                params={"id":int(id_),"votenum":votenum+1}
                error=cnhnbsgforecast.updatebyparams(cnhnbsgforecast,cnhnbsgforecast,params)
                if error!=None:
                    msg['code'] = crud_error_code
                    msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def cnhnbsgforecast_importExcel(request):
    request.funname = __name__+"."+cnhnbsgforecast_importExcel.__name__
    request.operation = "导入鹅肉价格预测"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": "成功", "data": {}}

        excel_file = request.FILES.get("file", "")
        if excel_file.size > 100 * 1024 * 1024:  # 限制为 100MB
            msg['code'] = 400
            msg["msg"] = '文件大小不能超过100MB'
            return JsonResponse(msg, encoder=CustomJsonEncoder)
        file_type = excel_file.name.split('.')[1]
        
        if file_type in ['xlsx', 'xls']:
            data = xlrd.open_workbook(filename=None, file_contents=excel_file.read())
            table = data.sheets()[0]
            rows = table.nrows
            
            try:
                for row in range(1, rows):
                    row_values = table.row_values(row)
                    req_dict = {}
                    cnhnbsgforecast.createbyreq(cnhnbsgforecast, cnhnbsgforecast, req_dict,"否")
                    
            except:
                pass
                
        else:
            msg.code = 500
            msg.msg = "文件类型错误"
                
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def cnhnbsgforecast_sendemail(request):
    if request.method in ["POST", "GET"]:
        req_dict = request.session.get("req_dict")

        code = random.sample(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], 4)
        to = []
        to.append(req_dict['email'])

        send_mail('用户注册', '您的注册验证码是【'+''.join(code)+'】，请不要把验证码泄漏给其他人，如非本人请勿操作。', 'yclw9@qq.com', to, fail_silently = False)

        cursor = connection.cursor()
        cursor.execute("insert into emailregistercode(email,role,code) values('"+req_dict['email']+"','用户','"+''.join(code)+"')")

        msg = {
            "msg": "发送成功",
            "code": 0
        }

        return JsonResponse(msg, encoder=CustomJsonEncoder)


# 推荐算法接口
def cnhnbsgforecast_autoSort2(request):
    
    if request.method in ["POST", "GET"]:
        req_dict = request.session.get("req_dict")
        cursor = connection.cursor()
        leixing = set()
        token = request.META.get('HTTP_TOKEN')
        decode_str = eval(base64.b64decode(token).decode("utf8"))
        user_id = decode_str['params']["id"]
        try:
            cursor.execute("select inteltype from storeup where userid = %d"%(user_id)+" and tablename = 'cnhnbsgforecast' order by addtime desc")
            rows = cursor.fetchall()
            for row in rows:
                for item in row:
                    if item != None:
                        leixing.add(item)
        except:
            leixing = set()
        
        L = []
        cursor.execute("select * from cnhnbsgforecast where $intelRecomColumn in ('%s"%("','").join(leixing)+"') union all select * from cnhnbsgforecast where $intelRecomColumn not in('%s"%("','").join(leixing)+"')")
        desc = cursor.description
        data_dict = [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()] 
        for online_dict in data_dict:
            for key in online_dict:
                if 'datetime.datetime' in str(type(online_dict[key])):
                    online_dict[key] = online_dict[key].strftime(
                        "%Y-%m-%d %H:%M:%S")
                else:
                    pass
            L.append(online_dict)


        return JsonResponse({"code": 0, "msg": '',  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":5,"list": L[0:int(req_dict["limit"])]}})












