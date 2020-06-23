<template>
    <div>
        <!-- cars data渲染 -->
        <!-- <Cars /> -->
        <!-- 地图 -->
        <Map />
        <!-- 导航 -->
        <Navbar />
        <!-- 会员 -->
        <div id="children-view" :class="{open: show}">
            <router-view />
        </div>
    </div>
</template>
<script>
import Map from "../amap";
import Cars from "../cars";
import Navbar from "@c/navbar";
export default {
    name: "Index",
    components: { Map, Cars, Navbar },
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
                this.$router.push({
                    name: "Index"
                })
            }
        })
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