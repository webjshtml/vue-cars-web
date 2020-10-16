<template>
    <div class="user-container">
        <Back>
            <template v-slot:navHeaderRight>
                <router-link to="/login" class="color-white opacity-4">登录</router-link>
            </template>
        </Back>
        <div class="cars-form-ui">
            <el-form ref="form" :model="form">
                <el-form-item>
                    <Username :value.sync="form.username" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.name" placeholder="新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.name" placeholder="确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <Code :username="form.username" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" class="button-black">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import Username from "@/components/account/username";
import Code from "@/components/code/";
export default {
    name: "Password",
    components: { Username, Code },
    data(){
        return {
            form: {
                username: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log(this.form);
        }
    }
}
</script>
<style lang="scss"></style>