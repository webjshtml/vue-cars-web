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
    </div>
</template>
<script>
import Map from "../amap";
import Cars from "../cars";
import Navbar from "@c/navbar";
import LoginVue from "./login";
import { Parking } from "@/api/parking";

export default {
    name: "Index",
    components: { Map, Cars, Navbar, LoginVue },
    data(){
        return {
            parking: []
        }
    },
    computed: {
        show(){
            const rotuer = this.$route;
            return rotuer.name === "Index" ? false : true;
        }
    },
    mounted(){
        document.addEventListener('mouseup', (e) => {
            const userCon = document.getElementById("children-view");
            if(userCon && !userCon.contains(e.target)) {
                const routerName = this.$route.name;
                if(routerName === "Index") { return false; }
                this.$router.push({
                    name: "Index"
                })
            }
        })
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
                            this.walking(e);  // 路线规划
                            this.getCarsList(e);  // 车辆列表
                        }
                    }
                });
                this.parking = data
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
</style>