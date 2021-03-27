<template>
    <div class="user-container">
        <Back column="安全设置" />
        <ul class="menu">
            <li class="current">全部</li>
            <li>待取车</li>
            <li>待支付</li>
            <li>已取消</li>
            <li>已完成</li>
        </ul>
        <div class="order-list">
            <div class="item" v-for="item in orderListData" :key="item.id" @click="detailed">
                <div class="info">
                    <time class="flex-1">{{ item.create_date | date("all", '.') }}</time>
                    <div class="flex-1">
                        <!-- <span class="status" :style="{ color: casrStatus[item.order_status] ? casrStatus[item.order_status].color : '' }">
                            {{ casrStatus[item.order_status] ? casrStatus[item.order_status].zh : "" }}
                        </span> -->
                        <span class="status" :class="'color-' + item.order_status">
                            {{ casrStatus[item.order_status] ? casrStatus[item.order_status].zh : "" }}
                        </span>
                    </div>
                </div>
                <p class="number">{{ item.carsNumber }}</p>
                <div>
                    <div class="price pr arrow">
                        <em>￥</em>
                        <span>2000.00</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { OrderList } from "@/api/order";
import { fotmarDate } from "@/utils/common";
export default {
    name: "User",
    components: {},
    data(){
        return {
            // 引入图片
            img: require("@/assets/images/level-img.png"),
            // 订单列表
            order_list_data: [],
            // 页码
            page_number: 1,
            // 车辆状态
            casr_status: this.$store.state.config.cars_status
        }
    },
    methods: {}
}
</script>
<style lang="scss">
.menu {
    text-align: center;
    margin-bottom: 40px;
    li {
        display: inline-block;
        position: relative;
        font-size: 14px;
        opacity: .5;
        padding: 0 12px 15px;
        color: #fff;
        cursor: pointer;
        &.current {
            opacity: 1;
            &::before {
                content: "";
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -15px;
                width: 30px;
                height: 4px;
                border-radius: 10px;
                background-color: #00a3ff;
            }
        }
    }
}
.order-list {
    .item {
        background-color: rgba(0, 0, 0, .1);
        border-radius: 10px;
        padding: 0 18px 20px;
        color: #fff;
        margin-bottom: 20px;
    }
    .info {
        display: flex;
        padding: 22px 0;
        time {
            font-family: "bahnschrift";
        }
        .status {
            float: right;
        }
        
    }
    .number {
        font-size: 18px;
        padding: 0 0 20px;
        margin-bottom: 20px;
        font-family: "bahnschrift";
        border-bottom: 1px solid rgba(255, 255, 255, .05);
    }
}
.price {
    position: relative;
    color: #fff;
    span {
        font-size: 36px;
        font-family: "bahnschrift";
    }
    em {
        font-size: 18px;
    }
}
.arrow:after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        width: 10px;
        height: 10px;
        margin-top: -6px;
        border-top: 1px solid #fff;
        border-right: 1px solid #fff;
        @include webkit(box-sizing, border-box);
        @include webkit(transform, rotate(45deg));
        opacity: .1;
    }
</style>