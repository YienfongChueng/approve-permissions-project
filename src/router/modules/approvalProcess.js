export default {
    title: '审批流程',
    url: '/approvalProcess',
    icon: 'el-icon-s-check',
    name: 'approvalProcess',
    component: 'approvalProcess',
    redirect: '/approvalProcess/firstInstance',
    roles: ['approve'],
    children: [
        {
            title: '一审',
            url: '/approvalProcess/firstInstance',
            icon: 'el-icon-tickets',
            name: 'firstInstance',
            component: 'approvalProcess/firstInstance',
            permission: ['one']
        },
        {
            title: '二审',
            url: '/approvalProcess/secondInstance',
            icon: 'el-icon-document',
            name: 'secondInstance',
            component: 'approvalProcess/secondInstance',
            permission: ['two']
        },
        {
            title: '终审',
            url: '/approvalProcess/lastInstance',
            icon: 'el-icon-document-checked',
            name: 'lastInstance',
            component: 'approvalProcess/lastInstance',
            permission: ['end']
        }
    ]
}