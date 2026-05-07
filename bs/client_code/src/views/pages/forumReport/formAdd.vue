<template>
	<div class="edit_view">
        <div class="breadcrumb-wrapper" style="width: 100%;">
            <div class="bread_view">
                <el-breadcrumb separator="Ξ" class="breadcrumb">
                    <el-breadcrumb-item class="first_breadcrumb" :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item class="second_breadcrumb" v-for="(item,index) in breadList" :key="index">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
		<el-form ref="formRef" :model="form" class="add_form" label-width="120px" :rules="rules">
			<el-row>
				<el-col :span="8">
					<el-form-item label="论坛Id" prop="forumId">
						<el-input class="list_inp"
                                  v-model="form.forumId"
                                  placeholder="论坛Id"
                                  type="text"
							      :readonly="!isAdd||disabledForm.forumId?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="帖子标题" prop="title">
						<el-input class="list_inp"
                                  v-model="form.title"
                                  placeholder="帖子标题"
                                  type="text"
							      :readonly="!isAdd||disabledForm.title?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="举报人id" prop="reportUserid">
						<el-input class="list_inp"
                                  v-model="form.reportUserid"
                                  placeholder="举报人id"
                                  type="text"
							      :readonly="!isAdd||disabledForm.reportUserid?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="举报人账号" prop="reportUsername">
						<el-input class="list_inp"
                                  v-model="form.reportUsername"
                                  placeholder="举报人账号"
                                  type="text"
							      :readonly="!isAdd||disabledForm.reportUsername?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="被举报人id" prop="reportedUserid">
						<el-input class="list_inp"
                                  v-model="form.reportedUserid"
                                  placeholder="被举报人id"
                                  type="text"
							      :readonly="!isAdd||disabledForm.reportedUserid?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="被举报人账号" prop="reportedUsername">
						<el-input class="list_inp"
                                  v-model="form.reportedUsername"
                                  placeholder="被举报人账号"
                                  type="text"
							      :readonly="!isAdd||disabledForm.reportedUsername?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="举报图片" prop="images">
						<uploads
							:disabled="!isAdd||disabledForm.images?true:false"
							action="file/upload" 
							tip="请上传举报图片"
							style="width: 100%;text-align: left;"
							:fileUrls="form.images?form.images:''" 
							@change="imagesUploadSuccess">
						</uploads>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="处理状态" prop="status">
						<el-select
							class="list_sel"
							:disabled="!isAdd||disabledForm.status?true:false"
							v-model="form.status" 
							placeholder="请选择处理状态"
							style="width:100%;"
							>
							<el-option v-for="(item,index) in statusLists" :label="item"
								:value="item"
								>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="举报类型" prop="reportType">
						<el-select
							class="list_sel"
							:disabled="!isAdd||disabledForm.reportType?true:false"
							v-model="form.reportType" 
							placeholder="请选择举报类型"
							style="width:100%;"
							>
							<el-option v-for="(item,index) in reportTypeLists" :label="item"
								:value="item"
								>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="举报原因" prop="reason">
						<el-input v-model="form.reason" placeholder="举报原因" type="textarea"
						:readonly="!isAdd||disabledForm.reason?true:false"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="处理建议" prop="suggestion">
						<el-input v-model="form.suggestion" placeholder="处理建议" type="textarea"
						:readonly="!isAdd||disabledForm.suggestion?true:false"
						/>
					</el-form-item>
				</el-col>
			</el-row>
			<div class="formModel_btn_box">
				<el-button class="formModel_cancel" @click="backClick">取消</el-button>
				<el-button class="formModel_confirm"
                           @click="save"
                           type="success"
				>
					保存
				</el-button>
			</div>
		</el-form>
	</div>
