<template>
  <div>
    <!-- 查询 -->
    <el-form inline ref="queryForm" :model="queryForm">
      <el-form-item>
        <el-input
          clearable
          size="small"
          placeholder="请输入用户名搜索"
          prefix-icon="el-icon-search"
          width="200px"
          v-model.trim="queryForm.name"
          @change="getList"/>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" icon="el-icon-right" @click="go()">去请假</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格数据 -->
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
        v-for="item in leaveColumn"
        :key="item.key"
        :label="item.label"
        :prop="item.key"
        :width="item.width">
        <template v-slot="{row}">
          <div v-if="item.key === 'created'">
            {{row[item.key] | formatDate}}
          </div>
          <div v-else-if="item.key === 'status'">
            <el-tag size="mini" :type="row[item.key] | statusColorFilters">
            {{row[item.key] | statusFilters}}
            </el-tag>
          </div>
          <div v-else>
            {{ row[item.key] !=null ? row[item.key] : "--" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template v-slot="{row}">
          <el-button size="small" type="primary" :disabled="btnStatusList.indexOf(row.status) == -1" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" :disabled="btnStatusList.indexOf(row.status) == -1" @click="handleDel(row)">删除</el-button>
          <el-button size="small" type="success" :disabled="btnStatusList.indexOf(row.status) == -1" @click="handleSubmit(row)">提交</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页查询 -->
    <MyPagination
    :total="total"
    :page.sync="queryForm.pageNo"
    :sizes.sync="queryForm.pageSize"
    @action="getList"/>

    <!-- 弹窗 -->
    <Dialog
      title="申请管理-请假审批-删除"
      btnText="删 除"
      :visible.sync="delVisible"
      @confirm="delData">
      <span>确定删除？</span>
    </Dialog>
    <Dialog
      title="申请管理-请假审批-编辑"
      :visible.sync="editVisible"
      @confirm="editData">
      <span>todo编辑</span>
    </Dialog>
  </div>
</template>
<script>
import { applyLeavelList, applyLeavelDelete, applyLeavelSubmit } from '@/api/modules/leave.js'
import { leaveColumn } from '@/utils/tableColumn.js'
import Dialog from '@/components/Dialog.vue'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      leaveColumn,
      btnStatusList: [0, 3, 6, 9], // 可编辑/删除/提交的状态
      queryForm: {
        name: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      tableData: [],
      delVisible: false,
      editVisible: false,
      temp: {}

    }
  },
  methods: {
    getList() {
      applyLeavelList(this.queryForm).then(res => {
        this.tableData = res.data.list
        this.total = res.data.rows
      })
    },
    go() {
      this.$router.push('/approvalApply/leaveApply')
    },
    delData() {
      applyLeavelDelete(this.temp.id).then(res => {
        this.$message.success('删除成功')
        this.delVisible = false
        this.getList()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    editData() {
      // todo
      this.editVisible = false
    },
    handleDel(row) {
      this.temp = { ...row }
      this.delVisible = true
    },
    handleEdit(row) {
      this.temp = { ...row }
      this.editVisible = true
    },
    handleSubmit(row) {
      applyLeavelSubmit({ id: row.id }).then(res => {
        this.$message.success('提交成功!')
        this.getList()
      }).catch(err => {
         this.$message.error(err)
      })
    }
    
  },
  mounted() {
    this.getList()
  }

}
</script>
