<template>
  <div>
    <!-- 查询 -->
    <el-form inline ref="queryForm" :model="queryForm">
      <el-form-item>
        <el-input
          size="small"
          v-model.trim="queryForm.name"
          clearable
          prefix-icon="el-icon-search"
          placeholder="请输入用户名搜索"
          @change="getList"
          width="200px">
        </el-input>
      </el-form-item>
    </el-form>
    <!-- 列表数据 -->
    <el-table
      :data="tableData"
      stripe
      size="small"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        v-for="item in checkColumn"
        :key="item.key"
        :label="item.label"
        :prop="item.key"
        :width="item.width"
        :filters="item.key === 'app_type' ? checkType : null"
        :filter-method="item.key === 'app_type' ? filterHandler : null">
        <template v-slot="{ row }">
          <div v-if="item.key === 'created'">
          {{row[item.key] | formatDate}}
          </div>
          <div v-else-if="item.key === 'app_type'">
            <el-tag size="mini" :type="row[item.key] | checkTypeColorFilters">{{ row[item.key] | checkTypeFilters}}</el-tag>
          </div>
          <div v-else-if="item.key === 'result'">
            <el-tag type="success" size="mini" v-if="row[item.key] === 'pass'">通过</el-tag>
            <el-tag type="danger" size="mini" v-else-if="row[item.key] === 'reject'">驳回</el-tag>
            <el-tag type="info" v-else size="mini">待审批</el-tag>
          </div>
          <div v-else>
            {{ row[item.key] !=null ? row[item.key] : "--" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template v-slot="{row}">
          <el-button size="small" type="success" @click="handleSubmit(row, '通过')">通过</el-button>
          <el-button size="small" type="danger" @click="handleSubmit(row, '驳回')">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <MyPagination
      :total="total"
      :page.sync="queryForm.pageNo"
      :sizes.sync="queryForm.pageSize"
      @action="getList"/>
    <!-- 弹窗 -->
    <Dialog
      :title="`一审${passOrRejectType}`"
      :visible.sync="dialogVisible"
      :btnText="passOrRejectType"
      @confirm="handleRequest"
    >
      <div style="padding: 20px 0;">确定{{passOrRejectType}}?</div>
      <el-input v-if="passOrRejectType === '驳回'" v-model.trim="temp.content" type="textarea" :rows="2" placeholder="请输入拒绝理由" />
    </Dialog>
  </div>
</template>
<script>
import Dialog from '@/components/Dialog.vue'
import { checkColumn } from '@/utils/tableColumn.js'
import { approveEndList, approveEndPass, approveEndReject } from '@/api/modules/approve.js'
export default {
  components: { Dialog },
  data() {
    return {
      checkColumn,
      queryForm: {
        name: '',
        pageNo: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      passOrRejectType: '',
      dialogVisible: false,
      temp: {}

    }
  },
  computed: {
    checkType() {
      const map = new Map()
      for (const item of this.tableData) {
        const v = { ...item }
        if (!map.has(v.app_type)) {
          v.app_type_text = this.$options.filters.checkTypeFilters(v.app_type)
          map.set(v.app_type, v)
        }
      }
      const data = [...map.values()]
      return data.map(d => ({ text: d.app_type_text, value: d.app_type }))
    }
  },
  methods: {
    getList() {
      approveEndList(this.queryForm).then(res => {
        this.$message.success('查询成功!')
        this.tableData = res.data.list
        this.total = res.data.rows
      }).catch(err => {
        this.$message.error(err)
      })
    },
    filterHandler(value, row, column) {
      const property = column.property
      return row[property] === value
    },
    handleSubmit(row, type) {
      this.passOrRejectType = type
      this.dialogVisible = true
      this.temp = { ...row }
    },
    // 请求接口 通过/拒绝
    async handleRequest() {
      // 传的参数 app_id,app_type,id 传给服务端
      const { app_id, app_type, id, content } = this.temp
      let res
      if (this.passOrRejectType === '通过') {
        res = await approveEndPass({ app_id, app_type, id })
      } else {
        res = await approveEndReject({ app_id, app_type, id, content })
      }
      if (res.code === 20000) {
        this.$message.success(`已${this.passOrRejectType}`)
      }
      this.dialogVisible = false
      this.getList()
    }
  },
  mounted() {
    this.getList()
  }

}
</script>
