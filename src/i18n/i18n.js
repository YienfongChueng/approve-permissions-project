import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './lang'

Vue.use(VueI18n)

// 创建实例
const i18n = new VueI18n({
    locale: navigator.language, // 获取浏览器的语言,
    messages,
    fallbackLocale: 'cn', // 使用fallbackLocale：'<lang>'选择首选语言缺少翻译时要使用的语言
    silentFallbackWarn: true
})

export default i18n