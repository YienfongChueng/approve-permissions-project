<template>
    <div>
        <div class="card_header">创建员工与审批管理员</div>
        <el-form
        :model="createForm"
        :rules="createRules"
        ref="createForm"
        label-width="100px">
        <el-form-item label="用户名" prop="account">
            <el-input  v-model="createForm.account" clearable placeholder="请输入用户名" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password"  v-model="createForm.password" clearable placeholder="请输入密码" style="width: 300px"></el-input>
        </el-form-item>
         <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="createForm.password2" clearable placeholder="请输入确认密码" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="权限分配" prop="role_id">
            <el-radio-group v-model="createForm.role_id" size="small">
                <el-radio :label="2" border>员工</el-radio>
                <el-radio :label="3" border>审批管理员</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="审批权限分配" prop="permission" v-show="createForm.role_id === 3">
            <el-checkbox-group v-model="createForm.permission" size="small">
                <el-checkbox-button label="one" >一审</el-checkbox-button>
                <el-checkbox-button label="two" >二审</el-checkbox-button>
                <el-checkbox-button label="end" >终审</el-checkbox-button>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('createForm')">立即创建</el-button>
            <el-button @click="resetForm('createForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { createUser } from '@/api/modules/permission.js'
import md5 from 'md5'
export default {
    data() {
        const validatePass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入确认密码'))
            } else if (value !== this.createForm.password) {
                callback(new Error('两次输入密码不同'))
            } else {
                callback()
            }
        }
        return {
            createForm: {
                account: '',
                password: '',
                password2: '',
                role_id: 2,
                permission: []
            },
            createRules: {
                account: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 18, message: '长度必须在2-18位', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 2, max: 18, message: '长度必须在2-18位', trigger: 'blur' }

                ],
                password2: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                role_id: [
                    { required: true, message: '请选择权限', trigger: 'change' }
                ]
            }

            
        }
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (!valid) {
                    console.log('error submit!!')
                    return false
                }
                const data = {
                    ...this.createForm,
                    password: md5(this.createForm.password),
                    password2: md5(this.createForm.password2)
                }
                createUser(data).then(res => {
                    this.$message.success('创建成功！')
                    this.$router.push('/powerManage/userList')
                }).catch(err => {
                    this.$message.error(err)
                })
            })
        }
    }

}
</script>