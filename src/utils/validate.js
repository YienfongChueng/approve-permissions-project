export function nameRule(rule,value,callback) {
    let reg = /^([a-zA-Z0-9]{4,10})$/
    if(value === '') {
        callback(new Error('请输入用户名'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入4-10位用户名'))
    } else {
        callback()
    }
}
