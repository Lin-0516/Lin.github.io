# coding:utf-8
__author__ = "ila"

import base64, copy, logging, os, time, xlrd, json
from django.http import JsonResponse
from django.apps import apps
import datetime
from django.db.models.aggregates import Count, Sum
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

rename = {
    "title": "title",
    "leibie": "leibie",
    "turnover": "turnover",
    "jiage": "jiage",
}
import pandas as pd
import joblib
import numbers
import pymysql
import numpy as np
import matplotlib

matplotlib.use('Agg')
from matplotlib import pyplot as plt
import matplotlib.font_manager as fm
from util.configread import config_read
import os
from sqlalchemy import create_engine
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
import seaborn as sns

pd.options.mode.chained_assignment = None

parent_directory = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dbtype, host, port, user, passwd, dbName, charset, hasHadoop = config_read(os.path.join(parent_directory, "config.ini"))

mysql_config = {
    'host': host,
    'user': user,
    'password': passwd,
    'database': dbName,
    'port': port
}

# 全局变量，保存编码器
parent_directory = os.path.dirname(os.path.abspath(__file__))

def auto_figsize(x_data, base_width=8, base_height=6, width_per_point=0.2):
    num_points = len(x_data)
    dynamic_width = base_width + width_per_point * num_points
    return (dynamic_width, base_height)


