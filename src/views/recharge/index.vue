<template>
    <div class="user-container">
        <Back />
        <div class="amount-list">
            <div class="item" v-for="item in data" :key="item.id" @click="checkAmount(item)">
                <div class="a-wrap" :class="{current: amount_id == item.id}" :id="item.id">{{ item.amount }}</div>
            </div>
        </div>
        <div class="cars-form-ui">
            <el-form ref="form">
                <el-form-item>
                    <el-input v-model.number="amount_number" placeholder="请输入充值金额" v-on:input="inputEnter"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="blank-100"></div>
        <section class="section-mode">
            <header>
                <h4 class="title">支付类型</h4>
            </header>
            <div class="content">
                <ul class="links">
                    <li class="">
                        <span class="pull-left">微信</span>
                        <i class="icon check-round current"></i>
                    </li>
                    <li>
                        <span class="pull-left">支信宝</span>
                        <i class="icon check-round"></i>
                    </li>
                </ul>
            </div>
        </section>
        <div class="blank-100"></div>
        <el-button type="primary" class="button-block" :disabled="disabled_button" round @click="confirmSubmit">确认充值</el-button>
    </div>
</template>
<script>
import { AmountList, Pay } from "@/api/pay";
export default {
    name: "User",
    components: {},
    data(){
        return {
            data: [],
            amount_id: "",
            amount: "",
            amount_number: "",
            pay_type: this.$route.query.type,
            // disabled_button
            disabled_button: true
        }
    },
    beforeMount(){
        this.getAmountList();
    },
    methods: {
        /** 获取充值列表 */
        getAmountList(){
            AmountList().then(response => {
                this.data = response.data;
                console.log(this.data)
            })
        },
        /** 选择金额 */
        checkAmount(data){
            this.amount_id = data.id;
            this.amount = data.amount;
            this.disabled_button = false;
        },
        /** 确认充值 */
        confirmSubmit(){
            /**
             * 1、只存在输入金额时，取输入金额
             * 2、只存在选项金额时，取选项金额
             * 3、如果两种都存在时，取选项金额
             */
            let amount = this.amount_number || this.amount;
            if(this.amount_number && this.amount) { amount = this.amount; }
            Pay({amount: amount, type: this.pay_type}).then(response => {
                const order_no = response.data.order_no;
                const payUrl = response.data.pay_url;
                // if(payUrl) {
                //     window.location.href = payUrl;
                //     return false;
                // }
                //

                localStorage.setItem("order_no", order_no);
                // 跳转
                this.$router.push({
                    path: "/payStatus"
                })
            })
        },
        inputEnter(){
            const reg = /^[0-9]*$/;
            const status = reg.test(this.amount_number);
            this.disabled_button = !status;
        }

        // 开发支付功能，支付成功后需要有一个回调地址，返回项目
        // 进行支付的过程，已经离开了项目本身，处于在微信端。支付完成或者放弃支付的时候，都会回调一个地址
        // 订单号丢失状态。
    }
}
</script>
<style lang="scss">
.section-mode {
    padding-bottom: 30px;
    margin-bottom: 30px;
    header { margin-bottom: 20px; }
    .title {
        font-size: 14px;
        color: #fff;
        opacity: .5;
    }
}
.price {
    color: #fff;
    span {
        font-size: 40px;
        font-family: "bahnschrift";
    }
    em {
        font-size: 18px;
    }
}
.goto {
    display: inline-block;
    height: 36px;
    padding: 0 20px;
    font-size: 18px;
    line-height: 36px;
    border: 2px solid #00a3ff;
    border-radius: 100px;
    color: #00a3ff;
}
.links {
    li {
        display: block;
        height: 20px;
        line-height: 20px;
        position: relative;
        padding: 11px 0;
        color: #fff;
        font-size: 16px;
    }
}
.amount-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
    .item {
        padding: 0 10px;
        margin-bottom: 20px;
        flex: 1;
        @include webkit(box-sizing, border-box);
        width: 33.33333%;
        min-width: 33.33333%;
        max-width: 33.33333%;
    }
    .a-wrap {
        height: 48px;
        width: 100%;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, .1);
        text-align: center;
        color: #fff;
        font-family: "bahnschrift";
        line-height: 48px;
        font-size: 24px;
        &.current {
            background-color: #00a3ff;
            border: 1px solid #00a3ff;
        }
    }
}
.check-round {
    position: relative;
    float: right;
    width: 18px;
    height: 18px;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, .1);
    cursor: pointer;
    &::before {
        content: "";   
        position:absolute;
        left: 3px;
        top: 6px;
        width: 10px;
        height: 4px;
        border-left: 1px solid rgba(255, 255, 255, .1);
        border-bottom: 1px solid rgba(255, 255, 255, .1);
        @include webkit(transform, rotate(-45deg));
    }
    &.current {
        border: 1px solid #00a3ff;
        background-color: #00a3ff;
        &::before {
            content: "";   
            border-left: 1px solid #fff;
            border-bottom: 1px solid #fff;
        }
    }
}
</style>