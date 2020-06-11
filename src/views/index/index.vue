<template>
    <div>
        <!-- cars data渲染 -->
        <Cars />
        <!-- 地图 -->
        <Map />
        <!-- 会员 -->
        <div id="children-view" :class="[show ? 'open' : '']">
            <router-view />
        </div>
    </div>
</template>
<script>
import Map from "../amap/index";
import Cars from "../cars/index";
export default {
    name: "Index",
    components: { Map, Cars },
    data(){
        return {
            show: false
        }
    },
    watch: {
        "$route" :{
            handler(newValue){
                const routerName = newValue.name;
                this.show = routerName === "Index" ? false : true;
            }
        }
    }
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
    -webkit-transition: all .3s ease 0s;
    -moz-transition: all .3s ease 0s;
    -ms-transition: all .3s ease 0s;
    -o-transition: all .3s ease 0s;
    transition: all .3s ease 0s;
    &.open {
        right: 0;
    }
}
</style>