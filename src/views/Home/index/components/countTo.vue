<template>
    <div class="card-panel-count" :style="{background:colorBg}">
        <div class="card-panel-count__title">{{title}}</div>
        <vueCountTo
            class="card-panel-count__text card-panel-count__num"
            :startVal="startVal"
            :endVal="qty"
            :duration="duration">
            {{qty}}
        </vueCountTo>

    </div>
</template>
<script>
import vueCountTo from 'vue-count-to'
export default {
    name: 'CountTo',
    components: { vueCountTo },
    props: {
        title: { type: String, default: '' },
        qty: { type: Number, default: 0 },
        startVal: { type: Number, default: 0 },
        duration: { type: Number, default: 3000 },
        colorBg: { type: String, default: 'pink' }
    },
    data() {
        return {

        }
    }
    
}
</script>
<style lang="scss" scoped>
.card-panel-count {
       height: 109px;
       cursor: pointer;
       font-size: 14px;
       position: relative;
       border-radius: 10px;
       margin: 10px 0;
       text-align: center;
       color: #fff;
   
       .card-panel-count__title {
           font-weight: bold;
           padding-top: 20px;
           padding-bottom: 20px;
       }
         .card-panel-count__text {
           line-height: 18px;
           font-size: 16px;
           margin-bottom: 12px;
         }
   
         .card-panel-count__num {
           font-size: 22px;
         }
}

</style>