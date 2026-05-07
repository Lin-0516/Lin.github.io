#coding:utf-8
__author__ = "ila"
from django.db import models

from .model import BaseModel

from datetime import datetime



class config(BaseModel):
    __doc__ = u'''config'''
    __tablename__ = 'config'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    name=models.CharField ( max_length=255,null=False, unique=False, verbose_name='名称',db_column='name')
    value=models.TextField   (  null=True, unique=False, verbose_name='值',db_column='value')
    url=models.TextField   (  null=True, unique=False, verbose_name='链接',db_column='url')
    '''
    name=VARCHAR
    value=Text
    url=Text
    '''
    class Meta:
        db_table = 'config'
        verbose_name = verbose_name_plural = '轮播图'
class menu(BaseModel):
    __doc__ = u'''menu'''
    __tablename__ = 'menu'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='是'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=False, verbose_name=u'创建时间')
    menujson=models.TextField   ( null=False, unique=False, verbose_name='菜单',db_column='menujson')
    '''
    menujson=Text
    '''
    class Meta:
        db_table = 'menu'
        verbose_name = verbose_name_plural = '菜单'
class users(BaseModel):
    __doc__ = u'''users'''
    __tablename__ = 'users'



    __authTables__={}
    __authPeople__='是'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __loginUserColumn__='username'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='是' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=False, verbose_name=u'创建时间')
    username=models.CharField ( max_length=255,null=False, unique=False, verbose_name='用户名',db_column='username')
    password=models.CharField ( max_length=255,null=False, unique=False, verbose_name='密码',db_column='password')
    role=models.CharField ( max_length=255, null=True, unique=False,default='管理员', verbose_name='角色',db_column='role')
    '''
    username=VARCHAR
    password=VARCHAR
    role=VARCHAR
    '''
    class Meta:
        db_table = 'users'
        verbose_name = verbose_name_plural = '管理员'
class news(BaseModel):
    __doc__ = u'''news'''
    __tablename__ = 'news'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='是'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=False, verbose_name=u'创建时间')
    title=models.CharField ( max_length=255,null=False, unique=False, verbose_name='标题',db_column='title')
    introduction=models.TextField   (  null=True, unique=False, verbose_name='简介',db_column='introduction')
    picture=models.TextField   ( null=False, unique=False, verbose_name='图片',db_column='picture')
    content=models.TextField   ( null=False, unique=False, verbose_name='内容',db_column='content')
    thumbsupNumber=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='赞',db_column='thumbsup_number')
    crazilyNumber=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='踩',db_column='crazily_number')
    storeupNumber=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='收藏数',db_column='storeup_number')
    '''
    title=VARCHAR
    introduction=Text
    picture=Text
    content=Text
    thumbsupNumber=Integer
    crazilyNumber=Integer
    storeupNumber=Integer
    '''
    class Meta:
        db_table = 'news'
        verbose_name = verbose_name_plural = '公告资讯'
class forum(BaseModel):
    __doc__ = u'''forum'''
    __tablename__ = 'forum'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='是'#后台列表权限
    __thumbsUp__='是'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='是'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=False, verbose_name=u'创建时间')
    title=models.CharField ( max_length=255, null=True, unique=False, verbose_name='帖子标题',db_column='title')
    content=models.TextField   ( null=False, unique=False, verbose_name='帖子内容',db_column='content')
    parentid=models.BigIntegerField  (  null=True, unique=False, verbose_name='父节点id',db_column='parentid')
    userid=models.BigIntegerField  ( null=False, unique=False, verbose_name='用户id',db_column='userid')
    username=models.CharField ( max_length=255, null=True, unique=False, verbose_name='用户名',db_column='username')
    avatarurl=models.TextField   (  null=True, unique=False, verbose_name='头像',db_column='avatarurl')
    isdone=models.CharField ( max_length=255, null=True, unique=False, verbose_name='状态',db_column='isdone')
    isTop=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='是否置顶',db_column='is_top')
    topTime=models.DateTimeField  (  null=True, unique=False, verbose_name='置顶时间',db_column='top_time')
    typeName=models.CharField ( max_length=255, null=True, unique=False, verbose_name='分类名称',db_column='type_name')
    cover=models.TextField   (  null=True, unique=False, verbose_name='封面',db_column='cover')
    isAnonymous=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='是否匿名',db_column='is_anonymous')
    isDel=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='是否删除',db_column='is_del')
    thumbsupNumber=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='赞',db_column='thumbsup_number')
    crazilyNumber=models.IntegerField  (  null=True, unique=False,default='0', verbose_name='踩',db_column='crazily_number')
    '''
    title=VARCHAR
    content=Text
    parentid=BigInteger
    userid=BigInteger
    username=VARCHAR
    avatarurl=Text
    isdone=VARCHAR
    isTop=Integer
    topTime=DateTime
    typeName=VARCHAR
    cover=Text
    isAnonymous=Integer
    isDel=Integer
    thumbsupNumber=Integer
    crazilyNumber=Integer
    '''
    class Meta:
        db_table = 'forum'
        verbose_name = verbose_name_plural = '论坛交流'
