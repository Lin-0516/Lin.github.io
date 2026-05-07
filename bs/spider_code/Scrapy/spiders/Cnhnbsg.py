# # -*- coding: utf-8 -*-
# 数据爬取文件
import scrapy
import pymysql
import pymssql
from ..items import CnhnbsgItem
import time
from datetime import datetime,timedelta
import datetime as formattime
import re
import random
import platform
import json
import os
import urllib
from urllib.parse import urlparse
import requests
import emoji
import numpy as np
import logging
logger = logging.getLogger(__name__)
from DrissionPage import Chromium
from sqlalchemy import create_engine
from scrapy.http import TextResponse

# 农产品鹅肉爬取 
class Cnhnbsg(scrapy.Spider):
    name = 'cnhnbsg'
    custom_settings = {
        'HTTPERROR_ALLOWED_CODES': [400,403],
        'RETRY_HTTP_CODES': [500, 503]
    }
    spiderUrl = 'https://www.cnhnb.com/p/sczw-0-323-0-0-1/'
    start_urls = spiderUrl.split(";")
    protocol = ''
    hostname = ''
    realtime = False

    def __init__(self,realtime=False,*args, **kwargs):
        super().__init__(*args, **kwargs)
        if realtime == "False":
            self.realtime = False
        elif realtime == "True":
            self.realtime = True
        else:
            self.realtime = realtime

    def start_requests(self):
        plat = platform.system().lower()
        if not self.realtime and (plat == 'linux' or plat == 'windows'):
            connect = self.db_connect()
            cursor = connect.cursor()
            if self.table_exists(cursor, 's8118182_cnhnbsg') == 1:
                cursor.close()
                connect.close()
                self.temp_data()
                return
        #分析爬取链接
        pageNum = 1 + 1
        for url in self.start_urls:
            if '{}' in url:
                for page in range(1, pageNum):
                    next_link = url.format(page)
                    time.sleep(1)
                    yield scrapy.Request(
                        url=next_link,
                        callback=self.list_parse
                )
            else:
                yield scrapy.Request(
                    url=url,
                    callback=self.list_parse
                )

#列表界面网页的解析
    def list_parse(self, response):
        _url = urlparse(self.spiderUrl)
        self.protocol = _url.scheme
        self.hostname = _url.netloc
        plat = platform.system().lower()
        if not self.realtime and (plat == 'linux' or plat == 'windows'):
            connect = self.db_connect()
            cursor = connect.cursor()
            if self.table_exists(cursor, 's8118182_cnhnbsg') == 1:
                cursor.close()
                connect.close()
                self.temp_data()
                return
        list = response.css('div.supply-item')
        for item in list:
            fields = CnhnbsgItem()
            try:
                fields["title"] = str( self.remove_html(item.css('''div.title h2::text''').extract_first()))

            except:
                pass
            try:
                fields["imgurl"] = str( self.remove_html(item.css('''div.shop-image img::attr(src)''').extract_first()))

            except:
                pass
            try:
                fields["jiage"] = float( self.remove_html(item.css('div.shops-price span::text').extract_first()))

            except:
                pass
            try:
                fields["seller"] = str( self.remove_html(item.css('''a.l-shop-btm::text''').extract_first()))

            except:
                pass
            try:
                fields["leibie"] = str( self.remove_html(item.xpath('''//div[@class="active-col"]/a/text()''').extract()[0].strip()))


            except:
                pass
            try:
                fields["city"] = str( self.remove_html(item.css('''div.r-shop-btm::text''').extract_first()))

            except:
                pass
            try:
                fields["tags"] = str( self.remove_html(item.css('''div.cw-tag.icon-item-005::text''').extract_first()))

            except:
                pass
            try:
                fields["xqurl"] = str("https://www.cnhnb.com" + self.remove_html(item.css('''a.com-bg::attr(href)''').extract_first()))

            except:
                pass
            detailUrlRule ="https://www.cnhnb.com" + self.remove_html(item.css('''a.com-bg::attr(href)''').extract_first())
            yield scrapy.Request(
                url=detailUrlRule,
                meta={'fields': fields},
                callback=self.detail_parse
            )

#详情界面网页的解析
    def detail_parse(self, response):
        fields = response.meta['fields']
        try:
            fields["qipi"] = str( self.remove_html(response.xpath('''//div[@class="flex-c batch-item"]/div[@class="line-val"]/text()''').extract()[0].strip()))

        except:
            pass
        try:
            fields["turnover"] = str( self.remove_html(response.xpath('''//div[contains(@class, 'batch-num')]//div[contains(text(), '成交')]/span[@class='s1']/text()''').extract()[0].strip()))

        except:
            pass
        try:
            fields["xunjia"] = int( self.remove_html(response.xpath('''//div[contains(@class, 'batch-num')]//div[contains(text(), '询价')]/span[@class='s1']/text()''').extract()[0].strip()))

        except:
            pass
        try:
            fields["address"] = str( self.remove_html(response.xpath('''//div[@class="line-t1" and text()="发货地址"]/following-sibling::div[@class="line-val"]/text()''').extract()[0].strip()))

        except:
            pass
        try:
            fields["pingjia"] = int( self.remove_html(response.xpath('''//div[contains(@class, 'batch-num')]//div[contains(text(), '评价')]/span[@class='s1']/text()''').extract()[0].strip()))

        except:
            pass
        return fields

#清除html标签
    def remove_html(self, html):
        if html == None:
            return ''
        pattern = re.compile(r'<[^>]+>', re.S)
        return pattern.sub('', html).strip()

#连接数据库
    def db_connect(self):
        type = self.settings.get('TYPE', 'mysql')
        host = self.settings.get('HOST', 'localhost')
        port = int(self.settings.get('PORT', 3306))
        user = self.settings.get('USER', 'root')
        password = self.settings.get('PASSWORD', '123456')

        try:
            database = self.databaseName
        except:
            database = self.settings.get('DATABASE', '')

        if type == 'mysql':
            connect = pymysql.connect(host=host, port=port, db=database, user=user, passwd=password, charset='utf8mb4')
        else:
            connect = pymssql.connect(host=host, user=user, password=password, database=database)
        return connect

#判断表
    def table_exists(self, cursor, table_name):
        cursor.execute("show tables;")
        tables = [cursor.fetchall()]
        table_list = re.findall('(\'.*?\')',str(tables))
        table_list = [re.sub("'",'',each) for each in table_list]

        if table_name in table_list:
            return 1
        else:
            return 0

#数据缓存源
    def temp_data(self):
        connect = self.db_connect()
        cursor = connect.cursor()
        sql = '''
            insert into `cnhnbsg`(
                id
                ,title
                ,imgurl
                ,jiage
                ,qipi
                ,turnover
                ,xunjia
                ,seller
                ,address
                ,pingjia
                ,leibie
                ,city
                ,tags
                ,xqurl
            )
            select
                id
                ,title
                ,imgurl
                ,jiage
                ,qipi
                ,turnover
                ,xunjia
                ,seller
                ,address
                ,pingjia
                ,leibie
                ,city
                ,tags
                ,xqurl
            from `s8118182_cnhnbsg`
            where(not exists (select
                id
                ,title
                ,imgurl
                ,jiage
                ,qipi
                ,turnover
                ,xunjia
                ,seller
                ,address
                ,pingjia
                ,leibie
                ,city
                ,tags
                ,xqurl
            from `cnhnbsg` where
                `cnhnbsg`.id=`s8118182_cnhnbsg`.id
            ))
            order by rand()
            limit 50;
        '''
        cursor.execute(sql)
        connect.commit()
        connect.close()
