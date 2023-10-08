import http from '../index'

const prefix = '/approve'

// 一审-查询
export function approveOneList(params = {}) {
    return http.get(`${prefix}/one/list`, params)
}
// 一审-通过
export function approveOnePass(data = {}) {
    return http.post(`${prefix}/one/pass`, data)
}
// 一审-驳回
export function approveOneReject(data = {}) {
    return http.post(`${prefix}/one/reject`, data)
}



// 二审-查询
export function approveTwoList(params = {}) {
    return http.get(`${prefix}/two/list`, params)
}
// 二审-通过
export function approveTwoPass(data = {}) {
    return http.post(`${prefix}/two/pass`, data)
}
// 二审-驳回
export function approveTwoReject(data = {}) {
    return http.post(`${prefix}/two/reject`, data)
}



// 终审-查询
export function approveEndList(params = {}) {
    return http.get(`${prefix}/end/list`, params)
}
// 终审-通过
export function approveEndPass(data = {}) {
    return http.post(`${prefix}/end/pass`, data)
}
// 终审-驳回
export function approveEndReject(data = {}) {
    return http.post(`${prefix}/end/reject`, data)
}