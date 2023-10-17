export default {
    title: '权限管理',
    url: '/powerManage',
    icon: 'el-icon-user-solid',
    name: 'powerManage',
    component: 'powerManage',
    redirect: '/powerManage/userList',
    children: [
        {
            title: '员工与审批员列表',
            url: '/powerManage/userList',
            icon: 'el-icon-s-custom',
            name: 'userList',
            component: 'powerManage/userList'
        },
        {
            title: '创建员工与审批员',
            url: '/powerManage/createUser',
            icon: 'el-icon-s-claim',
            name: 'createUser',
            component: 'powerManage/createUser'
        },
        {
            title: '审批员权限',
            url: '/powerManage/modifyPower',
            icon: 'el-icon-s-opportunity',
            name: 'modifyPower',
            component: 'powerManage/modifyPower'
        }
    ]
}