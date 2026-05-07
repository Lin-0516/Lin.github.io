<template>
	<div class="home_view">
		<div class="countList">
			<el-collapse-transition v-if="btnAuth('cnhnbsg','首页总数')">
				<el-card v-show="countTypeList.closecnhnbsgCountType" class="count-item">
					<template #header>
						<div class="card_head_title">
							农产品肉鹅
						</div>
						<div class="card_head_right">
							<el-icon @click="countTypeClick('hiddencnhnbsgCountType')" class="showIcons"
								:class="countTypeList.hiddencnhnbsgCountType?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="countTypeClick('closecnhnbsgCountType')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="count_item" v-show="countTypeList.hiddencnhnbsgCountType">
							<div class="count_title"><span>农产品肉鹅总数</span></div>
							<div class="count_num"><countTo :startVal="0" :endVal="cnhnbsgCount" :duration="1000"></countTo></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
		</div>

		<div class="chartList">
			<el-collapse-transition v-if="btnAuth('cnhnbsg','首页统计')">
				<el-card v-show="cardTypeList.closecnhnbsgChartType1" class="chart-item">
					<template #header>
						<div class="card_head_title">
							农产品肉鹅
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddencnhnbsgChartType1')" class="showIcons"
									 :class="cardTypeList.hiddencnhnbsgChartType1?'showIcons1':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closecnhnbsgChartType1')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddencnhnbsgChartType1">
							<div class="chart-title"><span>标签统计</span></div>
							<div id="cnhnbsgtagsEchart1" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('cnhnbsg','首页统计')">
				<el-card v-show="cardTypeList.closecnhnbsgChartType2" class="chart-item">
					<template #header>
						<div class="card_head_title">
							农产品肉鹅
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddencnhnbsgChartType2')" class="showIcons"
									 :class="cardTypeList.hiddencnhnbsgChartType2?'showIcons2':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closecnhnbsgChartType2')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddencnhnbsgChartType2">
							<div class="chart-title"><span>起批量统计</span></div>
							<div id="cnhnbsgqipiEchart2" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('cnhnbsg','首页统计')">
				<el-card v-show="cardTypeList.closecnhnbsgChartType3" class="chart-item">
					<template #header>
						<div class="card_head_title">
							农产品肉鹅
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddencnhnbsgChartType3')" class="showIcons"
									 :class="cardTypeList.hiddencnhnbsgChartType3?'showIcons3':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closecnhnbsgChartType3')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddencnhnbsgChartType3">
							<div class="chart-title"><span>价格统计</span></div>
							<div id="cnhnbsgjiageEchart3" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('cnhnbsg','首页统计')">
				<el-card v-show="cardTypeList.closecnhnbsgChartType4" class="chart-item">
					<template #header>
						<div class="card_head_title">
							农产品肉鹅
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddencnhnbsgChartType4')" class="showIcons"
									 :class="cardTypeList.hiddencnhnbsgChartType4?'showIcons4':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closecnhnbsgChartType4')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddencnhnbsgChartType4">
							<div class="chart-title"><span>询价统计</span></div>
							<div id="cnhnbsgxunjiaEchart4" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('cnhnbsg','首页统计')">
				<el-card v-show="cardTypeList.closecnhnbsgChartType5" class="chart-item">
					<template #header>
						<div class="card_head_title">
							农产品肉鹅
						</div>
						<div class="card_head_right">
							<el-icon @click="cardTypeClick('hiddencnhnbsgChartType5')" class="showIcons"
									 :class="cardTypeList.hiddencnhnbsgChartType5?'showIcons5':''">
								<ArrowUpBold />
							</el-icon>
							<el-icon @click="cardTypeClick('closecnhnbsgChartType5')" class="closeIcons">
								<CloseBold />
							</el-icon>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddencnhnbsgChartType5">
							<div class="chart-title"><span>类别统计</span></div>
							<div id="cnhnbsgleibieEchart5" class="Echart" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
		</div>


	</div>
</template>

