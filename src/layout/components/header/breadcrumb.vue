<template>
    <el-breadcrumb separator="/">
        <span>
            <i class="el-icon-s-home"></i>
            当前位置：
        </span>
        <el-breadcrumb-item
            v-for="v in breadcrumd"
            :key="v.path">
            <router-link :to="v.path">{{v.meta.title}}</router-link>
        </el-breadcrumb-item>
        
    </el-breadcrumb>
</template>
<script>
export default {
    data() {
        return {
            breadcrumd: []
        }
    },
    watch: {
        $route(newVal, oldVal) {
            this.getBreadcrumd(newVal.matched)
        }
    },
    mounted() {
        this.getBreadcrumd(this.$route.matched)
    },
    methods: {
        getBreadcrumd(matched) {
            this.breadcrumd = matched.filter(d => d.path !== '/layout')
        }
    }
}

</script>
<style lang="scss" scoped>
.el-breadcrumb {
      display:inline-block;
      .el-breadcrumb__item {
        float:none;
      }
}
</style>