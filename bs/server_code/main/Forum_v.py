#coding:utf-8
__author__ = "ila"
import base64, copy, logging, os, time, xlrd, json
from django.http import JsonResponse
from django.apps import apps
import datetime
from django.db.models.aggregates import Count,Sum
from django.db.models import Case, When, IntegerField, F
from django.forms import model_to_dict
from .models import forum
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
        "content":"content",
        "parentid":"parentid",
        "userid":"userid",
        "username":"username",
        "avatarurl":"avatarurl",
        "isdone":"isdone",
        "isTop":"is_top",
        "topTime":"top_time",
        "typeName":"type_name",
        "cover":"cover",
        "isAnonymous":"is_anonymous",
        "isDel":"is_del",
        "thumbsupNumber":"thumbsup_number",
        "crazilyNumber":"crazily_number",
    }


def forum_default(request):

    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code,"msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        req_dict.update({"isdefault":"是"})
        data=forum.getbyparams(forum, forum, req_dict)
        if len(data)>0:
            msg['data']  = data[0]
        else:
            msg['data']  = {}
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def forum_page(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")

        global forum
        #当前登录用户信息
        tablename = request.session.get("tablename")

        # 判断当前表的表属性isAdmin,为真则是管理员
        __isAdmin__ = None
        allModels = apps.get_app_config('main').get_models()
        for m in allModels:
            if m.__tablename__==tablename:
                try:
                    __isAdmin__ = m.__isAdmin__
                except:
                    __isAdmin__ = None
                break
        if __isAdmin__!="是":
            req_dict["userid"]=request.session.get("params").get("id")
        q = Q()

        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  =forum.page(forum, forum, req_dict, request, q)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def forum_autoSort(request):
    '''
    ．智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
主要信息列表（如商品列表，新闻列表）中使用，显示最近点击的或最新添加的5条记录就行
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        if "clickNumber"  in forum.getallcolumn(forum,forum):
            req_dict['sort']='clickNumber'
        elif "browseduration"  in forum.getallcolumn(forum,forum):
            req_dict['sort']='browseduration'
        else:
            req_dict['sort']='clicktime'
        req_dict['order']='desc'
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = forum.page(forum,forum, req_dict)

        return JsonResponse(msg, encoder=CustomJsonEncoder)

#分类列表
def forum_lists(request):
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":[]}
        msg['data'],_,_,_,_  = forum.page(forum, forum, {})
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def forum_query(request):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        try:
            query_result = forum.objects.filter(**request.session.get("req_dict")).values()
            msg['data'] = query_result[0]
        except Exception as e:

            msg['code'] = crud_error_code
            msg['msg'] = f"发生错误：{e}"
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def forum_list(request):
    '''
    前台分页
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")
        if req_dict.__contains__('vipread'):
            del req_dict['vipread']

        #获取全部列名
        columns=  forum.getallcolumn( forum, forum)
        #表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
        try:
            __foreEndList__=forum.__foreEndList__
        except:
            __foreEndList__=None

        #forrEndListAuth
        try:
            __foreEndListAuth__=forum.__foreEndListAuth__
        except:
            __foreEndListAuth__=None


        #authSeparate
        try:
            __authSeparate__=forum.__authSeparate__
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
                        # 本接口可以匿名访问,所以try判断是否为匿名
                        req_dict['userid']=request.session.get("params").get("id")
                    except:
                            pass
        #当列属性authTable有值(某个用户表)[该列的列名必须和该用户表的登陆字段名一致]，则对应的表有个隐藏属性authTable为”是”，那么该用户查看该表信息时，只能查看自己的
        try:
            __authTables__=forum.__authTables__
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
        
        if forum.__tablename__[:7]=="discuss":
            try:
                del req_dict['userid']
            except:
                pass


        q = Q()
        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize']  = forum.page(forum, forum, req_dict, request, q)
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def forum_save(request):
    '''
    后台新增
    '''
    request.funname = __name__+"."+forum_save.__name__
    request.operation = "新增论坛交流"
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
        columns=  forum.getallcolumn( forum, forum)
        if tablename!='users' and req_dict.get("userid")==None and 'userid' in columns  and __isAdmin__!='是':
            params=request.session.get("params")
            req_dict['userid']=params.get('id')

        if 'addtime' in req_dict.keys():
            del req_dict['addtime']

        idOrErr= forum.createbyreq(forum,forum, req_dict,"否")
        if idOrErr is Exception:
            msg['code'] = crud_error_code
            msg['msg'] = idOrErr
        else:
            msg['data'] = idOrErr

        return JsonResponse(msg, encoder=CustomJsonEncoder)

        error= forum.createbyreq(forum,forum, req_dict,"否")
        if error is Exception or (type(error) is str and "Exception" in error):
            msg['code'] = crud_error_code
            msg['msg'] = error

        return JsonResponse(msg, encoder=CustomJsonEncoder)


def forum_add(request):
    '''
    前台新增
    '''
    request.funname = __name__+"."+forum_add.__name__
    request.operation = "新增论坛交流"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")

        #获取全部列名
        columns=  forum.getallcolumn( forum, forum)
        try:
            __authSeparate__=forum.__authSeparate__
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
            __foreEndListAuth__=forum.__foreEndListAuth__
        except:
            __foreEndListAuth__=None

        if __foreEndListAuth__ and __foreEndListAuth__!="否":
            tablename=request.session.get("tablename")
            if tablename!="users":
                req_dict['userid']=request.session.get("params").get("id")

        error= forum.createbyreq(forum,forum, req_dict,"否")
        if error is Exception or (type(error) is str and "Exception" in error):
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def forum_thumbsup(request,id_):
    '''
     点赞：表属性thumbsUp[是/否]，刷表新增thumbsupnum赞和crazilynum踩字段，
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")
        id_=int(id_)
        type_=int(req_dict.get("type",0))
        rets=forum.getbyid(forum,forum,id_)

        update_dict={
        "id":id_,
        }
        if type_==1:#赞
            update_dict["thumbsupNumber"]=int(rets[0].get('thumbsupNumber'))+1
        elif type_==2:#踩
            update_dict["crazilyNumber"]=int(rets[0].get('crazilyNumber'))+1
        error = forum.updatebyparams(forum,forum, update_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def forum_info(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data = forum.getbyid(forum,forum, int(id_))
        if len(data)>0:
            msg['data']=data[0]
            if msg['data'].__contains__("reversetime"):
                msg['data']['reversetime'] = msg['data']['reversetime'].strftime("%Y-%m-%d %H:%M:%S")
        #浏览点击次数
        try:
            __browseClick__= forum.__browseClick__
        except:
            __browseClick__=None

        if __browseClick__=="是"  and  "clickNumber" in forum.getallcolumn(forum,forum):
            try:
                clickNumber=int(data[0].get("clickNumber",0))+1
            except:
                clickNumber=0+1
            click_dict={"id":int(id_),"clickNumber":clickNumber,"clicktime":datetime.datetime.now()}
            ret=forum.updatebyparams(forum,forum,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def forum_detail(request,id_):
    '''
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}

        data =forum.getbyid(forum,forum, int(id_))
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
            __browseClick__= forum.__browseClick__
        except:
            __browseClick__=None

        if __browseClick__=="是"   and  "clickNumber"  in forum.getallcolumn(forum,forum):
            try:
                clickNumber=int(data[0].get("clickNumber",0))+1
            except:
                clickNumber=0+1
            click_dict={"id":int(id_),"clickNumber":clickNumber,"clicktime":datetime.datetime.now()}

            ret=forum.updatebyparams(forum,forum,click_dict)
            if ret!=None:
                msg['code'] = crud_error_code
                msg['msg'] = ret
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def forum_update(request):
    '''
    '''
    request.funname = __name__+"."+forum_update.__name__
    request.operation = "更新论坛交流"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")

        if req_dict.get("mima") and "mima" not in forum.getallcolumn(forum,forum) :
            del req_dict["mima"]
        try:
            del req_dict["clickNumber"]
        except:
            pass


        error = forum.updatebyparams(forum, forum, req_dict)
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error

        return JsonResponse(msg, encoder=CustomJsonEncoder)


