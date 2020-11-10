<template>
    <div class="user-container">
        <Back>
            <template v-slot:navHeaderRight>
                <router-link to="/login" class="color-white opacity-4">登录</router-link>
            </template>
        </Back>
        <div class="cars-form-ui">
            <el-form ref="form" :model="form">
                <Username :value.sync="form.username" />
                <PasswordVue :passwordConfirm="form.passwordConfirm" :value.sync="form.password" /> <!--接收“确认密码”的值 -->
                <PasswordConfirm :password="form.password" :value.sync="form.passwordConfirm" />  <!--接收“密码”的值 -->
                <Code :username="form.username" :value.sync="form.code" />
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" class="button-black">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import Username from "@/components/account/username";
import PasswordVue from "@/components/account/password";
import PasswordConfirm from "@/components/account/passwordConfirm";
import Code from "@/components/code/";
// API
import { Forget } from "@/api/account";
// sha1
import sha1 from "js-sha1";
export default {
    name: "Password",
    components: { Username, Code, PasswordVue, PasswordConfirm },
    data(){
        return {
            form: {
                username: "",
                password: "",
                passwordConfirm: "",
                code: ""
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.forgetPassword();
                } else {
                    //
                    console.log('error submit!!');
                    return false;
                }
            });
            console.log(this.form);
        },
        // 注册
        forgetPassword(){
            const requestData = {
                username: this.form.username,
                password: sha1(this.form.password),  // md5，sha1
                code: this.form.code
            }
            Forget(requestData).then(response => {
                this.$message({
                    type: "success",
                    message: response.message
                })
                this.$router.push({
                    name: "Login"
                })
            })
        }
    }
}
</script>
<style lang="scss"></style>