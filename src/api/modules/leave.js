import http from '../index'

const prefix = '/apply/leave'

// 请假审批-列表分页查询
export function applyLeavelList(params = {}) {
    return http.get(`${prefix}/list`, params)
}

// 请假审批-创建&编辑
export function applyLeavelCreate(data = {}) {
    return http.post(`${prefix}/createOrUpd`, data)
}

// 请假审批-删除
export function applyLeavelDelete(id) {
    return http.delete(`${prefix}/delete/${id}`)
}

// 请假审批-提交
export function applyLeavelSubmit(data = {}) {
    return http.post(`${prefix}/submitToApprove`, data)
}

