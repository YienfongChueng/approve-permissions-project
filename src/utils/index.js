function randomInteger(max) {
    return Math.floor(Math.random() * (max + 1))
}
export function randomRgbColor() {
    const r = randomInteger(255)
    const g = randomInteger(255)
    const b = randomInteger(255)
    return `rgba(${r}, ${g}, ${b}, 0.5)`
}

export function formatDate(value) {
    const time = new Date(value)
    const y = time.getFullYear()
    const m = time.getMonth() + 1
    const d = time.getDate()
    const h = time.getHours()
    const mm = time.getMinutes()
    return `${y}-${m < 10 ? '0' + m : m}-${d} ${h}:${mm}`
}
