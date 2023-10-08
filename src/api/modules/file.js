import http from '../index'

const prefix = '/doc'

// 档案管理--查询
export function docList(params = {}) {
    return http.get(`${prefix}/list`, params)
}
// 档案管理-生成凭证
export function docCreateFile(data = {}) {
    return http.post(`${prefix}/createFile`, data)
}

// 档案管理-下载凭证
export function downloadDoc(id) {
    return http.get(`${prefix}/download?id=${id}`)
}