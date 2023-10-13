<template>
    <div>
        <!-- 无子级 -->
        <el-menu-item :index="item.url" v-if="!item.children">
            <i :class="item.icon"></i>
            <span slot="title">{{$t('message')[item.name]}}</span>
        </el-menu-item>

        <!-- 有子级 -->
        <el-submenu :index="item.url" v-else>
            <template slot="title">
                <i :class="item.icon"></i>
                <span>{{$t('message')[item.name]}}</span>
            </template>
            <sideItem v-for="sub in item.children" :key="sub.name" :item="sub"/>
        </el-submenu>
    </div>
</template>
<script>
export default {
    name: 'sideItem',
    props: ['item']
}
</script>