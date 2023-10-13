<template>
    <div class="app-breadcrumb">
        <!-- 面包屑 -->
        <Breadcrumb />
        <!-- 右侧按钮 -->
        <div class="right-menu clearfix">
             <!-- 国际化 -->
            <el-switch class="switch_lang"
                v-model="lang"
                :active-text="$t('message.cn')"
                :inactive-text="$t('message.en')"
                active-value="cn"
                inactive-value="en"
                @change="changeLang">
            </el-switch>
            <!-- 用户信息 -->
            <span class="user_name">{{loginUser.account}}</span>
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-avatar class="user"> user </el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">{{$t('message.logout')}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import Breadcrumb from './breadcrumb.vue'
import { removeToken, getToken } from '@/utils/auth'
export default {
    components: { Breadcrumb },
    data() {
        return {
            loginUser: {},
            lang: 'cn'

        }
    },
    mounted() {
        this.getUserInfo()
        this.initI18n()
    },
    methods: {
        getUserInfo() {
            this.loginUser = JSON.parse(localStorage.getItem('loginUser') || {})
        },
        handleCommand(command) {
            if (command === 'logout') {
                if (!getToken()) {
                    this.$message.error('登陆已过期，请重新登录!')
                    this.$router.push('/login')
                    return
                }
                this.$store.dispatch('user/LOGOUT')
            }
        },
        initI18n() {
            this.$i18n.locale = this.lang
        },
        changeLang(lang) {
            this.$i18n.locale = lang
        }
       
    }
}
</script>
<style lang="scss" scoped>
.app-breadcrumb {
    padding: 0 10px;
    // background: #e5e9ec;
    background: #f2f4f5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    &> .right-menu{
        float: right;
        height: $headerHeight;
    }
    .user_name {
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
    .switch_lang {
        bottom: 20px
    }
  }
</style>
