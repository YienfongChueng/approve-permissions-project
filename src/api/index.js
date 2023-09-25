import request from '@/utils/request'

const http = {
    get: (url, params) => request.get(url, { params }),
    post: (url, data) => request.post(url, data),
    delete: (url) => request.delete(url)
}

export default http