</template>
<script setup>
	import {
		ref,
		getCurrentInstance,
		watch,
		onUnmounted,
		onMounted,
		nextTick,
		computed
	} from 'vue';
	import {
		useRoute,
		useRouter
	} from 'vue-router';
    import {
        useStore
    } from 'vuex';
    const store = useStore()
    const user = computed(()=>store.getters['user/session'])
    const moment = window.moment
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const route = useRoute()
	const router = useRouter()
	//基础信息
	const tableName = 'forumreport'
	const formName = '论坛举报'
	//基础信息
	const breadList = ref([{
		name: formName
	}])
	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//form表单
	const form = ref({
		forumId: '',
		title: '',
		reportUserid: '',
		reportUsername: '',
		reportedUserid: '',
		reportedUsername: '',
		reason: '',
		images: '',
		suggestion: '',
		userid: '',
	})
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	const disabledForm = ref({
		forumId : false,
		title : false,
		reportUserid : false,
		reportUsername : false,
		reportedUserid : false,
		reportedUsername : false,
		reason : false,
		images : false,
		suggestion : false,
		status : false,
		reportType : false,
		userid : false,
	})
	const isAdd = ref(false)
	//表单验证
	const rules = ref({
		forumId: [
		],
		title: [
		],
		reportUserid: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		reportUsername: [
		],
		reportedUserid: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		reportedUsername: [
		],
		reason: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		images: [
		],
		suggestion: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		status: [
		],
		reportType: [
		],
		userid: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
	})
	//举报图片上传回调
	const imagesUploadSuccess=(e)=>{
		form.value.images = e
	}
	//处理状态列表
	const statusLists = ref([])
	//举报类型列表
	const reportTypeLists = ref([])
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			form.value = res.data.data
		})
	}
	const crossRow = ref('')
	const crossTable = ref('')
	const crossTips = ref('')
	const crossColumnName = ref('')
	const crossColumnValue = ref('')
	//初始化
	const init = (formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null) => {
		if(formId){
			id.value = formId
			type.value = formType
		}
		if(formType == 'add'){
			isAdd.value = true
		}else if(formType == 'info'){
			isAdd.value = false
			getInfo()
		}else if(formType == 'edit'){
			isAdd.value = true
			getInfo()
		}
		else if(formType == 'cross'){
			isAdd.value = true
			// getInfo()
			for(let x in row){
				if(x=='forumId'){
					form.value.forumId = row[x];
					disabledForm.value.forumId = true;
					continue;
				}
				if(x=='title'){
					form.value.title = row[x];
					disabledForm.value.title = true;
					continue;
				}
				if(x=='reportUserid'){
					form.value.reportUserid = row[x];
					disabledForm.value.reportUserid = true;
					continue;
				}
				if(x=='reportUsername'){
					form.value.reportUsername = row[x];
					disabledForm.value.reportUsername = true;
					continue;
				}
				if(x=='reportedUserid'){
					form.value.reportedUserid = row[x];
					disabledForm.value.reportedUserid = true;
					continue;
				}
				if(x=='reportedUsername'){
					form.value.reportedUsername = row[x];
					disabledForm.value.reportedUsername = true;
					continue;
				}
				if(x=='reason'){
					form.value.reason = row[x];
					disabledForm.value.reason = true;
					continue;
				}
				if(x=='images'){
					form.value.images = row[x];
					disabledForm.value.images = true;
					continue;
				}
				if(x=='suggestion'){
					form.value.suggestion = row[x];
					disabledForm.value.suggestion = true;
					continue;
				}
				if(x=='status'){
					form.value.status = row[x];
					disabledForm.value.status = true;
					continue;
				}
				if(x=='reportType'){
					form.value.reportType = row[x];
					disabledForm.value.reportType = true;
					continue;
				}
				if(x=='userid'){
					form.value.userid = row[x];
					disabledForm.value.userid = true;
					continue;
				}
			}
			if(row){
				crossRow.value = row
			}
			if(table){
				crossTable.value = table
			}
			if(tips){
				crossTips.value = tips
			}
			if(statusColumnName){
				crossColumnName.value = statusColumnName
			}
			if(statusColumnValue){
				crossColumnValue.value = statusColumnValue
			}
		}
		statusLists.value = "待处理,已处理".split(',')
		reportTypeLists.value = "主题帖举报".split(',')
	}
	//初始化
	//取消
	const backClick = () => {
		history.back()
	}
	//提交
	const save=()=>{
		if(form.value.images!=null) {
			form.value.images = form.value.images.replace(new RegExp(context?.$config.url,"g"),"");
		}
		var table = crossTable.value
		var objcross = JSON.parse(JSON.stringify(crossRow.value))
		let crossUserId = ''
		let crossRefId = ''
		let crossOptNum = ''
		formRef.value.validate(async (valid)=>{
			if(valid){
                if(type.value == 'cross'){
                    if(crossColumnName.value!=''){
                        if(!crossColumnName.value.startsWith('[')){
                            for(let o in objcross){
                                if(o == crossColumnName.value){
                                    objcross[o] = crossColumnValue.value
                                }
                            }
                            //修改跨表数据
                            await changeCrossData(objcross)
                        }else{
                            crossUserId = context?.$toolUtil.storageGet('userid')
                            crossRefId = objcross['id']
                            crossOptNum = crossColumnName.value.replace(/\[/,"").replace(/\]/,"")
                        }
                    }
                }
				if(crossUserId&&crossRefId){    //限制用户操作次数
					form.value.crossuserid = crossUserId
					form.value.crossrefid = crossRefId
					let params = {
						page: 1,
						limit: 1000, 
						crossuserid:form.value.crossuserid,
						crossrefid:form.value.crossrefid,
					}
					context?.$http({
						url: `${tableName}/page`,
						method: 'get', 
						params: params 
					}).then(async (res)=>{
						if(res.data.data.total>=crossOptNum){
							context?.$toolUtil.message(`${crossTips.value}`,'error')
							return false
						}else{
							context?.$http({
								url: `${tableName}/${!form.value.id ? "save" : "update"}`,
								method: 'post', 
								data: form.value 
							}).then(async (res)=>{
                                context?.$toolUtil.message(`操作成功`,'success')
                                history.back()
							})
						}
					})
				}else{
					context?.$http({
						url: `${tableName}/${!form.value.id ? "save" : "update"}`,
						method: 'post', 
						data: form.value 
					}).then(async (res)=>{
                        context?.$toolUtil.message(`操作成功`,'success')
                        history.back()
					})
				}
			}
		})
	}
	//修改跨表数据
	const changeCrossData=(row,key)=>{
        if(type.value == 'cross'){
            let data = row
            if(key){	//如果有指定key，则只更新key属性
                data = {
                    id:row.id,
                }
                data[key] = row[key]
            }
            context?.$http({
                url: `${crossTable.value}/update`,
                method: 'post',
                data: data
            }).then(res=>{})
        }
	}
	onMounted(()=>{
		type.value = route.query.type?route.query.type:'add'
		let row = null
		let table = null
		let statusColumnName = null
		let tips = null
		let statusColumnValue = null
		if(type.value == 'cross'){
			row = context?.$toolUtil.storageGet('crossObj')?JSON.parse(context?.$toolUtil.storageGet('crossObj')):{}
			table = context?.$toolUtil.storageGet('crossTable')
			statusColumnName = context?.$toolUtil.storageGet('crossStatusColumnName')
			tips = context?.$toolUtil.storageGet('crossTips')
			statusColumnValue = context?.$toolUtil.storageGet('crossStatusColumnValue')
		}
		init(route.query.id?route.query.id:null, type.value,'', row, table, statusColumnName, tips, statusColumnValue)
	})
    onUnmounted(()=>{
        Object.keys(localStorage).map(item=>{
            if(item.startsWith('cross')){
                localStorage.removeItem(item)
            }
        })
    })
