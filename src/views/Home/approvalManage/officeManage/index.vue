<template>
  <div>
    <!-- 查询 -->
    <el-form inline ref="queryForm" :model="queryForm" >
      <el-form-item>
        <el-input
          size="small"
          v-model="queryForm.name"
          clearable
          prefix-icon="el-icon-search"
          placeholder="请输入用户名搜索"
          @change="getList"
          width="200px"></el-input>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd()">新 增</el-button>
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
        v-for="column in officeListColumn"
        :key="column.key"
        :prop="column.key"
        :label="column.label"
        :width="column.width"
        :filters="column.key === 'status'? statusList : null"
        :filter-method="column.key === 'status'? filterHandler : null">
        <template v-slot="{ row }">
          <div v-if="column.key === 'created'">
          {{row[column.key] | formatDate}}
          </div>
          <div v-else-if="column.key === 'status'">
            <el-tag size="mini" :type="row[column.key] | statusColorFilters">{{ row[column.key] | statusFilters}}</el-tag>
          </div>
          <div v-else>
            {{ row[column.key] !=null ? row[column.key] : "--" }}
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
    <MyPagination
      :total="total"
      :page.sync="queryForm.pageNo"
      :sizes.sync="queryForm.pageSize"
      @action="getList"/>

      <Dialog
        title="申请管理-办公审批-删除"
        btnText="删 除"
        :visible.sync="delVisible"
        @confirm="delData">
        <span>确定删除？</span>
      </Dialog>

      <Dialog
        :title="`申请管理-办公审批-${addOrEditTitle}`"
        :visible.sync="editVisible"
        @confirm="submitData">
        <el-form
          :model="temp"
          :rules="applyRules"
          ref="applyForm"
          label-width="100px"
          >
          <el-form-item label="申请人" prop="applicant">
            <el-select  :disabled="!!temp.id" v-model="temp.applicant" placeholder="请选择申请人">
              <el-option
                v-for="account in accountList"
                :key="account.id"
                :label="account.account"
                :value="account.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label="申请日期" prop="created">
            <el-date-picker
              :disabled="!!temp.id"
              type="date"
              placeholder="选择日期"
              v-model="temp.created"
              ></el-date-picker>
          </el-form-item>
          <el-form-item label="申请商品" prop="apply_goods">
            <el-select v-model="temp.apply_goods" placeholder="请选择申请商品">
              <el-option
                v-for="goods in applyGoodsList"
                :key="goods.value"
                :label="goods.value"
                :value="goods.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请数量" prop="apply_goods_num">
            <el-input-number v-model="temp.apply_goods_num" :min="1" :max="10" label="申请数量"></el-input-number>
          </el-form-item>
          <el-form-item label="申请原因" prop="apply_reason">
            <el-input type="textarea" v-model="temp.apply_reason" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
      </Dialog>
  </div>
</template>
<script>
import { queryEmploye } from '@/api/modules/user.js'
import { applyOfficeList, applyOfficeDelete, applyOfficeSubmit, applyOfficeCreate } from '@/api/modules/office.js'
import { officeListColumn } from '@/utils/tableColumn.js'
import { applyGoodsList } from '@/utils/select.js'
import Dialog from '@/components/Dialog.vue'
export default {
  components: { Dialog },
  data() {
    return {
      btnStatusList: [0, 3, 6, 9], // 可编辑/删除/提交的状态
      officeListColumn,
      applyGoodsList,
      queryForm: {
        name: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 0, // 总条数
      tableData: [],
      accountList: [],
      delVisible: false,
      editVisible: false,
      addOrEditTitle: '',
      temp: {},
      applyForm: {
        applicant: '',
        apply_goods: '',
        apply_goods_num: 1,
        apply_reason: ''
      },
      applyRules: {
        applicant: [
            { required: true, message: '请选择申请人', trigger: 'change' }
        ],
        apply_goods: [
          { required: true, message: '请选择申请的商品', trigger: 'change' }
        ],
        created: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        apply_goods_num: [
          { required: true, message: '请填写申请商品的数量', trigger: 'change' }
        ],
        apply_reason: [
          { required: true, message: '请填写申请商品的原因', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    statusList() {
      // 数组对象去重
      const map = new Map()
      for (const item of this.tableData) {
        const v = { ...item } // 避免修改源对象
        if (!map.has(v.status)) {
          v.text = this.$options.filters.statusFilters(v.status)
          map.set(v.status, v)
        }
      }
      const data = [...map.values()]

      return data.map(item => ({ text: item.text, value: item.status }))
    }

  },
  methods: {
    getList() {
      applyOfficeList(this.queryForm).then(res => {
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
    handleAdd() {
      this.editVisible = true
      this.addOrEditTitle = '新增'
      this.temp = { ...this.applyForm }
      this.getAccountList()
    },
    handleEdit(row) {
      this.temp = { ...row }
      this.editVisible = true
      this.addOrEditTitle = '编辑'
      this.getAccountList()
    },
    // 打开删除弹窗
    handleDel(row) {
      this.delVisible = true
      this.temp = { ...row }
    },
    // 编辑
    submitData() {
      this.$refs.applyForm.validate((valid) => {
          if (!valid) {
            console.log('error submit!!')
            return false
          }
          applyOfficeCreate(this.temp).then(res => {
              this.$message.success('编辑成功！')
              this.editVisible = false
              this.getList()
          }).catch(err => {
            this.$message.error(err)
          })
        })
    },
    // 请求删除接口进行删除数据
    delData() {
      applyOfficeDelete(this.temp.id).then(res => {
        this.$message.success('删除成功!')
        this.delVisible = false
        this.getList()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 提交
    handleSubmit(row) {
      applyOfficeSubmit({ id: row.id }).then(res => {
        this.$message.success('提交成功!')
        this.getList()
      }).catch(err => {
         this.$message.error(err)
      })
    },
    getAccountList() {
      queryEmploye().then(res => {
        this.accountList = res.data
    })
    }
  },
  mounted() {
    this.getList()
  }

}
</script>
