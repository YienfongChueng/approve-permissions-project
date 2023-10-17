
/**
 * 根据角色和审批权限数据进行过滤原始数据，返沪过滤后的路由数据
 * @param {*} menus 原始数据
 * @param {*} rolesName 角色数据
 * @param {*} permissions 审批权限数据
 * @returns
 */
export function filterRouter(menus, rolesName, permissions) {
  const result = menus.filter(item => {
    if (item.name === 'approvalProcess' && permissions) {
      const list = permissions.split(',')
      item.children = item.children.filter(v => list.some(p => v.permission.includes(p)))
    }
    return item.roles && rolesName.some(d => item.roles.includes(d))
  })
  return result
}

/**
 * 根据原始数据进行递归动态生成路由数据
 * @param {*} data 原始数据
 * @param {*} dest 目标路由数据
 */
 export function initRoutes(data, dest) {
  data.forEach(item => {
    const routerObj = {
      path: item.url,
      name: item.name,
      meta: { title: item.title },
      redirect: item.redirect,
      component: () => import(`@/views/Home/${item.component}/index.vue`)
    }
    // 判断目标路由是否有children，没有则初始化一个children，有则push routerObj
    if (!dest.children) {
      dest.children = []
    }
    dest.children.push(routerObj)
    // 判断当前循环的item项是否有children，有则递归
    if (item.children) {
      initRoutes(item.children, routerObj)
    }
  })
}

// 另一种写法
// export function initRoutes(data, subData) {
//     data.forEach(item => {
//       // 生成路由格式的数据
//       const routeObj = {
//         path: item.url,
//         name: item.name,
//         meta: { title: item.title },
//         redirect: item.redirect,
//         component: () => import(`@/views/Home/${item.component}/index.vue`)
//       }
//       // 判断是否数组
//       if (subData instanceof Array) {
//         subData.push(routeObj)
//       } else {
//         if (!subData.children) {
//           subData.children = []
//         }
//         subData.children.push(routeObj)
//       }
//       // 判断是否有children
//       if (item.children) {
//         initRoutes(item.children, routeObj) // 参数二是对象
//       }
//     })
// }