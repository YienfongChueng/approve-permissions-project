import router, { resetRouter } from './router'
import store from './store'

router.beforeEach(async(to, from, next) => {
    // debugger
    // console.trace()
    // 当前路由是否登陆页
    if (to.path === '/login') {
        next()
    } else { // 不是登陆页
        // 是否有缓存角色
        const hasRoles = store?.getters['user/roles']?.length > 0
        console.log('hasRoles:', hasRoles)
        if (hasRoles) {
            next()
        } else {
            // 无缓存角色则请求接口获取角色数据
            const roles = await store.dispatch('user/GET_USER_ROLES')
            // 根据权限改变路由列表
            const routes = await store.dispatch('permission/CHANGE_ROUTES', roles)
            router.addRoutes([routes])
            //  resetRouter() // 重置路由
            if (roles) {
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            } else {
                next({ path: '/login' }) // 没有角色回到登录
            }
        }
    }
})