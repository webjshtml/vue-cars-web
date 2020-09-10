<template>
    <div class="amap-wrap">
        <el-amap ref="map" vid="amapContainer" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" class="amap-demo">
            <!--覆盖物 - 圆-->
            <el-amap-circle v-for="item in circle" :key="item.id" :center="item.center" :radius="item.radius" :fillColor="item.color" :strokeColor="item.color" :strokeOpacity="item.strokeOpacity" :strokeWeight="item.strokeWeight"></el-amap-circle>
            <!--覆盖物 - 停车场-->
            <el-amap-marker v-for="(item, index) in parking" :key="item.id" :content="item.content" :offset="item.offset" :position="item.position" :vid="index"></el-amap-marker>
            <!--覆盖物 - 停车场 - 车辆-->
            <el-amap-marker v-for="(item, index) in parking" :extData="item" :events="item.events" :key="item.id + index" :content="item.text" :offset="item.offsetText" :position="item.position" :vid="index"></el-amap-marker>
             <!--覆盖物 - 停车场 - 距离信息-->
            <el-amap-marker v-for="(item, index) in parkingInfo" zIndex="1000" :key="item.id" :content="item.text" :offset="item.offset" :position="item.position" :vid="index"></el-amap-marker>
        </el-amap>
    </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap';
import { SelfLocation } from "./location";
import { Walking } from "./walking";
// 样式
import StyleCss from "./style";
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
            // self position
            self_lng: "",
            self_lat: "",
            events: {
                init(o) {
                    lazyAMapApiLoaderInstance.load().then(() => {
                        _this.initMap();
                    });
                }
            },
            // 自身定位
            circle: [],
            // 停车场位置
            parkingData: {},
            // 停车场信息
            parkingInfo: []
        }
    },
    methods: {
        /** 初始化地图 */
        initMap(){
            this.map = amapManager.getMap();
            // 地图初始化完成回调
            this.$emit("callbackComponent", {
                function: "loadMap"
            })
            // 自身定位
            this.selfLocation();
        },
        /** 存储数据 */
        saveData(params){
            if(this[params.key]) {
                this[params.key] = params.value;
            }
        },
        /**
         * 自身定位
         */
        selfLocation(){
            SelfLocation({
                map: this.map,
                complete: (val) => this.selfLocationComplete(val)
            })
        },
        /** 自身定位 成功回调 */
        selfLocationComplete(data){
            this.self_lng = data.position.lng;
            this.self_lat = data.position.lat;
            const json = {
                radius: 4,
                color: "#393e43",
                strokeOpacity: "0.2",
                strokeWeight: "30"
            }
            json.center = [this.self_lng, this.self_lat];
            this.circle.push(json)
        },
        /**
         * 步行路线规划
         */
        // 1、明确当前这个函数是做什么用的 2、只做一件事件
        handlerWalking(lnglat){
            // 步行路线规划
            Walking({
                map: this.map,
                position_start: [this.self_lng, this.self_lat],
                position_end: lnglat,
                complete: (val) => this.handlerWalkingComlete(val)
            })
        },
        handlerWalkingComlete(data){
            this.parkingInfo = [
                {
                    position: this.parkingData.lnglat.split(","),
                    text: `<div style='${StyleCss.parkingInfoWrap}'>
                        <span style="${StyleCss.parkingInfoNumber}">${this.parkingData.carsNumber}</span>
                        辆车<span style="${StyleCss.parkingInfoLine}"></span>距离您${data.routes[0].distance}米
                    </div>`,
                    offset: [-15, -54]
                }
            ]
        }
    },
    mounted(){},
    props: {
        parking: {
            type: Array,
            default: () => ([])
        }
    },
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