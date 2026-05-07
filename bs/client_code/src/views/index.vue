<template>
	<div id="index" class="main-containers">
        <div class="index_top">
<div class="top-header">
    <div class="projectName">{{projectName}}</div>





				<el-button v-if="!Token" class="login" @click="loginClick">
                    <el-icon><User/></el-icon>登录
				</el-button>

				<div class="user" v-if="Token">
					<el-dropdown class="avatar-container" trigger="hover">
						<div class="avatar-wrapper">
							<img class="user-avatar" :src="store.getters['user/avatar']" style="width: 50px">
							<div class="nickname">{{store.getters['user/showName']}}</div>
							<el-icon class="el-icon-arrow-down">
								<arrow-down />
							</el-icon>
						</div>
						<template #dropdown>
							<el-dropdown-menu class="user-dropDown" slot="dropdown">
								<el-dropdown-item @click="menuHandler('center')" class="center">
									<span>个人中心</span>
								</el-dropdown-item>
								<el-dropdown-item @click="loginOut" class="loginOut">
									<span>退出登录</span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>

</div>
            <div class="menu-wrapper">
                <el-scrollbar wrap-class="scrollbar-wrapper" class="menu_scrollbar">
                    <el-menu :unique-opened="true" :default-active="menuIndex"
                         class="menu_view" mode="horizontal" @select="menuChange"
                         :key="menuIndex"  :ellipsis="false">
                        <el-menu-item class="first-item" index="/index/home" @click="menuHandler('/')">
                            <i class="iconfont icon-zhuye2"></i>
                            <template #title>
                                <span>首页</span>
                            </template>
                        </el-menu-item>
                        <template v-for="(menu,index) in menuList" :key="menu.menu">
                            <el-sub-menu v-if="menu.child.length>1" :index="menu.name" class="first-item" :teleported="true">
                                <template #title>
                                    <i class="iconfont" :class="menu.icon"></i>
                                    <span>{{ menu.name }}</span>
                                </template>
                                <el-menu-item class="second-item" v-for=" (child,index1) in menu.child" :key="index1"
                                              :index="child.url" @click="menuHandler(child.url)">{{ child.name }}
                                </el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :index="menu.child[0].url" class="first-item" @click="menuHandler(menu.child[0].url)">
                                <i class="iconfont" :class="menu.icon"></i>
                                <template #title>
                                    <span>{{menu.child[0].name}}</span>
                                </template>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </el-scrollbar>
            </div>

			<div class="rotation_view" >
				<mySwiper :type="3" :data="rotationList" :autoHeight="false" :autoplay="true"
					:loop="false" :navigation="false" :pagination="true"
					paginationType="2" :scrollbar="false" slidesPerView="1"
					spaceBetween="20" :centeredSlides="false"
					:freeMode="false" effectType="0"
					direction="horizontal">
					<template #default="scope">
						<img :src="scope.row.value?baseUrl + scope.row.value:''" @click="carouselClick(scope.row.url)">
					</template>
				</mySwiper>
			</div>

        </div>
		<el-scrollbar class="contain_view body-containers">
			<router-view :key="routerKey"/>
			<el-backtop :right="100" :bottom="100" />
			<div class="bottom_view ql-snow ql-editor">
                
			</div>
		</el-scrollbar>
	</div>
