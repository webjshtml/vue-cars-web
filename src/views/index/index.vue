<template>
    <div>
        <!-- cars data渲染 -->
        <Cars ref="cars" />
        <!-- 地图 -->
        <Map ref="map" :parking="parking"  @callbackComponent="callbackComponent" />
        <!-- 导航 -->
        <Navbar />
        <!-- 会员 -->
        <div id="children-view" :class="{open: show}">
            <router-view />
        </div>
        <!-- login -->
        <LoginVue />
        <div class="cars_activation" v-if="cars_active_data && cars_active_data.order_no">
            <router-link :to="{path: '/orderDetailed', query: {order_no: cars_active_data.order_no} }" class="color-white">正在使用的车辆</router-link>
        </div>
        <div class="button-groure" v-if="cars_active_data && cars_active_data.order_no">
            <div v-if="cars_active_data.order_status == 'RETURN'">
                停车场的ID：
                <el-button size="mini" v-for="item in parkingIdItem" :key="item" @click="parking_id = item" :type="parking_id == item ? 'primary' : ''">{{ item }}</el-button>
            </div>
            <el-button type="primary" size="small" @click="carsGet" v-if="cars_active_data.order_status == 'WAIT'">取车</el-button>
            <!-- <el-button type="primary" size="small" @click="carsReturn" v-if="cars_active_data.order_status == 'RETURN'">还车</el-button> -->
            <el-button type="primary" size="small" @click="carsReturns" v-if="cars_active_data.order_status == 'RETURN'">还车</el-button>
            <el-button type="primary" size="small" @click="carsCancel" v-if="cars_active_data.order_status == 'WAIT'">取消</el-button>
        </div>
    </div>
</template>
<script>
import Map from "../amap";
import Cars from "../cars";
import Navbar from "@c/navbar";
import LoginVue from "./login";
import { Parking } from "@/api/parking";
import { GetCarsActivation, CarsGet, CarsReturn, CarsCancel, CarsReturns } from "@/api/order";
export default {
    name: "Index",
    components: { Map, Cars, Navbar, LoginVue },
    data(){
        return {
            parking: [],
            cars_active_data: JSON.parse(localStorage.getItem("cars_active")),
            parking_id: ""
        }
    },
    computed: {
        show(){
            const rotuer = this.$route;
            return rotuer.name === "Index" ? false : true;
        },
        parkingIdItem(){
            return this.$store.state.location.parking_id;
        }
    },
    beforeMount(){
        !this.order_no && this.getCarsActivation();
    },
    methods: {
        callbackComponent(params) {
            params.function && this[params.function](params.data);
        },
        // 地图初始化完成回调
        loadMap(){
            this.getParking();
        },
        // 获取停车场数据
        getParking(){
            Parking().then(response => {
                const data = response.data.data;
                data.forEach(item => {
                    item.position = item.lnglat.split(",");
                    item.content = "<img src='"+ require('@/assets/images/parking_location_img.png') +"' />";
                    item.offset = [-35, -60];
                    item.offsetText = [-30, -55];
                    item.label = {content: "11", offset: [10, 10]};
                    item.text = `<div style="width: 60px; font-size: 20px; color: #fff; text-align: center;line-height: 50px; height: 60px;">${item.carsNumber}</div>`;
                    item.events = {
                        click: (e) => {
                            this.$store.commit("app/SET_CARS_LIST_REQUEST", true);
                            this.walking(e);  // 路线规划
                            this.getCarsList(e);  // 车辆列表
                        }
                    }
                });
                this.parking = data;
                // 获取停车的ID
                const parkingId = data.map(item => item.id);
                this.$store.commit("location/SET_PARKING_ID", parkingId);
            })
        },
        walking(e){
            const data = e.target.getExtData();
            this.$refs.map.saveData({
                key: "parkingData",
                value: data
            });

            this.$refs.map.handlerWalking(data.lnglat.split(","));
        },
        getCarsList(e){
            const data = e.target.getExtData();
            // 父组件调子组件的方法
            this.$refs.cars && this.$refs.cars.getCarsList(data.id)
        },
        /** 获取正在使用的车辆 */
        /**
         * 简单的接口优化
         * 1、查找缓存里面的 order_no，
         * 2、没有情况就请求接口，
         * 3、如果有就不请求
         */
        getCarsActivation(){
            GetCarsActivation().then(response => {
                const data = response.data;
                if(data) {
                    this.cars_active_data = data;
                    localStorage.setItem("cars_active", JSON.stringify(data));
                }
            })
        },
        /** 取车 */
        carsGet(){
            CarsGet({order_no: this.cars_active_data.order_no, cars_id: this.cars_active_data.cars_id}).then(response => {
                const data = response.data;
                if(data && data.order_status) {
                    this.$set(this.cars_active_data, "order_status", data.order_status);
                    localStorage.setItem("cars_active", JSON.stringify(this.cars_active_data));
                }
            })
        },
        /** 取车 */
        carsReturn(){
            CarsReturn({order_no: this.cars_active_data.order_no, cars_id: this.cars_active_data.cars_id}).then(response => {
                this.$message({
                    message: response.message,
                    type: "success"
                })
                this.cars_active_data = null;
                localStorage.removeItem("cars_active");
            })
        },

        /** 取车 */
        carsReturns(){
            CarsReturns({
                order_no: this.cars_active_data.order_no, 
                cars_id: this.cars_active_data.cars_id,
                parking_id: this.parking_id
            }).then(response => {
                this.$message({
                    message: response.message,
                    type: "success"
                })
                this.cars_active_data = null;
                localStorage.removeItem("cars_active");
            })
        },

        /** 取消 */
        carsCancel(){
            CarsCancel({order_no: this.cars_active_data.order_no, cars_id: this.cars_active_data.cars_id}).then(response => {
                this.$message({
                    message: response.message,
                    type: "success"
                })
                this.cars_active_data = null;
                localStorage.removeItem("cars_active");
            })
        }
    },
    watch: {}
}
</script>
<style lang="scss">
#children-view {
    position: fixed;
    top: 0;
    bottom: 0;
    right: -600px;
    z-index: 101;
    width: 410px;
    background-color: #34393f;
    @include webkit(transition, all .3s ease 0s);
    @include webkit(box-shadow, -5px 0 38px 0 rgba(0, 0, 0, .4));
    &.open {
        right: 0;
    }
}
.cars_activation {
    position: fixed;
    left: 20px;
    top: 20px;
    border-radius: 100px;
    padding: 10px 20px;
    font-size: 12px;
    background-color: green;
    color: #fff;
}
.button-groure {
    position: fixed;
    left: 20px;
    top: 60px;
}
</style>