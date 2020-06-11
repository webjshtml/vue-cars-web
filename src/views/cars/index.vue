<template>
    <div class="index-wrap">
        <span @click="user">汽车列表</span>
    </div>
</template>
<script>
export default {
    name: "Cars",
    data(){
        return {}
    },
    methods: {
        user(){
            this.$router.push({
                name: "User"
            })
        }
    }
}
</script>
<style lang="scss">
.index-wrap {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 100;
}
</style>