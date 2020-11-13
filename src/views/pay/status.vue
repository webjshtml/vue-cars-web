<template>
    <div class="user-container">
        <Back column="安全设置" />
        <div class="text-center color-white lh-40">
            <h4><strong>订单号</strong></h4>
            <p>a2121fads34fas31fa</p>
        </div>
        <div class="blank-40"></div>
        <div><el-button type="warning" round class="button-block" @click="gotoPay"><strong>去支付</strong></el-button></div>
        <div class="blank-20"></div>
        <div><el-button type="primary" round class="button-block"><strong>完成支付</strong></el-button></div>
    </div>
</template>
<script>
import { OrderStatus } from "@/api/order";
import { setInterval, clearInterval } from 'timers';
export default {
    name: "PayStatus",
    components: {},
    data(){
        return {
            timer: null
        }
    },
    beforeMount(){
        this.getOrderStatus();
        this.setInter();
    },
    methods: {
        getOrderStatus(){
            const order_no = localStorage.getItem("order_no");
            OrderStatus({order_no}).then(response => {
                const status = response.data.status;
                if(status == 'success') {
                    clearInterval(this.timer);
                    // this.$router.replace({
                    //     name: "PayResult",
                    //     query: {
                    //         status
                    //     }
                    // })
                }
            })
        },
        setInter(){
            this.timer = setInterval(() => {
                this.getOrderStatus();
            }, 3000)
        },
        gotoPay(){
            
        }

    }
}
</script>
<style lang="scss">
</style>