<template>
    <el-form-item prop="code" :rules="rules">
        <el-button class="button-vcode" :loading="loading" :disabled="disabled" @click="handlerCode">{{ button_text }}</el-button>
        <el-input v-model="code" placeholder="验证码" v-on:input="enterInput"></el-input>
    </el-form-item>
</template>

<script>
import { GetCode } from "@/api/account";
export default {
    name: 'Code',
    components: {},
    props: {
        username: {
            type: String,
            default: ""
        }
    },
    data(){
        return {
            // 按钮状态
            disabled: true,
            // 按钮加载状态
            loading: false,
            // 按钮文本
            button_text: "获取验证码",
            // 验证码
            code: "",
            // 定时器
            timer: null,
            // 校验规则 
            rules: [
                { required: true, message: "验证不能为空", trigger: "blur" },
                { min: 6, max: 6, message: "请输入6位字符的验证码", trigger: "change" }
            ]
        }
    },
    methods: {
        enterInput(){
            this.$emit("update:value", this.code);
        },
        handlerCode(){
            const requestData = {
                username: this.username,
                module: "register"
            }
            this.loading = true;
            GetCode(requestData).then(response => {
                this.$message({
                    type: "success",
                    message: response.message
                })
                this.loading = false;
                this.countDown();
            }).catch(error => {
                this.loading = false;
            })
            
        },
        countDown(){
            let second = 60;
            this.button_text = `倒计时${second}秒`; // 初始化文本
            // 禁用按钮
            this.disabled = true;
            // 倒计时
            this.timer = setInterval(() => {
                // 累减
                second--;
                // 再次初始化文本
                this.button_text = `倒计时${second}秒`; 
                // 为 0 时，清除定时器
                if(second === 0) {
                    // 再次初始化文本
                    this.button_text = `重新获取`; 
                    // 激活按钮
                    this.disabled = false;
                    // 清除定时器
                    clearInterval(this.timer)
                }
            }, 1000) 

            // setInterval/clearInterval  // 连续的   1000  每隔一秒钟后执行一次

            // setTimeout/clearTimeout   // 单次的   1000  隔一秒钟后执行一次，
        }
    },
    watch: {
        username: {
            handler(newValue, oldValue){
                this.disabled = newValue ? false : true;
            }
        }
    }
    
}
</script>
<style lang='scss' scoped>
</style>