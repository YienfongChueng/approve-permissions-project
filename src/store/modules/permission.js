import { routes } from '@/router'
import menus from '@/utils/menu'
import { initRoutes, filterRouter } from '@/utils/routesFn'
import { deepClone } from '@/utils'
const state = {
    routeData: [] // 路由数据，渲染菜单
}
const getters = {
    get_menus: state => state.routeData
}
const mutations = {
    SET_MENUS: (state, data) => {
        state.routeData = data
    }
}
const actions = {
    CHANGE_ROUTES: ({ commit }, rolesArr) => {
        return new Promise((resolve, reject) => {
            // 1. 取出角色 rolesArr  [{id:1,name:'input'}]
            const rolesName = rolesArr.map(v => v.name)
            // 2. 取出审批权限 [{id: 3, name: "approve", permission: "end,one"}]
            const permissions = rolesArr[0].permission
            // 3. 动态生成路由数据
            let filterData = []
            const menuTemp = deepClone([], menus)
            if (rolesName.includes('administrator')) {
                // 管理员
                filterData = menuTemp
            } else {
                // 非管理员，需要根据角色和审批权限管理路由数据
                filterData = filterRouter(menuTemp, rolesName, permissions)
            }
            const homeRoutes = routes.find(v => v.path === '/layout') // {}
            const layoutRoutes = deepClone({}, homeRoutes)
            initRoutes(filterData, layoutRoutes) // 把filterData数据递归添加到layoutRoutesDeepClone下
            // 4. 缓存
            commit('SET_MENUS', filterData)
            resolve(layoutRoutes) // 路由数据
        })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}