class forum_type(BaseModel):
    __doc__ = u'''forum_type'''
    __tablename__ = 'forumType'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=False, verbose_name=u'创建时间')
    typeName=models.CharField ( max_length=255, null=True, unique=False, verbose_name='分类名称',db_column='type_name')
    '''
    typeName=VARCHAR
    '''
    class Meta:
        db_table = 'forum_type'
        verbose_name = verbose_name_plural = '论坛类型'
class forum_report(BaseModel):
    __doc__ = u'''forum_report'''
    __tablename__ = 'forumReport'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='是'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=False, verbose_name=u'创建时间')
    forumId=models.BigIntegerField  (  null=True, unique=False, verbose_name='论坛Id',db_column='forum_id')
    title=models.CharField ( max_length=255, null=True, unique=False, verbose_name='帖子标题',db_column='title')
    reportUserid=models.BigIntegerField  ( null=False, unique=False, verbose_name='举报人id',db_column='report_userid')
    reportUsername=models.CharField ( max_length=255, null=True, unique=False, verbose_name='举报人账号',db_column='report_username')
    reportedUserid=models.BigIntegerField  ( null=False, unique=False, verbose_name='被举报人id',db_column='reported_userid')
    reportedUsername=models.CharField ( max_length=255, null=True, unique=False, verbose_name='被举报人账号',db_column='reported_username')
    reason=models.TextField   ( null=False, unique=False, verbose_name='举报原因',db_column='reason')
    images=models.TextField   (  null=True, unique=False, verbose_name='举报图片',db_column='images')
    suggestion=models.TextField   ( null=False, unique=False, verbose_name='处理建议',db_column='suggestion')
    status=models.CharField ( max_length=255, null=True, unique=False,default='待处理', verbose_name='处理状态',db_column='status')
    reportType=models.CharField ( max_length=255, null=True, unique=False,default='主题帖举报', verbose_name='举报类型',db_column='report_type')
    userid=models.BigIntegerField  ( null=False, unique=False, verbose_name='用户id',db_column='userid')
    '''
    forumId=BigInteger
    title=VARCHAR
    reportUserid=BigInteger
    reportUsername=VARCHAR
    reportedUserid=BigInteger
    reportedUsername=VARCHAR
    reason=Text
    images=Text
    suggestion=Text
    status=VARCHAR
    reportType=VARCHAR
    userid=BigInteger
    '''
    class Meta:
        db_table = 'forum_report'
        verbose_name = verbose_name_plural = '论坛举报'
class syslog(BaseModel):
    __doc__ = u'''syslog'''
    __tablename__ = 'syslog'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=False, verbose_name=u'创建时间')
    username=models.CharField ( max_length=255,null=False, unique=False, verbose_name='用户名',db_column='username')
    operation=models.CharField ( max_length=255,null=False, unique=False, verbose_name='用户操作',db_column='operation')
    method=models.CharField ( max_length=255, null=True, unique=False, verbose_name='请求方法',db_column='method')
    params=models.TextField   (  null=True, unique=False, verbose_name='请求参数',db_column='params')
    time=models.BigIntegerField  (  null=True, unique=False, verbose_name='请求时长(毫秒)',db_column='time')
    ip=models.CharField ( max_length=255, null=True, unique=False, verbose_name='ip地址',db_column='ip')
    '''
    username=VARCHAR
    operation=VARCHAR
    method=VARCHAR
    params=Text
    time=BigInteger
    ip=VARCHAR
    '''
    class Meta:
        db_table = 'syslog'
        verbose_name = verbose_name_plural = '操作日志'
