<template>
    <carousel
    :items-to-show="1"
    :items-to-scroll="1"
    :wrap-around="true"
    :transition="500"
    :autoplay="5000"
    :mouse-drag="false"
    :touch-drag="false"
    :dir="'ltr'"
    >
        <slide v-for="(slide, index) in slides" :key="slide">
            <img src="../assets/bg.svg" alt="" class="bg__first-img">
            <h2 class="bg__text">{{ slide.text }}</h2>
            <img :src="slide.image" alt="" class="bg__second-img">
        </slide>
    </carousel>
</template>
  
<script>
    import turkey from '../assets/turkey.png'
    import egypt from '../assets/egypt.png'
    import russia from '../assets/russia.png'
    import kazakstan from '../assets/kazakstan.png'
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide } from 'vue3-carousel'
    
    export default {
        data() {
            return {
                slides: [
                    { image: turkey , text : 'ТУРЦИЯ' },
                    { image: egypt , text: 'ЕГИПЕТ'},
                    { image: russia , text: 'РОССИЯ' },
                    { image: kazakstan , text: 'КАЗАКСТАН' }
                ]
            };
        },
        name: 'App',
        components: {
        Carousel,
        Slide,
        },
    }
</script>

<style>
.bg__second-img{
    position: absolute;
    z-index: 5;
}

.bg__first-img,
.bg__second-img {
  max-width: 100%; 
  height: auto; 
}

.carousel__slide{
    justify-content: flex-start !important;
}

.bg__text{
    position: absolute;
    z-index: 4;
    top: 30%;
    font-size: 300px;
    color: #d4d4d4;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
}
</style>