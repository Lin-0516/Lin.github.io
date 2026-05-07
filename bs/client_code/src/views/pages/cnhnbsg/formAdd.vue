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
					<el-form-item label="标题" prop="title">
						<el-input class="list_inp"
                                  v-model="form.title"
                                  placeholder="标题"
                                  type="text"
							      :readonly="!isAdd||disabledForm.title?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item label="图片" prop="imgurl">
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
				<el-col :span="8">
					<el-form-item label="价格" prop="jiage">
						<el-input class="list_inp"
                                  v-model.number="form.jiage"
                                  placeholder="价格"
                                  type="number"
							      :readonly="!isAdd||disabledForm.jiage?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="起批量" prop="qipi">
						<el-input class="list_inp"
                                  v-model="form.qipi"
                                  placeholder="起批量"
                                  type="text"
							      :readonly="!isAdd||disabledForm.qipi?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="成交" prop="turnover">
						<el-input class="list_inp"
                                  v-model="form.turnover"
                                  placeholder="成交"
                                  type="text"
							      :readonly="!isAdd||disabledForm.turnover?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="询价" prop="xunjia">
						<el-input class="list_inp"
                                  v-model.number="form.xunjia"
                                  placeholder="询价"
                                  type="text"
							      :readonly="!isAdd||disabledForm.xunjia?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="卖家" prop="seller">
						<el-input class="list_inp"
                                  v-model="form.seller"
                                  placeholder="卖家"
                                  type="text"
							      :readonly="!isAdd||disabledForm.seller?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="发货地址" prop="address">
						<el-input class="list_inp"
                                  v-model="form.address"
                                  placeholder="发货地址"
                                  type="text"
							      :readonly="!isAdd||disabledForm.address?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="评价" prop="pingjia">
						<el-input class="list_inp"
                                  v-model.number="form.pingjia"
                                  placeholder="评价"
                                  type="text"
							      :readonly="!isAdd||disabledForm.pingjia?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="类别" prop="leibie">
						<el-input class="list_inp"
                                  v-model="form.leibie"
                                  placeholder="类别"
                                  type="text"
							      :readonly="!isAdd||disabledForm.leibie?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="城市" prop="city">
						<el-input class="list_inp"
                                  v-model="form.city"
                                  placeholder="城市"
                                  type="text"
							      :readonly="!isAdd||disabledForm.city?true:false" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="标签" prop="tags">
						<el-input class="list_inp"
                                  v-model="form.tags"
                                  placeholder="标签"
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
	const tableName = 'cnhnbsg'
	const formName = '农产品肉鹅'
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
		title: '',
		imgurl: '',
		jiage: 0,
		qipi: '',
		turnover: '',
		xunjia: 0,
		seller: '',
		address: '',
		pingjia: 0,
		leibie: '',
		city: '',
		tags: '',
		xqurl: '',
	})
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
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
	const isAdd = ref(false)
	//表单验证
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
	//图片上传回调
	const imgurlUploadSuccess=(e)=>{
		form.value.imgurl = e
	}
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
		}
	}
	//初始化
	//取消
	const backClick = () => {
		history.back()
	}
	//提交
	const save=()=>{
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