class sensitive_word(BaseModel):
    __doc__ = u'''sensitive_word'''
    __tablename__ = 'sensitiveWord'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=False, verbose_name=u'创建时间')
    content=models.CharField ( max_length=255, null=True, unique=False,default='艹,垃圾', verbose_name='内容',db_column='content')
    '''
    content=VARCHAR
    '''
    class Meta:
        db_table = 'sensitive_word'
        verbose_name = verbose_name_plural = '敏感词'
class cnhnbsg(BaseModel):
    __doc__ = u'''cnhnbsg'''
    __tablename__ = 'cnhnbsg'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=False, verbose_name=u'创建时间')
    title=models.CharField ( max_length=255, null=True, unique=False, verbose_name='标题',db_column='title')
    imgurl=models.TextField   (  null=True, unique=False, verbose_name='图片',db_column='imgurl')
    jiage=models.FloatField   (  null=True, unique=False, verbose_name='价格',db_column='jiage')
    qipi=models.CharField ( max_length=255, null=True, unique=False, verbose_name='起批量',db_column='qipi')
    turnover=models.CharField ( max_length=255, null=True, unique=False, verbose_name='成交',db_column='turnover')
    xunjia=models.IntegerField  (  null=True, unique=False, verbose_name='询价',db_column='xunjia')
    seller=models.CharField ( max_length=255, null=True, unique=False, verbose_name='卖家',db_column='seller')
    address=models.CharField ( max_length=255, null=True, unique=False, verbose_name='发货地址',db_column='address')
    pingjia=models.IntegerField  (  null=True, unique=False, verbose_name='评价',db_column='pingjia')
    leibie=models.CharField ( max_length=255, null=True, unique=False, verbose_name='类别',db_column='leibie')
    city=models.CharField ( max_length=255, null=True, unique=False, verbose_name='城市',db_column='city')
    tags=models.CharField ( max_length=255, null=True, unique=False, verbose_name='标签',db_column='tags')
    xqurl=models.TextField   (  null=True, unique=False, verbose_name='详情地址',db_column='xqurl')
    '''
    title=VARCHAR
    imgurl=Text
    jiage=Float
    qipi=VARCHAR
    turnover=VARCHAR
    xunjia=Integer
    seller=VARCHAR
    address=VARCHAR
    pingjia=Integer
    leibie=VARCHAR
    city=VARCHAR
    tags=VARCHAR
    xqurl=Text
    '''
    class Meta:
        db_table = 'cnhnbsg'
        verbose_name = verbose_name_plural = '农产品鹅肉'
class yonghu(BaseModel):
    __doc__ = u'''yonghu'''
    __tablename__ = 'yonghu'

    __loginUser__='zhanghao'


    __authTables__={}
    __authPeople__='是'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __loginUserColumn__='zhanghao'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=False, verbose_name=u'创建时间')
    zhanghao=models.CharField ( max_length=255,null=False,unique=True, verbose_name='账号',db_column='zhanghao')
    mima=models.CharField ( max_length=255,null=False, unique=False, verbose_name='密码',db_column='mima')
    xingming=models.CharField ( max_length=255,null=False, unique=False, verbose_name='姓名',db_column='xingming')
    xingbie=models.CharField ( max_length=255,null=False, unique=False, verbose_name='性别',db_column='xingbie')
    touxiang=models.TextField   ( null=False, unique=False, verbose_name='头像',db_column='touxiang')
    shouji=models.CharField ( max_length=255,null=False, unique=False, verbose_name='手机',db_column='shouji')
    '''
    zhanghao=VARCHAR
    mima=VARCHAR
    xingming=VARCHAR
    xingbie=VARCHAR
    touxiang=Text
    shouji=VARCHAR
    '''
    class Meta:
        db_table = 'yonghu'
        verbose_name = verbose_name_plural = '用户'
