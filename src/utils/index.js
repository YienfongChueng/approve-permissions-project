function randomInteger(max) {
    return Math.floor(Math.random() * (max + 1))
}
export function randomRgbColor() {
    const r = randomInteger(255)
    const g = randomInteger(255)
    const b = randomInteger(255)
    return `rgba(${r}, ${g}, ${b}, 0.5)`
}