def cnhnbsgforecast_forecastimgs(request):
    if request.method in ["POST", "GET"]:
        msg = {'code': normal_code, 'message': 'success'}
        directory = os.path.join(parent_directory, "templates", "file", "cnhnbsgforecast")
        all_items = os.listdir(directory) if os.path.exists(directory) else []
        files = [f'file/cnhnbsgforecast/{item}' for item in all_items if os.path.isfile(os.path.join(directory, item))]
        msg["data"] = files
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_forecast(request):
    if request.method in ["POST", "GET"]:
        msg = {'code': normal_code, "msg": mes.normal_code}
        req_dict = request.session.get("req_dict", {})

        conn = pymysql.connect(**mysql_config)
        query = "SELECT title,leibie,turnover, jiage FROM cnhnbsg"
        data = pd.read_sql(query, conn)
        conn.close()

        data = data.dropna(subset=['jiage'])
        data['title'] = data['title'].fillna('未知')
        data['leibie'] = data['leibie'].fillna('未知')
        data['turnover'] = data['turnover'].fillna(0)

        def remove_outliers(df, col):
            Q1 = df[col].quantile(0.25)
            Q3 = df[col].quantile(0.75)
            IQR = Q3 - Q1
            lower = Q1 - 1.5 * IQR
            upper = Q3 + 1.5 * IQR
            return df[(df[col] >= lower) & (df[col] <= upper)]

        data = remove_outliers(data, 'jiage')
        id = req_dict.pop('id', None)
        df = to_forecast(data, req_dict, None)

        if not df.empty:
            connection_string = f"mysql+pymysql://{mysql_config['user']}:{mysql_config['password']}@{mysql_config['host']}:{mysql_config['port']}/{mysql_config['database']}"
            engine = create_engine(connection_string)
            try:
                if id and req_dict:
                    with engine.connect() as conn:
                        for index, row in df.iterrows():
                            sql = """
                            UPDATE cnhnbsgforecast SET
                            jiage = %(jiage)s
                            WHERE id = %(id)s
                            """
                            conn.execute(sql, {'id': id, 'jiage': row['jiage']})
                else:
                    df.to_sql('cnhnbsgforecast', con=engine, if_exists='append', index=False)
                msg["msg"] = "预测成功！"
            except Exception as e:
                msg['code'] = crud_error_code
                msg["msg"] = f"错误: {str(e)}"
            finally:
                engine.dispose()
        else:
            msg['code'] = crud_error_code
            msg["msg"] = "预测失败"
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def to_forecast(data, req_dict, value):
    """
    随机森林价格预测
    核心：根据输入的单位，自动筛选同单位数据训练，解决单位混乱问题
    """
    # 1. 数据不足直接返回空
    if data is None or len(data) < 3:
        return pd.DataFrame()

    # ======================================================================
    # 【核心逻辑】识别用户输入的单位：斤 / 箱 / 只 / 件
    # ======================================================================
    input_turnover = str(req_dict.get("turnover", "")).strip()
    input_unit = None
    if "斤" in input_turnover:
        input_unit = "斤"
    elif "箱" in input_turnover:
        input_unit = "箱"
    elif "只" in input_turnover:
        input_unit = "只"
    elif "件" in input_turnover:
        input_unit = "件"

    # 复制数据，避免污染原数据
    df = data.copy()
    df = df.dropna(subset=["title", "leibie", "turnover", "jiage"])
    df["turnover_str"] = df["turnover"].astype(str).str.strip()

    # ======================================================================
    # 【关键】只保留和输入【相同单位】的数据
    # ======================================================================
    if input_unit == "斤":
        df = df[df["turnover_str"].str.contains("斤", na=False)]
    elif input_unit == "箱":
        df = df[df["turnover_str"].str.contains("箱", na=False)]
    elif input_unit == "只":
        df = df[df["turnover_str"].str.contains("只", na=False)]
    elif input_unit == "件":
        df = df[df["turnover_str"].str.contains("件", na=False)]
    else:
        return pd.DataFrame()

    if len(df) < 3:
        return pd.DataFrame()

    # ======================================================================
    # 2. 提取数字（数量）
    # ======================================================================
    def extract_number(val):
        try:
            return float(''.join([c for c in str(val) if c.isdigit()]))
        except:
            return np.nan

    df["quantity"] = df["turnover"].apply(extract_number)
    df = df.dropna(subset=["quantity", "jiage"])
    df = df[(df["quantity"] > 0) & (df["jiage"] >= 10) & (df["jiage"] <= 450)]

    if len(df) < 3:
        return pd.DataFrame()

    # ======================================================================
    # 3. 特征编码（保留全部特征）
    # ======================================================================
    le_title = LabelEncoder()
    le_leibie = LabelEncoder()

    df["title_enc"] = le_title.fit_transform(df["title"].astype(str))
    df["leibie_enc"] = le_leibie.fit_transform(df["leibie"].astype(str))

    X = df[["title_enc", "leibie_enc", "quantity"]]
    y = df["jiage"]

    # ======================================================================
    # 4. 随机森林模型（稳定、防过拟合、符合毕设要求）
    # ======================================================================
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=22
    )

    model = RandomForestRegressor(
        n_estimators=120,
        max_depth=4,
        min_samples_split=8,
        min_samples_leaf=4,
        random_state=22,
        n_jobs=1
    )
    model.fit(X_train, y_train)

    # ======================================================================
    # 5. 构造预测输入
    # ======================================================================
    test_qty = extract_number(input_turnover)
    test_title = req_dict.get("title", "")
    test_leibie = req_dict.get("leibie", "")

    test_df = pd.DataFrame({
        "title": [test_title],
        "leibie": [test_leibie],
        "quantity": [test_qty]
    })

    # 安全编码
    try:
        test_df["title_enc"] = le_title.transform(test_df["title"].astype(str))
    except:
        test_df["title_enc"] = 0

    try:
        test_df["leibie_enc"] = le_leibie.transform(test_df["leibie"].astype(str))
    except:
        test_df["leibie_enc"] = 0

    # ======================================================================
    # 6. 预测 + 价格约束
    # ======================================================================
    prediction = model.predict(test_df[["title_enc", "leibie_enc", "quantity"]])
    final_price = np.clip(prediction[0], 10, 450)

    return pd.DataFrame({"jiage": [round(final_price, 2)]})

