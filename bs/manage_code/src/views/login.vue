<template>
	<div class="login_view">
<div class="box">
    <div class="img"></div>
    <div class="form" style="z-index: 1;">
        <div class="logo"></div>
        <div class="tip">Welcome</div>
        <div class="projectName">{{projectName}}</div>
        <div class="form-inner">
				<div class="form-item userName" v-if="loginType==1">
					<div class="label">
						账号：
					</div>
					<el-input class="item-input" v-model="loginForm.username" placeholder="请输入账号" name="username" />
				</div>

				<div class="form-item password" v-if="loginType==1">
					<div class="label">
						密码：
					</div>
					<el-input class="item-input" v-model="loginForm.password" type="password" show-password placeholder="请输入密码" @keydown.enter.native="handleLogin"  />
				</div>


				<div class="remember_view" v-if="loginType==1">
					<el-checkbox v-model="rememberPassword" label="记住密码" size="large" :true-label="true"
						:false-label="false" />
				</div>

				<div class="form-item roles" v-if="userList.length>1">
					<div class="role" :style="{'width':'calc(100% / '+userList.length+')'}"
						:class="loginForm.role==item.roleName?'tabActive':''" v-for="(item,index) in userList"
						:key="index" @click="tabClick(item.roleName)">{{item.roleName}}</div>
				</div>

				<el-button class="login" v-if="loginType==1" @click="handleLogin">登录</el-button>


            <div class="forget-row">
                <div class="register-row">

                </div>

            </div>
        </div>
    </div>
</div>
	</div>
</template>
<script setup>
	import {
		ref,
		getCurrentInstance,
		nextTick,
		onMounted,
		onUnmounted,
	} from "vue";
	import { useStore } from 'vuex'
	const store = useStore()
	const projectName = ref(`基于Python的肉鹅价格数据可视化分析`)
	const userList = ref([])
	const menus = ref([])
	const loginForm = ref({
		role: '',
		username: '',
		password: ''
	})
	const tableName = ref('')
	const loginType = ref(1)
	//是否记住密码
	const rememberPassword = ref(true)
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	//登录用户tab切换
	const tabClick = (role) => {
		loginForm.value.role = role
		
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
				verifySlider.value.reset()
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
			//是否保存当前账号密码至缓存
			if (rememberPassword.value) {
				let loginForm1 = JSON.parse(JSON.stringify(loginForm.value))
				delete loginForm1.code
				context?.$toolUtil.storageSet("loginForm", JSON.stringify(loginForm1));
			} else {
				context?.$toolUtil.storageRemove("loginForm")
			}
			context?.$toolUtil.storageSet("Token", res.data.token);
			context?.$toolUtil.storageSet("role", loginForm.value.role);
			context?.$toolUtil.storageSet("sessionTable", tableName.value);
			context?.$toolUtil.storageSet("adminName", loginForm.value.username);
            //vuex中获取用户信息并保存
			store.dispatch('user/getSession').then(res=>{
                context?.$router.push('/')
            })
		}, err => {
		})
	}
	//获取菜单
	const getMenu=()=> {
      let params = {
        page: 1,
        limit: 1,
        sort: 'id',
      }

      context?.$http({
        url: "menu/list",
        method: "get",
        params: params
      }).then(res => {
          menus.value = JSON.parse(res.data.data.list[0].menujson)
          for (let i = 0; i < menus.value.length; i++) {
            if (menus.value[i].hasBackLogin=='是') {
              userList.value.push(menus.value[i])
            }
          }
			//获取缓存是否有保存的账号密码
			let form = context?.$toolUtil.storageGet('loginForm')
			if (form) {
				
			}else {
				loginForm.value.role = userList.value[0].roleName
			}
          context?.$toolUtil.storageSet("menus", JSON.stringify(menus.value));
      })
    }
	//初始化
	const init = () => {
		getMenu();
		//获取缓存是否有保存的账号密码
		let form = context?.$toolUtil.storageGet('loginForm')
		if (form) {
			loginForm.value = JSON.parse(form)
		}
	}
	onMounted(()=>{
		init()


	})
</script>

<style lang="scss">
	.login_view {
        background-image: url("http://clfile.zggen.cn/20250725/59adc0e66e4b424784377b3facf1024d.webp")!important;
	}
.login_view {
    background-color: rgb(255 255 255);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.login_view .form {
    background: #fff;
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    overflow: hidden;
    flex: 1;
}

.login_view .projectName {
    font-size: 24px;
    width: 100%;
    text-align: center;
    margin-top: 0px;
    font-weight: 700;
}

.login_view .tip {
    width: 100%;
    text-align: center;
    margin-top: 0px;
    color: #000;
    font-size: 26px;
    font-weight: 700;
}

.login_view .form-item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 20px;
    background: #f8f8f8;
    border: 1px solid #999;
    padding: 0 10px;
    border-radius: 6px;
    line-height: 50px;
}

.login_view .el-input__wrapper {
    border: none;
    outline: none;
    box-shadow: none!important;
    background: none;
}

.login_view .label {
    color: var(--theme);
    padding: 0 10px;
    white-space: nowrap;
    width: 60px;
    text-align: center;
    flex-shrink: 0;
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
    width: calc(100% - 140px);
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
    content: '';
    background-image: url(http://clfile.zggen.cn/20250817/34e3cbe2ea38413a9001923a84ce77fe.webp);
    background-size: contain;
    background-position: center;
    height: 30px;
    position: absolute;
    top: -40px;
    left: 0;
    text-align: center;
    width: 100%;
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
    position: relative;
}

.login_view .logo {
    background-image: url(http://clfile.zggen.cn/20250817/c7f4917b88074efa96eed5ca0b734ac4.webp);
    background-size: 100% 100%;
    width: 50px;
    height: 50px;
}

.login_view .img {
    background: url(http://clfile.zggen.cn/20250817/80398b9b44024bfc8516fe0de27cacf6.webp);
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #ebead6;
    flex: 1;
}

.login_view .box {
    display: flex;
    width: 70vw;
    min-width: 1200px;
    height: 700px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    overflow: hidden;
}

.login_view .form-inner {
    width: 400px;
}

.login_view .form-item:hover {
    border-color: var(--theme);
}

.login_view .role {
    text-align: center;
    background: #f8f8f8;
    border: 1px solid #999;
    line-height: 30px;
    color: #999;
    border-radius: 6px;
}

.login_view .role.tabActive {
    color: var(--theme);
    border-color: var(--theme);
}

.login_view .remember_view {
    height: 20px;
    text-align: center;
}
</style>