<script setup>
	import {
		inject,
		nextTick,
		ref,
		getCurrentInstance,
		computed,
		onMounted,
	} from 'vue';
	import {
		useStore
	} from 'vuex';
	const moment = window.moment
	const store = useStore()
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const projectName = context.$project.projectName
	const user = computed(()=>store.getters['user/session'])
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	import countTo from '@/components/count-to/vue-countTo.vue';
	const countTypeList = ref({
	})
	const getCountList=()=>{
		countTypeList.value.closecnhnbsgCountType = true
		countTypeList.value.hiddencnhnbsgCountType = true
		if(btnAuth('cnhnbsg','首页总数')){
			getcnhnbsgCount()
		}
	}
	const cnhnbsgCount = ref(0)
	const getcnhnbsgCount = () => {
		context?.$http({
			url:'cnhnbsg/count',
			method: 'get'
		}).then(res=>{
			cnhnbsgCount.value = res.data.data
		})
	}
	const countTypeClick = (e) => {
		countTypeList.value[e] = !countTypeList.value[e]
	}
	//获取总数
	getCountList()
	const cardTypeClick = (e) =>{
		cardTypeList.value[e] = !cardTypeList.value[e]
		setTimeout(()=>{
			getChartList()
		},1000)
	}
	const cardTypeList = ref({
		closecnhnbsgChartType1: true,
		hiddencnhnbsgChartType1: true,
		closecnhnbsgChartType2: true,
		hiddencnhnbsgChartType2: true,
		closecnhnbsgChartType3: true,
		hiddencnhnbsgChartType3: true,
		closecnhnbsgChartType4: true,
		hiddencnhnbsgChartType4: true,
		closecnhnbsgChartType5: true,
		hiddencnhnbsgChartType5: true,
	})
	//判断是否有统计图筛选权限
	const changeStatQuery = (arr)=>{
		if(!arr){	//不传限制条件，默认都可见
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
	import '@/assets/js/echarts-theme'
	const getcnhnbsgChart1 = () => {
		nextTick(async ()=>{
			var tagsEchart1 = echarts.init(document.getElementById("cnhnbsgtagsEchart1"),'theme');
			let params = {}
			context?.$http({
				url: "cnhnbsg/group/tags?order=desc",
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].tags);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].tags				    })
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
				tagsEchart1.clear()
				// 使用刚指定的配置项和数据显示图表。
				tagsEchart1.setOption(option);
				//根据窗口的大小变动图表
				tagsEchart1.resize();
			})
		})
	}
	const getcnhnbsgChart2 = () => {
		nextTick(async ()=>{
			var qipiEchart2 = echarts.init(document.getElementById("cnhnbsgqipiEchart2"),'theme');
			let params = {}
			context?.$http({
				url: "cnhnbsg/group/qipi?order=desc",
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].qipi);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].qipi				    })
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
				qipiEchart2.clear()
				// 使用刚指定的配置项和数据显示图表。
				qipiEchart2.setOption(option);
				//根据窗口的大小变动图表
				qipiEchart2.resize();
			})
		})
	}
	const getcnhnbsgChart3 = () => {
		nextTick(async ()=>{
			var jiageEchart3 = echarts.init(document.getElementById("cnhnbsgjiageEchart3"),'theme');
			let params = {}
			context?.$http({
				url: `cnhnbsg/value/title/jiage?order=desc`,
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].title);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].title				    })
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
                let middle = option.xAxis
                option.xAxis = option.yAxis
                option.yAxis = middle
				jiageEchart3.clear()
				// 使用刚指定的配置项和数据显示图表。
				jiageEchart3.setOption(option);
				//根据窗口的大小变动图表
				jiageEchart3.resize();
			})
		})
	}
	const getcnhnbsgChart4 = () => {
		nextTick(async ()=>{
			var xunjiaEchart4 = echarts.init(document.getElementById("cnhnbsgxunjiaEchart4"),'theme');
			let params = {}
			context?.$http({
				url: `cnhnbsg/value/title/xunjia?order=desc`,
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].title);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].title				    })
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
				xunjiaEchart4.clear()
				// 使用刚指定的配置项和数据显示图表。
				xunjiaEchart4.setOption(option);
				//根据窗口的大小变动图表
				xunjiaEchart4.resize();
			})
		})
	}
	const getcnhnbsgChart5 = () => {
		nextTick(async ()=>{
			var leibieEchart5 = echarts.init(document.getElementById("cnhnbsgleibieEchart5"),'theme');
			let params = {}
			context?.$http({
				url: "cnhnbsg/group/leibie?order=desc",
				method: "get",
				params
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let dataList = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].leibie);
				    yAxis.push(parseFloat((res[i].total)));
					dataList.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].leibie				    })
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
				leibieEchart5.clear()
				// 使用刚指定的配置项和数据显示图表。
				leibieEchart5.setOption(option);
				//根据窗口的大小变动图表
				leibieEchart5.resize();
			})
		})
	}
	const getChartList = () => {
		if(btnAuth('cnhnbsg','首页统计')){
			getcnhnbsgChart1()
		}
		if(btnAuth('cnhnbsg','首页统计')){
			getcnhnbsgChart2()
		}
		if(btnAuth('cnhnbsg','首页统计')){
			getcnhnbsgChart3()
		}
		if(btnAuth('cnhnbsg','首页统计')){
			getcnhnbsgChart4()
		}
		if(btnAuth('cnhnbsg','首页统计')){
			getcnhnbsgChart5()
		}
	}
	//获取统计图数据
	getChartList()
