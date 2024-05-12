<template>
    <section class="catalog">
        <div class="container">
            <form @submit.prevent="handleSearch" class="catalog__form">
                <input type="text" v-model="search" name="" class="catalog__form-input" placeholder="Найти...">
                <button type="submit" class="catalog__form-btn"><img src="../assets/imgs/search.svg" alt=""></button>
            </form>

            <form class="catalog__filter">
                <div class="catalog__filter-inputs">    
                    <h2 class="catalog__filter-title">Фильтр</h2>
                    <input type="text" name="" id="">
                    <input type="text" name="" id="">
                    <input type="text" name="" id="">
                    <input type="text" name="" id="">
                </div>
            </form>

            <div class="catalog__wrapper">
                <div class="catalog__items">
                    <div class="item">
                        <img src="../assets/imgs/item-decoy.png" alt="" class="item__img">
                        <div class="text__row">
                            <div class="text__left">
                                <h2 class="text__left-title">Название</h2>
                                <p class="text__left-county">Страна</p>
                            </div>
                            <div class="text__right">
                                <button v-if="liked" class="like"><img src="../assets/imgs/heart.svg" alt=""></button>
                                <button v-else class="like"><img src="../assets/imgs/heart-active.svg" alt=""></button>
                                <router-link class="catalog__link" :to="'/catalog/'+  '1'">купить</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <img src="../assets/imgs/item-decoy.png" alt="" class="item__img">
                        <div class="text__row">
                            <div class="text__left">
                                <h2 class="text__left-title">Название</h2>
                                <p class="text__left-county">Страна</p>
                            </div>
                            <div class="text__right">
                                <button v-if="liked" class="like"><img src="../assets/imgs/heart.svg" alt=""></button>
                                <button v-else class="like"><img src="../assets/imgs/heart-active.svg" alt=""></button>
                                <router-link class="catalog__link" :to="'/catalog/'+  '1'">купить</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <img src="../assets/imgs/item-decoy.png" alt="" class="item__img">
                        <div class="text__row">
                            <div class="text__left">
                                <h2 class="text__left-title">Название</h2>
                                <p class="text__left-county">Страна</p>
                            </div>
                            <div class="text__right">
                                <button v-if="liked" class="like"><img src="../assets/imgs/heart.svg" alt=""></button>
                                <button v-else class="like"><img src="../assets/imgs/heart-active.svg" alt=""></button>
                                <router-link class="catalog__link" :to="'/catalog/'+  '1'">купить</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <img src="../assets/imgs/item-decoy.png" alt="" class="item__img">
                        <div class="text__row">
                            <div class="text__left">
                                <h2 class="text__left-title">Название</h2>
                                <p class="text__left-county">Страна</p>
                            </div>
                            <div class="text__right">
                                <button v-if="liked" class="like"><img src="../assets/imgs/heart.svg" alt=""></button>
                                <button v-else class="like"><img src="../assets/imgs/heart-active.svg" alt=""></button>
                                <router-link class="catalog__link" :to="'/catalog/'+  '1'">купить</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default{
    data(){
        return {
            liked: true
        }
    }
}
</script>

<style scoped>
.catalog__wrapper{
    min-height: calc(100vh - 80px - 80px - 110px - 30px - 90px);
    background-color: #fff;
    margin-bottom: 30px;
}
.catalog__items{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 25px;
    margin-top: 15px;
    color: #FFF;
}

.like{
    width: 25px;
    height: 25px;
    background: none;
}

.text__right{
    display: flex;
    align-items: center;
    gap: 5px;
}

.text__left{
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.catalog__link{
    background-color: #0C73FE;
    color: #fff;
    font-size: 14px;
    font-weight: 300;
    height: 25px;
    width: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.item{
    background-color: #454545;
    padding: 20px;
}

.item__img{
    width: 100%;
}

.text__row{
    margin-top: 10px;
    display: flex;
    align-items: end;
    justify-content: space-between;
}

.catalog__form{
    position: relative;
    margin: 30px 0 15px;
}

.catalog__filter{
    padding: 40px 0 ;
    background-color: #fff;
}
.catalog__filter-title{
    position: absolute;
    left: 10%;
    top: -25px;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 15px;
}
.catalog__filter-inputs{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.catalog__filter-inputs input{
    width: 20%;
    height: 30px;
    background: #4B4B4B;
    padding: 0px 10px;
    border-right: 1px solid #fff;
    color: #fff;
}
.catalog__form-input{
    border-radius: 30px;
    width: 100%;
    background: #fff;
    height: 30px;
    padding-left: 15px;
}
.catalog__form .catalog__form-input::placeholder{
    font-weight: 500;
    color: #000;
    opacity: 1;
}
.catalog__form-btn{
    height: 27px;
    width: 27px;
    border-radius: 30px;
    background-color: #FF6F32;
    position: absolute;
    right: 2px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>