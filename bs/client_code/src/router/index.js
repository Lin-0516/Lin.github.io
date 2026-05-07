import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views'
import home from '../views/pages/home.vue'

const routes = [{
		path: '/',
		redirect: '/index/home'
	},
	{
		path: '/index',
		component: index,
		children: [{
			path: 'home',
			component: home
		}
		, {
			path: 'newsList',
			component: ()=>import('@/views/pages/news/list')
		}
        , {
            path: 'forumList',
            component: ()=>import('@/views/pages/forum/list')
        }
        , {
            path: 'forumDetail',
            component: () => import('../views/pages/forum/detail')
        }
		, {
			path: 'forumTypeList',
			component: ()=>import('@/views/pages/forumType/list')
		}, {
			path: 'forumTypeDetail',
			component: ()=>import('@/views/pages/forumType/formModel')
		}, {
			path: 'forumTypeAdd',
			component: ()=>import('@/views/pages/forumType/formAdd')
		}
		, {
			path: 'forumReportList',
			component: ()=>import('@/views/pages/forumReport/list')
		}, {
			path: 'forumReportDetail',
			component: ()=>import('@/views/pages/forumReport/formModel')
		}, {
			path: 'forumReportAdd',
			component: ()=>import('@/views/pages/forumReport/formAdd')
		}
		, {
			path: 'syslogList',
			component: ()=>import('@/views/pages/syslog/list')
		}, {
			path: 'syslogDetail',
			component: ()=>import('@/views/pages/syslog/formModel')
		}, {
			path: 'syslogAdd',
			component: ()=>import('@/views/pages/syslog/formAdd')
		}
		, {
			path: 'sensitiveWordList',
			component: ()=>import('@/views/pages/sensitiveWord/list')
		}, {
			path: 'sensitiveWordDetail',
			component: ()=>import('@/views/pages/sensitiveWord/formModel')
		}, {
			path: 'sensitiveWordAdd',
			component: ()=>import('@/views/pages/sensitiveWord/formAdd')
		}
		, {
			path: 'cnhnbsgList',
			component: ()=>import('@/views/pages/cnhnbsg/list')
		}, {
			path: 'cnhnbsgDetail',
			component: ()=>import('@/views/pages/cnhnbsg/formModel')
		}, {
			path: 'cnhnbsgAdd',
			component: ()=>import('@/views/pages/cnhnbsg/formAdd')
		}
		, {
			path: 'yonghuList',
			component: ()=>import('@/views/pages/yonghu/list')
		}, {
			path: 'yonghuDetail',
			component: ()=>import('@/views/pages/yonghu/formModel')
		}, {
			path: 'yonghuAdd',
			component: ()=>import('@/views/pages/yonghu/formAdd')
		}
		, {
			path: 'yonghuCenter',
			component: ()=>import('@/views/pages/yonghu/center')
		}
        , {
            path: 'storeupList',
            component: ()=>import('@/views/pages/storeup/list')
        }
		, {
			path: 'cnhnbsgforecastList',
			component: ()=>import('@/views/pages/cnhnbsgforecast/list')
		}, {
			path: 'cnhnbsgforecastDetail',
			component: ()=>import('@/views/pages/cnhnbsgforecast/formModel')
		}, {
			path: 'cnhnbsgforecastAdd',
			component: ()=>import('@/views/pages/cnhnbsgforecast/formAdd')
		}
		]
	},
	{
		path: '/login',
		component: ()=>import('../views/pages/login.vue')
	}
	,{
		path: '/yonghuRegister',
		component: ()=>import('@/views/pages/yonghu/register')
	}
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
// 全局后置钩子，路由跳转后执行
router.afterEach(() => {
    // 滚动到顶部
    window.scrollTo(0, 0)
})

export default router