</script>
<style lang="scss" scoped>
	// 首页盒子
	.home_view {
        background-image: url("http://clfile.zggen.cn/20250728/efa8c4527e0d4b5fa31b9fa123463b16.webp")!important;
	}

	.showIcons {
		transition: transform 0.3s;
		margin-right: 10px;
	}

	.showIcons1 {
		transform: rotate(-180deg);
	}
</style>
<style>
.condition-box {
	display: flex;
	gap: 10px;
	justify-content: center;
}

.condition-box>* {
	max-width: 300px;
}
.home_view .countList {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
}

.home_view .count-item {
    flex: 1;
    min-width: 20%;
    position: relative;
    border-radius: 14px;
}

.home_view .el-card__header {
    display: none;
}

.home_view .count_title {
    color: #000;
    order: 2;
}

.home_view .count_num {
    font-size: 26px;
    font-weight: 700;
    line-height: 50px;
    color: #000;
}

.home_view .count-item:before {
    content:'';
    width: 75px;
    height: 75px;
    background-size:100% 100%;
    position: absolute;
    top: 20px;
    right: 20px;
    background-image: url(http://clfile.zggen.cn/20250819/4a1fbb84ab3f42e0a9ada131e4e5eada.webp);
}
.home_view .count-item:nth-child(4n+2):before{
    background-image: url(http://clfile.zggen.cn/20250819/4a1fbb84ab3f42e0a9ada131e4e5eada.webp);
}
.home_view .count-item:nth-child(4n+3):before{
    background-image: url(http://clfile.zggen.cn/20250819/4a1fbb84ab3f42e0a9ada131e4e5eada.webp);
}
.home_view .count-item:nth-child(4n+4):before{
    background-image: url(http://clfile.zggen.cn/20250819/4a1fbb84ab3f42e0a9ada131e4e5eada.webp);
}

.home_view {
    padding: 30px;
    background: #f5f6fa;
}

.home_view .chartList {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    margin-top: 30px;
}

.home_view .chart-item {
    flex: 1;
    min-width: 40%;
    border-radius: 16px;
}

.home_view .row3 {
    display: flex;
    margin-top: 30px;
    gap: 30px;
}
.home_view .el-carousel img {
    object-fit: cover;
}

.home_view .el-carousel {
    margin-bottom: 20px;
}
.home_view .chart-title {font-size: 22px;font-weight: 700;padding-left: 50px;position: relative;line-height: 40px;}

.count_item {
    display: flex;
    flex-direction: column;
}

.home_view .chart-title:before {
    position: absolute;
    background-image: url(http://clfile.zggen.cn/20250819/98329f11ab3d4cd0b4ec3377ff5103d4.webp);
    content: '';
    width: 50px;
    height: 50px;
    background-size: 100% 100%;
    left: 0;
    top: -6px;
}

/* 后台首页新闻详情图片*/
.home_newsDialog .newImg{
    width: 100%;
    text-align: center;
    margin: 0 0 5px;
}
.home_newsDialog .newImg img{
    width: auto !important;
    height: auto !important;
    object-fit: contain !important;
    max-height: 400px !important;
    max-width: 100%;
}
</style>