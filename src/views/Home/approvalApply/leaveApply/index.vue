<template>
  <div>
    <div class="card_header">请假申请</div>
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
      <el-form-item label="请假天数" prop="leave_days">
        <el-input-number v-model="applyForm.leave_days" :min="1" :max="10" label="请假天数"></el-input-number>
      </el-form-item>
      <el-form-item label="请假原因" prop="leave_reason">
        <el-input type="textarea" v-model="applyForm.leave_reason" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('applyForm')">立即申请</el-button>
        <el-button @click="resetForm('applyForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { queryEmploye } from '@/api/modules/user.js'
import { applyLeavelCreate } from '@/api/modules/leave.js'
export default {
  data() {
    return {
      accountList: [],
      applyForm: {
        applicant: '',
        created: '',
        leave_days: 1,
        leave_reason: ''
      },
      applyRules: {
        applicant: [
            { required: true, message: '请选择申请人', trigger: 'change' }
        ],
        created: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        leave_days: [
          { required: true, message: '请填写请假天数', trigger: 'change' }
        ],
        leave_reason: [
          { required: true, message: '请填写请假理由', trigger: 'blur' }
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
          applyLeavelCreate(this.applyForm).then(res => {
              this.$message.success('申请成功！')
              this.$router.push('/approvalManage/leaveManage')
          }).catch(err => {
            this.$message.error(err)
          })
        })
      },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
    
  },
  mounted() {
    queryEmploye().then(res => {
      this.accountList = res.data
    })
  }

}
</script>
<style lang="scss" scoped>

</style>
