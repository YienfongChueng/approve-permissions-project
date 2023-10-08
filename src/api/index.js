import request from '@/utils/request'

const http = {
    get: (url, params) => request.get(url, { params }),
    post: (url, data) => request.post(url, data),
    delete: (url) => request.delete(url),
    upload: (url, file) => request.post(url, file, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export default http