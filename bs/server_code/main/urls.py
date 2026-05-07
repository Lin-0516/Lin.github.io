# coding:utf-8
__author__ = "ila"

import os
from django.urls import path
from main import schema_v
from dj2 import views
from main import hadoop_v
# from dj2.settings import dbName as schemaName

# url规则列表
urlpatterns = [
]
# main app的路径
mainDir = os.path.join(os.getcwd(), "main")

# 过滤文件的列表
excludeList = [
    "schema_v.py",
    "hadoop_v.py",
]

# 循环当前目录下的py文件

view_tuple = set()
for i in os.listdir(mainDir):
    if i not in excludeList and i[-5:] == "_v.py":
        viewName = i[:-3]  # 去掉.py后缀字符串
        view_tuple.add("from main import {}".format(viewName))

# 组合成import字符串
import_str = '\n'.join(view_tuple)
# print(import_str)
exec(import_str)

urlpatterns.extend(
    [
        path(r'config/default',eval("Config_v.config_default")),
        path(r'config/page',eval("Config_v.config_page")),
        path(r'config/autoSort',eval("Config_v.config_autoSort")),
        path(r'config/autoSort2',eval("Config_v.config_autoSort2")),
        path(r'config/save',eval("Config_v.config_save")),
        path(r'config/add',eval("Config_v.config_add")),
        path(r'config/default',eval("Config_v.config_default")),
        path(r'config/update',eval("Config_v.config_update")),
        path(r'config/delete',eval("Config_v.config_delete")),
        path(r'config/importExcel',eval("Config_v.config_importExcel")),
        path(r'config/sendemail',eval("Config_v.config_sendemail")),
        path(r'config/thumbsup/<id_>',eval("Config_v.config_thumbsup")),
        path(r'config/info/<id_>',eval("Config_v.config_info")),
        path(r'config/detail/<id_>',eval("Config_v.config_detail")),
        path(r'config/vote/<id_>',eval("Config_v.config_vote")),

        path(r'config/lists',eval("Config_v.config_lists")),
        path(r'config/query',eval("Config_v.config_query")),

        path(r'config/list',eval("Config_v.config_list")),

        path(r'menu/default',eval("Menu_v.menu_default")),
        path(r'menu/page',eval("Menu_v.menu_page")),
        path(r'menu/autoSort',eval("Menu_v.menu_autoSort")),
        path(r'menu/autoSort2',eval("Menu_v.menu_autoSort2")),
        path(r'menu/save',eval("Menu_v.menu_save")),
        path(r'menu/add',eval("Menu_v.menu_add")),
        path(r'menu/default',eval("Menu_v.menu_default")),
        path(r'menu/update',eval("Menu_v.menu_update")),
        path(r'menu/delete',eval("Menu_v.menu_delete")),
        path(r'menu/importExcel',eval("Menu_v.menu_importExcel")),
        path(r'menu/sendemail',eval("Menu_v.menu_sendemail")),
        path(r'menu/thumbsup/<id_>',eval("Menu_v.menu_thumbsup")),
        path(r'menu/info/<id_>',eval("Menu_v.menu_info")),
        path(r'menu/detail/<id_>',eval("Menu_v.menu_detail")),
        path(r'menu/vote/<id_>',eval("Menu_v.menu_vote")),

        path(r'menu/lists',eval("Menu_v.menu_lists")),
        path(r'menu/query',eval("Menu_v.menu_query")),

        path(r'menu/list',eval("Menu_v.menu_list")),

        path(r'users/register',eval("Users_v.users_register")),
        path(r'users/login',eval("Users_v.users_login")),
        path(r'users/resetPass',eval("Users_v.users_resetPass")),
        path(r'users/session',eval("Users_v.users_session")),
        path(r'users/default',eval("Users_v.users_default")),
        path(r'users/page',eval("Users_v.users_page")),
        path(r'users/autoSort',eval("Users_v.users_autoSort")),
        path(r'users/autoSort2',eval("Users_v.users_autoSort2")),
        path(r'users/save',eval("Users_v.users_save")),
        path(r'users/add',eval("Users_v.users_add")),
        path(r'users/default',eval("Users_v.users_default")),
        path(r'users/update',eval("Users_v.users_update")),
        path(r'users/delete',eval("Users_v.users_delete")),
        path(r'users/importExcel',eval("Users_v.users_importExcel")),
        path(r'users/sendemail',eval("Users_v.users_sendemail")),
        path(r'users/thumbsup/<id_>',eval("Users_v.users_thumbsup")),
        path(r'users/info/<id_>',eval("Users_v.users_info")),
        path(r'users/detail/<id_>',eval("Users_v.users_detail")),
        path(r'users/vote/<id_>',eval("Users_v.users_vote")),

        path(r'users/lists',eval("Users_v.users_lists")),
        path(r'users/query',eval("Users_v.users_query")),

        path(r'users/list',eval("Users_v.users_list")),

        path(r'news/default',eval("News_v.news_default")),
        path(r'news/page',eval("News_v.news_page")),
        path(r'news/autoSort',eval("News_v.news_autoSort")),
        path(r'news/autoSort2',eval("News_v.news_autoSort2")),
        path(r'news/save',eval("News_v.news_save")),
        path(r'news/add',eval("News_v.news_add")),
        path(r'news/default',eval("News_v.news_default")),
        path(r'news/update',eval("News_v.news_update")),
        path(r'news/delete',eval("News_v.news_delete")),
        path(r'news/importExcel',eval("News_v.news_importExcel")),
        path(r'news/sendemail',eval("News_v.news_sendemail")),
        path(r'news/thumbsup/<id_>',eval("News_v.news_thumbsup")),
        path(r'news/info/<id_>',eval("News_v.news_info")),
        path(r'news/detail/<id_>',eval("News_v.news_detail")),
        path(r'news/vote/<id_>',eval("News_v.news_vote")),

        path(r'news/lists',eval("News_v.news_lists")),
        path(r'news/query',eval("News_v.news_query")),

        path(r'news/list',eval("News_v.news_list")),

        path(r'forum/default',eval("Forum_v.forum_default")),
        path(r'forum/page',eval("Forum_v.forum_page")),
        path(r'forum/autoSort',eval("Forum_v.forum_autoSort")),
        path(r'forum/autoSort2',eval("Forum_v.forum_autoSort2")),
        path(r'forum/save',eval("Forum_v.forum_save")),
        path(r'forum/add',eval("Forum_v.forum_add")),
        path(r'forum/default',eval("Forum_v.forum_default")),
        path(r'forum/update',eval("Forum_v.forum_update")),
        path(r'forum/delete',eval("Forum_v.forum_delete")),
        path(r'forum/importExcel',eval("Forum_v.forum_importExcel")),
        path(r'forum/sendemail',eval("Forum_v.forum_sendemail")),
        path(r'forum/thumbsup/<id_>',eval("Forum_v.forum_thumbsup")),
        path(r'forum/info/<id_>',eval("Forum_v.forum_info")),
        path(r'forum/detail/<id_>',eval("Forum_v.forum_detail")),
        path(r'forum/vote/<id_>',eval("Forum_v.forum_vote")),

        path(r'forum/lists',eval("Forum_v.forum_lists")),
        path(r'forum/query',eval("Forum_v.forum_query")),

        path(r'forum/flist',eval("Forum_v.forum_flist")),
        path(r'forum/list/<id_>',eval("Forum_v.forum_list_id")),
        path(r'forum/list',eval("Forum_v.forum_list")),
        path(r'forumtype/default',eval("ForumType_v.forum_type_default")),
        path(r'forumtype/page',eval("ForumType_v.forum_type_page")),
        path(r'forumtype/autoSort',eval("ForumType_v.forum_type_autoSort")),
        path(r'forumtype/autoSort2',eval("ForumType_v.forum_type_autoSort2")),
        path(r'forumtype/save',eval("ForumType_v.forum_type_save")),
        path(r'forumtype/add',eval("ForumType_v.forum_type_add")),
        path(r'forumtype/default',eval("ForumType_v.forum_type_default")),
        path(r'forumtype/update',eval("ForumType_v.forum_type_update")),
        path(r'forumtype/delete',eval("ForumType_v.forum_type_delete")),
        path(r'forumtype/importExcel',eval("ForumType_v.forum_type_importExcel")),
        path(r'forumtype/sendemail',eval("ForumType_v.forum_type_sendemail")),
        path(r'forumtype/thumbsup/<id_>',eval("ForumType_v.forum_type_thumbsup")),
        path(r'forumtype/info/<id_>',eval("ForumType_v.forum_type_info")),
        path(r'forumtype/detail/<id_>',eval("ForumType_v.forum_type_detail")),
        path(r'forumtype/vote/<id_>',eval("ForumType_v.forum_type_vote")),

        path(r'forumtype/lists',eval("ForumType_v.forum_type_lists")),
        path(r'forumtype/query',eval("ForumType_v.forum_type_query")),

        path(r'forumtype/list',eval("ForumType_v.forum_type_list")),

        path(r'forumreport/default',eval("ForumReport_v.forum_report_default")),
        path(r'forumreport/page',eval("ForumReport_v.forum_report_page")),
        path(r'forumreport/autoSort',eval("ForumReport_v.forum_report_autoSort")),
        path(r'forumreport/autoSort2',eval("ForumReport_v.forum_report_autoSort2")),
        path(r'forumreport/save',eval("ForumReport_v.forum_report_save")),
        path(r'forumreport/add',eval("ForumReport_v.forum_report_add")),
        path(r'forumreport/default',eval("ForumReport_v.forum_report_default")),
        path(r'forumreport/update',eval("ForumReport_v.forum_report_update")),
        path(r'forumreport/delete',eval("ForumReport_v.forum_report_delete")),
        path(r'forumreport/importExcel',eval("ForumReport_v.forum_report_importExcel")),
        path(r'forumreport/sendemail',eval("ForumReport_v.forum_report_sendemail")),
        path(r'forumreport/thumbsup/<id_>',eval("ForumReport_v.forum_report_thumbsup")),
        path(r'forumreport/info/<id_>',eval("ForumReport_v.forum_report_info")),
        path(r'forumreport/detail/<id_>',eval("ForumReport_v.forum_report_detail")),
        path(r'forumreport/vote/<id_>',eval("ForumReport_v.forum_report_vote")),

        path(r'forumreport/lists',eval("ForumReport_v.forum_report_lists")),
        path(r'forumreport/query',eval("ForumReport_v.forum_report_query")),

        path(r'forumreport/list',eval("ForumReport_v.forum_report_list")),

        path(r'syslog/default',eval("Syslog_v.syslog_default")),
        path(r'syslog/page',eval("Syslog_v.syslog_page")),
        path(r'syslog/autoSort',eval("Syslog_v.syslog_autoSort")),
        path(r'syslog/autoSort2',eval("Syslog_v.syslog_autoSort2")),
        path(r'syslog/save',eval("Syslog_v.syslog_save")),
        path(r'syslog/add',eval("Syslog_v.syslog_add")),
        path(r'syslog/default',eval("Syslog_v.syslog_default")),
        path(r'syslog/update',eval("Syslog_v.syslog_update")),
        path(r'syslog/delete',eval("Syslog_v.syslog_delete")),
        path(r'syslog/importExcel',eval("Syslog_v.syslog_importExcel")),
        path(r'syslog/sendemail',eval("Syslog_v.syslog_sendemail")),
        path(r'syslog/thumbsup/<id_>',eval("Syslog_v.syslog_thumbsup")),
        path(r'syslog/info/<id_>',eval("Syslog_v.syslog_info")),
        path(r'syslog/detail/<id_>',eval("Syslog_v.syslog_detail")),
        path(r'syslog/vote/<id_>',eval("Syslog_v.syslog_vote")),

        path(r'syslog/lists',eval("Syslog_v.syslog_lists")),
        path(r'syslog/query',eval("Syslog_v.syslog_query")),

        path(r'syslog/list',eval("Syslog_v.syslog_list")),

        path(r'sensitiveword/default',eval("SensitiveWord_v.sensitive_word_default")),
        path(r'sensitiveword/page',eval("SensitiveWord_v.sensitive_word_page")),
        path(r'sensitiveword/autoSort',eval("SensitiveWord_v.sensitive_word_autoSort")),
        path(r'sensitiveword/autoSort2',eval("SensitiveWord_v.sensitive_word_autoSort2")),
        path(r'sensitiveword/save',eval("SensitiveWord_v.sensitive_word_save")),
        path(r'sensitiveword/add',eval("SensitiveWord_v.sensitive_word_add")),
        path(r'sensitiveword/default',eval("SensitiveWord_v.sensitive_word_default")),
        path(r'sensitiveword/update',eval("SensitiveWord_v.sensitive_word_update")),
        path(r'sensitiveword/delete',eval("SensitiveWord_v.sensitive_word_delete")),
        path(r'sensitiveword/importExcel',eval("SensitiveWord_v.sensitive_word_importExcel")),
        path(r'sensitiveword/sendemail',eval("SensitiveWord_v.sensitive_word_sendemail")),
        path(r'sensitiveword/thumbsup/<id_>',eval("SensitiveWord_v.sensitive_word_thumbsup")),
        path(r'sensitiveword/info/<id_>',eval("SensitiveWord_v.sensitive_word_info")),
        path(r'sensitiveword/detail/<id_>',eval("SensitiveWord_v.sensitive_word_detail")),
        path(r'sensitiveword/vote/<id_>',eval("SensitiveWord_v.sensitive_word_vote")),

        path(r'sensitiveword/lists',eval("SensitiveWord_v.sensitive_word_lists")),
        path(r'sensitiveword/query',eval("SensitiveWord_v.sensitive_word_query")),

        path(r'sensitiveword/list',eval("SensitiveWord_v.sensitive_word_list")),

        path(r'cnhnbsg/cleanse', eval("Cnhnbsg_v.cnhnbsg_cleanse")),
        path(r'cnhnbsg/value/<xColumnName>/<yColumnName>/<timeStatType>',
             eval("Cnhnbsg_v.cnhnbsg_value")),
        path(r'cnhnbsg/value/<xColumnName>/<yColumnName>',
             eval("Cnhnbsg_v.cnhnbsg_o_value")),
        path(r'cnhnbsg/group/<columnName>', eval("Cnhnbsg_v.cnhnbsg_group")),
        path(r'cnhnbsg/valueMul/<xColumnName>/<timeStatType>',
             eval("Cnhnbsg_v.cnhnbsg_valueMul")),
        path(r'cnhnbsg/valueMul/<xColumnName>', eval("Cnhnbsg_v.cnhnbsg_o_valueMul")),
        path(r'cnhnbsg/default',eval("Cnhnbsg_v.cnhnbsg_default")),
        path(r'cnhnbsg/page',eval("Cnhnbsg_v.cnhnbsg_page")),
        path(r'cnhnbsg/autoSort',eval("Cnhnbsg_v.cnhnbsg_autoSort")),
        path(r'cnhnbsg/autoSort2',eval("Cnhnbsg_v.cnhnbsg_autoSort2")),
        path(r'cnhnbsg/save',eval("Cnhnbsg_v.cnhnbsg_save")),
        path(r'cnhnbsg/add',eval("Cnhnbsg_v.cnhnbsg_add")),
        path(r'cnhnbsg/default',eval("Cnhnbsg_v.cnhnbsg_default")),
        path(r'cnhnbsg/update',eval("Cnhnbsg_v.cnhnbsg_update")),
        path(r'cnhnbsg/delete',eval("Cnhnbsg_v.cnhnbsg_delete")),
        path(r'cnhnbsg/importExcel',eval("Cnhnbsg_v.cnhnbsg_importExcel")),
        path(r'cnhnbsg/sendemail',eval("Cnhnbsg_v.cnhnbsg_sendemail")),
        path(r'cnhnbsg/thumbsup/<id_>',eval("Cnhnbsg_v.cnhnbsg_thumbsup")),
        path(r'cnhnbsg/info/<id_>',eval("Cnhnbsg_v.cnhnbsg_info")),
        path(r'cnhnbsg/detail/<id_>',eval("Cnhnbsg_v.cnhnbsg_detail")),
        path(r'cnhnbsg/vote/<id_>',eval("Cnhnbsg_v.cnhnbsg_vote")),

        path(r'cnhnbsg/lists',eval("Cnhnbsg_v.cnhnbsg_lists")),
        path(r'cnhnbsg/query',eval("Cnhnbsg_v.cnhnbsg_query")),
        path(r'cnhnbsg/count',eval("Cnhnbsg_v.cnhnbsg_count")),

        path(r'cnhnbsg/list',eval("Cnhnbsg_v.cnhnbsg_list")),

        path(r'yonghu/register',eval("Yonghu_v.yonghu_register")),
        path(r'yonghu/login',eval("Yonghu_v.yonghu_login")),
        path(r'yonghu/resetPass',eval("Yonghu_v.yonghu_resetPass")),
        path(r'yonghu/session',eval("Yonghu_v.yonghu_session")),
        path(r'yonghu/default',eval("Yonghu_v.yonghu_default")),
        path(r'yonghu/page',eval("Yonghu_v.yonghu_page")),
        path(r'yonghu/autoSort',eval("Yonghu_v.yonghu_autoSort")),
        path(r'yonghu/autoSort2',eval("Yonghu_v.yonghu_autoSort2")),
        path(r'yonghu/save',eval("Yonghu_v.yonghu_save")),
        path(r'yonghu/add',eval("Yonghu_v.yonghu_add")),
        path(r'yonghu/default',eval("Yonghu_v.yonghu_default")),
        path(r'yonghu/update',eval("Yonghu_v.yonghu_update")),
        path(r'yonghu/delete',eval("Yonghu_v.yonghu_delete")),
        path(r'yonghu/importExcel',eval("Yonghu_v.yonghu_importExcel")),
        path(r'yonghu/sendemail',eval("Yonghu_v.yonghu_sendemail")),
        path(r'yonghu/thumbsup/<id_>',eval("Yonghu_v.yonghu_thumbsup")),
        path(r'yonghu/info/<id_>',eval("Yonghu_v.yonghu_info")),
        path(r'yonghu/detail/<id_>',eval("Yonghu_v.yonghu_detail")),
        path(r'yonghu/vote/<id_>',eval("Yonghu_v.yonghu_vote")),

        path(r'yonghu/lists',eval("Yonghu_v.yonghu_lists")),
        path(r'yonghu/query',eval("Yonghu_v.yonghu_query")),

        path(r'yonghu/list',eval("Yonghu_v.yonghu_list")),

        path(r'storeup/default',eval("Storeup_v.storeup_default")),
        path(r'storeup/page',eval("Storeup_v.storeup_page")),
        path(r'storeup/autoSort',eval("Storeup_v.storeup_autoSort")),
        path(r'storeup/autoSort2',eval("Storeup_v.storeup_autoSort2")),
        path(r'storeup/save',eval("Storeup_v.storeup_save")),
        path(r'storeup/add',eval("Storeup_v.storeup_add")),
        path(r'storeup/default',eval("Storeup_v.storeup_default")),
        path(r'storeup/update',eval("Storeup_v.storeup_update")),
        path(r'storeup/delete',eval("Storeup_v.storeup_delete")),
        path(r'storeup/importExcel',eval("Storeup_v.storeup_importExcel")),
        path(r'storeup/sendemail',eval("Storeup_v.storeup_sendemail")),
        path(r'storeup/thumbsup/<id_>',eval("Storeup_v.storeup_thumbsup")),
        path(r'storeup/info/<id_>',eval("Storeup_v.storeup_info")),
        path(r'storeup/detail/<id_>',eval("Storeup_v.storeup_detail")),
        path(r'storeup/vote/<id_>',eval("Storeup_v.storeup_vote")),

        path(r'storeup/lists',eval("Storeup_v.storeup_lists")),
        path(r'storeup/query',eval("Storeup_v.storeup_query")),

        path(r'storeup/list',eval("Storeup_v.storeup_list")),

        path(r'cnhnbsgforecast/forecastimgs',eval("Cnhnbsgforecast_v.cnhnbsgforecast_forecastimgs")),
        path(r'cnhnbsgforecast/forecast',eval("Cnhnbsgforecast_v.cnhnbsgforecast_forecast")),
        path(r'cnhnbsgforecast/default',eval("Cnhnbsgforecast_v.cnhnbsgforecast_default")),
        path(r'cnhnbsgforecast/page',eval("Cnhnbsgforecast_v.cnhnbsgforecast_page")),
        path(r'cnhnbsgforecast/autoSort',eval("Cnhnbsgforecast_v.cnhnbsgforecast_autoSort")),
        path(r'cnhnbsgforecast/autoSort2',eval("Cnhnbsgforecast_v.cnhnbsgforecast_autoSort2")),
        path(r'cnhnbsgforecast/save',eval("Cnhnbsgforecast_v.cnhnbsgforecast_save")),
        path(r'cnhnbsgforecast/add',eval("Cnhnbsgforecast_v.cnhnbsgforecast_add")),
        path(r'cnhnbsgforecast/default',eval("Cnhnbsgforecast_v.cnhnbsgforecast_default")),
        path(r'cnhnbsgforecast/update',eval("Cnhnbsgforecast_v.cnhnbsgforecast_update")),
        path(r'cnhnbsgforecast/delete',eval("Cnhnbsgforecast_v.cnhnbsgforecast_delete")),
        path(r'cnhnbsgforecast/importExcel',eval("Cnhnbsgforecast_v.cnhnbsgforecast_importExcel")),
        path(r'cnhnbsgforecast/sendemail',eval("Cnhnbsgforecast_v.cnhnbsgforecast_sendemail")),
        path(r'cnhnbsgforecast/thumbsup/<id_>',eval("Cnhnbsgforecast_v.cnhnbsgforecast_thumbsup")),
        path(r'cnhnbsgforecast/info/<id_>',eval("Cnhnbsgforecast_v.cnhnbsgforecast_info")),
        path(r'cnhnbsgforecast/detail/<id_>',eval("Cnhnbsgforecast_v.cnhnbsgforecast_detail")),
        path(r'cnhnbsgforecast/vote/<id_>',eval("Cnhnbsgforecast_v.cnhnbsgforecast_vote")),

        path(r'cnhnbsgforecast/lists',eval("Cnhnbsgforecast_v.cnhnbsgforecast_lists")),
        path(r'cnhnbsgforecast/query',eval("Cnhnbsgforecast_v.cnhnbsgforecast_query")),

        path(r'cnhnbsgforecast/list',eval("Cnhnbsgforecast_v.cnhnbsgforecast_list")),

])

