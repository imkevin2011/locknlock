import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: {
      user_id:'',
      login_state:''
    },
    userData:{},
    token: ''
  },
  mutations: {
    changeLoginState(state,loginState) {
      state.loginState.user_id = loginState.user_id
      state.loginState.login_state = loginState.login_state
    },
    setUserData(state,userData) {
      state.userData = userData
    },
    logout(state) {
      state.userData = {}
      state.loginState.login_state = 0
      state.loginState.user_id = ''
    },
    clearUserData(){
      this.userData = {}
    }
  },
  getters:{
    getLoginState(state) {
      return state.loginState.login_state
    },
    getUserName(state) {
      return state.userData.user_name
    },
    getAvatar(state){
      return state.userData.avatar
    }
  },
  actions: {
  },
  modules: {
  }
})
