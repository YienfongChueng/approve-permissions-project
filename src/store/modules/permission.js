import { routes } from '@/router'
import menus from '@/utils/menu'
import { initRoutes, filterRouter } from '@/utils/routesFn'
import { deepClone } from '@/utils'
const state = {
    routeData: [] // 路由数据
}
const getters = {
    get_routes: state => state.routeData
}
const mutations = {
    SET_ROUTES: (state, data) => {
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
            const layoutRoutes = routes.find(v => v.path === '/layout') // {}
            let filterData = []
            const menuTemp = deepClone([], menus)
            if (rolesName.includes('administrator')) {
                // 管理员
                filterData = menuTemp
            } else {
                // 非管理员，需要根据角色和审批权限管理路由数据
                
                filterData = filterRouter(menuTemp, rolesName, permissions)
            }
            initRoutes(filterData, layoutRoutes)
            // 4. 缓存
            console.log('routes:', routes)
            commit('SET_ROUTES', filterData)
            resolve(routes) // 路由数据
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