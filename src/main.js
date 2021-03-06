// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import {setCookie, getCookie, delCookie} from './util/util.js'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
// 提交表单格式允许json
Vue.http.options.emulateJSON = true
Vue.prototype.Cookie = {setCookie, getCookie, delCookie}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
