<template>
    <div class="user-container">
        <Back column="安全设置" />
        <img :src="img" alt="" class="level-img">
        <section class="section-mode">
            <header>
                <h4 class="title">当前余额</h4>
            </header>
            <div class="content">
                <div class="clearfix">
                    <div class="price pull-left">
                        <em>￥</em>
                        <span>2000.00</span>
                    </div>
                    <div class="price pull-right">
                        <router-link :to="{ path: '/recharge', query: { type: 'amount' } }"  class="goto">去充值</router-link>
                    </div>
                </div>
            </div>
        </section>
        <section class="section-mode">
            <header>
                <h4 class="title">我的里程</h4>
            </header>
            <div class="content">
                <div class="color-white fs-24 fa-b">30000公里</div>
            </div>
        </section>
        <section class="section-mode">
            <header>
                <h4 class="title">违章信息</h4>
            </header>
            <div class="content">
                <ul class="links">
                    <router-link to="My" tag="a" class="arrow">
                        <span class="pull-left">待处理违章</span>
                        <span class="pull-right fs-12 mr-15">10单</span>
                    </router-link>
                    <router-link to="aa" tag="a" class="arrow">
                        <span class="pull-left">违章预存金</span>
                        <span class="pull-right fs-12 mr-15">￥200</span>
                    </router-link>
                </ul>
            </div>
        </section>
        <section class="section-mode">
            <header>
                <h4 class="title">发票</h4>
            </header>
            <div class="content">
                <ul class="links">
                    <router-link to="My" tag="a" class="arrow">
                        <span class="pull-left">可开发票总额</span>
                        <span class="pull-right fs-12 mr-15">￥200</span>
                    </router-link>
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name: "User",
    components: {},
    data(){
        return {
            img: require("@/assets/images/level-img.png")
        }
    }
}
</script>
<style lang="scss">
.level-img {
    width: 100%;
    margin-bottom: 50px;
    @include webkit(box-shadow, 0 0 16px 0 rgba(0, 0, 0, .4));
}
.section-mode {
    border-bottom: 1px solid rgba(255, 255, 255, .05);
    padding-bottom: 30px;
    margin-bottom: 30px;
    header { margin-bottom: 20px; }
    .title {
        font-size: 14px;
        color: #fff;
        opacity: .5;
    }
}
.price {
    color: #fff;
    span {
        font-size: 40px;
        font-family: "bahnschrift";
    }
    em {
        font-size: 18px;
    }
}
.goto {
    display: inline-block;
    height: 36px;
    padding: 0 20px;
    font-size: 18px;
    line-height: 36px;
    border: 2px solid #00a3ff;
    border-radius: 100px;
    color: #00a3ff;
}
.links {
    a {
        display: block;
        height: 20px;
        line-height: 20px;
        position: relative;
        padding: 11px 0;
        color: #fff;
        font-size: 16px;
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
}
</style>