import toolUtil from '@/utils/toolUtil.js'
import config from '@/utils/config.js'
import http from '@/utils/http.js'
import default_avatar from "@/assets/avatar.png"
import router from '@/router/index'

export default {
    namespaced: true,
    state:{
        session:{},
        sessionTable:'',
    },
    getters:{
        session(state){
            return state.session
        },
        avatar(state){
            let key;
            if(state.sessionTable == 'yonghu'){
                key = 'touxiang'
            }
            let avatar = state.session[key]
            return avatar?config.get().url+avatar.split(',')[0]:default_avatar
        },
        username(state){
            if(state.sessionTable == 'yonghu'){
                return state.session['zhanghao']
            }
        },
        showName(state,getters){
            if(state.sessionTable == 'users'){
                return getters.username
            }
            if(state.sessionTable == 'yonghu'){
                return getters.username
            }
        },
    },
    actions:{
        async getSession({commit}){
            let sessionTable = toolUtil.storageGet('frontSessionTable')
            if(!sessionTable){
                router.push('/login')
                return
            }
            commit('set_sessionTable',sessionTable)
            let res = await http.get(`${sessionTable}/session`)
            if(res.data.code==0){
                commit('set_session',res.data.data)
            }
            return res
        },
        async update({commit},data){
            let res = await http.post(`${toolUtil.storageGet('frontSessionTable')}/update`,data)
            if(res.data.code==0){
                commit('assign_session',data)
            }
            return res
        },
        loginOut({commit},data){
            commit('set_session',{})
            commit('set_sessionTable','')
        }
    },
    mutations:{
        set_session(state,data){
            state.session = data
        },
        assign_session(state,data){
            Object.assign(state.session,JSON.parse(JSON.stringify(data)))
        },
        set_sessionTable(state,data){
            state.sessionTable = data
        },
    }
}