import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/components/Frame'
import Index from '@/components/index'
import Login from '@/components/Login'
import ShopAdd from '@/components/pages/ShopAdd'
import ShopDetail from '@/components/pages/ShopDetail'
import ShopList from '@/components/pages/ShopList'
import UserAdd from '@/components/pages/UserAdd'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      name: 'index',
      component: Frame,
      children: [
        {path: '/index', name: 'index', component: Index},
        {path: '/shopAdd', name: 'shopAdd', component: ShopAdd},
        {path: '/shopList', name: 'shopList', component: ShopList},
        {path: '/shopDetail', name: 'shopDetail', component: ShopDetail}
      ]
    },
    {
      path: '/audit',
      redirect: '/index',
      name: 'index',
      component: Frame,
      children: [
        {path: '/index', name: 'index', component: Index},
        {path: '/shopAdd', name: 'shopAdd', component: ShopAdd},
        {path: '/shopList', name: 'shopList', component: ShopList}
      ]
    },
    {
      path: '/count',
      redirect: '/index',
      name: 'index',
      component: Frame,
      children: [
        {path: '/index', name: 'index', component: Index},
        {path: '/shopAdd', name: 'shopAdd', component: ShopAdd},
        {path: '/shopList', name: 'shopList', component: ShopList}
      ]
    },
    {
      path: '/people',
      redirect: '/index',
      name: 'index',
      component: Frame,
      children: [
        {path: '/userAdd', name: 'userAdd', component: UserAdd},
        {path: '/shopAdd', name: 'shopAdd', component: ShopAdd},
        {path: '/shopList', name: 'shopList', component: ShopList}
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
