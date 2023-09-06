<template>
    <div class="app-breadcrumb">
        <!-- 面包屑 -->
        <Breadcrumb />
        <!-- 右侧按钮 -->
        <div class="right-menu clearfix">
            <span class="user-name">{{loginUser.account}}</span>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-avatar class="user"> user </el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    <el-dropdown-item command="setLanguage">国际化</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- 国际化 -->
        <el-drawer
            title="设置系统语言"
            :visible.sync="drawer"
            :with-header="true"
            :before-close="handleDrawerClose">
            <span>设置系统语言todo</span>
        </el-drawer>

    </div>
</template>
<script>
import Breadcrumb from './breadcrumb.vue'
import { removeToken } from '@/utils/auth'
import { logoutApi, userInfo } from '@/api/modules/user.js'
export default {
    components: { Breadcrumb },
    data() {
        return {
            loginUser: {},
            drawer: false

        }
    },
    mounted() {
        this.getUserInfo()
    },
    methods: {
        getUserInfo() {
            this.loginUser = JSON.parse(localStorage.getItem('loginUser') || {})
            // userInfo().then(res => {
            //     console.log(res)
            // })
        },
        handleCommand(command) {
            if (command === 'logout') {
                logoutApi().then(res => {
                    removeToken()
                    this.$router.push('/login')
                })
            } else if (command === 'setLanguage') {
                this.drawer = true
            }
        },
        handleDrawerClose() {
            this.drawer = false
        }
    }
}
</script>
<style lang="scss" scoped>
.app-breadcrumb {
    padding: 0 10px;
    background: #e5e9ec;
    &> .right-menu{
        float: right;
        height: $headerHeight;
    }
    .user-name {
        vertical-align: text-bottom;
        color: #534f4f;
        font-weight: 500;
        font-size: 18px;
        padding: 0 20px;
    }
    .user {
        margin: 10px 0;
    }
    .el-dropdown {
        height:  $headerHeight;
    }
     .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
  }
</style>
