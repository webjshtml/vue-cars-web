<template>
    <div class="user-container">
        <Back />
        <div class="icon" :class="status === 'success' ? 'icon-success' : 'icon-fail'"></div>
        <p class="text" :class="status === 'success' ? 'color-success' : 'color-fail'">
            支付{{ status === 'success' ? '成功' : '失败' }}
        </p>
        <div class="blank-40"></div>
        <div><el-button type="primary" round class="button-block"><strong>返回首页</strong></el-button></div>
    </div>
</template>
<script>
export default {
    name: "PayStatus",
    components: {},
    data(){
        return {
            status: this.$route.query.status
        }
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