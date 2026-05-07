<template>
	<div>
		<el-dialog modal-class="edit_form_modal" class="edit_form" v-model="formVisible" :title="formTitle" width="70%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" :rules="rules">
				<el-row >
					<el-col :span="12">
						<el-form-item label="帖子标题" prop="title">
							<el-input class="list_inp" v-model="form.title" placeholder="帖子标题"
                                type="text"
								:readonly="!isAdd||disabledForm.title?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="举报人账号" prop="reportUsername">
							<el-input class="list_inp" v-model="form.reportUsername" placeholder="举报人账号"
                                type="text"
								:readonly="!isAdd||disabledForm.reportUsername?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="被举报人账号" prop="reportedUsername">
							<el-input class="list_inp" v-model="form.reportedUsername" placeholder="被举报人账号"
                                type="text"
								:readonly="!isAdd||disabledForm.reportedUsername?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item prop="images"
									  label="举报图片"
						>
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
					<el-col :span="12" >
						<el-form-item label="处理状态" prop="status">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.status?true:false"
								v-model="form.status" 
								placeholder="请选择处理状态"
								>
								<el-option v-for="(item,index) in statusLists" :label="item"
									:value="item"
									>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12" >
						<el-form-item label="举报类型" prop="reportType">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.reportType?true:false"
								v-model="form.reportType" 
								placeholder="请选择举报类型"
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
			</el-form>
			<template #footer v-if="isAdd||type=='logistics'||type=='reply'">
				<span class="formModel_btn_box">
					<el-button class="cancel_btn" @click="closeClick">取消</el-button>
					<el-button class="confirm_btn" type="primary" @click="save"
						>
						提交
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance,
		nextTick,
		computed,
		defineEmits
	} from 'vue'
    import {
        useStore
    } from 'vuex';
	const moment = window.moment
    const store = useStore()
    const user = computed(()=>store.getters['user/session'])
	const context = getCurrentInstance()?.appContext.config.globalProperties;	
	const emit = defineEmits(['formModelChange'])
    const isAdmin = localStorage.getItem('isAdmin')||context.$toolUtil.storageGet("sessionTable")=='users'
	//基础信息
	const tableName = 'forumreport'
	const formName = '论坛举报'
	//基础信息
	//form表单
	const form = ref({})
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
	const formVisible = ref(false)
	const isAdd = ref(false)
	const formTitle = ref('')
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
	//表单验证
	
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	//举报图片上传回调
	const imagesUploadSuccess=(e)=>{
		form.value.images = e
	}
	//处理状态列表
	const statusLists = ref([])
	//举报类型列表
	const reportTypeLists = ref([])
	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
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

		}
	}
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			form.value = res.data.data
			formVisible.value = true
		})
	}
	const crossRow = ref('')
	const crossTable = ref('')
	const crossTips = ref('')
	const crossColumnName = ref('')
	const crossColumnValue = ref('')
	//初始化
	const init=(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null)=>{
		resetForm()
		if(formId){
			id.value = formId
			type.value = formType
		}
		if(formType == 'add'){
			isAdd.value = true
			formTitle.value = '新增' + formName
			formVisible.value = true
		}else if(formType == 'info'){
			isAdd.value = false
			formTitle.value = '查看' + formName
			getInfo()
		}else if(formType == 'edit'){
			isAdd.value = true
			formTitle.value = '修改' + formName
			getInfo()
		}
		else if(formType == 'cross'){
			isAdd.value = true
			formTitle.value = formNames
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
			formVisible.value = true
		}
		statusLists.value = "待处理,已处理".split(',')
		reportTypeLists.value = "主题帖举报".split(',')
	}
	//初始化
	//声明父级调用
	defineExpose({
		init
	})
	//关闭
	const closeClick = () => {
		formVisible.value = false
	}
	//富文本
	const editorChange = (e,name) =>{
		form.value[name] = e
	}
	//提交
	const save= async ()=>{
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
							crossUserId = user.value.id
							crossRefId = objcross['id']
							crossOptNum = crossColumnName.value.replace(/\[/,"").replace(/\]/,"")
						}
					}
				}
				if(crossUserId&&crossRefId){
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
							}).then(async res=>{
								emit('formModelChange')
								context?.$toolUtil.message(`操作成功`,'success')
                                formVisible.value = false
							})
						}
					})
				}else{
					context?.$http({
						url: `${tableName}/${!form.value.id ? "save" : "update"}`,
						method: 'post', 
						data: form.value 
					}).then(async (res)=>{
						emit('formModelChange')
						context?.$toolUtil.message(`操作成功`,'success')
                        formVisible.value = false
					})
				}
			}else{
                context.$message.error('请完善信息')
            }
		})
	}
	//修改跨表数据
	const changeCrossData = async (row,key)=>{
        if(type.value == 'cross'){
			let data = row
			if(key){	//如果有指定key，则只更新key属性
				data = {
					id:row.id,
				}
				data[key] = row[key]
			}
            await context?.$http({
                url: `${crossTable.value}/update`,
                method: 'post',
                data: data
            }).then(res=>{})
        }
	}
</script>
<style lang="scss" scoped>
</style>
