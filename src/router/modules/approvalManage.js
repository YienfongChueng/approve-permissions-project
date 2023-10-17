export default {
    title: '申请管理',
    url: '/approvalManage',
    icon: 'el-icon-s-grid',
    name: 'approvalManage',
    component: 'approvalManage',
    redirect: '/approvalManage/officeManage',
    roles: ['input'],
    children: [
        {
            title: '办公审批',
            url: '/approvalManage/officeManage',
            icon: 'el-icon-school',
            name: 'officeManage',
            component: 'approvalManage/officeManage'
        },
        {
            title: '请假审批',
            url: '/approvalManage/leaveManage',
            icon: 'el-icon-notebook-2',
            name: 'leaveManage',
            component: 'approvalManage/leaveManage'
        },
        {
            title: '差旅审批',
            url: '/approvalManage/travelManage',
            icon: 'el-icon-notebook-1',
            name: 'travelManage',
            component: 'approvalManage/travelManage'
        }
    ]
}