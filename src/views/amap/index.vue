<template>
    <div class="amap-wrap">
        <el-amap vid="amapContainer" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
            <!--覆盖物 - 圆-->
            <el-amap-circle v-for="item in circle" :key="item.id" :center="item.center" :radius="item.radius" :fillColor="item.color" :strokeColor="item.color" :strokeOpacity="item.strokeOpacity" :strokeWeight="item.strokeWeight"></el-amap-circle>
        </el-amap>
    </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap';
import { SelfLocation } from "./location";
let amapManager = new AMapManager();
export default {
    name: "Amap",
    data(){
        const _this = this;
        return {
            map: null,
            amapManager,
            center: [121.59996, 31.197646],
            zoom: 18,
            events: {
                init(o) {
                    lazyAMapApiLoaderInstance.load().then(() => {
                        _this.initMap();
                    });
                }
            },
            circle: [
                {
                    center: [0, 0],
                    radius: 4,
                    color: "#393e43",
                    strokeOpacity: "0.2",
                    strokeWeight: "30"
                }
            ]
        }
    },
    methods: {
        initMap(){
            this.map = amapManager.getMap();
            // 地图初始化完成回调
            this.$emit("callbackComponent", {
                function: "loadMap"
            })
            // 自身定位
            this.selfLocatio();
        },
        selfLocatio(){
            SelfLocation({
                map: this.map,
                complete: (val) => this.onComplete(val)
            })
        },
        onComplete(data){
            const lng = data.position.lng;
            const lat = data.position.lat;
            this.circle[0].center = [lng, lat];
        }
    },
    mounted(){},
    watch: {
        "$store.state.location.selfLocation": {
            handler(){
                this.selfLocatio();
            }
        }
    }
}
</script>
<style lang="scss">
.amap-wrap { height: 100vh; }
</style>