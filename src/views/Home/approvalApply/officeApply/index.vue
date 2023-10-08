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
      <el-form-item label="申请商品" prop="apply_goods">
        <el-select v-model="applyForm.apply_goods" placeholder="请选择申请商品">
          <el-option
            v-for="goods in applyGoodsList"
            :key="goods.value"
            :label="goods.value"
            :value="goods.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="申请数量" prop="apply_goods_num">
        <el-input-number v-model="applyForm.apply_goods_num" :min="1" :max="10" label="申请数量"></el-input-number>
      </el-form-item>
      <el-form-item label="申请原因" prop="apply_reason">
        <el-input type="textarea" v-model="applyForm.apply_reason" style="width: 300px"></el-input>
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
import { applyOfficeCreate } from '@/api/modules/office.js'
import { applyGoodsList } from '@/utils/select.js'
export default {
  data() {
    return {
      applyGoodsList,
      accountList: [],
      applyForm: {
        applicant: '',
        created: '',
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
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
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
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            console.log('error submit!!')
            return false
          }
          applyOfficeCreate(this.applyForm).then(res => {
              this.$message.success('申请成功！')
              this.$router.push('/approvalManage/officeManage')
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
