<template>
	<div>
		<el-dialog modal-class="edit_form_modal" class="edit_form" v-model="formVisible" :title="formTitle" width="70%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" :rules="rules">
                <el-row v-if="form.parentid">
                    <el-col :span="12">
                        <el-form-item label="用户名" prop="username">
                            <el-input class="list_inp" v-model="form.username" placeholder="用户名"
                                      type="text"
                                      :readonly="!isAdd||disabledForm.username?true:false" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="评论内容" prop="content">
                            <editor :value="form.content" placeholder="请输入帖子内容" :readonly="!isAdd||disabledForm.content?true:false" :key="!isAdd"
                                    class="list_editor" @change="(e)=>editorChange(e,'content')"></editor>
                        </el-form-item>
                    </el-col>
                </el-row>
				<el-row  v-else >
					<el-col :span="12">
						<el-form-item label="帖子标题" prop="title">
							<el-input class="list_inp" v-model="form.title" placeholder="帖子标题"
                                type="text"
								:readonly="!isAdd||disabledForm.title?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="用户名" prop="username">
							<el-input class="list_inp" v-model="form.username" placeholder="用户名"
                                type="text"
								:readonly="!isAdd||disabledForm.username?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12" >
						<el-form-item label="状态" prop="isdone">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.isdone?true:false"
								v-model="form.isdone" 
								placeholder="请选择状态"
								>
								<el-option v-for="(item,index) in isdoneLists" :label="item"
									:value="item"
									>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="置顶时间" prop="topTime">
							<el-date-picker
								class="list_date"
								v-model="form.topTime"
								format="YYYY-MM-DD HH:mm:ss"
								value-format="YYYY-MM-DD HH:mm:ss"
								type="datetime"
								:readonly="!isAdd||disabledForm.topTime?true:false"
								placeholder="请选择置顶时间" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="分类名称" prop="typeName">
							<el-input class="list_inp" v-model="form.typeName" placeholder="分类名称"
                                type="text"
								:readonly="!isAdd||disabledForm.typeName?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item prop="cover"
									  label="封面"
						>
							<uploads
								:disabled="!isAdd||disabledForm.cover?true:false"
								action="file/upload"
								tip="请上传封面"
								style="width: 100%;text-align: left;"
								:fileUrls="form.cover?form.cover:''" 
								@change="coverUploadSuccess">
							</uploads>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="帖子内容" prop="content">
							<editor :value="form.content" placeholder="请输入帖子内容"
							   	:readonly="!isAdd||disabledForm.content?true:false" :key="!isAdd"
								class="list_editor" @change="(e)=>editorChange(e,'content')"></editor>
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
	const tableName = 'forum'
	const formName = '论坛交流'
	//基础信息
	//form表单
	const form = ref({})
	const disabledForm = ref({
        title : false,
        content : false,
        parentid : false,
        userid : false,
        username : false,
        avatarurl : false,
        isdone : false,
        isTop : false,
        topTime : false,
        typeName : false,
        cover : false,
        isAnonymous : false,
        isDel : false,
        thumbsupNumber : false,
        crazilyNumber : false,
	})
	const formVisible = ref(false)
	const isAdd = ref(false)
	const formTitle = ref('')
	const rules = ref({
		title: [
		],
		content: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		parentid: [
		],
		userid: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		username: [
		],
		avatarurl: [
		],
		isdone: [
		],
		isTop: [
			{ validator: context.$toolUtil.validator.intNumber, trigger: 'blur' },
		],
		topTime: [
		],
		typeName: [
		],
		cover: [
		],
		isAnonymous: [
			{ validator: context.$toolUtil.validator.intNumber, trigger: 'blur' },
		],
		isDel: [
			{ validator: context.$toolUtil.validator.intNumber, trigger: 'blur' },
		],
		thumbsupNumber: [
			{ validator: context.$toolUtil.validator.intNumber, trigger: 'blur' },
		],
		crazilyNumber: [
			{ validator: context.$toolUtil.validator.intNumber, trigger: 'blur' },
		],
	})
	//表单验证
	
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	//头像上传回调
	const avatarurlUploadSuccess=(e)=>{
		form.value.avatarurl = e
	}
	//状态列表
	const isdoneLists = ref([])
	//封面上传回调
	const coverUploadSuccess=(e)=>{
		form.value.cover = e
	}
	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
			title: '',
			content: '',
			parentid: '',
			userid: '',
			username: '',
			avatarurl: '',
			isdone: '',
			topTime: '',
			typeName: '',
			cover: '',

		}
	}
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			res.data.data.content = res.data.data.content?(res.data.data.content.replace(reg,'../../../cl682072280/file')):'';
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
				if(x=='title'){
					form.value.title = row[x];
					disabledForm.value.title = true;
					continue;
				}
				if(x=='content'){
					form.value.content = row[x];
					disabledForm.value.content = true;
					continue;
				}
				if(x=='parentid'){
					form.value.parentid = row[x];
					disabledForm.value.parentid = true;
					continue;
				}
				if(x=='userid'){
					form.value.userid = row[x];
					disabledForm.value.userid = true;
					continue;
				}
				if(x=='username'){
					form.value.username = row[x];
					disabledForm.value.username = true;
					continue;
				}
				if(x=='avatarurl'){
					form.value.avatarurl = row[x];
					disabledForm.value.avatarurl = true;
					continue;
				}
				if(x=='isdone'){
					form.value.isdone = row[x];
					disabledForm.value.isdone = true;
					continue;
				}
				if(x=='isTop'){
					form.value.isTop = row[x];
					disabledForm.value.isTop = true;
					continue;
				}
				if(x=='topTime'){
					form.value.topTime = row[x];
					disabledForm.value.topTime = true;
					continue;
				}
				if(x=='typeName'){
					form.value.typeName = row[x];
					disabledForm.value.typeName = true;
					continue;
				}
				if(x=='cover'){
					form.value.cover = row[x];
					disabledForm.value.cover = true;
					continue;
				}
				if(x=='isAnonymous'){
					form.value.isAnonymous = row[x];
					disabledForm.value.isAnonymous = true;
					continue;
				}
				if(x=='isDel'){
					form.value.isDel = row[x];
					disabledForm.value.isDel = true;
					continue;
				}
				if(x=='thumbsupNumber'){
					form.value.thumbsupNumber = row[x];
					disabledForm.value.thumbsupNumber = true;
					continue;
				}
				if(x=='crazilyNumber'){
					form.value.crazilyNumber = row[x];
					disabledForm.value.crazilyNumber = true;
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
		isdoneLists.value = "开放,关闭".split(',')
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
		form.value.userid = user.value.id
		if(form.value.avatarurl!=null) {
			form.value.avatarurl = form.value.avatarurl.replace(new RegExp(context?.$config.url,"g"),"");
		}
		if(form.value.cover!=null) {
			form.value.cover = form.value.cover.replace(new RegExp(context?.$config.url,"g"),"");
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
