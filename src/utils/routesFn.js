export function initRoutes(data, subData) {
    data.forEach(item => {
      // 生成路由格式的数据
      const routeObj = {
        path: item.url,
        name: item.name,
        meta: { title: item.title },
        redirect: item.redirect,
        component: () => import(`@/views/Home/${item.component}/index.vue`)
      }
      // 判断是否数组
      if (subData instanceof Array) {
        subData.push(routeObj)
      } else {
        if (!subData.children) {
          subData.children = []
        }
        subData.children.push(routeObj)
      }
      // 判断是否有children
      if (item.children) {
        initRoutes(item.children, routeObj) // 参数二是对象
      }
    })
  }