<template>
<div class="board_view">
<div class="header">
    <div class="header-left"></div>
    <div class="projectName animate__animated animate__backInUp">{{projectName}}</div>
    <div class="header-right">
        <div class="back" @click="backClick">管理界面</div>
        <div class="date">{{moment(now).format("YYYY-MM-DD HH:mm:ss")}}</div>
        <iframe scrolling="no" src="https://widget.tianqiapi.com/?style=tz&skin=pitaya&city=深圳&color=FFFFFF" frameborder="0" width="100%" height="30" allowtransparency="true"></iframe>
    </div>
</div>
        <div class="count-list">
            <div class="count-item">
                <div class="count-title"><span>农产品肉鹅总数</span></div>
                <div class="count-number"><countTo :startVal="0" :endVal="cnhnbsgCount" :duration="1000"></countTo></div>
            </div>
        </div>

<div class="content">

    <div class="block block1">
        <div class="block-title"><span>标签统计</span></div>
        <div class="chart" id="chart1"></div>
    </div>

    <div class="block block2">
        <div class="block-title"><span>起批量统计</span></div>
        <div class="chart" id="chart2"></div>
    </div>

    <div class="block block3">
        <div class="block-title"><span>价格统计</span></div>
        <div class="chart" id="chart3"></div>
    </div>

        <div class="forecast-box">
            <div class="forecast-item">
                <div class="label">
                    标题
                </div>
                <el-input v-model="forecastForm.title" placeholder="请输入标题"></el-input>
            </div>
            <div class="forecast-item">
                <div class="label">
                    类别
                </div>
                <el-input v-model="forecastForm.leibie" placeholder="请输入类别"></el-input>
            </div>
            <div class="forecast-item">
                <div class="label">
                    成交
                </div>
                <el-input v-model="forecastForm.turnover" placeholder="请输入成交"></el-input>
            </div>
            <div class="forecast-result">
                预测价格：<sapn class="forecast-value">{{forecastResult.jiage}}</sapn>
            </div>
            <div class="forecast-btn" @click="forecastClick">
                立即预测
            </div>
        </div>

    <div class="block block4">
        <div class="block-title"><span>询价统计</span></div>
        <div class="chart" id="chart4"></div>
    </div>

    <div class="block block5">
        <div class="block-title"><span>类别统计</span></div>
        <div class="chart" id="chart5"></div>
    </div>


</div>

</div>
</template>
<script setup>
    import {
        inject,
        nextTick,
        ref,
        getCurrentInstance,
        onMounted,
        onUnmounted,
        computed
    } from 'vue';
    import {
        useStore
    } from 'vuex';
    const store = useStore()
    const user = computed(()=>store.getters['user/session'])
    const moment = window.moment
    const context = getCurrentInstance()?.appContext.config.globalProperties;
    const projectName = context.$project.projectName
    const baseUrl = context.$config.url

    //时间
    const now = ref(new Date())
    const initDate = ()=>{
        const timer = setInterval(() => {
            now.value = new Date()
        }, 1000)
        onUnmounted(() => {
            clearInterval(timer)
        })
    }
    initDate()

    const backClick = ()=>{
        context?.$router.push('/')
    }
    const forecastForm = ref({})
    const forecastResult = ref({})
    const forecastClick = ()=>{
        if(forecastForm.value.title==undefined){
            return context.$message.error("请填写预测条件")
        }
        if(forecastForm.value.leibie==undefined){
            return context.$message.error("请填写预测条件")
        }
        if(forecastForm.value.turnover==undefined){
            return context.$message.error("请填写预测条件")
        }
        context.$confirm(`是否进行数据预测?`, "提示").then(()=>{
            const loading = context.$loading({
                text: '数据预测中...'
            })
            context.$http.post('cnhnbsgforecast/save',forecastForm.value).then(res1=>{
                if(res1.data.code==0){
                    forecastForm.value.id = res1.data.data
                    context.$http.post('cnhnbsgforecast/forecast',forecastForm.value).then(res2=>{
                        if(res2.data.code==0){
                            context.$http.get(`cnhnbsgforecast/info/${forecastForm.value.id}`).then(res3=>{
                                if(res3.data.code==0){
                                    loading.close()
                                    context.$message.success("数据预测完成！")
                                    forecastResult.value = res3.data.data
                                }
                            })
                        }
                    })
                }
            })
        }).catch(()=>{})
    }