class storeup(BaseModel):
    __doc__ = u'''storeup'''
    __tablename__ = 'storeup'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='是'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=False, verbose_name=u'创建时间')
    refid=models.BigIntegerField  (  null=True, unique=False, verbose_name='refid',db_column='refid')
    tablename=models.CharField ( max_length=255, null=True, unique=False, verbose_name='表名',db_column='tablename')
    name=models.CharField ( max_length=255,null=False, unique=False, verbose_name='名称',db_column='name')
    picture=models.TextField   (  null=True, unique=False, verbose_name='图片',db_column='picture')
    type=models.CharField ( max_length=255, null=True, unique=False,default='1', verbose_name='类型(1:收藏,21:赞,22:踩,31:竞拍参与,41:关注)',db_column='type')
    inteltype=models.CharField ( max_length=255, null=True, unique=False, verbose_name='推荐类型',db_column='inteltype')
    remark=models.CharField ( max_length=255, null=True, unique=False, verbose_name='备注',db_column='remark')
    userid=models.BigIntegerField  ( null=False, unique=False, verbose_name='用户id',db_column='userid')
    '''
    refid=BigInteger
    tablename=VARCHAR
    name=VARCHAR
    picture=Text
    type=VARCHAR
    inteltype=VARCHAR
    remark=VARCHAR
    userid=BigInteger
    '''
    class Meta:
        db_table = 'storeup'
        verbose_name = verbose_name_plural = '我的收藏'
class cnhnbsgforecast(BaseModel):
    __doc__ = u'''cnhnbsgforecast'''
    __tablename__ = 'cnhnbsgforecast'



    __authTables__={}
    __authPeople__='否'#用户表，表属性loginUserColumn对应的值就是用户名字段，mima就是密码字段
    __sfsh__='否'#表sfsh(是否审核，”是”或”否”)字段和sfhf(审核回复)字段，后台列表(page)的操作中要多一个”审核”按钮，点击”审核”弹出一个页面，包含”是否审核”和”审核回复”，点击确定调用update接口，修改sfsh和sfhf两个字段。
    __authSeparate__='否'#后台列表权限
    __thumbsUp__='否'#表属性thumbsUp[是/否]，新增thumbsupnum赞和crazilynum踩字段
    __intelRecom__='否'#智能推荐功能(表属性：[intelRecom（是/否）],新增clicktime[前端不显示该字段]字段（调用info/detail接口的时候更新），按clicktime排序查询)
    __browseClick__='否'#表属性[browseClick:是/否]，点击字段（clicknum），调用info/detail接口的时候后端自动+1）、投票功能（表属性[vote:是/否]，投票字段（votenum）,调用vote接口后端votenum+1
    __foreEndListAuth__='否'#前台列表权限foreEndListAuth[是/否]；当foreEndListAuth=是，刷的表新增用户字段userid，前台list列表接口仅能查看自己的记录和add接口后台赋值userid的值
    __foreEndList__='否'#表属性[foreEndList]前台list:和后台默认的list列表页相似,只是摆在前台,否:指没有此页,是:表示有此页(不需要登陆即可查看),前要登:表示有此页且需要登陆后才能查看
    __isAdmin__='否' #表属性isAdmin=”是”,刷出来的用户表也是管理员，即page和list可以查看所有人的考试记录(同时应用于其他表)
    addtime = models.DateTimeField(auto_now_add=False, verbose_name=u'创建时间')
    title=models.CharField ( max_length=255, null=True, unique=False, verbose_name='标题',db_column='title')
    leibie=models.CharField ( max_length=255, null=True, unique=False, verbose_name='类别',db_column='leibie')
    turnover=models.CharField ( max_length=255, null=True, unique=False, verbose_name='成交',db_column='turnover')
    jiage=models.FloatField   (  null=True, unique=False, verbose_name='价格',db_column='jiage')
    '''
    title=VARCHAR
    leibie=VARCHAR
    turnover=VARCHAR
    jiage=Float
    '''
    class Meta:
        db_table = 'cnhnbsgforecast'
        verbose_name = verbose_name_plural = '鹅肉价格预测'