urlpatterns.extend(
    [
        path(r'hadoop/analyze', hadoop_v.hadoop_analyze),
        path(r'encrypt/md5', schema_v.schemaName_encrypt),
        path(r'cal/<str:tableName>/<str:columnName>', schema_v.schemaName_cal),
        path(r'file/download', schema_v.schemaName_file_download),
        path(r'file/upload', schema_v.schemaName_file_upload),
        path(r'file/encrypt', schema_v.schemaName_file_encrypt),
        path(r'file/decrypt', schema_v.schemaName_file_decrypt),
        path(r'file/<fileName>', schema_v.schemaName_upload),
        path(r'file/<tableName>/<fileName>', schema_v.schemaName_upload_forecast),
        path(r'follow/<tableName>/<columnName>/<level>/<parent>', schema_v.schemaName_follow_level),
        path(r'follow/<tableName>/<columnName>', schema_v.schemaName_follow),
        path(r'location', schema_v.schemaName_location),
        path(r'matchFace', schema_v.schemaName_matchface),
        path(r'option/<tableName>/<columnName>', schema_v.schemaName_option),
        path(r'remind/<tableName>/<columnName>/<type>', schema_v.schemaName_remind_tablename_columnname_type),
        # 前台提醒接口（通用接口，不需要登陆）
        path(r'<tableName>/remind/<columnName>/<type>', schema_v.schemaName_tablename_remind_columnname_type),
        # 后台提醒接口 (每个表的单独接口，需登录)
        path(r'sh/<tableName>', schema_v.schemaName_sh),
        path(r'group/<tableName>/<columnName>', schema_v.schemaName_group_quyu),
        path(r'value/<tableName>/<xColumnName>/<yColumnName>', schema_v.schemaName_value_quyu),
        path(r'value/<tableName>/<xColumnName>/<yColumnName>/<timeStatType>', schema_v.schemaName_value_riqitj),
        path(r'spider/<tableName>', schema_v.schemaName_spider),
        path(r'mysqldump', schema_v.schemaName_mysqldump),
    ]
)

