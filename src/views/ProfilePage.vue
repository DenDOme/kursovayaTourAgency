<template>
    <div class="container">
        <div class="profile" :class="{ 'profile__bg': currentTab === 0 }">
            <div class="profile__menu">
                <button @click="changeTab(0)" :class="{ 'profile__menu-tab--active': currentTab === 0 }" class="profile__menu-tab">Профиль</button>
                <button @click="changeTab(1)" :class="{ 'profile__menu-tab--active': currentTab === 1 }" class="profile__menu-tab">Понравившийся</button>
                <button @click="changeTab(2)" :class="{ 'profile__menu-tab--active': currentTab === 2 }" class="profile__menu-tab">Сравнение</button>
                <button @click="changeTab(3)" :class="{ 'profile__menu-tab--active': currentTab === 3 }" class="profile__menu-tab">Билеты</button>
            </div>

            <div class="profile__content">
                <div v-if="currentTab === 0" class="profile__tab">
                    <div class="profile__wrapper">
                        <div class="profile__form">
                            <h1 class="profile__title">Профиль</h1>
                            <form class="form" @submit.prevent="handleProfile">
                                <div class="form__row">
                                    <input type="text" v-model="surname" class="form__input form__input-small" placeholder="Фамилия">
                                    <input type="text" v-model="name" class="form__input form__input-small" placeholder="Имя">
                                </div>
                                <input type="text" v-model="patronym" class="form__input" placeholder="Отчество">
                                <input type="text" v-model="login" class="form__input" placeholder="Логин">
                                <input type="password" v-model="password" class="form__input" placeholder="Пароль">
                                <button type="submit" class="form__button">Поменять</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div v-if="currentTab === 1" class="liked__tab">
                    <div class="liked__wrapper">
                        <div class="liked__items">
                            <div class="liked__item">
                                <img src="../assets/imgs/item-decoy.png" alt="" class="item__img">
                                <div class="text__row">
                                    <div class="text__left">
                                        <h2 class="text__left-title">Название</h2>
                                        <p class="text__left-county">Страна</p>
                                    </div>
                                    <div class="text__right">
                                        <button v-if="liked" class="like"><img src="../assets/imgs/heart.svg" alt=""></button>
                                        <button v-else class="like"><img src="../assets/imgs/heart-active.svg" alt=""></button>
                                        <router-link class="liked__link" :to="'/catalog/'+  '1'">купить</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="currentTab === 2" class="comparison__tab">
                    <div class="comparison__wrapper">
                        <div class="comparison__items">
                            <div class="comparison__item">
                                <img src="../assets/imgs/item-decoy.png" alt="" class="item__img">
                                <div class="text">
                                    <button class="delete__button">Удалить</button>
                                    <h2 class="text__item">Название</h2>
                                    <p class="text__item">Страна</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="currentTab === 3" class="tickets__tab">
                    <div class="tickets__wrapper">
                        <div class="tickets__items">
                            <div class="tickets__item">
                                <h2 class="tickets__title">Название</h2>
                                <div class="item__row">
                                    <p class="item__text">Страна</p>
                                    <p class="item__text">Страна</p>
                                </div>
                                <p class="item__text">Виза</p>
                                <div class="item__row">
                                    <p class="item__text">Цена</p>
                                    <router-link :to="'/catalog/' + '1'" class="item__text item__link">Дополнительно</router-link>
                                </div>
                            </div>
                            <div class="tickets__item">
                                <h2 class="item__title">Название</h2>
                                <div class="item__row">
                                    <p class="item__text">Страна</p>
                                    <p class="item__text">Страна</p>
                                </div>
                                <p class="item__text">Виза</p>
                                <div class="item__row">
                                    <p class="item__text">Цена</p>
                                    <router-link :to="'/catalog/' + '1'" class="item__text item__link">Дополнительно</router-link>
                                </div>
                            </div>
                            <div class="tickets__item">
                                <h2 class="item__title">Название</h2>
                                <div class="item__row">
                                    <p class="item__text">Страна</p>
                                    <p class="item__text">Страна</p>
                                </div>
                                <p class="item__text">Виза</p>
                                <div class="item__row">
                                    <p class="item__text">Цена</p>
                                    <router-link :to="'/catalog/' + '1'" class="item__text item__link">Дополнительно</router-link>
                                </div>
                            </div>
                            <div class="tickets__item">
                                <h2 class="item__title">Название</h2>
                                <div class="item__row">
                                    <p class="item__text">Страна</p>
                                    <p class="item__text">Страна</p>
                                </div>
                                <p class="item__text">Виза</p>
                                <div class="item__row">
                                    <p class="item__text">Цена</p>
                                    <router-link :to="'/catalog/' + '1'" class="item__text item__link">Дополнительно</router-link>
                                </div>
                            </div>
                            <div class="tickets__item">
                                <h2 class="item__title">Название</h2>
                                <div class="item__row">
                                    <p class="item__text">Страна</p>
                                    <p class="item__text">Страна</p>
                                </div>
                                <p class="item__text">Виза</p>
                                <div class="item__row">
                                    <p class="item__text">Цена</p>
                                    <router-link :to="'/catalog/' + '1'" class="item__text item__link">Дополнительно</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            currentTab: 0,
            likedData: [],
            comparisonData: [],
            ticketsData: [],
            surname: '',
            name: '',
            patronym: '',
            login: '',
            password: '',
        }
    },
    created(){
        this.fetchData();
    },
    methods: {
        changeTab(index){
            this.currentTab = index;
        },
        async fetchData(){
            this.likedData = await this.$store.dispatch('GET_LIKEDS');
            this.ticketsData = await this.$store.dispatch('GET_TICKETS');
            this.comparisonData = await this.$store.dispatch('GET_COMPARISONS');
        },
        async handleProfile(){
            const user = {
                surname: this.surname,
                name: this.name,
                patronym: this.patronym,
                login: this.login,
                password: this.password,
            }
            await this.$store.dispatch('UPDATE_USER', user);
            await this.$store.dispatch('GET_USER');
        }
    }
}
</script>

