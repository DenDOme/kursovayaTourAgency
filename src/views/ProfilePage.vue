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
                            <div v-for="product in items" :key="product.id" class="liked__item">
                                <img :src="handleImg(product.img)" :alt="product.route" class="item__img">
                                <div class="text__row">
                                    <div class="text__left">
                                        <h2 class="text__left-title">{{ product.route }}</h2>
                                        <p class="text__left-county">{{ product.country_id.name }}</p>
                                    </div>
                                    <div class="text__right">
                                        <button @click="unlikeItem(product.id)" v-show="this.$store.getters.isAuthenticated" v-if="isLiked(product.id)" class="like"><img src="../assets/imgs/heart.svg" alt=""></button>
                                        <router-link class="liked__link" :to="'/catalog/'+ product.id">купить</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="currentTab === 2" class="comparison__tab">
                    <div class="comparison__wrapper">
                        <div class="comparison__items">
                            <div v-for="product in items" :key="product.id" class="comparison__item">
                                <img :src="handleImg(product.img)" :alt="product.route" class="item__img">
                                <div class="text">
                                    <p class="item__label">Тур:</p>
                                    <p class="item__text">{{ product.route }}</p>

                                    <p class="item__label">Страна:</p>
                                    <p class="item__text">{{ product.country_id.name }}</p>

                                    <p class="item__label">Виза:</p>
                                    <p class="item__text">{{ product.country_id.vise }}</p>

                                    <p class="item__label">Название отеля:</p>
                                    <p class="item__text">{{ product.hotel_id.name }}</p>

                                    <p class="item__label">Адрес отеля:</p>
                                    <p class="item__text">{{ product.hotel_id.address }}</p>

                                    <p class="item__label">Инфо отеля:</p>
                                    <p class="item__text">{{ product.hotel_id.info }}</p>

                                    <p class="item__label">Имя тур<br>оператора:</p>
                                    <p class="item__text">{{ product.tour_operator_id.name }}</p>

                                    <p class="item__label">Фамилия тур<br>оператора:</p>
                                    <p class="item__text">{{ product.tour_operator_id.surname }}</p>

                                    <p class="item__label">Отчество тур<br>оператора:</p>
                                    <p class="item__text">{{ product.tour_operator_id.patronym }}</p>

                                    <p class="item__label">Контакты тур<br>оператора:</p>
                                    <p class="item__text">{{ product.tour_operator_id.contacts }}</p>
                                    <button class="delete__button">Удалить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="currentTab === 3" class="tickets__tab">
                    <div class="tickets__wrapper">
                        <div class="tickets__items">
                            <div v-for="ticketOwner in items" :key="ticketOwner.id" class="ticket__item">
                                <p class="ticket__number">Номер билета: {{ ticketOwner.id }}</p>
                                <p class="ticket__text">Название авиакомпании: {{ ticketOwner.name }}</p>
                                <p class="ticket__text">Место: {{ ticketOwner.place }}</p>
                                <p class="ticket__text">Дата: {{ ticketOwner.date }}</p>
                                <button class="delete__button" @click="cancelTour(ticketOwner.id)">Отменить</button>
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
            items: {},
            currentTab: 0,
            likedData: [],
            tourData: [],
            comparisonData: [],
            ticketsData: [],
            ownerData: [],
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
            this.filter();
        },
        handleImg(img){
            return 'http://localhost:8000/storage/' + img;
        },
        async fetchData(){
            this.tourData = await this.$store.dispatch('GET_TOURS');
            this.likedData = await this.$store.dispatch('GET_LIKEDS');
            this.comparisonData = await this.$store.dispatch('GET_COMPARISONS');
            this.ownerData = await this.$store.dispatch('GET_OWNERS');
            this.ticketsData = await this.$store.dispatch('GET_TICKETS');

            this.filter();
        },

        filter(){
            if(this.currentTab === 1){
                this.items = this.tourData.filter(tour => {
                    return this.likedData.some(liked => liked.tour_id === tour.id);
                });
            }
            if(this.currentTab === 2){
                this.items = this.tourData.filter(tour => {
                    return this.comparisonData.some(comparison => comparison.tour_id === tour.id);
                });
            }
            if(this.currentTab === 3){
                this.items = this.ticketsData.filter(ticket => {
                    return this.ownerData.some(owner => owner.ticket_id === ticket.id);
                });
            }
        },

        filterLikedTours() {
            this.items = this.tourData.filter(tour => {
                return this.likedData.some(liked => liked.tour_id === tour.id);
            });
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
        },
        isLiked(productId) {
            return this.likedData.some(item => item.tour_id === productId);
        },
        async unlikeItem(id) {
            const index = this.likedData.findIndex(item => item.tour_id === id);
            if (index !== -1) {
                const removedItem = this.likedData.splice(index, 1)[0];
                const res = await this.$store.dispatch('REMOVE_LIKE', removedItem.id);
                this.fetchData();
            }
        },
        async cancelTour(id){
            await this.$store.dispatch('REMOVE_TICKET_OWNER', id);
            this.fetchData();
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
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 25px;
    margin-top: 15px;
    color: #FFF;
}
.comparison__item{
    width: 250px;
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
    
    .ticket__item{
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
    .item__label {
        font-weight: bold;
        margin-bottom: 5px;
    }
    .item__text{
        width: 250px;
    }
    .delete__button{
        padding: 5px 0;
        font-size: 16px;
        font-weight: 500;
    }
</style>