import countTo from '@/components/count-to/vue-countTo.vue';
	const cnhnbsgCount = ref(0)
    //数量统计
	const getcnhnbsgCount = () => {
		context.$http({
			url:'cnhnbsg/count',
			method: 'get'
		}).then(res=>{
			cnhnbsgCount.value = res.data.data
		})
	}
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
    import '@/assets/js/echarts-theme1'
    //获取数据并渲染图表
    const getChart1 = () =>{
        nextTick(async ()=>{
            var tagsEchart1 = echarts.init(document.getElementById("chart1"),'theme1');
			let params = {}
            context.$http({
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
                        name: res[i].tags                    })
                }
                var option = {};
                option = {
    title:{
        show: false,
        text: '标签统计',
        left: 'center'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        itemWidth: 4,
        itemHeight: 4
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
    },
    series: [
        {
            left: '20%',
            type: 'pie',
            radius: '55%',
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
    //获取数据并渲染图表
    const getChart2 = () =>{
        nextTick(async ()=>{
            var qipiEchart2 = echarts.init(document.getElementById("chart2"),'theme1');
			let params = {}
            context.$http({
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
                        name: res[i].qipi                    })
                }
                var option = {};
                option = {
    title: {
        show: false,
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
        "rotate": 25,
        "width": 120,
        "height": "",
        "overflow": "truncate",
        "ellipsis": "..."
        }
    },
    yAxis: {
        type: 'value',
        "minInterval": 1
    },
    grid:{
    left: "20",
    top: "10",
    right: "20",
    bottom: "10",
    containLabel: true
    },
    series:{
        bottom: '5',
        data: yAxis.slice(0,12), 
        type: 'bar',
        colorBy:'data',
        barWidth: 20
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
    //获取数据并渲染图表
    const getChart3 = () =>{
        nextTick(async ()=>{
            var jiageEchart3 = echarts.init(document.getElementById("chart3"),'theme1');
			let params = {}
            context.$http({
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
                        name: res[i].title                    })
                }
                var option = {};
                option = {
    title: {
        show: false,
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
        "rotate": 25,
        "width": 120,
        "height": "",
        "overflow": "truncate",
        "ellipsis": "..."
        }
    },
    yAxis: {
        type: 'value',
        "minInterval": 1
    },
    grid:{
    left: "20",
    top: "10",
    right: "20",
    bottom: "10",
    containLabel: true
    },
    series:{
        bottom: '5',
        data: yAxis.slice(0,12), 
        type: 'bar',
        colorBy:'data',
        barWidth: 20
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
    //获取数据并渲染图表
    const getChart4 = () =>{
        nextTick(async ()=>{
            var xunjiaEchart4 = echarts.init(document.getElementById("chart4"),'theme1');
			let params = {}
            context.$http({
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
                        name: res[i].title                    })
                }
                var option = {};
                option = {
    title: {
        show: false,
        text: '询价统计',
        left: 'center'
    },
    grid:{
    left: "20",
    top: "10",
    right: "20",
    bottom: "10",
    containLabel: true
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
        "rotate": 25,
        "width": 120,
        "height": "",
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
    //获取数据并渲染图表
    const getChart5 = () =>{
        nextTick(async ()=>{
            var leibieEchart5 = echarts.init(document.getElementById("chart5"),'theme1');
			let params = {}
            context.$http({
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
                        name: res[i].leibie                    })
                }
                var option = {};
                option = {
    title: {
        show: false,
        text: '类别统计',
        left: 'center'
    },
    grid:{
    left: "20",
    top: "10",
    right: "20",
    bottom: "10",
    containLabel: true
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
        "rotate": 25,
        "width": 120,
        "height": "",
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


    //初始化
    const init=()=>{
        getcnhnbsgCount()
        getChart1()
        getChart2()
        getChart3()
        getChart4()
        getChart5()
    }
    init()
    onMounted(()=>{
        //通过资源是否可访问，判断天气服务是否可用
        const iframes = document.getElementsByTagName('iframe');
        for(let i=0;i<iframes.length;i++){
            const iframe = iframes[i]
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = 'https://widget.tianqiapi.com/static/skin/pitaya/qing.png';
            link.onload = () => {
                //PNG 加载成功
                document.head.removeChild(link);
            };

            link.onerror = () => {
                //PNG 加载失败
                iframe.style.display='none'
                document.head.removeChild(link);
            };
            document.head.appendChild(link);
        }
    })
</script>
<style lang="scss">
.chart{
    width: 100%;
    height: 100%;
}
.condition-box {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.condition-box>* {
    max-width: 300px;
}
.board_view {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 100%;
    height: 100vh;
    background-image: url(http://clfile.zggen.cn/20251123/377ae10a265d4b708aa07aeca3cb7241.webp),url(http://clfile.zggen.cn/20251123/468ac8259c37418c992f9630bb146f3e.webp);
    background-size: calc(100% - 40px) calc(100% - 40px),100% 100%;
    /* position: relative; */
    background-position: 20px 20px,0 0;
    background-repeat: no-repeat;
    overflow: hidden;
    padding: 40px;
}

.board_view .header {
    width: 100%;
    position: relative;
    margin: 0px;
    height: 100px;
    display: flex;
    /* justify-content: space-between; */
    align-items: flex-end;
    background-size: 100% 100%;
    padding: 0 30px;
    padding-bottom: 20px;
}

.board_view .projectName {
    margin: 0px;
    width: 60vw;
    line-height: 54px;
    height: 50px;
    color: rgb(255, 255, 255);
    font-size: 22px;
    background-size: 100% 100%;
    margin-top: 20px;
    text-align: left;
}

.board_view .date {
    display: inline-block;
    color: rgb(255, 255, 255);
    font-size: 14px;
    background-size: 100% 100%;
    width: 180px;
    padding-left: 20px;
}
.board_view .back {
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    order: -1;
    margin-right: 20px;
    color: #fff;
    background: linear-gradient( 180deg, rgba(111,70,23,0.5) 0%, rgba(111,70,23,0.7) 100%);
    padding: 10px;
    border-radius: 6px;
}

.board_view .content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: calc(94vh - 260px);
    padding: 10px 20px 0px;
    width: 100%;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
}
.board_view .count-list {
    display: flex;
    width: 100%;
    /* flex-wrap: wrap; */
    justify-content: space-around;
    gap:10px;
    background-size: 100% 100%;
    padding: 10px 20px;
}

.board_view .count-item {
    display: flex;
    justify-content: center;
    margin: 0px 10px 0px 0px;
    flex-direction: column;
    color: #fff;
    background-image: url(http://clfile.zggen.cn/20251123/6f9de04f182d4a1498ca82193d89996c.webp);
    background-size: 100% 100%;
    width: 14vw;
    height: 6vw;
    padding-left: 6.6vw;
    padding-right: 1vw;
    position: relative;
    text-align: center;
}
.board_view .systemInfo {
    display: flex;
    height: calc(32% - 20px);
    margin: 0px 0px 20px;
    background-size: 100% 100%;
    padding: 20px;
}

.board_view .el-carousel {
    margin: 0px auto;
    width: 40%;
    height: 100%;
}

.board_view .systemInfo_content {
    line-height: 24px;
    font-size: 14px;
    margin: 0px 0px 0px 20px;
    color: rgb(255, 255, 255);
    height: 100%;
    flex: 1;
    overflow: auto;
    /* margin-top: 20px; */
}

.board_view .systemInfo_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.board_view .block-title,.board_view .map-title {
    width: 100%;
    text-align: left;
    background-image: url(http://clfile.zggen.cn/20251123/fb7d255bdceb4998a06a6610cc25ac44.webp);
    background-size: 100% 100%;
    height: 26px;
    margin: 0px;
    font-size: 16px;
    color: rgb(255, 255, 255);
    flex-shrink: 0;
    padding-left: 12px;
}
.board_view .el-table img {
    width: 100px;
    height: 50px;
    object-fit: fill;
}

.board_view .el-table {
    --el-table-bg-color: rgba(0,0,0,0);
    --el-table-tr-bg-color: rgba(0,0,0,0);
    --el-table-header-bg-color: rgba(0,0,0,0);
    --el-table-header-text-color: rgba(255,255,255,1);
    --el-table-text-color: rgba(255,255,255,1);
    --el-table-row-hover-bg-color: rgba(255,255,255,0.2);
}
.board_view .chart,.board_view #map {
    flex: 1;
    height: calc(100% - 26px);
}

.board_view .el-table {
    height: calc(100% - 40px);
}

.board_view .block,.board_view  .map {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.board_view iframe {
    width: 230px;
    height: 20px;
}

.board_view .count-number {
    font-size: 20px;
    font-weight: 700;
}

.board_view .count-title {
    padding-bottom: 6px;
    position: relative;
}

.board_view .el-carousel__container {
    height: 100%!important;
}

.board_view .systemInfo_content::-webkit-scrollbar {
    background:none;
    color:#fff;
    width:10px;
    background:rgba(18,155,255,0.2);
}
.board_view .systemInfo_content::-webkit-scrollbar-thumb{
    background-color:rgba(18,155,255,0.6);
    border-radius:10px;
    width:10px;
}

.board_view .forecast-box {
    color: #fff;
    display: flex;
    /* flex-direction: column; */
    gap: 10px;
    padding: 40px 20px;
    flex-wrap: wrap;
    justify-content: center;
}

.board_view .forecast-btn {
    text-align: center;
    line-height: 40px;
    background: #DE8C2E;
    border-radius: 20px 20px 20px 20px;
    width: 80%;
    height: 40px;
}

.board_view .header-left {
    /* width: 20vw; */
    /* padding-left: 20px; */
}

.board_view .header-right {
    display: flex;
    padding-right: 20px;
    align-items: center;
    white-space: nowrap;
    /* width: 20vw; */
    margin-left: auto;
}

.board_view .block,.board_view  .systemInfo,.board_view .forecast-box {background: rgba(37,23,8,0.5);box-shadow: inset 0px 0px 5px 0px #E09239;border-radius: 10px;}
.board_view #map {
    flex: 1;
    background-image: url(http://clfile.zggen.cn/20251123/cf7ffd1258e04536a62857db6c9623cd.webp);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}

.board_view .count-item:before {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    background-image: url(http://clfile.zggen.cn/20251123/6532e1501eb742d7b94372ebc46aec1a.webp);
    background-size: 100% 100%;
    left: 10%;
}
.board_view .count-item:nth-child(5n+2):before {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    background-image: url(http://clfile.zggen.cn/20251123/994a9addaffc4382a12780e56fa4e1fb.webp);
    background-size: 100% 100%;
    left: 10%;
}
.board_view .count-item:nth-child(5n+3):before {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    background-image: url(http://clfile.zggen.cn/20251123/9ad4c2a118e340e98eeb30ec942add6e.webp);
    background-size: 100% 100%;
    left: 10%;
}
.board_view .count-item:nth-child(5n+4):before {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    background-image: url(http://clfile.zggen.cn/20251123/8f49f97a622e4085a5547b430e6f7feb.webp);
    background-size: 100% 100%;
    left: 10%;
}
.board_view .count-item:nth-child(5n+5):before {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    background-image: url(http://clfile.zggen.cn/20251123/292b19c83e9d4e37a02af9123d2f6222.webp);
    background-size: 100% 100%;
    left: 10%;
}


.board_view .el-input__wrapper {
    height: 40px;
    border: 1px solid;
    border-color: rgba(0,0,0,0);
    border-radius: 10px 10px 10px 10px;
    box-shadow: inset 0px 0px 5px 0px #E09239;
    background: rgba(37,23,8,0.5);
}

.board_view .content>* {
    width: 30%;
    min-height: 30%;
    flex: 1;
    padding: 6px 10px;
}
.board_view .el-table {
    flex: 1!important;
}
.board_view .list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    color: #fff;
    overflow: auto;
    padding-top: 10px;
}

.board_view .list-item {
    min-width: 26%;
    flex: 1;
}

.board_view .list-item img {
    width: 100%;
    height: 90px;
    object-fit: cover;
}

.board_view ::-webkit-scrollbar {
    background:none;
    color:#fff;
    width:10px;
    background:rgba(18,155,255,0.1);
}
.board_view ::-webkit-scrollbar-thumb{
    background-color:rgb(72 131 173 / 20%);
    border-radius:10px;
    width:10px;
}

.forecast-result {
    text-align: center;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.forecast-item {
    flex: 1;
    min-width: 40%;
}
.board_view .forecast-item {
    display: flex;
    align-items: center;
}

.board_view .forecast-item .label {
    width: 100px;
    flex-shrink: 0;
    text-align: center;
}
.board_view .content>div:first-child {
    height: 35%!important;
    flex: auto;
}

</style>
