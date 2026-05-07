<template>
    <div class="forum_view">
        <div class="breadcrumb-wrapper" style="width: 100%;">
            <div class="back_view">
                <el-button class="back_btn" @click="backClick">返回</el-button>
            </div>
            <div class="bread_view">
                <el-breadcrumb separator="Ξ" class="breadcrumb">
                    <el-breadcrumb-item class="first_breadcrumb" :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item class="second_breadcrumb" :to="{ path: '/index/forumList' }">{{formName}}</el-breadcrumb-item>
                    <el-breadcrumb-item class="second_breadcrumb">内容</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="forum_detail">
            <div class="forum_title">
                <span>{{detailForm.title}}</span>
            </div>
            <div class="forum_info">
					<span class="forum_name">
                        发布人：{{detailForm.isAnonymous==1&&detailForm.userid!=user.id?'匿名':detailForm.username}}
                    </span>
                <span class="forum_time">发布时间：{{detailForm.addtime}}</span>
            </div>
            <div class="thumbs_view">
                <template v-if="!thumbsupOrCrazilyInfo.type">
                    <div class="zan_view" style="cursor: pointer" @click="thumbsupOrCrazilyClick(21)">
                        <i class="iconfont icon-thumb-up-line1"></i>
                        <span>赞({{detailForm.thumbsupNumber}})</span>
                    </div>
                    <div class="zan_view" style="cursor: pointer" @click="thumbsupOrCrazilyClick(22)">
                        <i class="iconfont icon-thumb-down-line1"></i>
                        <span>踩({{detailForm.crazilyNumber}})</span>
                    </div>
                </template>
                <template v-else>
                    <div class="zan_view" style="cursor: pointer" v-if="thumbsupOrCrazilyInfo.type==21" @click="cancelThumbsupOrCrazilyClick(21)">
                        <i class="iconfont iconfontActive icon-thumb-up-fill1"></i>
                        <span class="textActive">取消赞({{detailForm.thumbsupNumber}})</span>
                    </div>
                    <div class="zan_view" style="cursor: pointer" v-else @click="cancelThumbsupOrCrazilyClick(22)">
                        <i class="iconfont iconfontActive icon-thumb-down-fill1"></i>
                        <span class="textActive">取消踩({{detailForm.crazilyNumber}})</span>
                    </div>
                </template>
            </div>
            <el-divider />
            <div class="forum_content" v-html="detailForm.content"></div>
            <el-carousel class="forum_swiper" v-if="detailForm.imgUrls">
                <el-carousel-item v-for="item in detailForm.imgUrls">
                    <img :src="item" style="width: 100%;height: 100%;object-fit: cover;">
                </el-carousel-item>
            </el-carousel>
            <div class="operate-row">
                <div class="report-btn" style="cursor: pointer;" @click="toReport()">
                    <el-icon><EditPen /></el-icon>举报
                </div>
            </div>
        </div>
        <el-card class="forum_comment_box">
            <el-divider class="comment_divider" content-position="center">评论列表</el-divider>
            <div class="comment_add_box">
                <el-button class="comment_add" @click="commentClick" type="success">发表评论</el-button>
            </div>
            <div class="forum_comment_list">
                <div class="forum_comment" v-for="(item,index) in detailForm.childs" :key="index"
                    @mouseenter="commentEnter(index)" @mouseleave="commentLeave">
                    <div class="forum_comment_user">
                        <img v-if="item.avatarurl" class="forum_comment_user_avatar"
                            :src="baseUrl + item.avatarurl.split(',')[0]" alt="">
                        <img v-else class="forum_comment_user_avatar" src="@/assets/avatar.png" alt="">
                        <span class="forum_comment_username">{{item.username}}</span>
                    </div>
                    <div class="forum_comment_content" v-html="item.content"></div>
                    <div class="forum_comment_reply_view">
                        <div class="forum_comment_del" v-if="commentShowIndex==index&&item.userid==user.id"
                            @click="commentDelClick(item.id)">删除</div>
                        <div class="forum_comment_reply" v-if="commentShowIndex==index"
                            @click="commentReplyClick(item.id)">回复</div>
                    </div>
                    <div class="forum_comment_second_list" v-if="item.childs">
                        <el-divider class="forum_comment_second_divider" content-position="center">回复</el-divider>
                        <div class="forum_comment_second" v-for="(items,indexs) in item.childs" :key="indexs"
                            @mouseenter="commentEnter1(indexs)" @mouseleave="commentLeave1">
                            <div class="forum_comment_second_user">
                                <img v-if="items.avatarurl" class="forum_comment_second_user_avatar"
                                    :src="baseUrl + items.avatarurl.split(',')[0]" alt="">
                                <img v-else class="forum_comment_second_user_avatar" src="@/assets/avatar.png" alt="">
                                <span class="forum_comment_second_username">{{items.username}}</span>
                            </div>
                            <div class="forum_comment_second_content" v-html="items.content"></div>
                            <div class="forum_comment_second_reply_view">
                                <div class="forum_comment_second_del"
                                    v-if="commentShowIndex==index&&items.userid==user.id&&commentShowIndex1==indexs"
                                    @click="commentDelClick(items.id)">删除</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
    <el-dialog v-model="commentVisible" :title="'发表评论'" width="50%" destroy-on-close>
        <el-form class="add_form" :model="commentForm" label-width="120px">
            <el-row>
                <el-col :span="24">
                    <el-form-item prop="content" label="内容">
                        <editor :value="commentForm.content" placeholder="请输入评论"
                                class="list_editor" @change="commentChange"></editor>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
				<span class="formModel_btn_box">
					<el-button class="formModel_cancel" @click="commentVisible=false">关闭</el-button>
					<el-button class="formModel_confirm" type="primary" @click="commentSave">发表</el-button>
				</span>
        </template>
    </el-dialog>
    <el-dialog title="举报" v-model="reportVisible">
        <el-form :model="reportForm" :rules="reportRules" ref="reportFormRef">
            <el-form-item label="举报原因" label-width="80px" prop="reason">
                <el-input type="textarea" v-model="reportForm.reason" :rows="5"></el-input>
            </el-form-item>
            <el-form-item label="补充截图" label-width="80px">
                <uploads
                    action="file/upload"
                    tip="请上传封面"
                    style="width: 100%;text-align: left;"
                    :fileUrls="reportForm.images?reportForm.images:''"
                    @change="uploadSuccess">
                </uploads>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right;">
            <el-button @click="reportVisible = false">取 消</el-button>
            <el-button type="primary" @click="reportSave()">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script setup>
