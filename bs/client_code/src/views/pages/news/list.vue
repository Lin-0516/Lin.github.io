<template>
    <div class="news-page">
        <div class="breadcrumb-wrapper" style="width: 100%;">
            <div class="bread_view">
                <el-breadcrumb separator="Ξ" class="breadcrumb">
                    <el-breadcrumb-item class="first_breadcrumb" :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item class="second_breadcrumb" v-for="(item,index) in breadList" :key="index">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>

        <div class="list_search">
			<div class="search_view">
				<div class="search_label">
					标题：
				</div>
				<div class="search_box">
					<el-input class="search_inp" v-model="searchQuery.title" placeholder="标题" clearable></el-input>
				</div>
			</div>
			<div class="search_btn_view">
				<el-button class="search_btn" type="primary" @click="searchClick">搜索</el-button>
			</div>
		</div>


<div class="list">
    <template v-for="(item,index) in list">
        <div class="left" v-if="index==0" @click="newsDetail(item.id)">
            <el-carousel indicator-position="none">
              <el-carousel-item v-for="url in item.imgUrls" :key="item">
                <img :src="url" alt="">
              </el-carousel-item>
            </el-carousel>
            <div class="content">
                <div class="title text-one-row">{{item.title}}</div>
                <div class="intro text-two-row">{{item.introduction}}</div>
                <div class="time">{{moment(item.addtime).format('YYYY-MM-DD HH:mm:ss')}}</div>
            </div>
        </div>
    </template>
    <div class="right">
        <template v-for="(item,index) in list">
            <div class="item" v-if="index>0 && index<=4" @click="newsDetail(item.id)">
                <img :src="item.imgUrls[0]" alt="">
                <div class="content">
                    <div class="title text-one-row">{{item.title}}</div>
                    <div class="intro text-two-row">{{item.introduction}}</div>
                    <div class="time">{{moment(item.addtime).format('YYYY-MM-DD HH:mm:ss')}}</div>
                </div>
            </div>
        </template>
    </div>
    <div class="bottom">
        <template v-for="(item,index) in list">
            <div class="item" v-if="index>4" @click="newsDetail(item.id)">
                <img :src="item.imgUrls[0]" alt="">
                <div class="content">
                    <div class="title text-one-row">{{item.title}}</div>
                    <div class="intro text-two-row">{{item.introduction}}</div>
                    <div class="time">{{moment(item.addtime).format('YYYY-MM-DD HH:mm:ss')}}</div>
                </div>
            </div>
        </template>
    </div>
</div>
		<el-pagination
			background
			:layout="layouts.join(',')"
			:total="total"
			:page-size="listQuery.limit"
            v-model:current-page="listQuery.page"
			prev-text="<"
			next-text=">"
			:hide-on-single-page="true"
			@size-change="sizeChange"
			@current-change="currentChange"/>


    </div>
    <formModel ref="formModelRef"></formModel>
</template>

<script setup>
    const moment = window.moment
	import formModel from './formModel'
	import {
		ref,
		nextTick,
        computed,
		getCurrentInstance
	} from 'vue';
	import {
		useRoute,
		useRouter
	} from 'vue-router'
    import {
        useStore
    } from 'vuex';
    const store = useStore()
    const user = computed(()=>store.getters['user/session'])
	const context = getCurrentInstance()?.appContext.config.globalProperties;
    const baseUrl = ref(context.$config.url)
	//基础信息
	const tableName = 'news'
	const formName = '公告资讯'
	const router = useRouter()
	const route = useRoute()
	//基础信息
    const breadList = ref([{
        name: formName
    }])
	//权限验证
	const btnAuth = (e, a) => {
		return context?.$toolUtil.isAuth(e, a)
	}
	const list = ref([])
	const listLoading = ref(false)
	const listQuery = ref({
		page: 1,
		limit: 10,
		sort: 'addtime',
		order: 'desc'
	})
	const searchQuery = ref({})
	//分页
	const layouts = ref(["total","prev","pager","next","sizes","jumper"])
	const total = ref(0)
	const sizeChange = (size) => {
		listQuery.value.limit = size
		getList()
	}
	const currentChange = (page) => {
		listQuery.value.page = page
		getList()
	}
	//分页
	const searchClick = () => {
		listQuery.value.page = 1
		getList()
	}
	const getList = () => {
		listLoading.value = true
		let params = JSON.parse(JSON.stringify(listQuery.value))
		if (searchQuery.value.title && searchQuery.value.title != '') {
			params['title'] = `%${searchQuery.value.title}%`
		}
		context?.$http({
			url: `news/list`,
			method: 'get',
			params: params
		}).then(res => {
			listLoading.value = false
			list.value = res.data.data.list
			total.value = res.data.data.total
            list.value.forEach(item=>{
                let urls = item.picture.split(',')
                item.imgUrls = urls.map(url=>{
                    if(url && url.substr(0,4)=='http'){
                        return url
                    }else{
                        return baseUrl.value+url
                    }
                })
            })
		})
	}
	//判断是否从个人中心跳转
	const centerType = ref(false)
	//返回
	const backClick = () => {
		router.push(`/index/${context?.$toolUtil.storageGet('frontSessionTable')}Center`)
	}
	const init = () => {
		if (route.query.centerType) {
			centerType.value = true
		}
		getList()
        nextTick(()=>{
            if(route.query.id){
                newsDetail(route.query.id)
            }
        })
	}
	//定义弹窗
	const formModelRef = ref(null)
	const newsDetail = (id = null) => {
		if (id) {
			formModelRef.value.init(id)
		}
	}
	init()
