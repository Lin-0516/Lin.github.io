<template>
    <div class="home_box">





			<!-- 公告资讯 -->
			<div class="newsList_view">
<div class="tableName">公告资讯</div>
<div class="list">
    <template v-for="(item,index) in newsList">
        <div class="left" v-if="index==0"  @click="newsDetailClick(item)" style="cursor: pointer;">
            <el-carousel>
                <el-carousel-item v-for="item in item.imgUrls" :key="item">
                    <img :src="item" alt=""/>
                </el-carousel-item>
            </el-carousel>
            <div class="title-row">
                <div class="title">{{item.title}}</div>
                <div class="intro text-two-row">{{item.introduction}}</div>
                <div class="date">{{moment(item.addtime).format('YYYY-MM-DD')}}</div>
            </div>
        </div>
    </template>
    <div class="right">
        <template v-for="(item,index) in newsList">
            <div v-if="index>0" class="item" @click="newsDetailClick(item)" style="cursor: pointer;">
                <div class="title">{{item.title}}</div>
                <div class="intro text-two-row">{{item.introduction}}</div>
                <div class="date">{{moment(item.addtime).format('YYYY-MM-DD')}}</div>
            </div>
        </template>
        <div class="more" @click="moreClick('news')" style="cursor: pointer">更多</div>
    </div>
</div>

			</div>



    </div>
    <formModel ref="newsFormModelRef"></formModel>
</template>

<script setup>
	import {
		ref,
        computed,
		getCurrentInstance
	} from 'vue';
    const moment = window.moment
	import {
		useRouter
	} from 'vue-router';
    import {
        useStore
    } from 'vuex';
    const store = useStore()
    const user = computed(()=>store.getters['user/session'])
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const router = useRouter()
    const baseUrl = ref(context.$config.url)
	//公告资讯弹窗
	import formModel from './news/formModel'
	const newsFormModelRef = ref(null)
	//公告资讯
	const newsList = ref([])
	const getNewsList = () => {
		context?.$http({
			url: 'news/list',
			method: 'get',
			params:{
				page:1,
				limit: 5,
                sort:'id',
                order:'desc',
			}
		}).then(res=>{
			newsList.value = res.data.data.list
			newsList.value.forEach(item=>{
                let urls = item.picture.split(',')
                item.imgUrls = urls.map(url=>{
                    if(isHttp(url)){
                        return url
                    }else{
                        return baseUrl.value+url
                    }
                })
			})
		})
	}
	const newsDetailClick = (item) => {
		if (item && item.id){
			newsFormModelRef.value.init(item.id)
		}
	}
	//判断图片链接是否带http
	const isHttp = (str) => {
        return str && str.substr(0,4)=='http';
    }
	//跳转详情
	const detailClick = (table,id) => {
		router.push(`/index/${table}Detail?id=${id}`)
	}
	const moreClick = (table) => {
		router.push(`/index/${table}List`)
	}
	const init = () => {
		//公告资讯
		getNewsList()
	}
	init()
</script>

<style lang="scss">
.home_box {
    width: 80%;
    margin: 0 auto;
    padding: 30px 0;
}
.newsList_view {
    margin-top: 30px;
}

.newsList_view .tableName {
    text-align: center;
    font-size: 26px;
}

.newsList_view .list {
    margin-top: 30px;
    display: flex;
}

.newsList_view .left {
    width: 40%;
    position: relative;
    flex-shrink: 0;
    margin-right: 20px;
}

.newsList_view .el-carousel{
    width: 100%;
    height: 510px;
}

.newsList_view .left img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.newsList_view .left .title-row {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0,0,0,0.4);
    color: #fff;
    padding: 14px;
}

.newsList_view .right {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
}

.newsList_view .item {
    background:#f0f0f0;
    padding:10px
}

.newsList_view .right .title {
    font-size: 16px;
}

.newsList_view .right .date {
    text-align: right;
    color: #999;
}

.newsList_view .more {
    width: 100%;
    background: #f0f0f0;
    text-align: center;
    padding: 10px 0;
    margin-left: auto;
}

.newsList_view .el-carousel {
    height: 100%;
}

.newsList_view .el-carousel__container {
    height: 100%;
}
</style>