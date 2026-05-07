<template>
    <el-dialog v-model="formVisible" :title="formTitle" width="70%" class="edit_view" destroy-on-close>
        <el-form class="add_form" :model="form" label-width="120px" :rules="rules" ref="formRef">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="标题" prop="title">
                        <el-input class="list_inp" v-model="form.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="分类" prop="typeName">
                        <el-select
                            class="list_sel"
                            v-model="form.typeName"
                            placeholder="请选择分类"
                            style="width:100%;"
                        >
                            <el-option v-for="(item,index) in typeNameLists" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="封面" prop="cover">
                        <uploads
                            action="file/upload"
                            tip="请上传封面"
                            style="width: 100%;text-align: left;"
                            :fileUrls="form.cover?form.cover:''"
                            @change="uploadSuccess">
                        </uploads>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="类型" prop="isdone">
                        <el-radio-group class="list_radio" v-model="form.isdone">
                            <el-radio value="开放">公开</el-radio>
                            <el-radio value="关闭">私密</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="匿名发帖" prop="isAnonymous">
                        <el-radio-group class="list_radio" v-model="form.isAnonymous">
                            <el-radio :value="0">否</el-radio>
                            <el-radio :value="1">是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="内容" prop="content">
                        <editor :value="form.content" placeholder="请输入内容"
                                class="list_editor" @change="contentChange"></editor>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer>
				<span class="formModel_btn_box">
					<el-button class="formModel_cancel" @click="formVisible=false">关闭</el-button>
					<el-button class="formModel_confirm" type="primary" @click="save">{{form.id?'修改保存':'发布'}}</el-button>
				</span>
        </template>
    </el-dialog>
</template>
<script setup>
import {
    ref,
    nextTick,
    getCurrentInstance, onMounted
} from 'vue';
import {
    useRoute,
    useRouter
} from 'vue-router'
import Img from "@/components/img.vue";
const context = getCurrentInstance()?.appContext.config.globalProperties;
//基础信息
const tableName = 'forum'
const formName = '论坛交流'
const router = useRouter()
const route = useRoute()
const sessionTable = localStorage.getItem('frontSessionTable')
const baseUrl = ref(context.$config.url)
const userid = ref(context.$toolUtil.storageGet('userid'))

const formRef = ref(null)
const formVisible = ref(false)
const formTitle = ref('发布新帖')
const form = ref({
    title: '',
    isdone: '开放',
    content: '',
    parentid: 0,
    userid: userid.value,
    username: context.$toolUtil.storageGet('frontName'),
    avatarurl:context.$toolUtil.storageGet('headportrait')||''
})
const rules = ref({
    title: [{
        required: true,
        message: '请输入标题',
        trigger: 'blur'
    }],
    content: [{
        required: true,
        message: '请输入内容',
        trigger: 'blur'
    }],
    cover: [{
        required: true,
        message: '请上传封面',
        trigger: 'blur'
    }],
    typeName: [{
        required: true,
        message: '请选择分类',
        trigger: 'blur'
    }],
})
//分类列表
const typeNameLists = ref([])
//帖子内容回调
const contentChange = (e)=>{
    form.value.content = e
}
//上传回调
const uploadSuccess=(e)=>{
    form.value.cover = e
}
const emits = defineEmits(['close'])
//发布帖子
const save = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            for (var i = 0; i < sensitiveWordsArr.value.length; i++) {
                //全局替换
                var reg = new RegExp(sensitiveWordsArr.value[i], "g");
                //判断内容中是否包括敏感词
                if (form.value.content.indexOf(sensitiveWordsArr.value[i]) > -1) {
                    // 将敏感词替换为 **
                    form.value.content = form.value.content.replace(reg, "**");
                }
            }
            context.$http({
                url: `forum/${form.value.id?'update':'add'}`,
                method: 'post',
                data: form.value
            }).then(res => {
                context.$message.success(`${form.value.id?'修改成功':'发布成功 '}`)
                formVisible.value = false
                emits('close')
            })
        }
    })
}
const sensitiveWordsArr = ref([])
const getSensitiveWords = ()=>{
    context.$http.get('sensitiveword/detail/1').then(res=>{
        if(res.data.data.content){
            sensitiveWordsArr.value = res.data.data.content.split(',')
        }
    })
}
getSensitiveWords()
const resetForm = () => {
    form.value = {
        title: '',
        isdone: '开放',
        isAnonymous:0,
        content: '',
        parentid: 0,
        userid: userid.value,
        username: context.$toolUtil.storageGet('frontName'),
        avatarurl:context.$toolUtil.storageGet('headportrait')||''
    }
}
const init = (id)=>{
    if(!id){
        resetForm()
        formTitle.value = '发布新帖'
        formVisible.value = true
    }else{
        context.$http({
            url: `forum/detail/${id}`,
            method: 'get'
        }).then(res => {
            form.value = res.data.data
            formTitle.value = '修改帖子'
            formVisible.value = true
        })
    }
    context?.$http({
        url: `option/forumType/typeName`,
        method: 'get'
    }).then(res=>{
        typeNameLists.value = res.data.data
    })
}
defineExpose({
    init,
})
</script>
<style scoped lang="scss">

</style>