def forum_delete(request):
    '''
    批量删除
    '''
    request.funname = __name__+"."+forum_delete.__name__
    request.operation = "删除论坛交流"
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {}}
        req_dict = request.session.get("req_dict")

        error=forum.deletes(forum,
            forum,
             req_dict.get("ids")
        )
        if error!=None:
            msg['code'] = crud_error_code
            msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)


def forum_vote(request,id_):
    '''
    浏览点击次数（表属性[browseClick:是/否]，点击字段（clickNumber），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1）
统计商品或新闻的点击次数；提供新闻的投票功能
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code}


        data= forum.getbyid(forum, forum, int(id_))
        for i in data:
            votenum=i.get('votenum')
            if votenum!=None:
                params={"id":int(id_),"votenum":votenum+1}
                error=forum.updatebyparams(forum,forum,params)
                if error!=None:
                    msg['code'] = crud_error_code
                    msg['msg'] = error
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def forum_importExcel(request):
    request.funname = __name__+"."+forum_importExcel.__name__
    request.operation = "导入论坛交流"
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
                    forum.createbyreq(forum, forum, req_dict,"否")
                    
            except:
                pass
                
        else:
            msg.code = 500
            msg.msg = "文件类型错误"
                
        return JsonResponse(msg, encoder=CustomJsonEncoder)

def forum_sendemail(request):
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
def forum_autoSort2(request):
    
    if request.method in ["POST", "GET"]:
        req_dict = request.session.get("req_dict")
        cursor = connection.cursor()
        leixing = set()
        token = request.META.get('HTTP_TOKEN')
        decode_str = eval(base64.b64decode(token).decode("utf8"))
        user_id = decode_str['params']["id"]
        try:
            cursor.execute("select inteltype from storeup where userid = %d"%(user_id)+" and tablename = 'forum' order by addtime desc")
            rows = cursor.fetchall()
            for row in rows:
                for item in row:
                    if item != None:
                        leixing.add(item)
        except:
            leixing = set()
        
        L = []
        cursor.execute("select * from forum where $intelRecomColumn in ('%s"%("','").join(leixing)+"') union all select * from forum where $intelRecomColumn not in('%s"%("','").join(leixing)+"')")
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

def forum_flist(request):
    '''
    查看所有开放的帖列表(无需登录)
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code,  "data":{"currPage":1,"totalPage":1,"total":1,"pageSize":10,"list":[]}}
        req_dict = request.session.get("req_dict")

        msg['data']['list'], msg['data']['currPage'], msg['data']['totalPage'], msg['data']['total'], \
        msg['data']['pageSize'] = forum.page(forum, forum, req_dict)

        return JsonResponse(msg, encoder=CustomJsonEncoder)