# ↓↓↓ 下面是你原来的所有函数，保持不变 ↓↓↓
def cnhnbsgforecast_default(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        req_dict.update({"isdefault": "是"})
        data = cnhnbsgforecast.getbyparams(cnhnbsgforecast, cnhnbsgforecast, req_dict)
        if len(data) > 0:
            msg['data'] = data[0]
        else:
            msg['data'] = {}
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_page(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,
               "data": {"currPage": 1, "totalPage": 1, "total": 1, "pageSize": 10, "list": []}}
        req_dict = request.session.get("req_dict")
        global cnhnbsgforecast
        tablename = request.session.get("tablename")
        q = Q()
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize'] = cnhnbsgforecast.page(cnhnbsgforecast, cnhnbsgforecast, req_dict, request, q)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_autoSort(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,
               "data": {"currPage": 1, "totalPage": 1, "total": 1, "pageSize": 10, "list": []}}
        req_dict = request.session.get("req_dict")
        if "clickNumber" in cnhnbsgforecast.getallcolumn(cnhnbsgforecast, cnhnbsgforecast):
            req_dict['sort'] = 'clickNumber'
        elif "browseduration" in cnhnbsgforecast.getallcolumn(cnhnbsgforecast, cnhnbsgforecast):
            req_dict['sort'] = 'browseduration'
        else:
            req_dict['sort'] = 'clicktime'
        req_dict['order'] = 'desc'
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize'] = cnhnbsgforecast.page(cnhnbsgforecast, cnhnbsgforecast, req_dict)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_lists(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": []}
        msg['data'], _, _, _, _ = cnhnbsgforecast.page(cnhnbsgforecast, cnhnbsgforecast, {})
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_query(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        try:
            query_result = cnhnbsgforecast.objects.filter(**request.session.get("req_dict")).values()
            msg['data'] = query_result[0] if query_result else {}
        except Exception as e:
            msg['code'] = crud_error_code
            msg['msg'] = f"发生错误：{e}"
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_list(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,
               "data": {"currPage": 1, "totalPage": 1, "total": 1, "pageSize": 10, "list": []}}
        req_dict = request.session.get("req_dict", {})
        if req_dict.__contains__('vipread'):
            del req_dict['vipread']

        columns = cnhnbsgforecast.getallcolumn(cnhnbsgforecast, cnhnbsgforecast)
        try:
            __foreEndList__ = cnhnbsgforecast.__foreEndList__
        except:
            __foreEndList__ = None
        try:
            __foreEndListAuth__ = cnhnbsgforecast.__foreEndListAuth__
        except:
            __foreEndListAuth__ = None
        try:
            __authSeparate__ = cnhnbsgforecast.__authSeparate__
        except:
            __authSeparate__ = None

        if __foreEndListAuth__ == "是" and __authSeparate__ == "是":
            tablename = request.session.get("tablename")
            if tablename != "users":
                try:
                    req_dict['userid'] = request.session.get("params").get("id")
                except:
                    pass

        tablename = request.session.get("tablename")
        if tablename == "users" and req_dict.get("userid") != None:
            del req_dict["userid"]
        else:
            __isAdmin__ = None
            allModels = apps.get_app_config('main').get_models()
            for m in allModels:
                if m.__tablename__ == tablename:
                    try:
                        __isAdmin__ = m.__isAdmin__
                    except:
                        __isAdmin__ = None
                    break
            if __isAdmin__ == "是":
                pass
            else:
                if "userid" in columns:
                    pass

        try:
            __authTables__ = cnhnbsgforecast.__authTables__
        except:
            __authTables__ = None

        if __authTables__ != None and __authTables__ != {} and __foreEndListAuth__ == "是":
            for authColumn, authTable in __authTables__.items():
                if authTable == tablename:
                    try:
                        del req_dict['userid']
                    except:
                        pass
                    params = request.session.get("params")
                    req_dict[authColumn] = params.get(authColumn)
                    break

        if cnhnbsgforecast.__tablename__[:7] == "discuss":
            try:
                del req_dict['userid']
            except:
                pass

        q = Q()
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize'] = cnhnbsgforecast.page(cnhnbsgforecast, cnhnbsgforecast, req_dict, request, q)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_save(request):
    request.funname = __name__ + "." + cnhnbsgforecast_save.__name__
    request.operation = "新增鹅肉价格预测"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict", {})
        if 'clicktime' in req_dict.keys():
            del req_dict['clicktime']
        tablename = request.session.get("tablename")
        __isAdmin__ = None
        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__ == tablename:
                try:
                    __isAdmin__ = m.__isAdmin__
                except:
                    __isAdmin__ = None
                break

        columns = cnhnbsgforecast.getallcolumn(cnhnbsgforecast, cnhnbsgforecast)
        if tablename != 'users' and req_dict.get("userid") == None and 'userid' in columns and __isAdmin__ != '是':
            params = request.session.get("params")
            req_dict['userid'] = params.get('id')

        if 'addtime' in req_dict.keys():
            del req_dict['addtime']

        idOrErr = cnhnbsgforecast.createbyreq(cnhnbsgforecast, cnhnbsgforecast, req_dict, "否")
        if isinstance(idOrErr, Exception):
            msg['code'] = crud_error_code
            msg['msg'] = str(idOrErr)
        else:
            msg['data'] = idOrErr

        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_add(request):
    request.funname = __name__ + "." + cnhnbsgforecast_add.__name__
    request.operation = "新增鹅肉价格预测"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict", {})

        columns = cnhnbsgforecast.getallcolumn(cnhnbsgforecast, cnhnbsgforecast)
        try:
            __authSeparate__ = cnhnbsgforecast.__authSeparate__
        except:
            __authSeparate__ = None

        if __authSeparate__ == "是":
            tablename = request.session.get("tablename")
            if tablename != "users" and 'userid' in columns:
                try:
                    req_dict['userid'] = request.session.get("params").get("id")
                except:
                    pass

        try:
            __foreEndListAuth__ = cnhnbsgforecast.__foreEndListAuth__
        except:
            __foreEndListAuth__ = None

        if __foreEndListAuth__ and __foreEndListAuth__ != "否":
            tablename = request.session.get("tablename")
            if tablename != "users":
                req_dict['userid'] = request.session.get("params").get("id")

        error = cnhnbsgforecast.createbyreq(cnhnbsgforecast, cnhnbsgforecast, req_dict, "否")
        if isinstance(error, Exception) or (type(error) is str and "Exception" in error):
            msg['code'] = crud_error_code
            msg['msg'] = str(error)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_thumbsup(request, id_):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict", {})
        id_ = int(id_)
        type_ = int(req_dict.get("type", 0))
        rets = cnhnbsgforecast.getbyid(cnhnbsgforecast, cnhnbsgforecast, id_)

        update_dict = {
            "id": id_,
        }
        if type_ == 1:
            update_dict["thumbsupNumber"] = int(rets[0].get('thumbsupNumber', 0)) + 1
        elif type_ == 2:
            update_dict["crazilyNumber"] = int(rets[0].get('crazilyNumber', 0)) + 1
        error = cnhnbsgforecast.updatebyparams(cnhnbsgforecast, cnhnbsgforecast, update_dict)
        if error != None:
            msg['code'] = crud_error_code
            msg['msg'] = str(error)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_info(request, id_):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data = cnhnbsgforecast.getbyid(cnhnbsgforecast, cnhnbsgforecast, int(id_))
        if len(data) > 0:
            msg['data'] = data[0]
            if msg['data'].__contains__("reversetime"):
                msg['data']['reversetime'] = msg['data']['reversetime'].strftime("%Y-%m-%d %H:%M:%S")
        try:
            __browseClick__ = cnhnbsgforecast.__browseClick__
        except:
            __browseClick__ = None

        if __browseClick__ == "是" and "clickNumber" in cnhnbsgforecast.getallcolumn(cnhnbsgforecast, cnhnbsgforecast):
            try:
                clickNumber = int(data[0].get("clickNumber", 0)) + 1
            except:
                clickNumber = 1
            click_dict = {"id": int(id_), "clickNumber": clickNumber, "clicktime": datetime.datetime.now()}
            ret = cnhnbsgforecast.updatebyparams(cnhnbsgforecast, cnhnbsgforecast, click_dict)
            if ret != None:
                msg['code'] = crud_error_code
                msg['msg'] = str(ret)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_detail(request, id_):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data = cnhnbsgforecast.getbyid(cnhnbsgforecast, cnhnbsgforecast, int(id_))
        if len(data) > 0:
            msg['data'] = data[0]
            if msg['data'].__contains__("addtime") and isinstance(msg['data']['addtime'], datetime.datetime):
                msg['data']['addtime'] = msg['data']['addtime'].strftime("%Y-%m-%d %H:%M:%S")

            if msg['data'].__contains__("reversetime"):
                if isinstance(msg['data']['reversetime'], datetime.datetime):
                    msg['data']['reversetime'] = msg['data']['reversetime'].strftime("%Y-%m-%d %H:%M:%S")
                else:
                    if msg['data']['reversetime'] != None:
                        reversetime = datetime.datetime.strptime(msg['data']['reversetime'], '%Y-%m-%d %H:%M:%S')
                        msg['data']['reversetime'] = reversetime.strftime("%Y-%m-%d %H:%M:%S")

        try:
            __browseClick__ = cnhnbsgforecast.__browseClick__
        except:
            __browseClick__ = None

        if __browseClick__ == "是" and "clickNumber" in cnhnbsgforecast.getallcolumn(cnhnbsgforecast, cnhnbsgforecast):
            try:
                clickNumber = int(data[0].get("clickNumber", 0)) + 1
            except:
                clickNumber = 1
            click_dict = {"id": int(id_), "clickNumber": clickNumber, "clicktime": datetime.datetime.now()}
            ret = cnhnbsgforecast.updatebyparams(cnhnbsgforecast, cnhnbsgforecast, click_dict)
            if ret != None:
                msg['code'] = crud_error_code
                msg['msg'] = str(ret)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_update(request):
    request.funname = __name__ + "." + cnhnbsgforecast_update.__name__
    request.operation = "更新鹅肉价格预测"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict", {})

        if req_dict.get("mima") and "mima" not in cnhnbsgforecast.getallcolumn(cnhnbsgforecast, cnhnbsgforecast):
            del req_dict["mima"]
        try:
            del req_dict["clickNumber"]
        except:
            pass

        error = cnhnbsgforecast.updatebyparams(cnhnbsgforecast, cnhnbsgforecast, req_dict)
        if error != None:
            msg['code'] = crud_error_code
            msg['msg'] = str(error)

        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_delete(request):
    request.funname = __name__ + "." + cnhnbsgforecast_delete.__name__
    request.operation = "删除鹅肉价格预测"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict", {})

        error = cnhnbsgforecast.deletes(cnhnbsgforecast,
                                        cnhnbsgforecast,
                                        req_dict.get("ids")
                                        )
        if error != None:
            msg['code'] = crud_error_code
            msg['msg'] = str(error)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_vote(request, id_):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code}

        data = cnhnbsgforecast.getbyid(cnhnbsgforecast, cnhnbsgforecast, int(id_))
        for i in data:
            votenum = i.get('votenum', 0)
            params = {"id": int(id_), "votenum": votenum + 1}
            error = cnhnbsgforecast.updatebyparams(cnhnbsgforecast, cnhnbsgforecast, params)
            if error != None:
                msg['code'] = crud_error_code
                msg['msg'] = str(error)
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_importExcel(request):
    request.funname = __name__ + "." + cnhnbsgforecast_importExcel.__name__
    request.operation = "导入鹅肉价格预测"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": "成功", "data": {}}

        excel_file = request.FILES.get("file", "")
        if not excel_file:
            msg['code'] = 400
            msg["msg"] = '请上传文件'
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        if excel_file.size > 100 * 1024 * 1024:
            msg['code'] = 400
            msg["msg"] = '文件大小不能超过100MB'
            return JsonResponse(msg, encoder=CustomJsonEncoder)

        file_name = excel_file.name
        file_type = file_name.split('.')[-1] if '.' in file_name else ''

        if file_type in ['xlsx', 'xls']:
            try:
                data = xlrd.open_workbook(filename=None, file_contents=excel_file.read())
                table = data.sheets()[0]
                rows = table.nrows
                cols = table.ncols
                headers = table.row_values(0)

                success_count = 0
                fail_count = 0

                for row in range(1, rows):
                    row_values = table.row_values(row)
                    req_dict = dict(zip(headers, row_values))
                    req_dict = {k: v for k, v in req_dict.items() if v and v != ''}
                    try:
                        cnhnbsgforecast.createbyreq(cnhnbsgforecast, cnhnbsgforecast, req_dict, "否")
                        success_count += 1
                    except Exception as e:
                        fail_count += 1
                        logging.error(f"导入行{row + 1}失败: {e}")

                msg["msg"] = f"导入完成：成功{success_count}条，失败{fail_count}条"
            except Exception as e:
                msg['code'] = 500
                msg["msg"] = f"导入失败：{str(e)}"
        else:
            msg['code'] = 500
            msg["msg"] = "文件类型错误，仅支持xlsx/xls格式"

        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_sendemail(request):
    if request.method in ["POST", "GET"]:
        req_dict = request.session.get("req_dict", {})
        if not req_dict.get('email'):
            return JsonResponse({"msg": "邮箱不能为空", "code": 1}, encoder=CustomJsonEncoder)

        code = random.sample(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], 4)
        to = [req_dict['email']]

        try:
            send_mail(
                '用户注册',
                '您的注册验证码是【' + ''.join(code) + '】，请不要把验证码泄漏给其他人，如非本人请勿操作。',
                'yclw9@qq.com',
                to,
                fail_silently=False
            )

            cursor = connection.cursor()
            cursor.execute(
                "INSERT INTO emailregistercode(email,role,code) VALUES (%s, '用户', %s)",
                (req_dict['email'], ''.join(code))
            )
            connection.commit()

            msg = {"msg": "发送成功", "code": 0}
        except Exception as e:
            msg = {"msg": f"发送失败：{str(e)}", "code": 1}

        return JsonResponse(msg, encoder=CustomJsonEncoder)


