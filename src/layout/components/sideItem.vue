<template>
    <div>
        <!-- 无子级 -->
        <el-menu-item :index="item.url" v-if="!item.children">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
        </el-menu-item>

        <!-- 有子级 -->
        <el-submenu :index="item.url" v-else>
            <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
            </template>
            <sideItem v-for="sub in item.children" :key="sub.url" :item="sub"/>
        </el-submenu>
    </div>
</template>
<script>
export default {
    name: 'sideItem',
    props: ['item'],
}
</script>