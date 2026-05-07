<template>
	<div class="forum_view">
        <div class="breadcrumb-wrapper" style="width: 100%;">
            <div class="bread_view">
                <el-breadcrumb separator="Ξ" class="breadcrumb">
                    <template v-if="centerType">
                        <el-breadcrumb-item class="second_breadcrumb" :to="{ path: `/index/${sessionTable}Center` }">个人中心</el-breadcrumb-item>
                        <el-breadcrumb-item class="second_breadcrumb">我的发布</el-breadcrumb-item>
                    </template>
                    <template v-else>
                        <el-breadcrumb-item class="first_breadcrumb" :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item class="second_breadcrumb">{{formName}}</el-breadcrumb-item>
                    </template>
                </el-breadcrumb>
            </div>
            <div class="back_view" v-if="centerType">
                <el-button class="back_btn" @click="backClick">返回</el-button>
            </div>
        </div>
		<el-form :model="searchQuery" class="list_search" @submit.native.prevent>
			<div class="search_view">
				<div class="search_label">
					标题：
				</div>
				<div class="search_box">
					<el-input class="search_inp" v-model="searchQuery.title" placeholder="标题" size="small" clearable>
					</el-input>
				</div>
			</div>
			<div class="search_btn_view">
				<el-button class="search_btn" type="primary" @click="searchClick">搜索</el-button>
				<el-button class="add_btn" @click="addClick" v-if="!myType&&btnAuth('forum','新增')" type="success">发布新帖</el-button>
			</div>
		</el-form>
        <div class="category_view">
            <div class="category" :class="categoryIndex==-1?'categoryActive':''" @click="categoryClick(-1)">全部
            </div>
            <div class="category" :class="categoryIndex==index?'categoryActive':''"
                 v-for="(item,index) in categoryList" :key="index" @click="categoryClick(index)">{{item}}</div>
        </div>
		<div class="forum_list">
			<div class="forum_item" v-for="(item,index) in list" :key="index" @mouseenter="forumEnter(index)"
				@mouseleave="forumLeave" @click.stop="detailClick(item.id)">
				<div class="forum_item_left">
                    <el-image class="forum_item_img" :src="item.imgUrls?item.imgUrls[0]:''"></el-image>
					<span class="forum_item_title">{{item.title}}</span>
					<span class="forum_item_name">
                        (发布人：{{item.isAnonymous==1&&item.userid!=userid?'匿名':item.username}})
                    </span>
				</div>
				<div class="forum_item_btn_box" v-if="item.userid==userid&&forumShowIndex==index&&(btnAuth('forum','修改')||btnAuth('forum','删除'))">
                    <template v-if="centerType && item.isDel>0">
                        <el-button class="forum_del_btn" type="danger" @click.stop="showDialog(item)">内容违规-已删除</el-button>
                    </template>
                    <template v-else>
                        <el-button class="forum_edit_btn" v-if="btnAuth('forum','修改')" type="primary" @click.stop="editClick(item.id)">修改</el-button>
                        <el-button class="forum_del_btn" v-if="btnAuth('forum','删除')" type="danger" @click.stop="delClick(item.id)">删除</el-button>
                    </template>
				</div>
				<div class="forum_time" v-else>{{item.addtime}}</div>
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
				@current-change="currentChange" />
		</div>
	</div>
    <el-dialog
        title="处理结果"
        v-model="reportDialog.visible"
        width="50%">
        <el-form>
            <el-form-item label="举报原因" label-width="80px">
                {{reportDialog.data.reason}}
            </el-form-item>
            <el-form-item label="补充截图" label-width="80px">
                <uploads
                    action="file/upload"
                    tip="请上传封面"
                    style="width: 100%;text-align: left;"
                    disabled
                    :fileUrls="reportDialog.data.images?reportDialog.data.images:''">
                </uploads>
            </el-form-item>
            <el-form-item label="处理建议" label-width="80px">
                {{reportDialog.data.suggestion}}
            </el-form-item>
        </el-form>
        <div slot="footer" style="text-align: center">
            <el-button type="primary" @click="reportDialog.visible = false">关 闭</el-button>
        </div>
    </el-dialog>

    <forumAdd ref="forumAddRef" @close="getList()"></forumAdd>
</template>

