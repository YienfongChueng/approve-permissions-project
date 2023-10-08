import http from '../index'

const prefix = '/permission'

// 权限管理-查询员工与审批员列表
export function userList(params = {}) {
    return http.get('/user/list', params)
}


// 权限管理-查询审批员权限
export function permissionList(params = {}) {
    return http.get(`${prefix}/list`, params)
}
// 权限管理-创建员工与审批员
export function createUser(data = {}) {
    return http.post(`${prefix}/createUser`, data)
}
// 权限管理-查询员工与审批员列表-删除
export function delUser(id) {
    return http.delete(`${prefix}/removeUser/${id}`)
}
// 权限管理-修改审批员权限
export function createOrUpdatePermission(data = {}) {
    return http.post(`${prefix}/create-or-upd`, data)
}