</script>
<style lang="scss">
.news-page {
    width: 80%;
    margin: 20px auto;
}

.news-page .categorys {
    display: flex;
    gap: 20px;
    padding: 20px 0;
}

.news-page .list_search {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    justify-content: flex-end;
}

.news-page .search_view {
    display: flex;
    align-items: center;
}

.news-page .category {
    background: #f0f0f0;
    padding: 6px 10px;
    text-align: center;
    min-width: 80px;
}

.news-page .category.active {
    background: var(--theme);
    color: #fff;
}

.news-page .list {
    display: block;
    flex-wrap: wrap;
    gap: 20px;
}

.news-page .left {
    width: 40%;
    flex-shrink: 0;
    position: relative;
    float: left;
    margin: 0 0 20px;
}

.news-page .el-carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.news-page .right {
    width: calc(60% - 20px);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    float: right;
    margin: 0 0 20px;
}

.news-page .right .item {
    width: calc(50% - 10px);
}

.news-page .right img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.news-page .left .el-carousel {
    width: 100%;
    height: 585px;
}
.news-page .el-carousel__container {
    height: 100%;
}
.news-page .left .content {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    color: #fff;
    padding: 10px 20px;
}

.news-page .title {
    font-size: 16px;
    line-height: 24px;
}

.news-page .intro {
    font-size: 14px;
}

.news-page .time {
    text-align: right;
    font-size: 12px;
}

.news-page .bottom {
    width: calc(100% + 20px);
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0 0 -10px;
    clear: both;
    
}

.news-page .bottom .item {
    width: calc(20% - 20px);
    margin: 0 10px 20px;
}

.news-page .bottom .item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.news-page .right .intro,.news-page .bottom .intro {
    color: #666;
}

.news-page .right .time,.news-page  .bottom .time {
    color: #666;
}

.news-page .left .title {
    font-weight: 700;
}

.news-page .el-pagination {
    display: flex;
    justify-content: center;
    padding: 30px;
}

.news-page .hot-title {
    font-size: 24px;
    padding: 20px;
}

.news-page .hot-item img {
    width: 100%;
}

.news-page .hot-item-title {
    font-size: 16px;
    text-align: center;
}

.news-page .hot-item-intro {
    color: #666;
}

.news-page .hot-item-content {
    background: #f0f0f0;
    padding: 4px 10px;
}



.news_hot_view {
    padding: 20px 0;
}

.news_hot_view .hot_title {
    font-size: 24px;
    padding: 20px 0;
}

.news_hot_view .hot_list {
    width: calc(100% + 20px);
    display: flex;
    gap: 20px;
}
.news_hot_view .hot_list .hot {
    width: calc(25% - 20px);
}
.news_hot_view .hot_list .hot img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
.news_hot_view .hot_list .hot .hot-item-content{
    background: none;
}
.news_hot_view .hot_list .hot .hot-item-content .hot_text {
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.news_hot_view .hot_list .hot .hot-item-content .hot_intro {
    color:#666;
}



:root {
    
    --el-color-primary:#93d1bc!important;
    --theme-light4:rgba(152, 215, 194, 0.4)!important;
    --theme-light2:rgba(152, 215, 194, 0.2)!important;
    --theme-dark:#7AB8A3!important;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0px 1000px white inset !important; 
}

.text-two-row{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis; 
  white-space: normal; 
}

.text-one-row{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.news_detail_img{
    text-align: center;
    margin: 5px auto;
}
.news_detail_img img {
    max-width: 100%;
    height: auto !important;
}



@media only screen and (max-width: 991px) {

.news-page{
    width:100%;
    padding:20px;
}
.news-page .left{
    width:100%;
}
.news-page .left .el-carousel {
    width: 100%;
    height: 400px;
}
.news-page .right{
    width:100%;
}
.news-page .bottom .item {
    width: calc(50% - 20px);
}

}


</style>