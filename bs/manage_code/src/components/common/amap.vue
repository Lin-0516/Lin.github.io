<template>
    <div className="mapComponents" id="mapContainer"></div>
</template>
<script setup>
import {
    ref,
    watch,
    onUnmounted,
    onMounted,
    nextTick,
    computed,
    defineProps,
    getCurrentInstance,
} from 'vue';

const context = getCurrentInstance()?.appContext.config.globalProperties;
const props = defineProps({
    mapRoute: {    //{start:[lng,lat],end:[lng,lat],waypoints:[[lng,lat]...]}
        type: Object,
        default: null,
    },
})
const map = ref()
const initAMap = () => {
    //基本地图加载
    map.value = new AMap.Map("mapContainer", {
        resizeEnable: true,
        zoom: 14, //地图显示的缩放级别
        center: props.mapRoute.start, //地图中心点
    });
    if(props.mapRoute){
        //构造路线导航类
        const driving = new AMap.Driving({
            map: map.value,
        });
        // 根据起终点经纬度规划驾车导航路线
        driving.search(new AMap.LngLat(...props.mapRoute.start), new AMap.LngLat(...props.mapRoute.end),{
            waypoints:props.mapRoute.waypoints.map(item=>(new AMap.LngLat(...item)))
        }, function(status, result) {
            if (status === 'complete') {
                console.log('绘制驾车路线完成')
            } else {
                console.log('获取驾车数据失败：' + result)
            }
        })
    }
}
onMounted(() => {
    if (window.AMap) {
        initAMap()
    } else {
        //等待main.js的initAMapApiLoader加载完成
        setTimeout(() => {
            initAMap()
        }, 1000)
    }
})
onUnmounted(() => {
    map.value?.destroy()
})
</script>

<style scoped lang="scss">
.mapComponents {
    width: 100%;
    height: 500px;
}
</style>