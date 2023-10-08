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
        v-for="item in userListColumn"
        :key="item.key"
        :label="item.label"
        :prop="item.key"
        :width="item.width">
        <template v-slot="{row}">
          <div v-if="item.key === 'reg_time'">
            {{row[item.key] | formatDate}}
          </div>
          <div v-else-if="item.key === 'role_name'">
            {{roleNameObj[row[item.key]] || '--'}}
          </div>
          <div v-else>
            {{ row[item.key] !=null ? row[item.key] : "--" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template v-slot="{row}">
          <el-button size="small" type="danger" @click="handleDel(row)">删除</el-button>
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
      title="权限管理-员工与审批员列表-删除"
      btnText="删 除"
      :visible.sync="delVisible"
      @confirm="delData">
      <span>确定删除？</span>
    </Dialog>
  </div>
</template>
<script>
import { userList, delUser } from '@/api/modules/permission.js'
import { userListColumn } from '@/utils/tableColumn.js'
import Dialog from '@/components/Dialog.vue'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      userListColumn,
      queryForm: {
        name: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      tableData: [],
      delVisible: false,
      temp: {},
      roleNameObj: {
          administrator: '超级管理员',
          approve: '企业审批管理员',
          input: '企业员工'
      }
    }
  },
  methods: {
    getList() {
      userList(this.queryForm).then(res => {
        this.tableData = res.data.list
        this.total = res.data.rows
      })
    },
    delData() {
      delUser(this.temp.id).then(res => {
        this.$message.success('删除成功')
        this.delVisible = false
        this.getList()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleDel(row) {
      this.temp = { ...row }
      this.delVisible = true
    }
  },
  mounted() {
    this.getList()
  }

}
</script>
