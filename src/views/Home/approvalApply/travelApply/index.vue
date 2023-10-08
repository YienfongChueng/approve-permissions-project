<template>
  <div>
    <div class="card_header">办公申请</div>
    <el-form
      :model="applyForm"
      :rules="applyRules"
      ref="applyForm"
      label-width="100px">
      <el-form-item label="申请人" prop="applicant">
        <el-select v-model="applyForm.applicant" placeholder="请选择申请人">
          <el-option
            v-for="account in accountList"
            :key="account.id"
            :label="account.account"
            :value="account.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请日期" prop="created">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="applyForm.created"
          ></el-date-picker>
      </el-form-item>
      <el-form-item label="出差天数" prop="travel_days">
        <el-input-number v-model="applyForm.travel_days" :min="1" :max="100" label="出差天数"></el-input-number>
      </el-form-item>
      <el-form-item label="报销金额" prop="money">
        <el-input v-model.number="applyForm.money" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="上传发票" prop="bill">
        <el-upload
          style="width: 300px"
          action=""
          :http-request="handleUpload"
          :on-exceed="handleExceed"
          :before-upload="beforeUpload"
          :limit="1"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过1M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="出差城市" prop="destination">
        <el-cascader
         v-model="applyForm.destination"
          placeholder="请选择出差城市"
          :options="options"
          filterable></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('applyForm')">立即申请</el-button>
        <el-button @click="resetForm('applyForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { queryEmploye, getArea } from '@/api/modules/user.js'
import { applyTravelCreate } from '@/api/modules/travel.js'
import { moneyRule, destinationRule } from '@/utils/validate'
export default {
  data() {
    return {
      accountList: [],
      applyForm: {
        applicant: '',
        created: '',
        money: '',
        travel_days: 1,
        bill: '',
        destination: []
      },
      options: [], // 省市区数据
      applyRules: {
        applicant: [
            { required: true, message: '请选择申请人', trigger: 'change' }
        ],
        created: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        money: [
          { required: true, validator: moneyRule, trigger: 'change' }
        ],
        travel_days: [
          { required: true, message: '请填写出差天数', trigger: 'change' }
        ],
        bill: [
          { required: true, message: '请上传发票', trigger: 'change' }
        ],
        destination: [
          { required: true, validator: destinationRule, trigger: 'change' }
        ]
      }

    }
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            console.log('error submit!!')
            return false
          }
          const formData = new FormData()
          for (const k in this.applyForm) {
            formData.append(k, this.applyForm[k])
          }
          applyTravelCreate(formData).then(res => {
              this.$message.success('申请成功！')
              this.$router.push('/approvalManage/travelManage')
          }).catch(err => {
            this.$message.error(err)
          })
        })
      },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 暂存 覆盖默认的上传行为，可以自定义上传的实现
    handleUpload(params) {
      this.applyForm.bill = params.file
    },
     // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning('只能上传一张发票')
    },
    // 上传文件之前的钩子，参数为上传的文件  限制上传的格式或大小
    beforeUpload(file) {
      console.log(file)
      const imgTypeList = ['image/png', 'image/jpg', 'image/jpeg']
      const size = 2 * 1024 * 1024 // 2M

      if (imgTypeList.indexOf(file.type) === -1) {
        this.$message.error('只能上传jpg/png/jpeg图片文件')
        return false
      }
      // es6写法
      // if (!imgTypeList.includes(file.type)) {
      //   this.$message.error('只能上传jpg/png/jpeg图片文件')
      //   return false
      // }
      if (file.size > size) {
         this.$message.error('上传图片大小不能超过2M')
         return false
      }
      return true
    },
    getCity() {
      getArea().then(res => {
        if (res.code === 20000) {
          const data = res.data.map(v => ({ ...v, label: v.AreaName, value: v.AreaName }))
          const p = data.filter(v => v.AreaLevel === 2)
          const c = data.filter(v => v.AreaLevel === 3)
          this.options = p.map(item => {
             item.children = c.filter(v => v.ParentId === item.AreaID)
             return item
          })
        }
      })
    }
    
  },
  mounted() {
    queryEmploye().then(res => {
      this.accountList = res.data
    })
    this.getCity()
  }

}
</script>
<style lang="scss" scoped>

</style>
