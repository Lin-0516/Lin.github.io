const config = {
    get() {
        return {
            url : process.env.VUE_APP_BASE_API_URL + process.env.VUE_APP_BASE_API + '/',
            name: process.env.VUE_APP_BASE_API,
			menuList:[
				{
					name: '农产品肉鹅',
					icon: '',
					child:[
						{
							name:'农产品肉鹅',
                            url:'/index/cnhnbsgList'

						},
					]
				},

				{
					name: '肉鹅价格预测',
					icon: '',
					child:[
						{
							name:'肉鹅价格预测',
                            url:'/index/cnhnbsgforecastList'

						},
					]
				},

				{
					name: '论坛交流',
					icon: 'icon-common9',
					child:[
						{
							name:'论坛交流',
                            url:'/index/forumList'

						},
					]
				},

				{
					name: '公告资讯',
					icon: '',
					child:[
						{
							name:'公告资讯',
                            url:'/index/newsList'

						},
					]
				},

			]
        }
    },
    getProjectName(){
        return {
            projectName: `基于Python的肉鹅价格数据可视化分析`
        } 
    }
}
export default config
