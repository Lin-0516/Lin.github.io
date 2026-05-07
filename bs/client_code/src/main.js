import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/animate.min.css'
import '@/assets/css/iconfont.css'
import '@/assets/css/style.scss'
const app = createApp(App)
app.config.warnHandler = () => null;

//地图
import VueAMap, { initAMapApiLoader } from "@vuemap/vue-amap";
import "@vuemap/vue-amap/dist/style.css"
initAMapApiLoader({
    key: "c4ae6ed30bc3f01acf60971dd5d65e7b",//高德key
    securityJsCode:'4d49f68235e05c86c862eeb230ddfc05',//高德安全密钥
    plugins: [
        "AMap.Autocomplete",
        "AMap.PlaceSearch",
        "AMap.Scale",
        "AMap.OverView",
        "AMap.ToolBar",
        "AMap.MapType",
        "AMap.PolyEditor",
        "AMap.CircleEditor",
        "AMap.Geocoder",
        "AMap.Geolocation",
        "AMap.Marker",
        "AMap.Driving"
    ],
});
app.use(VueAMap)

//富文本
import Editor from "@/components/Editor";
app.component('editor', Editor)
//上传组件
import upload from "@/components/upload";
app.component('uploads', upload)
//轮播图
import mySwiper from "@/components/mySwiper/index";
app.component('mySwiper', mySwiper)
import http from './utils/http.js'
// 基础配置
import config from './utils/config'
//公共方法
import toolUtil from './utils/toolUtil.js'
app.config.globalProperties.$config = config.get()
app.config.globalProperties.$project = config.getProjectName()
app.config.globalProperties.$toolUtil = toolUtil
app.config.globalProperties.$http = http // ajax请求方法

app.use(store)
app.use(router)
import * as Vue from 'vue'
window.Vue = Vue
function loadElementPlus() {    // 加载Element-plus
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'http://clfile.zggen.cn/20251114/c7545bbab1504da0b6be2f2d2471c87e.js'
        script.onload = () => {
            // 等待下一个 tick，确保 Element Plus 内部组件注册完成
            setTimeout(() => {
                app.use(window.ElementPlus, {
                    locale: ElementPlusLocaleZhCn, // 国际化
                })
                // 全局字段
                window.ElLoading = ElementPlus.ElLoading
                window.ElMessage = ElementPlus.ElMessage
                window.ElMessageBox = ElementPlus.ElMessageBox
                window.ElNotification = ElementPlus.ElNotification
                resolve()
            }, 0)
        }
        script.onerror = reject
        document.head.appendChild(script)
    })
}
function loadIcons() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'http://clfile.zggen.cn/20251114/3f6d667b307e408d93ac93092a0b01e6.js'
        script.onload = () => {
            setTimeout(() => {
                for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
                    app.component(key, component)
                }
                resolve()
            }, 0)
        }
        script.onerror = reject
        document.head.appendChild(script)
    })
}
async function mount() {
    await loadElementPlus()
    await loadIcons()
    app.mount('#app')
}
mount()