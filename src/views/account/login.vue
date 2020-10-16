<template>
    <div class="user-container">
        <Back>
            <template v-slot:navHeaderRight>
                <router-link to="/register" class="color-white opacity-4">注册</router-link>
            </template>
        </Back>
        <div class="cars-form-ui">
            <el-form ref="form" :model="form">
                <el-form-item>
                    <Username />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.name" placeholder="新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.name" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <button type="button" class="button-vcode">获取验证码</button>
                    <el-input v-model="form.name" placeholder="验证码"></el-input>
                </el-form-item>
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
export default {
    name: "Password",
    components: { Username },
    data(){
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>
<style lang="scss"></style>