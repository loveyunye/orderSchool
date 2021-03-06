/**
 * created by xuin
 * date 2018-09-10
 */
import axios from 'axios'
import { setToken, 
  setMessage,getMessage,removeMessage,
  getToken, removeToken ,getUserName,setUserName} from '@/utils/auth'
import ajax from '@/utils/ajax'
import Cookie from 'js-cookie'

const user = {
  state: {
    user: '',
    userDetail: {},
    token: getToken(),
    name: getUserName(),
    accountMess: getMessage(),
    timer: null
  },
  mutations: {
    SET_USER: (state, name) => {
      state.user = name
    },
    SET_USERDETAIL: (state, message) => {
      state.userDetail = message
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state,name) => {
      state.name = name
    },
    SET_MESS: (state,message) => {
      state.accountMess = message
    },

    SET_TIMER: (state,timer) => {
      state.timer = timer
    },
    CLEAR_TIMER: (state) => {
      clearTimeout(state.timer)
    }
  },
  actions: {
    LoginUserInfo({commit}, userInfo){
      return new Promise((resolve,reject) => {
        axios.get('/sys/user/getUser?password='+userInfo.password+'&accout='+userInfo.userName).then(res=>{
          if(res.data.length>0){
            let userMessage = res.data[0]

            setUserName(userMessage.name) 
            commit('SET_NAME',userMessage.name)

            // 设置个人信息
            setMessage(JSON.stringify(userMessage))
            commit('SET_MESS',JSON.stringify(userMessage))
            
            if(userMessage.type_id === 1){
              setToken('admin')
              commit('SET_TOKEN','admin')
            }else {
              setToken('business')
              commit('SET_TOKEN','business')
            }
            resolve(true)
          }else {
            resolve(false)
          }
        })
      })
    },
    LogOut({commit,state}){
      return new Promise((resolve,reject) => {
        commit('SET_TOKEN','')
        removeToken()
        removeMessage()  
        resolve()
      })
    },

    setTimer({commit},timer) {
      commit('SET_TIMER',timer)
    },
    clearTimer({commit}) {
      commit('CLEAR_TIMER')
    },

    


    GetUserInfo({commit,state}){
      return new Promise((resolve) => {
        // 判断是否有 Token
        if(state.token) {
          // 判断是否已经获取用户信息
          // if(!localStorage.getItem('userInfo')) {
            ajax('/portal/user/getReserveMyBaseInfo.do',false,false).then(res => {
              localStorage.setItem('userInfo',JSON.stringify(res))
              commit('SET_NAME',res.data.reserveName)

              resolve(true)
            })
          // }else {
          //   resolve(true)
          // }
        } else {
          resolve(false)
        }
      })
    },
    // 保存修改后的个人信息
    setUserMess({commit}, userObject){
      commit('SET_NAME',userObject.name)
      setUserName(userObject.name)
      // 设置个人信息
      setMessage(JSON.stringify(userObject))
      commit('SET_MESS',JSON.stringify(userObject))
      
    },

    // 设置名字
    setusername({commit},name){
      commit('SET_NAME',name)
      setUserName(name) 
    }
  }
}

export default user
