export default {
    title: '申请类别',
    url: '/approvalApply',
    icon: 'el-icon-s-unfold',
    name: 'approvalApply',
    component: 'approvalApply',
    redirect: '/approvalApply/officeApply',
    roles: ['input'],
    children: [
        {
            title: '办公审批',
            url: '/approvalApply/officeApply',
            icon: 'el-icon-office-building',
            name: 'officeApply',
            component: 'approvalApply/officeApply'
        },
        {
            title: '请假审批',
            url: '/approvalApply/leaveApply',
            icon: 'el-icon-files',
            name: 'leaveApply',
            component: 'approvalApply/leaveApply'
        },
        {
            title: '差旅审批',
            url: '/approvalApply/travelApply',
            icon: 'el-icon-mobile',
            name: 'travelApply',
            component: 'approvalApply/travelApply'
        }
    ]
}