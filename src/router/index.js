import Vue from 'vue'
import VueRouter from 'vue-router'
import menus from '@/utils/menu'
import { initRoutes } from '@/utils/routesFn'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')

  },
  {
    path: '/layout', // 项目布局
    name: 'layout',
    meta: { title: '企业首页' },
    component: () => import(/* webpackChunkName: "layout" */ '@/layout/index.vue'),
    redirect: '/index',
    children: [
      // {
      //   path: '/index', // 企业首页
      //   name: 'index',
      //   component: () => import('@/views/Home/index/index.vue')
      // },
    ]
  }
]
// 1.找出layout
const layoutRoutes = routes.find(v => v.path === '/layout') // {}
// 2.添加children子级别
layoutRoutes.children = []
// 3.动态添加菜单
initRoutes(menus, layoutRoutes.children) // 参数二是数组

const router = new VueRouter({
  routes
})

export default router
