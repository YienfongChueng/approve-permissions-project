import menus from '@/utils/menu'

const obj = {}
/**
 * 循环遍历menus
 */
function getMessage(list) {
    list.forEach(d => {
       obj[d.name] = d.title
        if (d.children) {
            getMessage(d.children)
        }
    })
}
getMessage(menus)

export default {
    message: {
        title: '审批流程权限系统',
        location: '当前位置',
        logout: '退出登录',
        en: '英',
        cn: '中',
        ...obj

    }
}