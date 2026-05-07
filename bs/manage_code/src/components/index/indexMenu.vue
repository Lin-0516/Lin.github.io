<template>
	<div class="menu_wrapper" :class="{'menu_wrapper_collapse':collapse}">
		<el-scrollbar wrap-class="scrollbar-wrapper" class="menu_scrollbar">
			<el-menu :default-openeds="[]" :unique-opened="true" :default-active="menuIndex" class="menu_view"
				:collapse="collapse">
				<el-menu-item class="first-item" index="/" @click="menuHandler('')">
					<i class="iconfont icon-zhuye2" v-if="collapse?true:true"></i>
					<template #title>
						<span>首页</span>
					</template>
				</el-menu-item>
                <template v-for=" (item,index) in menuList.backMenu">
                    <el-sub-menu   class="first-item" :index="item.menu">
                        <template #title>
                            <i class="iconfont" :class="item.fontClass" v-if="collapse?true:true"></i>
                            <span>{{ item.menu }}</span>
                        </template>
                        <el-menu-item class="second-item" v-for=" (child,sort) in item.child" :key="sort"
                            :index="getPath(child.classname||child.tableName,child.menuJump)"
                            @click="menuHandler(child.classname||child.tableName,child.menuJump)">{{ child.menu }}
                        </el-menu-item>
                    </el-sub-menu>
                </template>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script setup>
	import menu from '@/utils/menu'
	import {
		ref,
		toRefs,
		getCurrentInstance,
		nextTick,
        watch
	} from 'vue';
	import { useStore } from 'vuex'
	const store = useStore()
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	//props
	const props = defineProps({
		collapse: Boolean
	})
	const {
		collapse
	} = toRefs(props)
	//data
	const menuList = ref([])
	const role = ref('')
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	const init = () => {
		const menus = menu.list()
		if (menus) {
			menuList.value = menus
		}
		role.value = context?.$toolUtil.storageGet('role')

		for (let i = 0; i < menuList.value.length; i++) {
			if (menuList.value[i].roleName == role.value) {
				menuList.value = menuList.value[i];
				menuList.value.backMenu = menuList.value.backMenu.filter(item=>{
					return item.child.length && item.child[0].tableName!="board"
				})
				break;
			}
		}
	}
    // 默认菜单index
    const menuIndex = ref('')
    watch(() => context.$router.currentRoute.value,(value, oldValue) => {
        menuIndex.value = decodeURIComponent(value.fullPath)
    },{
        immediate:true
    })
	const getPath = (name,menuJump) => {
        if(name == 'center'){
            return `/${role.value}Center`
        }else if(name == 'storeup'){
            return `/storeup?type=${menuJump}`
        }else if(name == 'exampaper' && menuJump == '12'){
            return '/exampaperlist'
        }else if(name == 'examrecord' && menuJump == '22'){
            return '/examfailrecord'
        }else{
            return `/${name}${menuJump?'?menuJump='+menuJump:''}`
        }
	}
    const menuHandler = (name,menuJump) => {
        let url = getPath(name,menuJump)
        context.$router.push(url)
    }
	init()
</script>

<style>
.menu_wrapper ul.el-menu.el-menu--horizontal.menu_view {
    border-top: 1px solid #f0f0f0;
    font-size: 16px;
    line-height: 50px;
    height: 50px;
}

.menu_wrapper .first-item {
    position: relative;
}

.menu_wrapper .is-active.first-item {
    
}


.menu_wrapper .el-menu--horizontal>.el-menu-item.is-active,.menu_wrapper .el-menu--horizontal>.el-sub-menu.is-active .el-sub-menu__title {
    color: #555!important;
    font-size: inherit;
}

.menu_wrapper .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,.menu_wrapper  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    background: var(--theme-light4);
}

.menu_wrapper .el-menu-item {
    line-height: inherit;
}

.menu_wrapper .first-item:hover {
    top: -1px;
}

.menu_wrapper {
    --el-menu-bg-color: #fff;
    --el-menu-active-color: var(--theme);
    --el-menu-hover-bg-color: rgb(1,153,132,0.2);
    position: fixed;
    height: calc(100% - 84px);
    /* width: 200px; */
}

.menu_wrapper .el-menu {
    border-right: none;
    width: 200px;
}

.menu_wrapper .el-menu--collapse .iconfont {
    font-size: 20px;
    color: var(--theme);
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #f0f5f2;
    border: 1px solid var(--theme);
    border-radius: 10px;
}

.menu_wrapper .el-menu--collapse {
    width: 110px;
}

.menu_wrapper .el-menu--collapse .first-item {
    margin: 10px 0;
}

.menu_wrapper .el-menu--collapse .is-active .iconfont {
    background: var(--theme);
    color: #fff!important;
}

.menu_wrapper .is-active .el-sub-menu__title {
    color: var(--theme);
}

.menu_wrapper .el-menu--collapse>.el-sub-menu>.el-sub-menu__title>span {
    visibility: unset!important;
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 110px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 10px;
    color: var(--theme);
    text-align: center;
}

.menu_wrapper .el-menu--collapse .el-sub-menu__title {
    padding: 10px 30px 20px;
    height: 90px;
    position: relative;
}

.menu_wrapper .el-menu--collapse .el-menu-item.first-item>div {
    width: 50px;
    position: relative;
    padding: 20px 0;
}

.menu_wrapper .el-menu--collapse .el-menu-item.first-item {
    height: 90px;
    width: 110px;
    padding: 20px 30px;
}
</style>