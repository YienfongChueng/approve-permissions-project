import http from '../index'

const prefix = '/apply/office'

// 办公审批-列表分页查询
export function applyOfficeList(params = {}) {
    return http.get(`${prefix}/list`, params)
}

// 办公审批-创建&编辑
export function applyOfficeCreate(data = {}) {
    return http.post(`${prefix}/createOrUpd`, data)
}

// 办公审批-删除
export function applyOfficeDelete(id) {
    return http.delete(`${prefix}/delete/${id}`)
}

// 办公审批-提交
export function applyOfficeSubmit(data = {}) {
    return http.post(`${prefix}/submitToApprove`, data)
}


