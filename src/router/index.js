import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/components/Frame'
import Index from '@/components/index'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Frame,
      children: [
        {path: '/index', name: '首页', component: Index},
        {path: '/shopAdd', name: '添加', component: Index},
        {path: '/shopList', name: '列表', component: Index}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
