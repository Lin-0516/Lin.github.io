<template>
	<div class="top_view">
						<div class="collapse_view" @click="toggleClick" :class="{'is_collapse':collapse}">
						<el-icon class="icons">
							<Fold v-if="!collapse" />
							<Expand v-else />
						</el-icon>
				</div>

<div class="projectName">{{projectName}}</div>



			<el-dropdown class="avatar-container" trigger="hover">
				<div class="avatar-wrapper">
					<div class="nickname">欢迎 {{showName}}</div>
					<img class="user-avatar" :src="store.getters['user/avatar']">
					<el-icon class="el-icon-arrow-down">
						<arrow-down />
					</el-icon>
				</div>
				<template #dropdown>
					<el-dropdown-menu class="user-dropDown" slot="dropdown">
						<el-dropdown-item class="center" @click="centerClick" >
							个人中心
						</el-dropdown-item>
						<el-dropdown-item class="password" @click="updatepasswordClick">
							修改密码
						</el-dropdown-item>
						<el-dropdown-item class="front">
							<span style="display:block;" @click="frontClick">系统前台</span>
						</el-dropdown-item>
						<el-dropdown-item v-if="btnAuth('board','查看')">
							<span style="display:block;" @click="boardClick">数据看板</span>
						</el-dropdown-item>
						<el-dropdown-item class="backUp" v-if="role=='users'">
							<span style="display:block;" @click="backUp">数据备份</span>
						</el-dropdown-item>
						<el-dropdown-item class="dataAnalysis" v-if="role=='users'">
							<span style="display:block;" @click="dataAnalysis">数据分析</span>
						</el-dropdown-item>
						<el-dropdown-item class="loginOut">
							<span style="display:block;" @click="onLogout">退出登录</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>


	</div>
</template>

<script setup>
	import axios from 'axios'
	const moment = window.moment
	import {
		toRefs,
		defineEmits,
		getCurrentInstance,
		ref,
		onBeforeUnmount,
		onMounted,
		computed,
	} from 'vue';
	import {
		useRouter,
		useRoute
	} from 'vue-router';
	const route = useRoute()
	const router = useRouter()
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const baseUrl = ref(context.$config.url)
	const projectName = context.$project.projectName
	const emit = defineEmits(['collapseChange'])
	const role = context.$toolUtil.storageGet('sessionTable')
	const adminName = context.$toolUtil.storageGet('adminName')
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}

	const props = defineProps({
		collapse: Boolean
	})
	const {collapse} = toRefs(props)

	//获取用户信息
	import { useStore } from 'vuex'
	const store = useStore()
	const user = computed(()=>store.getters['user/session'])
	const avatar = ref(store.state.user.avatar)
	const showName = computed(()=>{
		return adminName
	})
	store.dispatch('user/getSession').then(()=>{
		avatar.value = store.state.user.avatar
	})
	const toggleClick = () => {
		emit('collapseChange')
	}
	// 数据备份
	const backUp = () =>{
		ElMessageBox.confirm(`是否备份数据库?`, '数据备份提示', {
			confirmButtonText: '是',
			cancelButtonText: '否',
			type: 'warning',
		}).then(()=>{
			axios.get(process.env.VUE_APP_BASE_API + '/mysqldump', {
			    headers: {
			      token: context?.$toolUtil.storageGet("Token")
			    },
			    responseType: "blob"
			  }).then(({data})=>{
				const binaryData = [];
				binaryData.push(data);
				const objectUrl = window.URL.createObjectURL(new Blob(binaryData, {
				    type: 'application/pdf;chartset=UTF-8'
				}))
				const a = document.createElement('a')
				a.href = objectUrl
				a.download = 'mysql.dmp'
				// a.click()
				// 下面这个写法兼容火狐
				a.dispatchEvent(new MouseEvent('click', {
				    bubbles: true,
				    cancelable: true,
				    view: window
				}))
				window.URL.revokeObjectURL(data)
				message.message("数据备份成功")
			})
		}).catch(_ => {})
	}
	const dataAnalysis = ()=>{
				context.$confirm('是否进行大数据分析?', '数据分析提示').then(() => {
					let loading = null;
					loading = context.$loading({
						text: '数据分析中，请稍等...'
					})
					context.$http({
						url: '/hadoop/analyze',
						method: "get"
					}).then(({
						data
					}) => {
						if(loading) loading.close()
						if(data.code==0){
							context.$message.success('数据分析完成');
						}
					},err=>{
						if(loading) loading.close()
					});
				});
	}
	// 退出登录
	const onLogout = () => {
		let toolUtil = context?.$toolUtil
		store.dispatch('delAllCachedViews')
		store.dispatch('delAllVisitedViews')
        store.dispatch('user/loginOut')
		toolUtil.storageClear()
		router.replace({
			name: "login"
		});
	}
	// 跳转前台
	const frontClick = () => {
        window.open(`${context.$config.url}client/index.html#/index/home`,'_blank')
	}
	// 跳转看板
	const boardClick = () => {
		router.push(`/dashBoard`)
	}
	// 个人中心
	const centerClick = () => {
		router.push(`/${role}Center`)
	}
	// 修改密码
	const updatepasswordClick = () => {
		router.push(`/updatepassword`)
	}
</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
/* 消息徽标容器 */
.message-badge-wrapper {
    margin-right: 15px;
    order: 10;
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.message-badge-wrapper .message-icon {
    color: inherit;
    transition: opacity 0.3s;
}

.message-badge-wrapper:hover .message-icon {
    opacity: 0.8;
}

.message-badge-wrapper .message-badge {
    display: flex;
    align-items: center;
}

/* 徽标数字样式 */
.message-badge-wrapper :deep(.el-badge__content) {
    border: 2px solid #fff;
    font-size: 12px;
    font-weight: bold;
}
.main-container {
    margin-top: 84px;
    margin-left: 200px;
    transition: margin 500ms;
}

.main-container.main_view-collapse {
    margin-left: 110px;
}
.top_view {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 20px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--theme);
    color: #fff;
    z-index: 9;
}

.top_view .projectName {position: relative;padding-left: 20px;line-height: 44px;margin-right: auto;font-size: 24px;}

.top_view .currentDate {
    margin: 0 10px;
}

.top_view .notice-btn {
    margin: 0 10px;
}

.top_view img.user-avatar {
    width: 40px;
    height: 40px;
}

.top_view .avatar-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
}

.top_view .nickname {
    order: 2;
}

.top_view .avatar-wrapper>.el-icon {
    order: 3;
}
.top_view iframe {
    width: 220px;
    height: 18px;
}

.top_view .collapse_view {
    font-size: 24px;
}

.top_view .avatar-container {
    color: #fff;
}
</style>