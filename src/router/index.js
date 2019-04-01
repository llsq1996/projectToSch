import Vue from 'vue'
import Router from 'vue-router'
import Frame from '@/components/Frame'
import Index from '@/components/index'
import Login from '@/components/Login'
import ShopAdd from '@/components/pages/ShopAdd'
import ShopDetail from '@/components/pages/ShopDetail'
import ShopList from '@/components/pages/ShopList'
import UserAdd from '@/components/pages/UserAdd'
import UserDetail from '@/components/pages/UserDetail'
import UserList from '@/components/pages/UserList'
import ShopSupplement from '@/components/pages/ShopSupplement'
import Category from '@/components/pages/CategoryCount'
import AddCount from '@/components/pages/ShopAddCount'
import UserCount from '@/components/pages/UserCount'
import AuditList from '@/components/pages/AuditList'
import AuditList2 from '@/components/pages/AuditList2'
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
        {path: '/shopSupplement', name: 'shopSupplement', component: ShopSupplement},
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
        {path: '/auditList', name: 'auditList', component: AuditList},
        {path: '/auditList2', name: 'auditList2', component: AuditList2}
      ]
    },
    {
      path: '/count',
      redirect: '/index',
      name: 'index',
      component: Frame,
      children: [
        {path: '/index', name: 'index', component: Index},
        {path: '/category', name: 'category', component: Category},
        {path: '/addCount', name: 'addCount', component: AddCount},
        {path: '/userCount', name: 'userCount', component: UserCount}
      ]
    },
    {
      path: '/people',
      redirect: '/index',
      name: 'index',
      component: Frame,
      children: [
        {path: '/index', name: 'index', component: Index},
        {path: '/userAdd', name: 'userAdd', component: UserAdd},
        {path: '/userList', name: 'userList', component: UserList},
        {path: '/userDetail', name: 'userDetail', component: UserDetail}
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
