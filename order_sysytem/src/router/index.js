import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/view/layout'
/**
 * created by xuin
 * date 2018-09-10
 * 路由配置
 */

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/login')
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    icon: 'location',
    title: '首页',
    auth:'common',
    children:[
      {
        path: 'index',
        name: 'dashboardIndex',
        component: () => import('@/view/dashboard/dashboard'),
      }
    ]
  },
  
  {
    path: '/orderList',
    component: Layout,
    redirect: '/orderList/index',
    icon: 'bell',
    title:'订单管理',
    auth:'common',
    children:[
      {
        path: 'index',
        name: 'orderListIndex',
        component: () => import('@/view/orderList/orderList'),
      }
    ]
  },
  {
    path: '/menuList',
    component: Layout,
    redirect: '/menuList/index',
    title:'菜单管理',
    icon: 'menu',
    auth:'common',
    children:[
      {
        path: 'index',
        name: 'menuListIndex',
        component: () => import('@/view/menuList/menuList'),
      }
    ]
  },
  {
    path: '/customerManage',
    component: Layout,
    redirect: '/customerManage/index',
    icon: 'setting',
    title:'客户管理',
    auth:'admin',
    children:[
      {
        path: 'index',
        name: 'customerManageIndex',
        component: () => import('@/view/customerManage/customerManage'),
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    icon: 'tickets',
    redirect: '/personal/message',
    title:'个人信息',
    auth:'common',
    children:[
      {
        path: 'message',
        name: 'personalIndex',
        component: () => import('@/view/personal/message'),
      }
    ]
  } 
]

export default new Router({
  linkActiveClass: 'active',
  routes: constantRouterMap
})
