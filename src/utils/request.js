import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store'

const service = axios.create({
    baseURL: process.env.VUE_APP_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/api',
    timeout: 5000
})

// 拦截请求
service.interceptors.request.use(config => {
    config.headers.token = getToken('token')
    return config
}, err => {
    return Promise.reject(err)
})
// 拦截响应
service.interceptors.response.use(response => {
    const { code, msg, data } = response.data
    if (code !== 20000) {
        if (code === 401) {
            Message({ message: msg || '暂无权限!', type: 'error' })
            // 返回到登陆页面
            store.dispatch('user/TO_LOGIN_PAGE')
            return Promise.reject(msg)
        } else if (code === 10000 || code === 20001) {
            Message({
                message: data?.message || msg || '服务器不给力!',
                type: 'error',
                duration: 2000
            })
            store.dispatch('user/TO_LOGIN_PAGE')
            return Promise.reject(msg)
        } else {
            Message({
                message: msg || '服务器不给力!',
                type: 'error',
                duration: 2000
            })
            return Promise.reject(msg)
        }
    }
    return response.data
}, err => {
    return Promise.reject(err)
})

export default service