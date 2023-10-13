function randomInteger(max) {
    return Math.floor(Math.random() * (max + 1))
}
/**
 * 颜色随机生成函数
 * @returns
 */
export function randomRgbColor() {
    const r = randomInteger(255)
    const g = randomInteger(255)
    const b = randomInteger(255)
    return `rgba(${r}, ${g}, ${b}, 0.5)`
}

/**
 * 日期格式化
 * @param {*} value
 * @returns
 */
export function formatDate(value) {
    const time = new Date(value)
    const y = time.getFullYear()
    const m = time.getMonth() + 1
    const d = time.getDate()
    const h = time.getHours()
    const mm = time.getMinutes()
    return `${y}-${m < 10 ? '0' + m : m}-${d} ${h}:${mm}`
}

/**
 * 对象深拷贝
 * @param {*} dest 目标对象
 * @param {*} obj 源对象
 * @returns
 */
export function deepClone(dest, obj) {
    const o = dest
    for (const key in obj) {
        if (typeof (obj[key]) === 'object') {
            o[key] = (obj[key].constructor === Array) ? [] : {}
            deepClone(o[key], obj[key])
        } else {
            o[key] = obj[key]
        }
    }
    return o
}
