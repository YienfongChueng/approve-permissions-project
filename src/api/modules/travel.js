import http from '../index'

const prefix = '/apply/travel'

// 差旅审批-列表分页查询
export function applyTravelList(params = {}) {
    return http.get(`${prefix}/list`, params)
}

// 差旅审批-创建&编辑
export function applyTravelCreate(data = {}) {
    return http.upload(`${prefix}/createOrUpd`, data)
}

// 差旅审批-删除
export function applyTravelDelete(id) {
    return http.delete(`${prefix}/delete/${id}`)
}

// 差旅审批-提交
export function applyTravelSubmit(data = {}) {
    return http.post(`${prefix}/submitToApprove`, data)
}

