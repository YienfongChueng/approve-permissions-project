export function formatDate(value) {
    const time = new Date(value)
    const y = time.getFullYear()
    const m = (time.getMonth() + 1).toString().padStart(2, '0')
    const d = time.getDate().toString().padStart(2, '0')
    // const h = time.getHours().toString().padStart(2, '0')
    // const mm = time.getMinutes().toString().padStart(2, '0')
    return `${y}-${m}-${d}`
}

// 审批状态
export function statusFilters(val) {
    switch (val) {
        case 0:
            return '初始状态'
        case 1:
            return '提交一审'
        case 2:
            return '一审通过'
        case 3:
            return '一审拒绝'
        case 4:
            return '提交二审'
        case 5:
            return '二审通过'
        case 6:
            return '二审拒绝'
        case 7:
            return '提交终审'
        case 8:
            return '审批通过'
        case 9:
            return '审批拒绝'
        case 10:
            return '生成凭证'
        default:
            return val
    }
}

// 审批状态样式
export function statusColorFilters(val) {
    switch (val) {
        case 0:
            return 'info'
        case 3:
        case 6:
        case 9:
            return 'danger'
        case 1:
        case 4:
        case 7:
            return 'info'
        case 2:
        case 5:
        case 8:
        case 10:
            return 'success'
        default:
            return 'warning'
    }
}

// 审批类别
export function checkTypeFilters(val) {
    switch (val) {
        case 1:
            return '办公审批'
        case 2:
            return '差旅审批'
        case 3:
            return '请假审批'
    
        default:
            return val
    }
}
// 审批类别样式
export function checkTypeColorFilters(val) {
    switch (val) {
        case 1:
            return 'success'
        case 2:
            return 'warning'
        case 3:
            return 'danger'
        default:
            return val
    }
}
export function checkResult(val) {
    switch (val) {
        case 'pass':
            return '通过'
        case 'reject':
            return '拒绝'
        default:
            return '未审批'
    }
}