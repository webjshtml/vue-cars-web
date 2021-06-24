<template>
    <div class="user-container">
        <Back>
            <template v-slot:navHeaderRight>
                <router-link to="/register" class="color-white opacity-4">注册</router-link>
            </template>
        </Back>
        <div class="cars-form-ui">
            <el-form ref="form" :model="form">
                <Username :value.sync="form.username" />
                <PasswordVue :passwordConfirm="form.passwordConfirm" :value.sync="form.password" /> <!--接收“确认密码”的值 -->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" class="button-black">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="text-right">
            <router-link to="/forget" class="color-white opacity-4">忘记密码</router-link>
        </div>
    </div>
</template>
<script>
import Username from "@/components/account/username";
import PasswordVue from "@/components/account/password";
// sha1
import sha1 from "js-sha1";
export default {
    name: "Login",
    components: { Username, PasswordVue },
    data(){
        return {
            form: {
                username: "",
                password: ""
            }
        }
        // 复用性
    },
    methods: {
        onSubmit() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.login();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        login(){
            const requestData = {
                username: this.form.username,
                password: sha1(this.form.password)
            }
            this.$store.dispatch("account/loginAction", requestData).then(response => {
                this.$message({
                    type: "success",
                    message: response.message
                })
                this.$router.push({
                    name: "Index"
                })
            })
        }
    }
}
</script>
<style lang="scss"></style>