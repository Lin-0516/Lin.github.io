import {
	createRouter,
	createWebHashHistory
} from 'vue-router'
import login from '@/views/login.vue'
import index from '@/views/index.vue'
import HomeView from '@/views/HomeView.vue'
export const routes = [{
		path: '/login',
		name: 'login',
        meta: { title: '登录' },
		component: login
	},{
		path: '/',
		name: '首页',
        meta: { title: '首页' },
		component: index,
		children: [{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: {
				affix: true,
                title: '首页'
			}
		}, {
			path: '/updatepassword',
			name: 'updatepassword',
            meta: { title: '修改密码' },
			component: () => import('../views/updatepassword.vue')
		}

		,{
			path: '/usersCenter',
			name: 'usersCenter',
            meta: { title: '管理员个人中心' },
			component: ()=>import('@/views/users/center')
		}
		,{
			path: '/yonghuCenter',
			name: 'yonghuCenter',
            meta: { title: '用户个人中心' },
			component: ()=>import('@/views/yonghu/center')
		}
		,{
			path: '/news',
			name: 'news',
            meta: { title: '公告资讯' },
			component: ()=>import('@/views/news/list')
		}
		,{
			path: '/forumReport',
			name: 'forumReport',
            meta: { title: '论坛举报' },
			component: ()=>import('@/views/forumReport/list')
		}
		,{
			path: '/forumType',
			name: 'forumType',
            meta: { title: '论坛类型' },
			component: ()=>import('@/views/forumType/list')
		}
		,{
			path: '/syslog',
			name: 'syslog',
            meta: { title: '操作日志' },
			component: ()=>import('@/views/syslog/list')
		}
		,{
			path: '/storeup',
			name: 'storeup',
            meta: { title: '我的收藏' },
			component: ()=>import('@/views/storeup/list')
		}
        ,{
            path: '/menu',
            name: 'menu',
            meta: { title: '菜单权限管理' },
            component: ()=>import('@/views/menu_manage/list')
        }
		,{
			path: '/cnhnbsg',
			name: 'cnhnbsg',
            meta: { title: '农产品肉鹅' },
			component: ()=>import('@/views/cnhnbsg/list')
		}
		,{
			path: '/users',
			name: 'users',
            meta: { title: '管理员' },
			component: ()=>import('@/views/users/list')
		}
		,{
			path: '/forum',
			name: 'forum',
            meta: { title: '论坛交流' },
			component: ()=>import('@/views/forum/list')
		}
		,{
			path: '/sensitiveWord',
			name: 'sensitiveWord',
            meta: { title: '敏感词' },
			component: ()=>import('@/views/sensitiveWord/list')
		}
		,{
			path: '/yonghu',
			name: 'yonghu',
            meta: { title: '用户' },
			component: ()=>import('@/views/yonghu/list')
		}
		,{
			path: '/cnhnbsgforecast',
			name: 'cnhnbsgforecast',
            meta: { title: '肉鹅价格预测' },
			component: ()=>import('@/views/cnhnbsgforecast/list')
		}
		,{
			path: '/config',
			name: 'config',
            meta: { title: '轮播图' },
			component: ()=>import('@/views/config/list')
		}
		]
	},
	{
	path: '/dashBoard',
	name: 'dashBoard',
	meta: { title: '看板' },
	component: () => import('../views/dashBoard.vue')
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
