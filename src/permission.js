import router, { resetRouter } from './router'
import store from './store'

router.beforeEach(async(to, from, next) => {
    // 当前路由是否登陆页
    if (to.path === '/login') {
        next()
    } else { // 不是登陆页
        // 是否有缓存角色
        console.log(store.getters['user/roles'])
        const ifRoles = store?.getters['user/roles']?.length > 0
        if (ifRoles) {
            next()
        } else {
            // 无缓存角色则请求接口获取角色数据
            const roles = await store.dispatch('user/GET_USER_ROLES')
            console.log('roles:', roles)
            // 路由过滤
            const filterRoutes = await store.dispatch('permission/CHANGE_ROUTES', roles)
            resetRouter() // 重置路由
            router.addRoutes(filterRoutes)
            if (roles) {
                next({ path: to.path })
            } else {
                next({ path: '/login' }) // 没有角色回到登录
            }
        }
    }
})