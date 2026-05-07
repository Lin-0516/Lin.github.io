<template>
    <div class="list-page">
        <div class="breadcrumb-wrapper" style="width: 100%;">
            <div class="back_view" v-if="centerType">
                <el-button class="back_btn" @click="backClick">返回</el-button>
            </div>
            <div class="bread_view">
                <el-breadcrumb separator="Ξ" class="breadcrumb">
                    <el-breadcrumb-item class="first_breadcrumb" :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item class="second_breadcrumb" v-for="(item,index) in breadList" :key="index">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
		<div class="list_search">
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
				<el-button class="search_btn" @click="searchClick">搜索</el-button>
				<el-button class="add_btn" v-if="btnAuth('cnhnbsg','新增')" @click="addClick">新增</el-button>
			</div>
            <div class="chartBtn-row">
                <el-button class="chart_btn" type="warning" @click="echartClick1" v-if="btnAuth('cnhnbsg','标签统计')">
                    标签统计
                </el-button>
                <el-button class="chart_btn" type="warning" @click="echartClick2" v-if="btnAuth('cnhnbsg','起批量统计')">
                    起批量统计
                </el-button>
                <el-button class="chart_btn" type="warning" @click="echartClick3" v-if="btnAuth('cnhnbsg','价格统计')">
                    价格统计
                </el-button>
                <el-button class="chart_btn" type="warning" @click="echartClick4" v-if="btnAuth('cnhnbsg','询价统计')">
                    询价统计
                </el-button>
                <el-button class="chart_btn" type="warning" @click="echartClick5" v-if="btnAuth('cnhnbsg','类别统计')">
                    类别统计
                </el-button>
            </div>
		</div>



                <div class="table_view">
					<el-table v-loading="listLoading" class="data_table" :data="list" :row-style="{'cursor':'pointer'}"
						@row-click="tableDetailClick" :stripe='false'>
						<el-table-column :resizable='true' align="left" header-align="left" type="selection" width="55" />
						<el-table-column label="序号" width="120" :resizable='true' align="left" header-align="left">
							<template #default="scope">{{ (listQuery.page-1)*listQuery.limit+scope.$index + 1}}</template>
						</el-table-column>
						<el-table-column label="标题" :resizable='true' align="left" header-align="left">
							<template #default="scope">
								{{scope.row.title}}
							</template>
						</el-table-column>
						<el-table-column label="图片" :resizable='true' align="left" header-align="left">
							<template #default="scope">
								<div v-if="scope.row.imgurl">
									<el-image v-if="scope.row.imgurl.substring(0,4)=='http'" preview-teleported
										:preview-src-list="[scope.row.imgurl.split(',')[0]]"
										:src="scope.row.imgurl.split(',')[0]" style="width:100px;height:100px" @click.stop></el-image>
									<el-image v-else preview-teleported
										:preview-src-list="[baseUrl+scope.row.imgurl.split(',')[0]]"
										:src="baseUrl+scope.row.imgurl.split(',')[0]" style="width:100px;height:100px" @click.stop>
									</el-image>
								</div>
								<div v-else>无图片</div>
							</template>
						</el-table-column>
						<el-table-column label="价格" :resizable='true' align="left" header-align="left">
							<template #default="scope">
								{{scope.row.jiage}}
							</template>
						</el-table-column>
						<el-table-column label="起批量" :resizable='true' align="left" header-align="left">
							<template #default="scope">
								{{scope.row.qipi}}
							</template>
						</el-table-column>
						<el-table-column label="成交" :resizable='true' align="left" header-align="left">
							<template #default="scope">
								{{scope.row.turnover}}
							</template>
						</el-table-column>
						<el-table-column label="询价" :resizable='true' align="left" header-align="left">
							<template #default="scope">
								{{scope.row.xunjia}}
							</template>
						</el-table-column>
						<el-table-column label="卖家" :resizable='true' align="left" header-align="left">
							<template #default="scope">
								{{scope.row.seller}}
							</template>
						</el-table-column>
						<el-table-column label="发货地址" :resizable='true' align="left" header-align="left">
							<template #default="scope">
								{{scope.row.address}}
							</template>
						</el-table-column>
						<el-table-column label="评价" :resizable='true' align="left" header-align="left">
							<template #default="scope">
								{{scope.row.pingjia}}
							</template>
						</el-table-column>
						<el-table-column label="类别" :resizable='true' align="left" header-align="left">
							<template #default="scope">
								{{scope.row.leibie}}
							</template>
						</el-table-column>
						<el-table-column label="城市" :resizable='true' align="left" header-align="left">
							<template #default="scope">
								{{scope.row.city}}
							</template>
						</el-table-column>
						<el-table-column label="标签" :resizable='true' align="left" header-align="left">
							<template #default="scope">
								{{scope.row.tags}}
							</template>
						</el-table-column>
					</el-table>
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

    <el-dialog v-model="preViewVisible" :title="'查看大图'" width="40%" destroy-on-close>
        <div style="text-align:center">
            <img :src="preViewUrl" style="max-width: 100%;" alt="">
        </div>
    </el-dialog>
    <!-- 统计图弹窗 -->
    <el-dialog v-model="echartVisible" modal-class="chart-dialog-modal" class="chart-dialog" title="统计图" width="70%">
        <el-tabs v-model="echartActive" class="demo-tabs" @tab-change="echartTabClick" type="card">
            <el-tab-pane label="标签统计" name="1" v-if="btnAuth('cnhnbsg','标签统计')"></el-tab-pane>
            <el-tab-pane label="起批量统计" name="2" v-if="btnAuth('cnhnbsg','起批量统计')"></el-tab-pane>
            <el-tab-pane label="价格统计" name="3" v-if="btnAuth('cnhnbsg','价格统计')"></el-tab-pane>
            <el-tab-pane label="询价统计" name="4" v-if="btnAuth('cnhnbsg','询价统计')"></el-tab-pane>
            <el-tab-pane label="类别统计" name="5" v-if="btnAuth('cnhnbsg','类别统计')"></el-tab-pane>
        </el-tabs>
        <div v-if="echartActive==1" class="chart-wrapper">
            <div class="chart" id="tagsEchart1" style="width:100%;height:600px;"></div>
        </div>
        <div v-if="echartActive==2" class="chart-wrapper">
            <div class="chart" id="qipiEchart2" style="width:100%;height:600px;"></div>
        </div>
        <div v-if="echartActive==3" class="chart-wrapper">
            <div class="chart" id="jiageEchart3" style="width:100%;height:600px;"></div>
        </div>
        <div v-if="echartActive==4" class="chart-wrapper">
            <div class="chart" id="xunjiaEchart4" style="width:100%;height:600px;"></div>
        </div>
        <div v-if="echartActive==5" class="chart-wrapper">
            <div class="chart" id="leibieEchart5" style="width:100%;height:600px;"></div>
        </div>
        <template #footer>
            <span class="formModel_btn_box">
                <el-button class="cancel_btn" @click="echartVisible=false">关闭</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance,
		nextTick,
        computed,
        inject,
	} from 'vue';
    const moment = window.moment
	import {
		useRoute,
		useRouter
	} from 'vue-router';
    import {
        useStore
    } from 'vuex';
    const store = useStore()
    const user = computed(()=>store.getters['user/session'])
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const router = useRouter()
	const route = useRoute()
    const baseUrl = ref(context.$config.url)
	//基础信息
	const tableName = 'cnhnbsg'
	const formName = '农产品肉鹅'
	//基础信息
	const breadList = ref([{
		name: formName
	}])
	const list = ref([])
	const listQuery = ref({
		page: 1,
		limit: 20,
	})
	const total = ref(0)
	const listLoading = ref(false)
	//权限验证
	const btnAuth = (e,a)=>{
		if(centerType.value){
			return context?.$toolUtil.isBackAuth(e,a)
		}else{
			return context?.$toolUtil.isAuth(e,a)
		}
	}
	const addClick = () => {
		router.push('/index/cnhnbsgAdd')
	}
	//判断是否从个人中心跳转
	const centerType = ref(false)
	//返回
	const backClick = () => {
		router.push(`/index/${context?.$toolUtil.storageGet('frontSessionTable')}Center`)
	}
	//搜索
	const searchQuery = ref({})
	//下拉列表
	const searchClick = async() => {
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
	const getList = (obj) => {
		listLoading.value = true
		let params = JSON.parse(JSON.stringify(listQuery.value))
		if(searchQuery.value.title&&searchQuery.value.title!=''){
			params.title = '%' + searchQuery.value.title + '%'
		}
		context?.$http({
			url: `${tableName}/${centerType.value?'page':'list'}`,
			method: 'get',
			params: params
		}).then(res => {
			listLoading.value = false
			list.value = res.data.data.list
			total.value = Number(res.data.data.total)
		})
	}
	const tableDetailClick = (row) => {
		router.push(`${tableName}Detail?id=` + row.id + (centerType.value?'&&centerType=1':''))
	}
	//下载文件
	const download = (file) =>{
		if(!file){
			context?.$toolUtil.message('文件不存在','error')
		}
		const a = document.createElement('a');
		a.style.display = 'none';
		a.setAttribute('target', '_blank');
		file && a.setAttribute('download', file);
		a.href = context?.$config.url + file;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
	// 查看大图
	const preViewUrl = ref('')
	const preViewVisible = ref(false)
	const preViewClick = (url) =>{
		preViewUrl.value = url
		preViewVisible.value = true
	}
	//判断是否有统计图筛选权限
	const changeStatQuery = (arr)=>{
		if(!arr){
			return true
		}
		let role = localStorage.getItem('frontRole')
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
			var tagsEchart1 = echarts.init(dom, null);
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
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
    },
    series: [
        {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: dataList,
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
			var qipiEchart2 = echarts.init(dom, null);
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
    grid:{
        containLabel:true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
    xAxis: {
        data: xAxis,
        type: 'category',
    },
    yAxis: {
        type: 'value'
    },
    series:{
        data: yAxis,
        type: 'bar'
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
			var jiageEchart3 = echarts.init(dom, null);
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
    grid:{
        containLabel:true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
    xAxis: {
        data: xAxis,
        type: 'category',
    },
    yAxis: {
        type: 'value'
    },
    series:{
        data: yAxis,
        type: 'bar'
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
			var xunjiaEchart4 = echarts.init(dom, null);
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
    grid:{
        containLabel:true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
    xAxis: {
        data: xAxis,
        type: 'category',
    },
    yAxis: {
        type: 'value'
    },
    series:{
        data: yAxis,
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
			var leibieEchart5 = echarts.init(dom, null);
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
    grid:{
        containLabel:true
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
    },
    xAxis: {
        data: xAxis,
        type: 'category',
    },
    yAxis: {
        type: 'value'
    },
    series:{
        data: yAxis,
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
	const init = async() => {
		if(route.query.centerType){
			centerType.value = true
		}
        if(context.$toolUtil.storageGet('frontToken') && !user.value.id){
            await store.dispatch("user/getSession")
        }
		getList()
	}
	init()
</script>
<style lang="scss" scoped>
.condition-box {
    display: flex;
    gap: 10px;
    justify-content: center;
}
.condition-box>* {
    max-width: 300px;
}
</style>