<template>
    <div class="user-container">
        <Back />
        <div class="icon icon-success"></div>
        <p class="text color-success">支付成功</p>
        <div class="blank-40"></div>
        <div><el-button type="primary" round class="button-block"><strong>返回首页</strong></el-button></div>
    </div>
</template>
<script>
export default {
    name: "PayStatus",
    components: {},
    data(){
        return {}
    },
    methods: {}
}
</script>
<style lang="scss">
.icon {
    width: 40px;
    height: 40px;
    margin: auto;
    background-size: cover;
}
.text {
    text-align: center;
    padding: 15px 0;
    font-size: 20px;
}
</style>