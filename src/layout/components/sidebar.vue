<template>
    <el-aside width="200px" class="aside">
        <div class="title">
            审批流程权限系统
        </div>
        <el-menu
            router
            :default-active="$route.path"
            exact
            class="el-menu-vertical-demo">
            <sideItem v-for="item in menus" :key="item.url" :item="item"/>
      </el-menu>
    </el-aside>
</template>
<script>
import sideItem from './sideItem.vue'
import menus from '@/utils/menu' // 菜单数据
export default {
    name: 'sidebar',
    components: {
        sideItem
    },
    data() {
        return {
            menus
        }
    }
}
</script>