</template>
<script setup>
	import menu from '@/utils/menu'
	import axios from 'axios'
    const moment = window.moment
	import {
		ref,
		onBeforeUnmount,
        onMounted,
		getCurrentInstance,
		nextTick,
		computed,
		watch,
        provide
	} from 'vue';
	import {
		useRouter,
		useRoute
	} from 'vue-router';
	import {
		useStore
	} from 'vuex';
	const store = useStore()
	const router = useRouter()
	const route = useRoute();
	const context = getCurrentInstance()?.appContext.config.globalProperties;
    const baseUrl = ref(context.$config.url)
    const projectName = ref(`基于Python的肉鹅价格数据可视化分析`)
	const Token = ref('')
	if(localStorage.getItem('frontToken') && !store.getters['user/session'].id){
		store.dispatch('user/getSession')
	}
	onBeforeUnmount(() => {
	})
	// 获取默认菜单index
	const setMenuIndex = (path)=>{
        if(path){
            menuIndex.value = path.replace('Detail','List')
        }else{
            menuIndex.value = ''
        }
	}
	// 默认菜单index
	const menuIndex = ref('')
    const routerKey = ref(Math.random())
	watch(() => router.currentRoute.value,(value, oldValue) => {
		Token.value = context?.$toolUtil.storageGet('frontToken')
        if(value.path==oldValue?.path){
            //改变路由query时重新加载router-view
            routerKey.value = Math.random()
        }
        if(value.query.centerType){
            setMenuIndex()
        }else{
            setMenuIndex(value.path)
        }
	},{
		immediate:true
	})
	const init = () => {
		// 获取菜单
		getMenu()
		// 赋值token
		Token.value = context?.$toolUtil.storageGet('frontToken')
		// 轮播图
		getRotationList()
		if(Token.value){
			getSession()
		}
	}
	// 切换菜单保存index
	const menuChange = (e)=>{
		if(e=='chat')return
	}
	// 轮播图
	const rotationList = ref([])
	const getRotationList = () => {
		context?.$http({
			url: 'config/list',
			method: 'get',
			params: {
				page: 1,
				limit: 3,
                name: '%swiper%',
			}
		}).then(res => {
			rotationList.value = res.data.data.list
		})
	}

    // 轮播图跳转
    const carouselClick = (url)=>{
        if (url) {
            if (url.startsWith('http')) {
                window.open(url)
            } else {
                context.$router.push(url)
            }
        }
    }
	const menuList = ref([])
	const role = ref('')
	const getMenu = () => {
		let params = {
			page: 1,
			limit: 1,
			sort: 'id',
		}
		context?.$http({
			url: "menu/list",
			method: "get",
			params: params
		}).then(res => {
			context?.$toolUtil.storageSet("menus", res.data.data.list[0].menujson);
		})
		menuList.value = context?.$config.menuList
	}
	const loginClick = () => {
		context?.$toolUtil.storageSet('toPath',window.history.state.current)
		router.push('/login')
	}
	const loginOut = () => {
        store.dispatch('user/loginOut')
		context?.$toolUtil.message('退出成功', 'success')
		context?.$toolUtil.storageClear()
		router.replace('/index/home')
		Token.value = ''
	}
	//菜单跳转
	const menuHandler = (name) => {
		if (name == 'center') {
			name = `${context?.$toolUtil.storageGet('frontSessionTable')}Center`
			menuChange('center')
		}
		router.push(name)
	}
	// 获取用户信息
	const getSession = () =>{
		context?.$http({
			url: `${context?.$toolUtil.storageGet('frontSessionTable')}/session`,
			method:'get'
		}).then(res=>{
			context?.$toolUtil.storageSet('userid',res.data.data.id)
			if(context?.$toolUtil.storageGet('frontSessionTable') == 'yonghu'){
				context?.$toolUtil.storageSet("frontName", res.data.data.zhanghao)
			}
			if(context?.$toolUtil.storageGet('frontSessionTable') == 'yonghu'){
				context?.$toolUtil.storageSet('headportrait',res.data.data.touxiang||'')
			}
		})
	}
	init()
</script>
<style lang="scss">
    .el-aside {
        transition: width 0.15s;
        -webkit-transition: width 0.15s;
        -moz-transition: width 0.15s;
        -webkit-transition: width 0.15s;
        -o-transition: width 0.15s;
    }
    .chat-badge{
        position: absolute;
        background: red;
        color: rgb(255, 255, 255);
        font-size: 12px;
        border-radius: 14px;
        padding:0 4px;
        height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -4px;
        right: -10px;
    }
.index_top .top-header {
    display: flex;
    align-items: center;
    padding: 10px 30px;
    gap: 16px;
}

.index_top .projectName {
    margin-right: auto;
    font-size: 24px;
    font-weight: 700;
}

.index_top .weather {
    display: flex;
}

.index_top .avatar-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
}

.index_top img.user-avatar {
    width: 40px!important;
    height: 40px;
}
.bottom_view {
    min-height: 100px;
    background: #333;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rotation_view .swiper-slide img {width: 100%;height: 100%;object-fit: cover;}

.rotation_view .swiper {
    height: 25vw;
}
.breadcrumb-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
}
</style>