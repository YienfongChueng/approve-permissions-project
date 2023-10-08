<template>
  <div>
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
        v-for="item in permissionUserListColumn"
        :key="item.key"
        :label="item.label"
        :prop="item.key"
        :width="item.width">
        <template v-slot="{row}">
          <div v-if="item.key === 'permission'">
            <el-checkbox-group v-model="row[item.key]">
                <el-checkbox label="one" name="type">一审</el-checkbox>
                <el-checkbox label="two" name="type">二审</el-checkbox>
                <el-checkbox label="end" name="type">终审</el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-else>
            {{ row[item.key] !=null ? row[item.key] : "--" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template v-slot="{row}">
          <el-button size="small" type="warning" @click="handleModify(row)">修改权限</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 弹窗 -->
    <Dialog
      title="权限管理-审批员权限-修改"
      btnText="确 定"
      :visible.sync="editVisible"
      @confirm="confirmData">
      <span>确定修改审批员权限？</span>
    </Dialog>
  </div>
</template>
<script>
import { permissionList, createOrUpdatePermission } from '@/api/modules/permission.js'
import { permissionUserListColumn } from '@/utils/tableColumn.js'
import Dialog from '@/components/Dialog.vue'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      permissionUserListColumn,
      tableData: [],
      editVisible: false,
      temp: {}
    }
  },
  methods: {
    getList() {
      permissionList().then(res => {
        this.tableData = res.data.list
      })
    },
    confirmData() {
        const { id, user_id, permission } = this.temp
      createOrUpdatePermission({ id, user_id, permission }).then(res => {
        this.$message.success('修改成功')
        this.editVisible = false
        this.getList()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleModify(row) {
      this.temp = { ...row }
      this.editVisible = true
    }
  },
  mounted() {
    this.getList()
  }

}
</script>
