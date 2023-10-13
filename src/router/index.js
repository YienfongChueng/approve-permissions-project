import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const routes = [
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

const createRouter = () => new VueRouter({
  routes
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