<script setup>
	import {
		ref,
		nextTick,
		getCurrentInstance
	} from 'vue';
	import {
		useRoute,
		useRouter
	} from 'vue-router'
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	//基础信息
	const tableName = 'forum'
	const formName = '论坛交流'
	const router = useRouter()
	const route = useRoute()
    const baseUrl = ref(context.$config.url)
    const sessionTable = localStorage.getItem('frontSessionTable')
    //判断是否调我的发布列表
    const myType = ref(false)
    //判断是否从个人中心跳转
    const centerType = ref(false)
	//权限验证
    const btnAuth = (e, a) => {
        if(context?.$toolUtil.isAuth(e, a)){
            return true
        }
        if(centerType.value){
            return context?.$toolUtil.isBackAuth(e,a)
        }
    }
    //分类
    const categoryList = ref([])
    const categoryIndex = ref(-1)
    const getCategoryList = () => {
        context?.$http({
            url: 'option/forumType/typeName',
            method: 'get'
        }).then(res => {
            categoryList.value = res.data.data
        })
    }
    const categoryClick = (index) => {
        listQuery.value.page = 1
        categoryIndex.value = index
        getList()
    }
	const list = ref([])
	const listLoading = ref(false)

	const listQuery = ref({
		page: 1,
		limit: 20,
		isdone: '开放',
		sort: 'isTop,topTime,addtime',
		order: 'desc,desc,desc',
        isDel:centerType.value?null:0,
	})
	const myListQuery = ref({
		page: 1,
		limit: 20,
		parentid: 0,
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
		let params = myType.value ? JSON.parse(JSON.stringify(myListQuery.value)) : JSON.parse(JSON.stringify(listQuery
			.value))
		if (searchQuery.value.title && searchQuery.value.title != '') {
			params['title'] = `%${searchQuery.value.title}%`
		}
        if (categoryIndex.value != -1) {
            params.typeName = categoryList.value[categoryIndex.value]
        }
		context?.$http({
			url: `forum/${myType.value?'page':'flist'}`,
			method: 'get',
			params: params
		}).then(res => {
			listLoading.value = false
			list.value = res.data.data.list
            list.value.forEach(item=>{
                if(item.cover){
                    item.imgUrls = item.cover.split(',').map(url=> {
                        if(url && url.substr(0,4)=='http'){
                            return url
                        }else{
                            return baseUrl.value + url
                        }
                    })
                }
            })
			total.value = res.data.data.total
		})
	}
	const userid = ref(0)
	const forumShowIndex = ref(-1)
	//判断按钮显示
	const forumEnter = (index) => {
		forumShowIndex.value = index
	}
	const forumLeave = () => {
		forumShowIndex.value = -1
	}
    import forumAdd from './add.vue'
    const forumAddRef = ref()
	//发布新贴
	const addClick = () => {
        forumAddRef.value.init()
	}
	//修改帖子
	const editClick = (id = null) => {
        forumAddRef.value.init(id)
	}
	//返回
	const backClick = () => {
		router.push(`/index/${context?.$toolUtil.storageGet('frontSessionTable')}Center`)
	}
	//初始化
	const init = () => {
		if (route.query.centerType) {
			centerType.value = true
		}
		if (route.query.myType) {
			myType.value = true
		}
		userid.value = context?.$toolUtil.storageGet('userid')
		getList()
        getCategoryList()
	}
	const detailForm = ref({})
	//详情
	const detailClick = (id = null) => {
		if (id) {
            router.push(`${tableName}Detail?id=` + id + (centerType.value?'&&centerType=1':''))
		}
	}
	//删除
	const delClick = (id = null) => {
		if (id) {
			ElMessageBox.confirm(`是否删除选中帖子`, '提示', {
				confirmButtonText: '是',
				cancelButtonText: '否',
				type: 'warning',
			}).then(() => {
				context?.$http({
					url: `forum/delete`,
					method: 'post',
					data: [id]
				}).then(res => {
					context?.$toolUtil.message('删除成功', 'success', () => {
						getList()
					})
				})
			}).catch(_ => {})
		}
	}
    const reportDialog = ref({
        visible:false,
        data:null
    })
    const showDialog = (item)=>{
        context.$http.get('/forumreport/list?forumId=11&status=已处理&sort=id&order=desc').then(res=>{
            if(res.data.code==0 && res.data.data.list?.length){
                reportDialog.value.data = res.data.data.list[0]
                reportDialog.value.visible = true
            }
        })
    }
	init()
</script>

<style lang="scss">
.category_view{
    width: 100%;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    padding: 10px 0;
}
.category{
    cursor: pointer;
    padding: 10px 10px;
    border-radius: 6px;
}
.category.categoryActive{
    background: var(--theme);
    color: #fff;
}
.forum_item_img{
    width: 60px;
    height: 60px;
    margin-right: 10px;
}
/*总盒子*/
.forum_view {
    width: 100%;
    padding: 30px 10%;
    position: relative;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.forum_view .title{
    color: rgb(51, 51, 51);
    height:50px;
    line-height:50px;
    font-size:22px;
    padding-left: 50px;
    position: relative;
}
/*搜索盒子*/
.forum_view .list_search{
    display:flex;
    align-items:center;
    /* width: 100%; */
}
.forum_view .list_search .search_view{
    display:flex;
    align-items:center;
    margin-right:10px;
    margin-left: auto;
}
.forum_view .list_search .search_view .search_label{
    font-size:16px;
    white-space: nowrap;
}
.forum_view .list_search .search_view .search_box{
}
.forum_view .list_search .search_view .search_box .search_inp{
    padding:0 10px;
    border:1px solid #ddd;
    font-size:16px;
    background: #fff;
    height:38px;
}
.forum_view .list_search .search_btn_view .search_btn{
    background: var(--theme);
    color: rgb(255, 255, 255);
    border:0;
    border-radius:0;
    height:38px;
}
.forum_view .list_search .search_btn_view .search_btn:hover{
    background: var(--theme);
}
.forum_view .list_search .search_btn_view .add_btn{
    background: rgb(6 4 4);
    color: rgb(255, 255, 255);
    border:0;
    border-radius:0;
    height:38px;
}
.forum_view .list_search .search_btn_view .add_btn:hover{
    background: #000;
}

/*列表盒子*/
.forum_view .forum_list{
    width: 100%;
    margin: 20px auto;
    padding: 0px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 20px;
}
/*item*/
.forum_view .forum_list .forum_item{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 30px;
    cursor: pointer;
    color: rgba(54, 49, 53, 1);
    height: 60px;
    border-width: 0px 0px 0px;
    border-style: solid;
    border-color: rgb(238, 238, 238);
    border-image: initial;
    font-size: 16px;
    margin-bottom: 20px;
    background: #fff;
    border-bottom: 2px dashed var(--theme);
}
.forum_view .forum_list .forum_item:last-child{
}
.forum_view .forum_list .forum_item:hover{
    color: var(--theme);
}
/*左边内容盒子*/
.forum_view .forum_list .forum_item .forum_item_left{
    display: flex;
    align-items: center;
}
/*标题*/
.forum_view .forum_list .forum_item .forum_item_left .forum_item_title{
    font-size: 16px;
    /* color: var(--theme); */
    font-weight: 600;
}
/*发布人*/
.forum_view .forum_list .forum_item .forum_item_left .forum_item_name{
    color: rgb(153, 153, 153);
}
/*时间*/
.forum_view .forum_list .forum_item .forum_time{
    font-size: 15px;
    color: #000;
    padding: 10px;
    background: none;
}
/*按钮盒子*/
.forum_view .forum_list .forum_item .forum_item_btn_box{
    width:auto;
}
/*修改*/
.forum_view .forum_list .forum_item .forum_item_btn_box .forum_edit_btn{
    margin: 0px 10px 0px 0px;
    padding: 0px 24px;
    width: auto;
    height: 40px;
    font-size: 14px;
    color: rgb(255, 255, 255);
    border-radius: 4px;
    border: 0px;
    background: var(--theme);
    cursor: pointer;
}
/*删除*/
.forum_view .forum_list .forum_item .forum_item_btn_box .forum_del_btn{
    margin: 0px 10px 0px 0px;
    padding: 0px 24px;
    width: auto;
    height: 40px;
    font-size: 14px;
    color: rgb(255, 255, 255);
    border-radius: 4px;
    border: 0px;
    background: rgba(254, 66, 66, 0.8);
    cursor: pointer;
}

/*详情盒子*/
.forum_view .forum_detail{
    width: 100%;
    margin: 20px 0px 0;
    background: #fff;
    padding: 20px 0;
}
/*标题*/
.forum_view .forum_detail .forum_title{
    width: 100%;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: var(--theme);
}
/*info盒子*/
.forum_view .forum_detail .forum_info{
    width: 100%;
    text-align: center;
    color: rgb(153, 153, 153);
    font-size: 16px;
    margin: 20px 0px 0px;
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
}
/*发布人*/
.forum_view .forum_detail .forum_info .forum_name{
    margin: 0px 10px 0px 0px;
}
/*时间*/
.forum_view .forum_detail .forum_info .forum_time{
    margin: 0px 10px 0px 0px;
}
/*分割线*/
.forum_view .forum_detail .el-divider--horizontal{
    display: block;
    height: 0px;
    width: 100%;
    margin: 24px 0;
}
/*内容区*/
.forum_view .forum_detail .forum_content{
    width: 100%;
    text-align: left;
    font-size: 16px;
    color: rgb(102, 102, 102);
    /* text-indent: 2rem; */
    padding: 0 50px;
}

/*一级评论 盒子*/
.forum_view .forum_comment_box{
    margin: 30px 0px 0px;
    width: 100%;
    padding: 20px;
    border: 0px solid rgb(238, 238, 238);
    box-shadow: none;
    border-radius: 0px;
}
.forum_view .forum_comment_box .el-card__body{
    padding: 0px;
}
/*列表盒子*/
.forum_view .forum_comment_box .forum_comment_list{
    width: 100%;
    text-align: left;
}
/*item*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment{
    width: 100%;
    padding: 0px;
    border: 0px solid rgb(238, 238, 238);
    margin: 0px 0px 20px;
}
/*用户盒子*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_user{
    display: flex;
    align-items: center;
    background: var(--theme);
    padding: 5px 10px;
}
/*头像*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_user .forum_comment_user_avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0px 10px 0px 0px;
}
/*用户名*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_user .forum_comment_username{
    font-size: 16px;
    color: #fff;
}
/*内容*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_content{
    width: calc(100% - 60px);
    margin: 0px 0px 0px 60px;
    padding: 20px 0px 0px;
    font-size: 16px;
}
/*按钮盒子*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_reply_view{
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0px 20px 0px 0px;
    box-sizing: border-box;
}
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_reply_view .forum_comment_del{
    font-size: inherit;
    color: rgb(255, 255, 255);
    cursor: pointer;
    margin: 0px 0px 0px 10px;
    background: rgba(197, 197, 197, 1);
    padding: 5px 10px;
}
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_reply_view .forum_comment_reply{
    font-size: inherit;
    color: rgb(255, 255, 255);
    cursor: pointer;
    margin: 0px 0px 0px 10px;
    background: var(--theme);
    padding: 5px 10px;
}

/*二级评论 盒子*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_second_list{
    width: calc(100% - 60px);
    margin: 0px 0px 0px 60px;
    padding: 20px 0px 0px;
}
/*线*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_second_list .forum_comment_second_divider{
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
}
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_second_list .forum_comment_second_divider .el-divider__text{
    font-size: 16px;
}
/*item*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_second_list .forum_comment_second{
    width: 100%;
    padding: 10px 0px;
    border-width: 0px 0px 1px;
    border-style: solid;
    border-color: rgb(238, 238, 238);
    border-image: initial;
}
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_second_list .forum_comment_second:last-child{
    border-width: 0px 0px 0px;
}

/*用户盒子*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_second_list .forum_comment_second .forum_comment_second_user{
    display: flex;
    align-items: center;
}
/*头像*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_second_list .forum_comment_second .forum_comment_second_user .forum_comment_second_user_avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0px 10px 0px 0px;
}
/*用户名*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_second_list .forum_comment_second .forum_comment_second_user .forum_comment_second_username{
    font-size: 16px;
}
/*内容*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_second_list .forum_comment_second .forum_comment_second_content{
    width: calc(100% - 60px);
    margin: 0px 0px 0px 60px;
    padding: 20px 0px 0px;
    color:#999;
    font-size: 16px;
}
/*按钮盒子*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_second_list .forum_comment_second .forum_comment_second_reply_view{
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0px 20px 0px 0px;
    box-sizing: border-box;
}
/*删除*/
.forum_view .forum_comment_box .forum_comment_list .forum_comment .forum_comment_second_list .forum_comment_second .forum_comment_second_reply_view .forum_comment_second_del{
    font-size: inherit;
    color: rgb(255, 255, 255);
    cursor: pointer;
    margin: 0px 0px 0px 10px;
    background: rgba(197, 197, 197, 1);
    padding: 5px 10px;
}


.forum_view .title:before {
    position: absolute;
    content: '';
    width: 40px;
    height: 40px;
    top: -10px;
    left: 0;
    background: url(http://clfile.zggen.cn/20241205/28785da1592b4ff2b775a168e4b4bb3c.png);
    background-size: 100% 100%;
}

.forum_view button.el-button.comment_add {margin-left: auto;}

.forum_view .comment_add_box {
    display: flex;
    padding: 10px;
}

.forum_view .section_title {
    width: 100%;
}
.forum_view .section_title{
    background-size: 100% 100%;
    color: var(--theme);
    font-size: 24px;
    margin-bottom: 30px;
    line-height: 44px;
    text-align: center;
    font-weight: 700;
}

.forum_view .comment_divider.el-divider.el-divider--horizontal {
    background: var(--theme)!important;
}

.forum_view .el-divider__text {
    color: var(--theme);
    border: 1px solid rgba(66, 66, 66, 1);
}

.forum_view button.el-button.comment_add {
    background: var(--theme);
    color: #fff;
    border: none;
}


/* 响应式代码 论坛 */
@media only screen and (max-width: 991px) {

.forum_view{
    width:100%;
    padding:20px;
}

}
</style>