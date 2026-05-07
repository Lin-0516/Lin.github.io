<template>
	<div class="list-page">
        <div class="breadcrumb-wrapper" style="width: 100%;">
            <div class="bread_view">
                <el-breadcrumb separator="Ξ" class="breadcrumb">
                    <el-breadcrumb-item class="second_breadcrumb" :to="{ path: `/index/${sessionTable}Center` }">个人中心</el-breadcrumb-item>
                    <el-breadcrumb-item class="second_breadcrumb">{{formName}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="back_view" v-if="centerType">
                <el-button class="back_btn" @click="backClick">返回</el-button>
            </div>
        </div>

		<div class="list_search">
			<div class="search_view">
				<div class="search_label">
					名称：
				</div>
				<div class="search_box">
					<el-input class="search_inp" v-model="searchQuery.name" placeholder="名称" style="width: 100%;"
						size="small" clearable>
					</el-input>
				</div>
			</div>
			<div class="search_btn_view">
				<el-button class="search_btn" type="primary" @click="searchClick">搜索</el-button>
			</div>
		</div>



                <div class="data_view">
                    <div class="item" v-for="(item,index) in list" :key="index" @click="detailClick(item)" style="display: block;">
						<div class="data_img_box" v-if="item.picture && item.picture.substr(0,4)=='http'" style="height: 300px">
							<img class="data_img" :src="item.picture" style="height: 100%;" >
						</div>
						<div class="data_img_box" v-else-if="item.picture" style="height: 300px">
							<img class="data_img" :src="baseUrl + item.picture.split(',')[0]" style="height: 100%;">
						</div>
                        <div class="data_img_box" v-else style="height: 300px">
                            <img class="data_img" src="@/assets/image.webp" style="height: 100%;object-fit: contain;">
                        </div>
						<div class="data_content" style="padding: 10px">
							<div class="data_title">{{item.name}}</div>
						</div>
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
</template>

<script setup>
	import {
		ref,
		getCurrentInstance,
		nextTick,
	} from 'vue';
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const router = useRouter()
	const route = useRoute()
    const sessionTable = localStorage.getItem('frontSessionTable')
    const baseUrl = ref(context.$config.url)
	//基础信息
	const tableName = 'storeup'
	const formName = ref('')
	const list = ref([])
	const listQuery = ref({
		page: 1,
		limit: 20,
        sort: 'id',
        order: 'desc'
	})
	const total = ref(0)
	const listLoading = ref(false)
	//权限验证
	const btnAuth = (e, a) => {
		return context?.$toolUtil.isAuth(e, a)
	}
	//判断是否从个人中心跳转
	const centerType = ref(false)
	//返回
	const backClick = () => {
		router.push(`/index/${sessionTable}Center`)
	}
	const init = () => {
		if (route.query.centerType) {
			centerType.value = true
		}

        if(route.query.type=='1'){
            formName.value = '我的收藏'
        }
		getList()
	}
	//搜索
	const searchQuery = ref({})

	const searchClick = () => {
		listQuery.value.page = 1
		getList()
	}
	//分页
	const layouts = ref(["total","prev","pager","next","sizes","jumper"])
	const sizeChange = (size) => {
		listQuery.value.limit = size
		getList()
	}
	const currentChange = (page) => {
		listQuery.value.page = page
		getList()
	}
	//分页
	//列表
	const getList = () => {
		listLoading.value = true
		let params = JSON.parse(JSON.stringify(listQuery.value))
		if (searchQuery.value.name && searchQuery.value.name != '') {
			params.name = '%' + searchQuery.value.name + '%'
		}
		if (route.query.type) {
			params.type = route.query.type
		}
		context?.$http({
			url: `${tableName}/page`,
			method: 'get',
			params: params
		}).then(res => {
			listLoading.value = false
			list.value = res.data.data.list
			total.value = Number(res.data.data.total)
		})
	}
	const detailClick = (item) => {
        if(item.tablename == 'news'){
            router.push(`newsList?id=${item.refid}`)
            return
        }
		router.push(`${item.tablename}Detail?id=${item.refid}`)
	}
	init()
</script>
<style lang="scss" scoped>
</style>