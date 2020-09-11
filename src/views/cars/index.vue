<template>
    <div class="cars-wrap">
        <div class="cars-swiper-wrap">
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide v-for="item in carsList" :key="item.id"><CarsItem :data="item" /></swiper-slide>
                <!-- <swiper-slide><CarsItem height="600px" /></swiper-slide>
                <swiper-slide><CarsItem /></swiper-slide>
                <swiper-slide><CarsItem /></swiper-slide>
                <swiper-slide><CarsItem /></swiper-slide> -->
            </swiper>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </div>
    </div>
</template>
<script>
// cars item
import CarsItem from "./component";
// swiper
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css'
// API
import { GetCarsList } from "@/api/cars";
export default {
    name: "Cars",
    components: { CarsItem, Swiper, SwiperSlide },
    data(){
        return {
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 50,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            carsList: []
        }
    },
    methods: {
        getCarsList(parkingId){
            GetCarsList({ parkingId }).then(response => {  //变量名称相同的情况下，可以用一个，是ES6的语法
                const data = response.data.data;
                data && (this.carsList = data);
            })
        }
    }
}
</script>
<style lang="scss">
@import "./index.scss";
</style>