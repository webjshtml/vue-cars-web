<template>
    <div class="user-container">
        <Back column="安全设置" />
        <div class="text-center color-white lh-40">
            <h4><strong>订单号</strong></h4>
            <p>a2121fads34fas31fa</p>
        </div>
        <div class="blank-40"></div>
        <div><el-button type="warning" round class="button-block"><strong>去支付</strong></el-button></div>
        <div class="blank-20"></div>
        <div><el-button type="primary" round class="button-block"><strong>完成支付</strong></el-button></div>
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
</style>