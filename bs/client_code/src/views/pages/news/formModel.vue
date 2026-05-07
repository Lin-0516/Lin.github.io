<template>
	<div>
		<el-dialog v-model="formVisible" :title="formTitle" width="60%" class="news-detail-dialog" destroy-on-close>
			<div class="news_detail">
				<div class="news_detail_title" style="text-align: center;">{{detail.title}}</div>
                <div class="action-row" style="display: flex;justify-content: center;margin-top: 20px;">
                    <div class="collect_view" style="cursor: pointer" v-if="!collectType" @click="collectClick(1)">
                        <i class="iconfont icon-likeline1"></i>
                        <span>收藏</span>
                    </div>
                    <div class="collect_view" style="cursor: pointer" v-else @click="collectClick(-1)">
                        <i class="iconfont iconfontActive icon-likefill1"></i>
                        <span class="textActive">取消收藏</span>
                    </div>
                    <div class="thumbs_view" style="display: flex;column-gap: 20px;margin-left: auto">
                        <template v-if="!thumbsupOrCrazilyInfo.type">
                            <div class="zan_view" style="cursor: pointer" @click="thumbsupOrCrazilyClick(21)">
                                <i class="iconfont icon-thumb-up-line1"></i>
                                <span>赞({{detail.thumbsupNumber}})</span>
                            </div>
                            <div class="zan_view" style="cursor: pointer" @click="thumbsupOrCrazilyClick(22)">
                                <i class="iconfont icon-thumb-down-line1"></i>
                                <span>踩({{detail.crazilyNumber}})</span>
                            </div>
                        </template>
                        <template v-else>
                            <div class="zan_view" style="cursor: pointer" v-if="thumbsupOrCrazilyInfo.type==21" @click="cancelThumbsupOrCrazilyClick(21)">
                                <i class="iconfont iconfontActive icon-thumb-up-fill1"></i>
                                <span class="textActive">取消赞({{detail.thumbsupNumber}})</span>
                            </div>
                            <div class="zan_view" style="cursor: pointer" v-else @click="cancelThumbsupOrCrazilyClick(22)">
                                <i class="iconfont iconfontActive icon-thumb-down-fill1"></i>
                                <span class="textActive">取消踩({{detail.crazilyNumber}})</span>
                            </div>
                        </template>
                    </div>
                </div>
				<div class="news_detail_time">发布时间：{{detail.addtime}}</div>
                <div class="news_detail_img" v-if="detail.picture">
                    <img v-for="src in detail.picture.split(',')" :src="$config.url+src">
                </div>
				<div class="news_detail_content" v-html="detail.content"></div>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="formVisible=false">关闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
	import {
		ref,
		nextTick,
		getCurrentInstance,
		defineEmits
	} from 'vue';
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const id = ref(0)
	const detail = ref({})
	const formRef = ref(null)
	const formVisible = ref(false)
	const formTitle = ref('')
	//初始化
	const init = (refid=null) => {
        detail.value = {}
		if(refid){
			id.value = refid
			getInfo()
		}
        // 收藏
        getCollect()
        // 赞踩状态
        getThumbsupOrCrazily()
		formTitle.value = '公告资讯'
		formVisible.value = true
	}
	//声明父级调用
	defineExpose({
		init
	})
	//回调父级方法
	const getInfo = () => {
		context?.$http({
			url: `news/detail/${id.value}`,
			method: 'get'
		}).then(res => {
			detail.value = res.data.data
			formVisible.value = true
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
                    limit: 1,
                    refid: id.value,
                    tablename: 'news',
                    userid: context?.$toolUtil.storageGet('userid')
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
            name: detail.value.title,
            picture: detail.value.picture,
            refid: detail.value.id,
            type: type,
            tablename: 'news',
            userid: context?.$toolUtil.storageGet('userid')
        }
        context?.$http({
            url: 'storeup/add',
            method: 'post',
            data: params
        }).then(res => {
            if (type == 21) detail.value.thumbsupNumber += 1
            if (type == 22) detail.value.crazilyNumber += 1
            context?.$http({
                url: `news/update`,
                method: 'post',
                data: detail.value
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
            if (type == 21 && detail.value.thumbsupNumber>0) detail.value.thumbsupNumber -= 1
            if (type == 22 && detail.value.crazilyNumber>0) detail.value.crazilyNumber -= 1
            context?.$http({
                url: `news/update`,
                method: 'post',
                data: detail.value
            })
            getThumbsupOrCrazily()
            context?.$toolUtil.message('取消成功', 'success')
        })
    }
    // 收藏
    const collectType = ref(false)
    const collectInfo = ref({})
    const getCollect = () => {
        if (context?.$toolUtil.storageGet('frontToken')) {
            context?.$http({
                url: 'storeup/list',
                method: 'get',
                params: {
                    page: 1,
                    limit: 1,
                    type: 1,
                    refid: id.value,
                    tablename: 'news',
                    userid: context?.$toolUtil.storageGet('userid')
                }
            }).then(res => {
                if (res.data.data.list.length) {
                    collectType.value = true
                    collectInfo.value = res.data.data.list[0]
                }else{
                    collectType.value = false
                    collectInfo.value = {}
                }
            })
        }
    }
    // 收藏按钮
    const collectClick = (type) => {
        if (type == 1 && !collectType.value) {
            let params = {
                name: detail.value.title,
                picture: detail.value.picture,
                refid: detail.value.id,
                type: type,
                tablename: 'news',
                userid: context?.$toolUtil.storageGet('userid')
            }
            context?.$http({
                url: 'storeup/add',
                method: 'post',
                data: params
            }).then(res => {
                detail.value.storeupNumber += 1
                context?.$http({
                    url: `news/update`,
                    method: 'post',
                    data: detail.value
                })
                collectType.value = true
                getCollect()
                context?.$toolUtil.message('收藏成功', 'success')
            })
        }
        else if (type == -1 && collectType.value) {
            let ids = []
            ids.push(collectInfo.value.id)
            context?.$http({
                url: 'storeup/delete',
                method: 'post',
                data: ids
            }).then(res => {
                detail.value.storeupNumber -= 1
                context?.$http({
                    url: `news/update`,
                    method: 'post',
                    data: detail.value
                })
                collectInfo.value = {}
                collectType.value = false
                context?.$toolUtil.message('取消成功', 'success')
            })
        }
    }
</script>
<style lang="scss">
    .news_detail_img{
        text-align: center;
        margin: 20px;
        img{
            max-width: 100%;
            height: 300px;
        }
    }

</style>