def cnhnbsgforecast_autoSort2(request):
    if request.method in ["POST", "GET"]:
        req_dict = request.session.get("req_dict", {})
        limit = int(req_dict.get("limit", 5))
        msg = {"code": 0, "msg": '', "data": {"currPage": 1, "totalPage": 1, "total": 0, "pageSize": limit, "list": []}}

        try:
            cursor = connection.cursor()
            leixing = set()
            token = request.META.get('HTTP_TOKEN')

            if token:
                try:
                    decode_str = eval(base64.b64decode(token).decode("utf8"))
                    user_id = decode_str['params']["id"]
                    cursor.execute(
                        "SELECT inteltype FROM storeup WHERE userid = %s AND tablename = 'cnhnbsgforecast' ORDER BY addtime DESC",
                        (user_id,)
                    )
                    rows = cursor.fetchall()
                    for row in rows:
                        if row[0] is not None:
                            leixing.add(row[0])
                except Exception as e:
                    logging.warning(f"解析用户信息失败: {e}")

            if leixing:
                sql = f"""
                SELECT * FROM cnhnbsgforecast WHERE intelRecomColumn IN ({','.join(['%s'] * len(leixing))}) 
                UNION ALL 
                SELECT * FROM cnhnbsgforecast WHERE intelRecomColumn NOT IN ({','.join(['%s'] * len(leixing))})
                """
                cursor.execute(sql, list(leixing) * 2)
            else:
                sql = "SELECT * FROM cnhnbsgforecast ORDER BY addtime DESC"
                cursor.execute(sql)

            desc = cursor.description
            data_dict = [dict(zip([col[0] for col in desc], row)) for row in cursor.fetchall()]
            for online_dict in data_dict:
                for key in online_dict:
                    if isinstance(online_dict[key], datetime.datetime):
                        online_dict[key] = online_dict[key].strftime("%Y-%m-%d %H:%M:%S")

            result_list = data_dict[:limit]
            msg["data"]["list"] = result_list
            msg["data"]["total"] = len(data_dict)
            msg["data"]["totalPage"] = 1 if len(data_dict) <= limit else (len(data_dict) // limit) + 1

        except Exception as e:
            msg["code"] = 1
            msg["msg"] = str(e)
            logging.error(f"推荐算法错误: {e}")

        return JsonResponse(msg)