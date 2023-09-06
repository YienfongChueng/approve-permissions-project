<template>
    <div class="app-wrapper">
        <el-container>
            <!-- 左侧导航 -->
            <Sidebar />
            <el-container>
                <!-- 头部 -->
                <el-header>
                    <Header />
                </el-header>
                <!-- 主体部分 -->
                <el-main>
                    <Main />
                </el-main>
            </el-container>
        </el-container>
  </div>
</template>
<script>
import {Header,Sidebar,Main} from './components/index.js'
export default {
    components: {Header,Sidebar,Main},
    data() {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
.el-header {
    height: $headerHeight;
    line-height: $headerHeight;
    padding: 0;
}

</style>