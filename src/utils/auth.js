const tokenKey = 'approvalPerssionToken'

export function getToken() {
    return localStorage.getItem(tokenKey)
}

export function setToken(value) {
    return localStorage.setItem(tokenKey, value)
}

export function removeToken() {
    return localStorage.removeItem(tokenKey)
}
