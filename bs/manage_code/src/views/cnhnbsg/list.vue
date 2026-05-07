<template>
	<div>
		<div class="center_view">
			<div class="list_search_view">
				<el-form :model="searchQuery" class="search_form" >
					<div class="search_view">
						<div class="search_label">
							标题：
						</div>
						<div class="search_box">
							<el-input class="search_inp" v-model="searchQuery.title" placeholder="标题"
								clearable>
							</el-input>
						</div>
					</div>
					<div class="search_btn_view">
						<el-button class="search_btn" type="primary" @click="searchClick()" size="small">搜索</el-button>
					</div>
				</el-form>
				<div class="btn_view">
					<el-button class="add_btn" type="success" @click="addClick" v-if="btnAuth('cnhnbsg','新增')">
						新增
					</el-button>
					<el-button class="del_btn" type="danger" :disabled="selRows.length?false:true" @click="delClick(null)"  v-if="btnAuth('cnhnbsg','删除')">
						删除
					</el-button>
					<el-button class="other_btn" type="default" @click="spiderClick" v-if="btnAuth('cnhnbsg','爬取')">
						爬取数据
					</el-button>
					<el-button class="other_btn" type="default" @click="cleanClick()">
						<i class="iconfont "></i>
						数据清洗
					</el-button>
                    <el-button class="statis_btn" type="warning" @click="echartClick1" v-if="btnAuth('cnhnbsg','标签统计')">
                        标签统计
                    </el-button>
                    <el-button class="statis_btn" type="warning" @click="echartClick2" v-if="btnAuth('cnhnbsg','起批量统计')">
                        起批量统计
                    </el-button>
                    <el-button class="statis_btn" type="warning" @click="echartClick3" v-if="btnAuth('cnhnbsg','价格统计')">
                        价格统计
                    </el-button>
                    <el-button class="statis_btn" type="warning" @click="echartClick4" v-if="btnAuth('cnhnbsg','询价统计')">
                        询价统计
                    </el-button>
                    <el-button class="statis_btn" type="warning" @click="echartClick5" v-if="btnAuth('cnhnbsg','类别统计')">
                        类别统计
                    </el-button>
				</div>
			</div>
			<el-table
				v-loading="listLoading" :stripe='false'
				@selection-change="handleSelectionChange"
				ref="table"
				v-if="btnAuth('cnhnbsg','查看')"
				:data="list"
				@row-click="listChange">
				<el-table-column :resizable='true' align="left" header-align="left" type="selection" width="55" />
				<el-table-column label="序号" width="70" :resizable='true' align="left" header-align="left">
					<template #default="scope">{{ (listQuery.page-1)*listQuery.limit+scope.$index + 1}}</template>
				</el-table-column>
				<el-table-column min-width="140"
					:resizable='true'
					:sortable='false'
					align="left"
					header-align="left"
					prop="title"
					label="标题">
					<template #default="scope">
						{{scope.row.title}}
					</template>
				</el-table-column>
				<el-table-column label="图片" min-width="140" width="120" :resizable='true' :sortable='false' align="left" header-align="left">
					<template #default="scope">
						<div v-if="scope.row.imgurl">
							<el-image v-if="scope.row.imgurl.substring(0,4)=='http'" preview-teleported
								:preview-src-list="[scope.row.imgurl.split(',')[0]]"
								:src="scope.row.imgurl.split(',')[0]" style="width:100px;height:100px"></el-image>
							<el-image v-else preview-teleported
								:preview-src-list="[$config.url+scope.row.imgurl.split(',')[0]]"
								:src="$config.url+scope.row.imgurl.split(',')[0]" style="width:100px;height:100px">
							</el-image>
						</div>
						<div v-else>无图片</div>
					</template>
				</el-table-column>
				<el-table-column min-width="140"
					:resizable='true'
					:sortable='false'
					align="left"
					header-align="left"
					prop="jiage"
					label="价格">
					<template #default="scope">
						{{scope.row.jiage}}
					</template>
				</el-table-column>
				<el-table-column min-width="140"
					:resizable='true'
					:sortable='false'
					align="left"
					header-align="left"
					prop="qipi"
					label="起批量">
					<template #default="scope">
						{{scope.row.qipi}}
					</template>
				</el-table-column>
				<el-table-column min-width="140"
					:resizable='true'
					:sortable='false'
					align="left"
					header-align="left"
					prop="turnover"
					label="成交">
					<template #default="scope">
						{{scope.row.turnover}}
					</template>
				</el-table-column>
				<el-table-column min-width="140"
					:resizable='true'
					:sortable='false'
					align="left"
					header-align="left"
					prop="xunjia"
					label="询价">
					<template #default="scope">
						{{scope.row.xunjia}}
					</template>
				</el-table-column>
				<el-table-column min-width="140"
					:resizable='true'
					:sortable='false'
					align="left"
					header-align="left"
					prop="seller"
					label="卖家">
					<template #default="scope">
						{{scope.row.seller}}
					</template>
				</el-table-column>
				<el-table-column min-width="140"
					:resizable='true'
					:sortable='false'
					align="left"
					header-align="left"
					prop="address"
					label="发货地址">
					<template #default="scope">
						{{scope.row.address}}
					</template>
				</el-table-column>
				<el-table-column min-width="140"
					:resizable='true'
					:sortable='false'
					align="left"
					header-align="left"
					prop="pingjia"
					label="评价">
					<template #default="scope">
						{{scope.row.pingjia}}
					</template>
				</el-table-column>
				<el-table-column min-width="140"
					:resizable='true'
					:sortable='false'
					align="left"
					header-align="left"
					prop="leibie"
					label="类别">
					<template #default="scope">
						{{scope.row.leibie}}
					</template>
				</el-table-column>
				<el-table-column min-width="140"
					:resizable='true'
					:sortable='false'
					align="left"
					header-align="left"
					prop="city"
					label="城市">
					<template #default="scope">
						{{scope.row.city}}
					</template>
				</el-table-column>
				<el-table-column min-width="140"
					:resizable='true'
					:sortable='false'
					align="left"
					header-align="left"
					prop="tags"
					label="标签">
					<template #default="scope">
						{{scope.row.tags}}
					</template>
				</el-table-column>
				<el-table-column label="操作" class-name="operation-cell" width="300" fixed="right" :resizable='true' :sortable='false' align="left" header-align="left">
					<template #default="scope">
						<el-button class="edit_btn" type="primary" @click="editClick(scope.row.id,scope.row)" v-if=" btnAuth('cnhnbsg','修改')">
							修改						</el-button>
						<el-button class="del_btn" type="danger" @click="delClick(scope.row.id,scope.row)"  v-if="btnAuth('cnhnbsg','删除')">
							删除						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				background
				:layout="layouts.join(',')"
				:total="total"
				:page-size="listQuery.limit"
                v-model:current-page="listQuery.page"
				prev-text="<"
				next-text=">"
				:hide-on-single-page="false"
				:page-sizes="[10, 20, 30, 40, 50, 100]"
				@size-change="sizeChange"
				@current-change="currentChange"  />
		</div>
		<formModel ref="formRef" @formModelChange="formModelChange"></formModel>
		<!-- 统计图弹窗 -->
		<el-dialog v-model="echartVisible" modal-class="edit_form_modal" class="edit_form" title="统计图" width="70%">
			<el-tabs v-model="echartActive" class="demo-tabs" @tab-change="echartTabClick" type="card">
                <el-tab-pane label="标签统计" name="1" v-if="btnAuth('cnhnbsg','标签统计')"></el-tab-pane>
                <el-tab-pane label="起批量统计" name="2" v-if="btnAuth('cnhnbsg','起批量统计')"></el-tab-pane>
                <el-tab-pane label="价格统计" name="3" v-if="btnAuth('cnhnbsg','价格统计')"></el-tab-pane>
                <el-tab-pane label="询价统计" name="4" v-if="btnAuth('cnhnbsg','询价统计')"></el-tab-pane>
                <el-tab-pane label="类别统计" name="5" v-if="btnAuth('cnhnbsg','类别统计')"></el-tab-pane>
			</el-tabs>
			<div v-if="echartActive==1">
				<div id="tagsEchart1" style="width:100%;height:600px;"></div>
			</div>
			<div v-if="echartActive==2">
				<div id="qipiEchart2" style="width:100%;height:600px;"></div>
			</div>
			<div v-if="echartActive==3">
				<div id="jiageEchart3" style="width:100%;height:600px;"></div>
			</div>
			<div v-if="echartActive==4">
				<div id="xunjiaEchart4" style="width:100%;height:600px;"></div>
			</div>
			<div v-if="echartActive==5">
				<div id="leibieEchart5" style="width:100%;height:600px;"></div>
			</div>
			<template #footer>
				<span class="formModel_btn_box">
					<el-button class="cancel_btn" @click="echartVisible=false">取消</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
	import axios from 'axios'
	const moment = window.moment
	import {
		reactive,
		ref,
		getCurrentInstance,
		nextTick,
		onMounted,
		watch,
		computed,
		inject
	} from 'vue'
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
	import formModel from './formModel.vue'
	//基础信息
	const tableName = 'cnhnbsg'
	const formName = '农产品肉鹅'
	const route = useRoute()
    const router = useRouter()
	const role = context.$toolUtil.storageGet('sessionTable')
	//基础信息
	onMounted(()=>{
	})
	//列表数据
	const list = ref(null)
	const table = ref(null)
	const listQuery = ref({
		page: 1,
		limit: 20,
		sort: 'id',
		order: 'desc'
	})
	const searchQuery = ref({})
	const selRows = ref([])
	const listLoading = ref(false)
	const listChange = (row) =>{
		nextTick(()=>{
			//table.value.clearSelection()
			table.value.toggleRowSelection(row)
		})
	}
	//列表
	const getList = () => {
		listLoading.value = true
		let params = JSON.parse(JSON.stringify(listQuery.value))
		params['sort'] = 'id'
		params['order'] = 'desc'
		if(searchQuery.value.title&&searchQuery.value.title!=''){
			params['title'] = '%' + searchQuery.value.title + '%'
		}
		context.$http({
			url: `${tableName}/page`,
			method: 'get',
			params: params
		}).then(res => {
			listLoading.value = false
			list.value = res.data.data.list
			total.value = Number(res.data.data.total)
		})
	}
	//删
	const delClick = (id,row={}) => {
		let ids = []
		if (id) {
			ids = [id]
		} else {
			if (selRows.value.length) {
				for (let x in selRows.value) {
					ids.push(selRows.value[x].id)
				}
			} else {
				return false
			}
		}
		ElMessageBox.confirm(`是否删除选中${formName}`, '提示', {
			confirmButtonText: '是',
			cancelButtonText: '否',
			type: 'warning',
		}).then(() => {
			context.$http({
				url: `${tableName}/delete`,
				method: 'post',
				data: ids
			}).then(res => {
				context?.$toolUtil.message('删除成功', 'success',()=>{
					getList()
				})
			})
		}).catch(_ => {})
	}
	//多选
	const handleSelectionChange = (e) => {
		selRows.value = e
	}
	//列表数据
	//分页
	const total = ref(0)
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
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	//搜索
	const searchClick = () => {
		listQuery.value.page = 1
		getList()
	}
	//表单
	const formRef = ref(null)
	const formModelChange=()=>{
		searchClick()
	}
	const addClick = ()=>{
		formRef.value.init()
	}
	const editClick = (id=null,row={})=>{
		if(id){
			formRef.value.init(id,'edit')
			return
		}
		if(selRows.value.length){
			formRef.value.init(selRows.value[0].id,'edit')
		}
	}

	const infoClick = (id=null)=>{
		if(id){
			formRef.value.init(id,'info')
		}
		else if(selRows.value.length){
			formRef.value.init(selRows.value[0].id,'info')
		}
	}
	// 表单
	// 预览文件
	const preClick = (file) =>{
		if(!file){
			context?.$toolUtil.message('文件不存在','error')
		}
		window.open(context?.$config.url + file)
	}
	// 下载文件
	const download = (file) => {
		if(!file){
			context?.$toolUtil.message('文件不存在','error')
		}
		let arr = file.replace(new RegExp('file/', "g"), "")
		axios.get((location.href.split(context?.$config.name).length>1 ? location.href.split(context?.$config.name)[0] :'') + context?.$config.name + '/file/download?fileName=' + arr, {
			headers: {
				token: context?.$toolUtil.storageGet('Token')
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
    import '@/assets/js/echarts-theme'
	//判断是否有统计图筛选权限
	const changeStatQuery = (arr)=>{
		if(!arr){
			return true
		}
		let role = localStorage.getItem('role')
		for(let x in arr){
			if(arr[x] == role) {
				return true
			}
		}
		return false
	}
	// 统计图1
	const echartVisible = ref(false)
	const echartClick1 = ()=>{
		if(!route.path.endsWith('Analysis')){
			echartActive.value = '1'
			echartVisible.value = true
		}
		nextTick(async ()=>{
			let dom = document.getElementById("tagsEchart1")
			if(!dom)return
			var tagsEchart1 = echarts.init(dom,'theme');
			let params = {}
			context.$http({
				url: `${tableName}/group/tags?order=desc`,
				method: 'get',
				params
			}).then(res=>{
				let obj = res.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<obj.length;i++){
				    xAxis.push(obj[i].tags);
				    yAxis.push(parseFloat((obj[i].total)));
                    dataList.push({
				        value: parseFloat((obj[i].total)),
				        name: obj[i].tags				    })
				}
				var option = {};
				option = {
    title:{
        show:false,
        text: '标签统计',
        left: 'center'
    },
    legend: {
        orient: 'horizontal',
        type: 'scroll', // 启用滚动条
        left: 'center',
        padding:[20,0,0,0]
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
    },
    series: [
        {
            left: '10%',
            type: 'pie',
            radius: '50%',
            center: ['50%', '60%'],
            data: dataList.slice(0,12), 
            emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}
                option.series[0].radius = ['25%', '55%']
                option.series[0].roseType = 'area'
				// 使用刚指定的配置项和数据显示图表。
				tagsEchart1.setOption(option);
				  //根据窗口的大小变动图表
				window.onresize = function() {
				    tagsEchart1.resize();
				};
			})
		})
	}
	// 统计图2
    const echartActive = ref('1')
    const echartTabClick = () =>{
		if(echartActive.value==1){
			echartClick1()
		}
		else if(echartActive.value==2){
			echartClick2()
		}
		else if(echartActive.value==3){
			echartClick3()
		}
		else if(echartActive.value==4){
			echartClick4()
		}
		else if(echartActive.value==5){
			echartClick5()
		}
	}
	const echartClick2 = ()=>{
		if(!route.path.endsWith('Analysis')){
			echartActive.value = '2'
			echartVisible.value = true
		}
		nextTick(async ()=>{
			let dom = document.getElementById("qipiEchart2")
			if(!dom)return
			var qipiEchart2 = echarts.init(dom,'theme');
			let params = {}
			context.$http({
				url: `${tableName}/group/qipi?order=desc`,
				method: 'get',
				params
			}).then(res=>{
				let obj = res.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<obj.length;i++){
				    xAxis.push(obj[i].qipi);
				    yAxis.push(parseFloat((obj[i].total)));
                    dataList.push({
				        value: parseFloat((obj[i].total)),
				        name: obj[i].qipi				    })
				}
				var option = {};
				option = {
    title: {
        show:false,
        text: '起批量统计',
        left: 'center'
    },
    grid:{
        containLabel:true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
    xAxis: {
        data: xAxis.slice(0,12), 
        type: 'category',
        axisLabel: {
        "interval": 0,
        "rotate": 30,
        "width": 120,
        "overflow": "truncate",
        "ellipsis": "..."
        }
    },
    yAxis: {
        type: 'value',
        "minInterval": 1
    },
    series:{
        data: yAxis.slice(0,12), 
        type: 'bar',
        colorBy:'data',
        barWidth: 40
    }
}
				// 使用刚指定的配置项和数据显示图表。
				qipiEchart2.setOption(option);
				  //根据窗口的大小变动图表
				window.onresize = function() {
				    qipiEchart2.resize();
				};
			})
		})
	}
	// 统计图3
	const echartClick3 = ()=>{
		if(!route.path.endsWith('Analysis')){
			echartActive.value = '3'
			echartVisible.value = true
		}
		nextTick(async ()=>{
			let dom = document.getElementById("jiageEchart3")
			if(!dom)return
			var jiageEchart3 = echarts.init(dom,'theme');
			let params = {}
			context.$http({
				url: `${tableName}/value/title/jiage?order=desc`,
				method: 'get',
				params
			}).then(res=>{
				let obj = res.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<obj.length;i++){
				    xAxis.push(obj[i].title);
				    yAxis.push(parseFloat((obj[i].total)));
                    dataList.push({
				        value: parseFloat((obj[i].total)),
				        name: obj[i].title				    })
				}
				var option = {};
				option = {
    title: {
        show:false,
        text: '价格统计',
        left: 'center'
    },
    grid:{
        containLabel:true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
    xAxis: {
        data: xAxis.slice(0,12), 
        type: 'category',
        axisLabel: {
        "interval": 0,
        "rotate": 30,
        "width": 120,
        "overflow": "truncate",
        "ellipsis": "..."
        }
    },
    yAxis: {
        type: 'value',
        "minInterval": 1
    },
    series:{
        data: yAxis.slice(0,12), 
        type: 'bar',
        colorBy:'data',
        barWidth: 40
    }
}
                var middle = option.xAxis
                option.xAxis = option.yAxis
                option.yAxis = middle
				// 使用刚指定的配置项和数据显示图表。
				jiageEchart3.setOption(option);
				  //根据窗口的大小变动图表
				window.onresize = function() {
				    jiageEchart3.resize();
				};
			})
		})
	}
	// 统计图4
	const echartClick4 = ()=>{
		if(!route.path.endsWith('Analysis')){
			echartActive.value = '4'
			echartVisible.value = true
		}
		nextTick(async ()=>{
			let dom = document.getElementById("xunjiaEchart4")
			if(!dom)return
			var xunjiaEchart4 = echarts.init(dom,'theme');
			let params = {}
			context.$http({
				url: `${tableName}/value/title/xunjia?order=desc`,
				method: 'get',
				params
			}).then(res=>{
				let obj = res.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<obj.length;i++){
				    xAxis.push(obj[i].title);
				    yAxis.push(parseFloat((obj[i].total)));
                    dataList.push({
				        value: parseFloat((obj[i].total)),
				        name: obj[i].title				    })
				}
				var option = {};
                option = {
    title: {
        show:false,
        text: '询价统计',
        left: 'center'
    },
    grid:{
        containLabel:true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
    xAxis: {
        data: xAxis.slice(0,12), 
        type: 'category',
        axisLabel: {
        "interval": 0,
        "rotate": 30,
        "width": 120,
        "overflow": "truncate",
        "ellipsis": "..."
        }
    },
    yAxis: {
        type: 'value',
        "minInterval": 1
    },
    series:{
        data: yAxis.slice(0,12), 
        type: 'line'
    }
}
				// 使用刚指定的配置项和数据显示图表。
				xunjiaEchart4.setOption(option);
				  //根据窗口的大小变动图表
				window.onresize = function() {
				    xunjiaEchart4.resize();
				};
			})
		})
	}
	// 统计图5
	const echartClick5 = ()=>{
		if(!route.path.endsWith('Analysis')){
			echartActive.value = '5'
			echartVisible.value = true
		}
		nextTick(async ()=>{
			let dom = document.getElementById("leibieEchart5")
			if(!dom)return
			var leibieEchart5 = echarts.init(dom,'theme');
			let params = {}
			context.$http({
				url: `${tableName}/group/leibie?order=desc`,
				method: 'get',
				params
			}).then(res=>{
				let obj = res.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<obj.length;i++){
				    xAxis.push(obj[i].leibie);
				    yAxis.push(parseFloat((obj[i].total)));
                    dataList.push({
				        value: parseFloat((obj[i].total)),
				        name: obj[i].leibie				    })
				}
				var option = {};
                option = {
    title: {
        show:false,
        text: '类别统计',
        left: 'center'
    },
    grid:{
        containLabel:true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
    xAxis: {
        data: xAxis.slice(0,12), 
        type: 'category',
        axisLabel: {
        "interval": 0,
        "rotate": 30,
        "width": 120,
        "overflow": "truncate",
        "ellipsis": "..."
        }
    },
    yAxis: {
        type: 'value',
        "minInterval": 1
    },
    series:{
        data: yAxis.slice(0,12), 
        type: 'line'
    }
}
                Object.assign(option.series,{smooth: true})
				// 使用刚指定的配置项和数据显示图表。
				leibieEchart5.setOption(option);
				  //根据窗口的大小变动图表
				window.onresize = function() {
				    leibieEchart5.resize();
				};
			})
		})
	}
	//爬取数据
	const spiderClick = ()=>{
		context.$message.success('正在爬取数据...')
		context.$http.get(`spider/${tableName}`).then(res=>{
			if(res.data.code==0){
				context.$message.success('爬取成功')
				getList()
			}else{
				context.$alert(res.data.msg)
			}
		})
	}
	const cleanClick = ()=>{
		context.$confirm(`是否进行数据清洗?`, "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		}).then(()=>{
			let loading = context.$loading({
				text: '数据清洗中...'
			})
			context.$http.get('cnhnbsg/cleanse').then(res=>{
				if(res.data&&res.data.code==0){
					if (loading) loading.close()
					context.$message.success("数据清洗完成！");
					getList()
				}
			})
		})
	}
	//初始化
	const init = () => {
		getList()
	}
	init()
</script>
<style lang="scss" scoped>
	// 表格样式
	.el-table {
		:deep(.el-table__body-wrapper) {
			tbody {
			}
		}
	}
	.condition-box {
		display: flex;
		gap: 10px;
		justify-content: center;
	}

	.condition-box>* {
		max-width: 300px;
	}
</style>