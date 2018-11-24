import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Testt'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Test',
      component: Test,
      meta: {
        keepAlive: true
      }
    }
    //   path: '/',
    //   redirect: '/dashboard',
    //   name: 'Container',
    //   component: Container,
    //   children: [
    //     {path: 'dashboard', name: '首页', component: Dashboard, },
    //     {path: 'article', name: '文章', component: Article, },
    //   ]
    // }
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login,
    //   meta: {
    //     keepAlive: false
    //   }
    // },
    // {
    //   path: '/index',
    //   name: 'index',
    //   component: index,
    //   meta: {
    //     keepAlive: true
    //   }
    // },
    // {
    //   path: '/versionList',
    //   name: 'versionList',
    //   component: versionList,
    //   meta: {
    //     keepAlive: true
    //   }
    // }
  ]
})
