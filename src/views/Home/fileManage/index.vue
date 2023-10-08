<template>
  <el-card>
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
        v-for="item in docColumn"
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
          <div v-else>
            {{ row[item.key] !=null ? row[item.key] : "--" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template v-slot="{row}">
          <el-button :disabled="row.file_path !=null" size="small" type="primary" @click="handleCreate(row)">生成凭证</el-button>
          <el-button :disabled="row.file_path ==null" size="small" type="success" @click="handleDownload(row)">下载凭证</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <MyPagination
      :total="total"
      :page.sync="queryForm.pageNo"
      :sizes.sync="queryForm.pageSize"
      @action="getList"/>
  </el-card>
</template>
<script>
import { docColumn } from '@/utils/tableColumn.js'
import { docList, docCreateFile, downloadDoc } from '@/api/modules/file.js'
import { getToken } from '@/utils/auth.js'
export default {
  data() {
    return {
      docColumn,
      queryForm: {
        name: '',
        pageNo: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0
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
      docList(this.queryForm).then(res => {
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
    handleCreate(row) {
      docCreateFile({ id: row.id }).then(res => {
        this.$message.success('生成凭证成功！')
        this.getList()
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleDownload(row) {
      downloadDoc(row.id).then(res => {
        this.$message.success('下载凭证成功！')
        const { data } = res
        // 第二次请求
        const url = `${process.env.VUE_APP_protalurl}/static/${data.file_path}`
        this.downloadFile(url, data.file_path)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    downloadFile(url, fileName) {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.responseType = 'blob' // blob字节流
      xhr.setRequestHeader('token', getToken()) // 传入token
      xhr.send()
      xhr.onload = () => {
        if (xhr.status === 200) {
          this.createAlink(xhr.response, fileName)
        }
      }
    },
    // 动态创建a标签  <!-- <a href="文件的链接地址" download="下载的文件名称"></a> -->
    createAlink(data, fileName) {
      const _blob = new Blob([data])
      // window对象下有URL对象作用：专门用来将blob或file读取成url;
      const a = document.createElement('a')
      const url = window.URL.createObjectURL(_blob)
      a.href = url
      a.download = fileName
      a.click()
      window.URL.revokeObjectURL(url)
    }
  },
  mounted() {
    this.getList()
  }

}
</script>
