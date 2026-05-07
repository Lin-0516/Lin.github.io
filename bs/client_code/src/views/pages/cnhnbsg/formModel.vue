<template>
	<div class="detail-page">
        <div class="breadcrumb-wrapper" style="width: 100%;">
            <div class="back_view">
                <el-button class="back_btn" @click="backClick">返回</el-button>
            </div>
            <div class="bread_view">
                <el-breadcrumb separator="Ξ" class="breadcrumb">
                    <el-breadcrumb-item class="first_breadcrumb" :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item class="second_breadcrumb" v-for="(item,index) in breadList" :key="index">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
		<div class="detail_view">
			<div class="info_view">
				<div class="title_view">
					<div class="detail_title">
					</div>
				</div>
				<div class="info_item">
					<div class="info_label">标题</div>

					<div  class="info_text" >{{detail.title}}</div>
				</div>
				<div class="info_item">
					<div class="info_label">价格</div>

					<div  class="info_text" >{{detail.jiage}}</div>
				</div>
				<div class="info_item">
					<div class="info_label">起批量</div>

					<div  class="info_text" >{{detail.qipi}}</div>
				</div>
				<div class="info_item">
					<div class="info_label">成交</div>

					<div  class="info_text" >{{detail.turnover}}</div>
				</div>
				<div class="info_item">
					<div class="info_label">询价</div>

					<div  class="info_text" >{{detail.xunjia}}</div>
				</div>
				<div class="info_item">
					<div class="info_label">卖家</div>

					<div  class="info_text" >{{detail.seller}}</div>
				</div>
				<div class="info_item">
					<div class="info_label">发货地址</div>

					<div  class="info_text" >{{detail.address}}</div>
				</div>
				<div class="info_item">
					<div class="info_label">评价</div>

					<div  class="info_text" >{{detail.pingjia}}</div>
				</div>
				<div class="info_item">
					<div class="info_label">类别</div>

					<div  class="info_text" >{{detail.leibie}}</div>
				</div>
				<div class="info_item">
					<div class="info_label">城市</div>

					<div  class="info_text" >{{detail.city}}</div>
				</div>
				<div class="info_item">
					<div class="info_label">标签</div>

					<div  class="info_text" >{{detail.tags}}</div>
				</div>
				<div class="info_item">
					<div class="info_label">详情地址</div>

					<div  class="info_text" >{{detail.xqurl}}</div>
				</div>
				<div class="btn_view">
					<el-button class="edit_btn" v-if="centerType&&btnAuth('cnhnbsg','修改')" type="primary" @click="editClick">修改</el-button>
					<el-button class="del_btn" v-if="centerType&&btnAuth('cnhnbsg','删除')" type="danger" @click="delClick">删除</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import axios from 'axios'
    const moment = window.moment
	import {
		ref,
		getCurrentInstance,
		watch,
		onUnmounted,
		onMounted,
		nextTick,
		computed,
        inject
	} from 'vue';
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	import {
		useStore
	} from 'vuex';
	const store = useStore()
	const user = computed(()=>store.getters['user/session'])
	const userAvatar = computed(()=>store.getters['user/avatar'])
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const route = useRoute()
	const router = useRouter()
    const baseUrl = ref(context.$config.url)
	//基础信息
	const tableName = 'cnhnbsg'
	const formName = '农产品肉鹅'
	//基础信息
	const breadList = ref([{
		name: formName
	}])
	//权限验证
	const btnAuth = (e,a)=>{
		if(centerType.value){
			return context?.$toolUtil.isBackAuth(e,a)
		}else{
			return context?.$toolUtil.isAuth(e,a)
		}
	}
	//查看权限验证
	const btnFrontAuth = (e,a)=>{
		if(centerType.value){
			return context?.$toolUtil.isBackAuth(e,a)
		}else{
			return context?.$toolUtil.isFrontAuth(e,a)
		}
	}
	// 返回
	const backClick = () =>{
		history.back()
	}
	// 轮播图
	const bannerList = ref([])
	// 详情
	const title = ref('')
	const detail = ref({})
    const activeName = ref('false')
	const getDetail = () => {
		context?.$http({
			url: `${tableName}/detail/${route.query.id}`,
			method: 'get'
		}).then(res => {
			detail.value = res.data.data
		})
	}
	// 下载文件
	const downClick = (file) => {
		if(!file){
			context?.$toolUtil.message('文件不存在','error')
		}
		let arr = file.replace(new RegExp('file/', "g"), "")
		axios.get((location.href.split(context?.$config.name).length>1 ? location.href.split(context?.$config.name)[0] :'') + context?.$config.name + '/file/download?fileName=' + arr, {
			headers: {
				token: context?.$toolUtil.storageGet('frontToken')
			},
			responseType: "blob"
		}).then(({
			data
		}) => {
			const binaryData = [];
			binaryData.push(data);
			const objectUrl = window.URL.createObjectURL(new Blob(binaryData, {
				type: 'application/pdf;chartset=UTF-8'
			}))
			const a = document.createElement('a')
			a.href = objectUrl
			a.download = arr
			// a.click()
			// 下面这个写法兼容火狐
			a.dispatchEvent(new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				view: window
			}))
			window.URL.revokeObjectURL(data)
		})
	}
    const approvalSave = async (form)=>{
        context.$http.post(`${tableName}/update`,form).then(res => {
            context.$message.success('审核成功')
            approvalRef.value.approvalVisible = false
            init()
        })
    }
	// 判断是否从个人中心跳转
	const centerType = ref(false)
	const init = () => {
		if(route.query.centerType){
			centerType.value = true
		}
		getDetail()
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
	//修改
	const editClick = () => {
		router.push(`/index/${tableName}Add?id=${detail.value.id}&&type=edit`)
	}
	//删除
	const delClick = () => {
		ElMessageBox.confirm(`是否删除此${formName}？`, '提示', {
			confirmButtonText: '是',
			cancelButtonText: '否',
			type: 'warning',
		}).then(()=>{
			context?.$http({
				url: `${tableName}/delete`,
				method: 'post',
				data: [detail.value.id]
			}).then(res=>{
				context?.$toolUtil.message('删除成功','success',()=>{
					history.back()
				})
			})

		}).catch(_ => {})
	}
	onMounted(()=>{
		init()
	})
</script>
<style lang="scss" scoped>
//底部盒子
.tabs_view {
    :deep(.el-tabs__header) {
        background: transparent;
        border: none;
    }
}
</style>