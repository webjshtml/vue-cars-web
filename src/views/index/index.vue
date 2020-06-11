<template>
    <div class="amap-wrap">
        <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo"></el-amap>
    </div>
</template>
<script>
export default {
    name: "Index",
    data(){
        return {
            zoom: 12,
            center: [116.404765, 39.918052]
        }
    }
}
</script>
<style lang="scss">
.amap-wrap { height: 100vh; }
</style>