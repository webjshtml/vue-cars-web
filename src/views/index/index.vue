<template>
    <div>
        <!-- cars data渲染 -->
        <!-- <Cars /> -->
        <!-- 地图 -->
        <Map @callbackComponent="callbackComponent" />
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
        return {}
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
</style>