import {
    ref,
    nextTick,
    getCurrentInstance,
    onMounted,
    computed,
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
import Img from "@/components/img.vue";
const context = getCurrentInstance()?.appContext.config.globalProperties;
//基础信息
const tableName = 'forum'
const formName = '论坛交流'
const router = useRouter()
const route = useRoute()
const sessionTable = localStorage.getItem('frontSessionTable')
const baseUrl = ref(context.$config.url)
//权限验证
const btnAuth = (e, a) => {
    if(context?.$toolUtil.isAuth(e, a)){
        return true
    }
    if(centerType.value){
        return context?.$toolUtil.isBackAuth(e,a)
    }
}
//返回
const backClick = () => {
    history.back()
}
const detailForm = ref({})
const getDetail = () => {
    context?.$http({
        url: `forum/list/${route.query.id}`,
        method: 'get'
    }).then(res => {
        detailForm.value = res.data.data
        if(detailForm.value.cover){
            detailForm.value.imgUrls = detailForm.value.cover.split(',').map(url=>{
                if(url && url.substr(0,4)=='http'){
                    return url
                }else{
                    return baseUrl.value + url
                }
            })
        }
        // 赞踩状态
        getThumbsupOrCrazily()
    })
}
    // 赞or踩
    const thumbsupOrCrazilyInfo = ref({})
    // 获取赞踩状态
    const getThumbsupOrCrazily = () => {
        if (context?.$toolUtil.storageGet('frontToken')) {
            context?.$http({
                url: 'storeup/page',
                method: 'get',
                params: {
                    page: 1,
                    limit: 99,
                    refid: detailForm.value.id,
                    tablename: 'forum',
                    userid: user.value.id
                }
            }).then(res => {
                let list = res.data.data.list.filter(item=>(item.type==21||item.type==22))
                if(!list.length){
                    thumbsupOrCrazilyInfo.value = {}
                }else{
                    thumbsupOrCrazilyInfo.value = list[0]
                }
            })
        }
    }
    // 赞踩按钮
    const thumbsupOrCrazilyClick = (type) => {
        let params = {
            name: detailForm.value.title,
            picture: '',
            refid: detailForm.value.id,
            type: type,
            tablename: 'forum',
            userid: user.value.id
        }
        context?.$http({
            url: 'storeup/add',
            method: 'post',
            data: params
        }).then(res => {
            if (type == 21) detailForm.value.thumbsupNumber += 1
            if (type == 22) detailForm.value.crazilyNumber += 1
            context?.$http({
                url: `forum/update`,
                method: 'post',
                data: detailForm.value
            })
            getThumbsupOrCrazily()
            context?.$toolUtil.message('操作成功', 'success')
        })
    }
    //取消赞踩按钮
    const cancelThumbsupOrCrazilyClick = (type) => {
        let ids = []
        ids.push(thumbsupOrCrazilyInfo.value.id)
        context?.$http({
            url: 'storeup/delete',
            method: 'post',
            data: ids
        }).then(res => {
            if (type == 21 && detailForm.value.thumbsupNumber>0) detailForm.value.thumbsupNumber -= 1
            if (type == 22 && detailForm.value.crazilyNumber>0) detailForm.value.crazilyNumber -= 1
            context?.$http({
                url: `forum/update`,
                method: 'post',
                data: detailForm.value
            })
            getThumbsupOrCrazily()
            context?.$toolUtil.message('取消成功', 'success')
        })
    }
//评论
const commentForm = ref({
    content: '',
    parentid: '',
    userid: '',
    username: '',
    avatarurl: '',
})
const commentVisible = ref(false)
//重置评论
const resetCommentForm = () => {
    commentForm.value = {
        content: '',
        parentid: '',
        userid: user.value.id,
        username: context?.$toolUtil.storageGet('frontName'),
        avatarurl: context?.$toolUtil.storageGet('headportrait') ? context?.$toolUtil.storageGet('headportrait') : '',
    }
}
//发表评论
const commentClick = () => {
    resetCommentForm()
    commentForm.value.parentid = detailForm.value.id
    commentVisible.value = true
}
//回复按钮显示
const commentShowIndex = ref(-1)
const commentShowIndex1 = ref(-1)
const commentEnter = (index) => {
    commentShowIndex.value = index
}
const commentLeave = () => {
    commentShowIndex.value = -1
}
const commentEnter1 = (index) => {
    commentShowIndex1.value = index
}
const commentLeave1 = () => {
    commentShowIndex1.value = -1
}
//评论内容回调
const commentChange = (e)=>{
    commentForm.value.content = e
}
const sensitiveWordsArr = ref([])
const getSensitiveWords = ()=>{
    context.$http.get('sensitiveword/detail/1').then(res=>{
        if(res.data.data.content){
            sensitiveWordsArr.value = res.data.data.content.split(',')
        }
    })
}
getSensitiveWords()
//发表保存
const commentSave = () => {
    if(commentForm.value.content==''){
        context?.$toolUtil.message(`请输入内容`, 'error')
        return false
    }
    commentForm.value.title = detailForm.value.title
    for (var i = 0; i < sensitiveWordsArr.value.length; i++) {
        //全局替换
        var reg = new RegExp(sensitiveWordsArr.value[i], "g");
        //判断内容中是否包括敏感词
        if (commentForm.value.content.indexOf(sensitiveWordsArr.value[i]) > -1) {
            // 将敏感词替换为 **
            commentForm.value.content = commentForm.value.content.replace(reg, "**");
        }
    }
    context?.$http({
        url: 'forum/add',
        method: 'post',
        data: commentForm.value
    }).then(res => {
        context.$message.success(`发表成功`)
        getDetail()
        commentVisible.value = false
    })
}
//评论删除
const commentDelClick = (id = null) => {
    if (id) {
        ElMessageBox.confirm(`是否删除选中评论`, '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
        }).then(() => {
            context?.$http({
                url: `forum/delete`,
                method: 'post',
                data: [id]
            }).then(res => {
                context.$message.success('删除成功')
                getDetail()
            })
        }).catch(_ => {})
    }
}
//评论回复
const commentReplyClick = (id = null) => {
    if (id) {
        resetCommentForm()
        commentForm.value.parentid = id
        commentVisible.value = true
    }
}
const reportVisible = ref(false)
const reportFormRef = ref()
const reportForm = ref({
    forumId: '',
    title: '',
    userid:user.value.id,
    reportUserid: user.value.id,
    reportUsername: context?.$toolUtil.storageGet('frontName'),
    reportedUserid: '',
    reportedUsername: '',
    reason: '',
    images: '',
    suggestion: '',
    status: '待处理',
    reporttype: '主题帖举报'
})
const reportRules = ref({
    reason: [
        { required: true, message: '请输入举报理由', trigger: 'blur' }
    ]
})
//上传回调
const uploadSuccess=(e)=>{
    reportForm.value.images = e
}
const toReport = ()=>{
    if(!user.value.id)return context.$message.warning("请先登录")
    if(detailForm.value.userid == user.value.id)return context.$message.error("不能举报自己！")
    reportForm.value = {
        forumId: detailForm.value.id,
        title: detailForm.value.title,
        userid:user.value.id,
        reportUserid: user.value.id,
        reportUsername: context?.$toolUtil.storageGet('frontName'),
        reportedUserid: detailForm.value.userid,
        reportedUsername: detailForm.value.username,
        reason: '',
        images: '',
        suggestion: '',
        status: '待处理',
        reporttype: '主题帖举报'
    }
    reportVisible.value = true
}
const reportSave = ()=>{
    reportFormRef.value.validate((valid) => {
        if (valid) {
            context.$http.post('forumreport/add', reportForm.value).then(res => {
                if (res.data.code == 0) {
                    context.$message.success('举报信息已提交!');
                    reportVisible.value = false
                }
            });
        } else {
            return false;
        }
    });
}
// 判断是否从个人中心跳转
const centerType = ref(false)
const init = () => {
    if(route.query.centerType){
        centerType.value = true
    }
    getDetail()
}
onMounted(()=>{
    init()
})
</script>
<style scoped lang="scss">
.thumbs_view{
    display: flex;
    column-gap: 20px;
    margin: 0 auto;
    justify-content: center;
}
.operate-row{
    text-align: right;
    width: 100%;
    padding: 10px;
}
.report-btn{
    margin-left: auto;
    color: #999;
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