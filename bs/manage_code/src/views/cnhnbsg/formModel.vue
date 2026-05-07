<template>
	<div>
		<el-dialog modal-class="edit_form_modal" class="edit_form" v-model="formVisible" :title="formTitle" width="70%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" :rules="rules">
				<el-row >
					<el-col :span="12">
						<el-form-item label="标题" prop="title">
							<el-input class="list_inp" v-model="form.title" placeholder="标题"
                                type="text"
								:readonly="!isAdd||disabledForm.title?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item prop="imgurl"
									  label="图片"
						>
							<uploads
								:disabled="!isAdd||disabledForm.imgurl?true:false"
								action="file/upload"
								tip="请上传图片"
								style="width: 100%;text-align: left;"
								:fileUrls="form.imgurl?form.imgurl:''" 
								@change="imgurlUploadSuccess">
							</uploads>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="价格" prop="jiage">
							<el-input class="list_inp" v-model.number="form.jiage" placeholder="价格"
                                type="number"
                                @mousewheel.native.prevent
								:readonly="!isAdd||disabledForm.jiage?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="起批量" prop="qipi">
							<el-input class="list_inp" v-model="form.qipi" placeholder="起批量"
                                type="text"
								:readonly="!isAdd||disabledForm.qipi?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="成交" prop="turnover">
							<el-input class="list_inp" v-model="form.turnover" placeholder="成交"
                                type="text"
								:readonly="!isAdd||disabledForm.turnover?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="询价" prop="xunjia">
							<el-input class="list_inp" v-model.number="form.xunjia" placeholder="询价"
                                type="text"
								:readonly="!isAdd||disabledForm.xunjia?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="卖家" prop="seller">
							<el-input class="list_inp" v-model="form.seller" placeholder="卖家"
                                type="text"
								:readonly="!isAdd||disabledForm.seller?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="发货地址" prop="address">
							<el-input class="list_inp" v-model="form.address" placeholder="发货地址"
                                type="text"
								:readonly="!isAdd||disabledForm.address?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="评价" prop="pingjia">
							<el-input class="list_inp" v-model.number="form.pingjia" placeholder="评价"
                                type="text"
								:readonly="!isAdd||disabledForm.pingjia?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="类别" prop="leibie">
							<el-input class="list_inp" v-model="form.leibie" placeholder="类别"
                                type="text"
								:readonly="!isAdd||disabledForm.leibie?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="城市" prop="city">
							<el-input class="list_inp" v-model="form.city" placeholder="城市"
                                type="text"
								:readonly="!isAdd||disabledForm.city?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="标签" prop="tags">
							<el-input class="list_inp" v-model="form.tags" placeholder="标签"
                                type="text"
								:readonly="!isAdd||disabledForm.tags?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="详情地址" prop="xqurl">
							<el-input v-model="form.xqurl" placeholder="详情地址" type="textarea"
							:readonly="!isAdd||disabledForm.xqurl?true:false"
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
	const tableName = 'cnhnbsg'
	const formName = '农产品肉鹅'
	//基础信息
	//form表单
	const form = ref({})
	const disabledForm = ref({
        title : false,
        imgurl : false,
        jiage : false,
        qipi : false,
        turnover : false,
        xunjia : false,
        seller : false,
        address : false,
        pingjia : false,
        leibie : false,
        city : false,
        tags : false,
        xqurl : false,
	})
	const formVisible = ref(false)
	const isAdd = ref(false)
	const formTitle = ref('')
	const rules = ref({
		title: [
		],
		imgurl: [
		],
		jiage: [
			{ validator: context.$toolUtil.validator.number, trigger: 'blur' },
		],
		qipi: [
		],
		turnover: [
		],
		xunjia: [
			{ validator: context.$toolUtil.validator.intNumber, trigger: 'blur' },
		],
		seller: [
		],
		address: [
		],
		pingjia: [
			{ validator: context.$toolUtil.validator.intNumber, trigger: 'blur' },
		],
		leibie: [
		],
		city: [
		],
		tags: [
		],
		xqurl: [
		],
	})
	//表单验证
	
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	//图片上传回调
	const imgurlUploadSuccess=(e)=>{
		form.value.imgurl = e
	}
	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
			title: '',
			imgurl: '',
			jiage: '',
			qipi: '',
			turnover: '',
			xunjia: '',
			seller: '',
			address: '',
			pingjia: '',
			leibie: '',
			city: '',
			tags: '',
			xqurl: '',

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
				if(x=='title'){
					form.value.title = row[x];
					disabledForm.value.title = true;
					continue;
				}
				if(x=='imgurl'){
					form.value.imgurl = row[x];
					disabledForm.value.imgurl = true;
					continue;
				}
				if(x=='jiage'){
					form.value.jiage = row[x];
					disabledForm.value.jiage = true;
					continue;
				}
				if(x=='qipi'){
					form.value.qipi = row[x];
					disabledForm.value.qipi = true;
					continue;
				}
				if(x=='turnover'){
					form.value.turnover = row[x];
					disabledForm.value.turnover = true;
					continue;
				}
				if(x=='xunjia'){
					form.value.xunjia = row[x];
					disabledForm.value.xunjia = true;
					continue;
				}
				if(x=='seller'){
					form.value.seller = row[x];
					disabledForm.value.seller = true;
					continue;
				}
				if(x=='address'){
					form.value.address = row[x];
					disabledForm.value.address = true;
					continue;
				}
				if(x=='pingjia'){
					form.value.pingjia = row[x];
					disabledForm.value.pingjia = true;
					continue;
				}
				if(x=='leibie'){
					form.value.leibie = row[x];
					disabledForm.value.leibie = true;
					continue;
				}
				if(x=='city'){
					form.value.city = row[x];
					disabledForm.value.city = true;
					continue;
				}
				if(x=='tags'){
					form.value.tags = row[x];
					disabledForm.value.tags = true;
					continue;
				}
				if(x=='xqurl'){
					form.value.xqurl = row[x];
					disabledForm.value.xqurl = true;
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
		if(form.value.imgurl!=null) {
			form.value.imgurl = form.value.imgurl.replace(new RegExp(context?.$config.url,"g"),"");
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
