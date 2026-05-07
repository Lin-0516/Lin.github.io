# 数据容器文件

import scrapy

class SpiderItem(scrapy.Item):
    pass

class CnhnbsgItem(scrapy.Item):
    # 标题
    title = scrapy.Field()
    # 图片
    imgurl = scrapy.Field()
    # 价格
    jiage = scrapy.Field()
    # 起批量
    qipi = scrapy.Field()
    # 成交
    turnover = scrapy.Field()
    # 询价
    xunjia = scrapy.Field()
    # 卖家
    seller = scrapy.Field()
    # 发货地址
    address = scrapy.Field()
    # 评价
    pingjia = scrapy.Field()
    # 类别
    leibie = scrapy.Field()
    # 城市
    city = scrapy.Field()
    # 标签
    tags = scrapy.Field()
    # 详情地址
    xqurl = scrapy.Field()

