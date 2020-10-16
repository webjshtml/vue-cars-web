<template>
    <el-input v-model="username" :placeholder="placeholder" v-on:input="enterInput" minlength="6" maxlength="11"></el-input>
    <!--小灵通-->
</template>

<script>
import { validate_phone } from "@/utils/validate";
export default {
    name: 'Username',
    components: {},
    props: {
        placeholder: {
            type: String,
            default: "手机号"
        }
    },
    data(){
        return {
            username: ""
        }
    },
    methods: {
        enterInput(){
            const valiStatus = validate_phone(this.username);
            let value = valiStatus ? this.username : "";
            this.$emit("update:value", value)
        }
    }
}
</script>
<style lang='scss' scoped>
</style>