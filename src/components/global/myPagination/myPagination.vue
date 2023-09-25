<template>
<div class="pagination-container">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="sizes"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total">
    </el-pagination>
</div>
</template>
<script>
export default {
    name: 'MyPagination',
    props: {
        total: { required: true, type: Number },
        layout: { type: String, default: 'total, sizes, prev, pager, next, jumper' },
        pageSizes: { type: Array, default: () => [10, 20, 30, 40, 50, 100] },
        page: { type: Number, default: 1 },
        sizes: { type: Number, default: 10 }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('update:sizes', val)
            this.$emit('action')
        },
        handleCurrentChange(val) {
            this.$emit('update:page', val)
            this.$emit('action')
        }
    }
    
}
</script>
<style lang="scss" scoped>
::v-deep .el-input--suffix .el-input__inner {
    width: 100px;
}
</style>