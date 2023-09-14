import menus from '@/utils/menu'

const obj = {}
/**
 * 循环遍历menus
 */
function getMessage(list) {
    list.forEach(d => {
       obj[d.name] = d.name
        if (d.children) {
            getMessage(d.children)
        }
    })
}
getMessage(menus)

export default {
    message: {
        title: 'approvePermissions',
        location: 'location',
        logout: 'logout',
        en: 'English',
        cn: 'Chinese',
        ...obj
    }
}