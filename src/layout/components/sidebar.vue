<template>
    <el-aside width="200px" class="aside">
        <div class="title">
            {{$t('message.title')}}
        </div>
        <el-menu
            router
            :default-active="$route.path"
            exact
            class="el-menu-vertical-demo">
            <sideItem v-for="item in get_routes" :key="item.url" :item="item"/>
      </el-menu>
    </el-aside>
</template>
<script>
import sideItem from './sideItem.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'sidebar',
    components: {
        sideItem
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters('permission', ['get_routes'])
    }
}
</script>