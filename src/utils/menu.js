import approvalApply from '@/router/modules/approvalApply'
import approvalManage from '@/router/modules/approvalManage'
import approvalProcess from '@/router/modules/approvalProcess'
import fileManage from '@/router/modules/fileManage'
import powerManage from '@/router/modules/powerManage'
export default [
        {
            title: '企业首页',
            url: '/index',
            icon: 'el-icon-s-home',
            name: 'index',
            component: 'index',
            roles: ['input', 'approve']
        },
        approvalApply,
        approvalManage,
        approvalProcess,
        fileManage,
        powerManage
    ]

    

 