<template>
    <div>
        <el-dialog
            :title="title"
            :visible="visible"
            :width="width"
            :before-close="handleCancel">
            <slot>
                <p>{{title}}</p>
            </slot>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleClick">{{btnText}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'Dialog',
    props: {
        title: { type: String, default: '弹窗标题' },
        visible: { type: Boolean, default: false },
        width: { type: String, defalut: '30%' },
        btnText: { type: String, default: '确 定' }
    },
    data() {
        return {

        }
    },
    methods: {
        handleCancel() {
            this.$emit('update:visible', false)
        },
        handleClick() {
            this.$emit('confirm')
        }
    }
}
</script>