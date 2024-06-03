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
            <img src="../assets/imgs/bg.svg" alt="" class="bg__first-img">
            <img src="../assets/imgs/clouds.png" alt="" class="bg__third-img">
            <h2 class="bg__text">{{ slide.text }}</h2>
            <img :src="slide.image" alt="" class="bg__second-img">
        </slide>
    </carousel>
    <section class="about">
        <div class="container">
            <h1 class="about__title">Почему именно мы?</h1>
            <div class="about__rows">
                <div class="about__row">
                    <img class="about__img" src="../assets/imgs/item3.png" alt="">
                    <div class="text">
                        <div class="text__title"><img src="../assets/imgs/title3.svg" alt=""><span>Надежность</span></div>
                        <div class="text__subtitle">Наш сервис работает с 2012-го года. За это время мы обслужили более 1.5 миллиона человек и получили более 60000 тыс. отзывов</div>
                    </div>
                </div>
                <div class="about__row">
                    <img class="about__img" src="../assets/imgs/item2.png" alt="">
                    <div class="text">
                        <div class="text__title"><img src="../assets/imgs/title2.svg" alt=""><span>Эффективность</span></div>
                        <div class="text__subtitle">Сайт  Regal Routes легко понятен и хорошо оптимизирован. Так что вы получите быстрый ответ на ваш запрос</div>
                    </div>
                </div>
                <div class="about__row">
                    <img class="about__img" src="../assets/imgs/item1.png" alt="">
                    <div class="text">
                        <div class="text__title"><img src="../assets/imgs/title1.svg" alt=""><span>Низкая стоимость</span></div>
                        <div class="text__subtitle">Regal Routes, предлагающий дешевые цены, становится настоящим спасением для тех, кто стремится совершить запоминающееся путешествие, не перегружая свой бюджет</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
    import turkey from '../assets/imgs/turkey.png' 
    import egypt from '../assets/imgs/egypt.png'
    import russia from '../assets/imgs/russia.png'
    import kazakstan from '../assets/imgs/kazakstan.png'
    import 'vue3-carousel/dist/carousel.css'
    import { Carousel, Slide } from 'vue3-carousel'
    
    export default {
        data() {
            return {
                slides: [
                    { text : 'ТУРЦИЯ', image: turkey , topColor: '#E6CEA7', bottomColor: '#232323' },
                    { text: 'ЕГИПЕТ', image: egypt , topColor: '#EFD195', bottomColor: '#232323' },
                    { text: 'РОССИЯ', image: russia , topColor: '#001C25', bottomColor: '#232323' },
                    { text: 'КАЗАКСТАН', image: kazakstan , topColor: '#DADDE2', bottomColor: '#232323' }
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
.about__title{
    margin:100px 0 150px;
    color: #fff;
    font-size: 48px;
    font-weight: 700;
    text-align: center;
}

.about__row{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 150px;
}

.about__row:nth-child(2){
    flex-direction: row-reverse;
}

.about__row:nth-child(2) .text__subtitle{
    text-align: left ;
}

.text{
    max-width: 370px;
    color: #fff;
    font-size: 22px;
}

.text__title{
    font-weight: 700;
    font-size: 26px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.text__subtitle{
    text-align: right;
}

.about__img{
    width: 50%;
}

.bg__second-img{
    position: absolute;
    z-index: 5;
}

.bg__first-img,
.bg__second-img,
.bg__third-img {
  max-width: 100%; 
  height: auto; 
}

.bg__third-img{
    position: absolute;
    z-index: 2;
    top: 0;
}

.carousel__slide{
    justify-content: flex-start !important;
}

.bg__text{
    position: absolute;
    z-index: 4;
    top: 30%;
    font-size: 15vw;
    color: #232323;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
}

@media screen and (max-width:800px) {
    .about__row, .about__row:nth-child(2){
        gap: 20px;
        flex-direction: column;
    }
    .about__img{
        width: 100%;
    }
    .text__subtitle, .about__row:nth-child(2) .text__subtitle{
        text-align: center;
    }
}

</style>