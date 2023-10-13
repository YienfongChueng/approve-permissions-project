import { userInfo, logoutApi } from '@/api/modules/user'
import { removeToken } from '@/utils/auth'
import router from '@/router'
const state = {
    roles: [] // 角色
}
const getters = {
    roles: state => state.roles
}
const mutations = {
    SET_ROLES: (state, data) => {
        state.roles = data // 设置state.roles
    }
}

const actions = {
    GET_USER_ROLES({ commit }) {
        return new Promise((resolve, reject) => {
            userInfo().then(res => {
                console.log(res.data)
                const { data } = res
                commit('SET_ROLES', data.roles) // //获取数据 缓存在vuex
                resolve(data.roles)
            }).catch(err => {
                reject(err)
            })
        })
    },
    LOGOUT({ commit }) {
        return new Promise((resolve, reject) => {
            logoutApi().then(res => {
                commit('SET_ROLES', []) // 清空角色
                removeToken() // 清空token
                router.push('/login') // 返回登陆页
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    TO_LOGIN_PAGE({ commit }) {
        return new Promise((resolve, reject) => {
            console.log(1111)
            commit('SET_ROLES', []) // 清空角色
            removeToken() // 清空token
            router.push('/login') // 返回登陆页
            resolve()
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