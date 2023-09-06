// import request from '@/utils/request'
import http from '../index'

const prefix = '/user'

// 用户登陆
export function loginApi(data={}) {
    // return request({
    //     method: 'post',
    //     url: `${prefix}/login`,
    //     data
    // })
    return http.post(`${prefix}/login`,data)
} 

// 用户退出登陆
export function logoutApi(data={}) {
    // return request({
    //     method: 'post',
    //     url: `${prefix}/logout`,
    //     data
    // })
    return http.post(`${prefix}/logout`,data)
}

// 查询用户信息
export function userInfo(params={}) {
    // return request({
    //     method: 'get',
    //     url: `${prefix}/info`,
    //     params
    // })
    return http.get(`${prefix}/info`,params)
}

// 查询所有员工
export function queryEmploye(params={}) {
    // return request({
    //     method: 'get',
    //     url: `${prefix}/employee`,
    //     params
    // })
    return http.get(`${prefix}/employee`,params)
}

// 查询所有员工分布
export function queryEmployeMap(params={}) {
    // return request({
    //     method: 'get',
    //     url: `${prefix}/employ-map`,
    //     params
    // })
    return http.get(`${prefix}/employ-map`,params)
}

// 省市区数据
export function getArea(params={}) {
    // return request({
    //     method: 'get',
    //     url: `${prefix}/area`,
    //     params
    // })
    return http.get( `${prefix}/area`,params)
}