</script>
<style lang="scss" scoped>
</style>
<style lang="scss">
.edit_view {
    width: 80%;
    margin: 20px auto;
    position: relative;
    background: rgb(255, 255, 255);
    font-size:16px;
    color:#666;
}
.edit_view .add_form{
    width: 100%;
    padding: 30px;
    border:1px solid #eee;
}
.edit_view .add_form .el-form-item{
    margin: 0px 0px 20px;
    display: flex;
}
.edit_view .add_form .el-form-item .el-form-item__label{
    width: 180px;
    background: none;
    text-align: right;
    display: block;
    font-size: 16px;
    color: rgb(51, 51, 51);
    font-weight: 500;
    white-space: nowrap;
}
.edit_view .add_form .el-form-item .el-form-item__content{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: calc(100% - 120px);
}
.edit_view .list_inp .el-input__wrapper{
    height: 36px;
}

.edit_view .add_form .el-form-item .el-form-item__content .list_sel{
    line-height: 36px;
    
    box-sizing: border-box;
    width: calc(100% - 120px);
    padding: 0px 10px;
    border-radius: 0px;
    background: rgb(255, 255, 255);
    font-size: 16px;
}





.edit_view .add_form .el-form-item .el-form-item__content .el-textarea{border: 1px solid rgba(226, 227, 229, 1);}
.edit_view .add_form .el-form-item .el-form-item__content .el-textarea .el-textarea__inner{
    width: 100%;
    min-height: 150px;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 0px;
    color: #666;
    font-size: 16px;
}


.edit_view .add_form .el-form-item .el-form-item__content .el-upload--picture-card{
    background-color: rgb(255, 255, 255);
    width: 100px;
    height: 90px;
    line-height: 100px;
    text-align: center;
    
    border-radius: 0px;
    cursor: pointer;
}

.edit_view .add_form .el-form-item .el-form-item__content .el-upload--picture-card .el-icon{
    font-size: 32px;
    color: #999;
}

.edit_view .add_form .el-form-item .el-form-item__content .img-uploader .el-upload__tip{
    font-size: 15px;
    color: #666;
    margin: 0;
}



</style>