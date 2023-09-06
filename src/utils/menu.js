export default [
    {
        title: '企业首页',
        url: '/index',
        icon: 'el-icon-s-home',
        name: 'index',
        component: 'index'
    },
    {
      title: '申请类别',
      url: '/approvalApply',
      icon: 'el-icon-s-unfold',
      name: 'approvalApply',
      component: 'approvalApply',
      redirect: '/approvalApply/officeApply',
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
    },
    {
        title: '申请管理',
        url: '/approvalManage',
        icon: 'el-icon-s-grid',
        name: 'approvalManage',
        component: 'approvalManage',
        redirect: '/approvalManage/officeManage',
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
    },
    {
        title: '审批流程',
        url: '/approvalProcess',
        icon: 'el-icon-s-check',
        name: 'approvalProcess',
        component: 'approvalProcess',
        redirect: '/approvalProcess/firstInstance',
        children: [
            {
                title: '一审',
                url: '/approvalProcess/firstInstance',
                icon: 'el-icon-tickets',
                name: 'firstInstance',
                component: 'approvalProcess/firstInstance'
            },
            {
                title: '二审',
                url: '/approvalProcess/secondInstance',
                icon: 'el-icon-document',
                name: 'secondInstance',
                component: 'approvalProcess/secondInstance'
            },
            {
                title: '终审',
                url: '/approvalProcess/lastInstance',
                icon: 'el-icon-document-checked',
                name: 'lastInstance',
                component: 'approvalProcess/lastInstance'
            }
        ]
    },
    {
        title: '档案管理',
        url: '/fileManage',
        icon: 'el-icon-s-order',
        name: 'fileManage',
        component: 'fileManage'
    },
    {
        title: '权限管理',
        url: '/powerManage',
        icon: 'el-icon-user-solid',
        name: 'powerManage',
        component: 'powerManage'
    }
  ]

 