def forum_list_id(request,id_):
    '''
    查看主贴和所有回帖内容(无需登录)
    '''
    if request.method in ["POST", "GET"]:
        msg = {"code": normal_code, "msg": mes.normal_code, "data": {"currPage":1,"totalPage":1,"total":1,"pageSize":10,"childs":[]},"id":int(id_)}

        params = {"id":int(id_)}

        datas = forum.retrieve(forum, forum)


        parent_id=0#当前id，也就是parent_id,找到了下一级，把下一级id赋值给current_id，当做下下一级id的paretn_id
        current_id=0
        start_index=0

        #获取parentid
        for index,i in enumerate(datas):
            if i.get('id')==params.get('id'):
                current_id=parent_id=i.get('id')
                start_index=index
                msg['data'].update(i)
                break

        #把疑似回帖的id放进ids数组
  
        id_data_dict={}#id和详情的键值对
        for i in datas:
            id_data_dict[i.get('id')]=i
        
        dict1={}#部分层级，只获取上下级关系
        for v in id_data_dict.values():
            parentid_=copy.deepcopy(v.get("parentid"))

            id_=copy.deepcopy(v.get("id"))
            if dict1.get(parentid_)==None:
                dict1[parentid_]=[]
            dict1[parentid_].append(id_)


        childs=[]#msg.data.childs
        #填充第一层回帖
        for i  in dict1.get(parent_id,[]):
            child1=copy.deepcopy(id_data_dict.get(i))

            #填充第二层回帖
            if dict1.get(i)!=None:#判断第二次是否还有回帖
                child2=[]
                for j in  dict1.get(i):
                    child3=copy.deepcopy(id_data_dict.get(j))
                    id_=copy.deepcopy(child3.get("id"))

                    if dict1.get(id_)!=None:#判断第三次是否还有回帖
                        child3["childs"]=[]
                        for k in dict1.get(id_):
                            child4=copy.deepcopy(id_data_dict.get(k))
                            id__=copy.deepcopy(child4.get("id"))

                            if dict1.get(id__)!=None:#判断第四次是否还有回帖
                                child4['childs']=[]
                                for l in dict1.get(id__):
                                    child5=copy.deepcopy(id_data_dict.get(l))
                                    id___=copy.deepcopy(child5.get("id"))

                                    if dict1.get(id___)!=None:#判断第五次是否还有回帖
                                        child5['childs']=[]
                                        for m in dict1.get(id___):
                                            child6=copy.deepcopy(id_data_dict.get(m))
                                            id____=copy.deepcopy(child6.get("id"))

                                            if dict1.get(id____)!=None:#判断第六次是否还有回帖
                                                child6['childs']=[]
                                                child7=copy.deepcopy(id_data_dict.get(m))
                                                child7['childs']=[]
                                                for n in dict1.get(id____):
                                                    child7['childs'].append(id_data_dict.get(n))

                                                child6['childs'].append(child7)

                                        child5['childs'].append(child6)

                                child4["childs"].append(child5)

                        child3["childs"].append(child4)

                    child2.append(child3)
                child1['childs']=child2
            else:
                child1['childs']=None

            childs.append(child1)
        print(childs)
        msg['data']['childs']=childs
        return JsonResponse(msg, encoder=CustomJsonEncoder)












