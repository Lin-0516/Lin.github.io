<template>
    <div class="login_view">
<div class="form" style="z-index: 1;">
    <div class="logo"></div>
    <div class="projectName">{{projectName}}</div>
    <div class="tip">请登录以继续</div>
				<div class="form-item userName" v-if="loginType==1">
					<div class="label">
						<el-icon>
							<User />
						</el-icon>
					</div>
					<el-input class="item-input" v-model="loginForm.username" placeholder="请输入账号" name="username" />
				</div>

				<div class="form-item password" v-if="loginType==1">
					<div class="label">
						<el-icon>
							<Lock />
						</el-icon>
					</div>
					<el-input class="item-input" v-model="loginForm.password" type="password" show-password placeholder="请输入密码" @keydown.enter.native="handleLogin"  />
				</div>


				<div class="form-item roles" v-if="userList.length>1">
				  <el-radio class="role" v-for="(item,index) in userList" :key="index" v-model="loginForm.role"
					:label="item.roleName">{{item.roleName}}</el-radio>
				</div>

				<el-button class="login" v-if="loginType==1" @click="handleLogin">登录</el-button>


    <div class="forget-row">
        <div class="register-row">
                    <el-button class="register" @click="handleRegister('yonghu')">注册用户</el-button>

        </div>

    </div>
    <div class="form-circle1"></div>
    <div class="form-circle2"></div>
</div>
<div class="circle1"></div>
<div class="circle2"></div>
    </div>
</template>
<script setup>
	import {
		ref,
		getCurrentInstance,
		nextTick,
		onMounted,
	} from "vue";
	import {
		useStore
	} from 'vuex';
	const store = useStore()
    const projectName = ref(`基于Python的肉鹅价格数据可视化分析`)
	import menu from '@/utils/menu'
	const userList = ref([])
	const menus = ref([])
	const loginForm = ref({
		role: '',
		username: '',
		password: ''
	})
	const tableName = ref('')
	const loginType = ref(1)
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	//注册
    const handleRegister = (tableName) => {
    	context?.$router.push(`/${tableName}Register`)
    }
	const handleLogin = () => {
		if (!loginForm.value.username) {
			context?.$toolUtil.message('请输入用户名', 'error')
			return;
		}
		if (!loginForm.value.password) {
			context?.$toolUtil.message('请输入密码', 'error')
			return;
		}
		if (userList.value.length > 1) {
			if (!loginForm.value.role) {
				context?.$toolUtil.message('请选择角色', 'error')
				verifySlider.reset()
				return;
			}
			for (let i = 0; i < menus.value.length; i++) {
				if (menus.value[i].roleName == loginForm.value.role) {
					tableName.value = menus.value[i].pathName||menus.value[i].tableName;
				}
			}
		} else {
			tableName.value = userList.value[0].pathName||userList.value[0].tableName;
			loginForm.value.role = userList.value[0].roleName;
		}
		login()
	}
	const login = () => {
		context?.$http({
			url: `${tableName.value}/login?username=${loginForm.value.username}&password=${loginForm.value.password}`,
			method: 'post'
		}).then(res => {
			context?.$toolUtil.storageSet("frontToken", res.data.token);
			context?.$toolUtil.storageSet("frontRole", loginForm.value.role);
			context?.$toolUtil.storageSet("frontSessionTable", tableName.value);
			store.dispatch('user/getSession')
			let path = context?.$toolUtil.storageGet('toPath')
			if (path && path!='/login') {
				context?.$router.replace(path)
				context?.$toolUtil.storageRemove('toPath')
				return
			}
			context?.$router.replace(`/index/${tableName.value}Center`)
		},err=>{
		})
	}
	//获取菜单
	const getMenu= async ()=> {
		let arr = menu.list()
		if(!arr){
			let res = await context?.$http.get("menu/list")
			context?.$toolUtil.storageSet("menus", res.data.data.list[0].menujson);
			arr = JSON.parse(res.data.data.list[0].menujson)
		}
		menus.value = arr
		for (let i = 0; i < menus.value.length; i++) {
			if (menus.value[i].hasFrontLogin=='是') {
				userList.value.push(menus.value[i])
			}
		}
    }
	//初始化
	const init = async () => {
		await getMenu();
		loginForm.value.role = userList.value[0].roleName
	}
	onMounted(()=>{
		init()

	})
</script>

<style lang="scss">
	.login_view {
        background-image: url("http://clfile.zggen.cn/20260313/4fc0acc561524280a61d9fea2726c4eb.webp")!important;
	}
.login_view {
    background-color: rgb(237 245 218);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.login_view .form {
    background: #fcfcf4;
    width: 600px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 30px;
    border-radius: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.login_view .projectName {
    font-size: 24px;
    font-weight: 700;
    width: 100%;
    text-align: center;
    margin-top: 20px;
}

.login_view .tip {
    font-size: 14px;
    width: 100%;
    text-align: center;
    margin-top: 10px;
    color: #666;
}

.login_view .form-item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 20px;
    background: #fff;
    border: 1px solid #eee;
    padding: 0 10px;
    border-radius: 6px;
    line-height: 50px;
}

.login_view .el-input__wrapper {
    border: none;
    outline: none;
    box-shadow: none!important;
}

.login_view .label {
    background: #eaf7f3;
    color: #7ab8a3;
    padding: 0 10px;
}

.login_view .code-info {
    width: 120px;
    background-image: linear-gradient(135deg, #98D7C2 0%, #E8C7C7 100%);
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    font-size: 20px;
    position: absolute;
    right: -140px;
    border-radius: 10px;
}

.login_view .form-item.code {
    margin-right: 140px;
    position: relative;
}

.login_view .form-item.roles {
    position: relative;
    background: none;
    border: none;
    display: flex;
    gap: 20px;
    padding: 0;
    margin-top: 50px;
}

.login_view .el-radio.role {
    background: #fff;
    border: 1px solid #eee;
    padding: 10px;
    flex: 1;
    margin-right: 0;
    border-radius: 8px;
}

.login_view .form-item.roles:before {
    content: '选择角色';
    position: absolute;
    top: -40px;
    left: 0;
}

.login_view .login {
    width: 100%;
    margin-top: 20px;
    height: 50px;
    background: var(--theme);
    border: none;
    color: #fff;
    font-size: 18px;
}
.login_view .el-button.face{
    width: 100%;
    margin-top: 20px;
    height: 50px;
    background: var(--theme);
    border: none;
    color: #fff;
    font-size: 18px;
    margin-left: 0;
}

.login_view .forget-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.login_view .register {
    background: none;
    border: none;
}

.login_view .forget {
    background: none;
    border: 0;
}

.login_view .form-circle1 {
    position: absolute;
    right: -34px;
    top: -32px;
    background: #dff6e9;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    z-index: -1;
}

.login_view .form-circle2 {
    position: absolute;
    left: -34px;
    bottom: -32px;
    background: #f7efeb;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    z-index: -1;
}

.login_view .logo {
    background: url(http://clfile.zggen.cn/20250725/889d208e5ddd4107bce6600713cdf6d1.webp);
    background-size: 100% 100%;
    width: 80px;
    height: 80px;
    animation: float 3s ease-in-out infinite;
}

.login_view .circle1 {
    position: absolute;
    left: 100px;
    top: 100px;
    background: #daf4dc80;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    z-index: 1;
    animation: float 4s ease-in-out infinite;
}

.login_view .circle2 {
    position: absolute;
    right: 100px;
    bottom: 100px;
    background: #EBEFD980;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    z-index: 0;
    animation: float 5s ease-in-out infinite;
}

@keyframes float{
    0%,100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
 }
</style>