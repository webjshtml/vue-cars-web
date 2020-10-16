<template>
    <div>
        <button type="button" class="button-vcode" :disabled="disabled" @click="handlerCode">{{ button_text }}</button>
        <el-input v-model="code" placeholder="验证码"></el-input>
    </div>
</template>

<script>
export default {
    name: '',
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
            // 按钮文本
            button_text: "获取验证码",
            // 验证码
            code: "",
            // 定时器
            timer: null
        }
    },
    methods: {
        handlerCode(){
            this.countDown();
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