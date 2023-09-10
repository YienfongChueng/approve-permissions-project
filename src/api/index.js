import request from '@/utils/request'

const http = {
    get: (url, params) => request.get(url, { params }),
    post: (url, data) => request.post(url, data)
}

export default http