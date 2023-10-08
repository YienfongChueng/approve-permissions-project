export function nameRule(rule, value, callback) {
    const reg = /^([a-zA-Z0-9]{4,10})$/
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else if (!reg.test(value)) {
        callback(new Error('请输入4-10位用户名'))
    } else {
        callback()
    }
}

export function moneyRule(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入报销金额'))
    } else if (!Number.isInteger(value)) {
        callback(new Error('请输入有效的报销金额'))
    } else if (Number(value) < 1 || Number(value) > 5000) {
        callback(new Error('只能申请1-5000元的报销金额'))
    } else {
        callback()
    }
}

export function destinationRule(rule, value, callback) {
    if (!value || value.length === 0) {
        callback(new Error('请选择出差城市'))
    } else {
        callback()
    }
}