<style scoped>
.liked__wrapper{
    min-height: calc(100vh - 80px - 80px - 110px - 30px - 90px);
    background-color: #fff;
    margin-bottom: 30px;
}
.liked__items{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 25px;
    margin-top: 15px;
    color: #FFF;
}
.liked__item{
    background-color: #454545;
    padding: 20px;
}

.liked__link{
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

.text__row{
    margin-top: 10px;
    display: flex;
    align-items: end;
    justify-content: space-between;
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

.item__img{
    width: 100%;
}

.like{
    width: 25px;
    height: 25px;
    background: none;
}

.comparison__wrapper{
    min-height: calc(100vh - 80px - 80px - 110px - 30px - 90px);
    background-color: #fff;
    margin-bottom: 30px;
}
.comparison__items{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 25px;
    margin-top: 15px;
    color: #FFF;
}
.comparison__item{
    background-color: #454545;
    padding: 20px;
}
.item__img{
    width: 100%;
}
.text{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px
}
.text__item{
    font-size: 16px;
    color: #fff;
    font-weight: 300;
}
    .tickets__wrapper{
        padding: 30px;
    }

    .tickets__items{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 15px;
        color: #FFF;    
    }
    
    .tickets__item{
        padding: 25px;
        background-color: #454545;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .item__row{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .item__link{
        color: #fff;
        background-color: #0C73FE;
        background-color: #0C73FE;
        color: #fff;
        font-size: 14px;
        font-weight: 300;
        height: 25px;
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .profile{
        padding-top: 30px;
        margin-top: 70px;
        background-color: #fff;
    }

    .profile__bg{
        background-color: #232323;
    }

    .profile__menu{
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #232323;
    }
    
    .profile__menu-tab{
        font-size: 24px;
        font-weight: 600;
        color: #fff;
        background-color: inherit;
    }

    .profile__menu-tab--active {
        color: #0C73FE;
    }

    .profile__content{
        min-height: calc(100vh - 80px - 80px - 240px);
        margin-bottom: 70px;
    } 
    .profile__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 80px - 80px);
    }
    .profile__form{
        max-width: 450px;
        width: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: start;
        padding: 62px;
    }
    .profile__title{
        color: #0C73FE;
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 50px;
    }
    .form{
        max-width: 320px;
    }
    .form__input{
        max-width: 320px;
        width: 100%;
        border-radius: 15px;
        padding: 6px 0 6px 14px;
        font-size: 24px;
        color: #fff;
        background-color: #232323;
        margin-bottom: 30px;
    }
    .form__button{
        max-width: 320px;
        width: 100%;
        border-radius: 15px;
        background-color: #FF6F32;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 24px;
        padding: 5px 0; 
        margin-top: 30px;
    }

    .form__input::placeholder {
        color: #B0B0B0;
    }
    .form__row{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
        max-width: 320px;
    }
    .form__input-small{
        max-width: 150px ;
    }
</style>