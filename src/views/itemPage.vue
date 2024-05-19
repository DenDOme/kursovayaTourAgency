<template>
    <section class="item__wrapper">
        <div class="container">
            <div class="item">
                <div class="item__top">
                    <img :src="handleImg(tour.img)" alt="" class="item__left">

                    <div class="item__right">
                        <p class="item__label">Тур:</p>
                        <p class="item__text">{{ tour.route }}</p>

                        <p class="item__label">Страна:</p>
                        <p class="item__text">{{ tour.country_id.name }}</p>

                        <p class="item__label">Виза:</p>
                        <p class="item__text">{{ tour.country_id.vise }}</p>

                        <p class="item__label">Название отеля:</p>
                        <p class="item__text">{{ tour.hotel_id.name }}</p>

                        <p class="item__label">Адрес отеля:</p>
                        <p class="item__text">{{ tour.hotel_id.address }}</p>

                        <p class="item__label">Инфо отеля:</p>
                        <p class="item__text">{{ tour.hotel_id.info }}</p>

                        <p class="item__label">Имя тур оператора:</p>
                        <p class="item__text">{{ tour.tour_operator_id.name }}</p>

                        <p class="item__label">Фамилия тур оператора:</p>
                        <p class="item__text">{{ tour.tour_operator_id.surname }}</p>

                        <p class="item__label">Отчество тур оператора:</p>
                        <p class="item__text">{{ tour.tour_operator_id.patronym }}</p>

                        <p class="item__label">Контакты тур оператора:</p>
                        <p class="item__text">{{ tour.tour_operator_id.contacts }}</p>

                        <button class="item__top-btn" v-if="isCompared(tour.id)" v-show="this.$store.getters.isAuthenticated" @click="addComparison">Сравнить</button>
                        <button class="item__top-btn ticket__cancel" v-else v-show="this.$store.getters.isAuthenticated" @click="removeComparison">Удалить со сравнение</button>
                    </div>
                </div>
                <div class="item__text-big">
                    <p class="item__text-bg">
                        <p class="item__label">Описание:</p>
                        {{ tour.description }}
                    </p>
                </div>
                <div class="item__bottom">
                    <h2 class="item__title">Билеты</h2>
                    <div class="item__bottom-ticket">
                        <p class="ticket__number">Номер билета: {{ tour.ticket_id.id }}</p>
                        <div class="ticket__row">
                            <p class="ticket__text">Название авиакомпании: {{ tour.ticket_id.name }}</p>
                            <p class="ticket__text">Место: {{ tour.ticket_id.place }}</p>
                        </div>
                        <p class="ticket__text">Дата: {{ tour.ticket_id.date }}</p>
                        <button class="ticket__btn" v-if="isBought(tour.ticket_id.id)" v-show="this.$store.getters.isAuthenticated" @click="buyTour(tour.ticket_id.id)">Купить</button>
                        <button class="ticket__btn ticket__cancel" v-else v-show="this.$store.getters.isAuthenticated" @click="cancelTour(tour.ticket_id.id)">Отменить</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default{
    data(){
        return{
            tour: {},
            comparison: {},
            owner: {},
            id: this.$route.params.id
        }
    },
    created(){
        this.fetchData();
    },
    methods: {
        async fetchData(){
            this.tour = await this.$store.dispatch('GET_ONE_TOUR', this.id);
            this.comparison = await this.$store.dispatch('GET_ONE_COMPARISON', this.id);
            const id = this.tour.ticket_id.id;
            this.owner = await this.$store.dispatch('GET_ONE_OWNER', id);
        },
        handleImg(img){
            return 'http://localhost:8000/storage/' + img;
        },
        isCompared(id){
            return this.comparison.tour_id !== id;
        },
        isBought(id){
            return this.owner.ticket_id !== id;
        },
        async addComparison(){
            await this.$store.dispatch('ADD_COMPARISON', this.id);
            this.fetchData();
        },
        async removeComparison(){
            await this.$store.dispatch('REMOVE_COMPARISON', this.id);
            this.fetchData();
        },
        async buyTour(id){
            await this.$store.dispatch('ADD_TICKET_OWNER', id);
            this.fetchData();
        },
        async cancelTour(id){
            await this.$store.dispatch('REMOVE_TICKET_OWNER', id);
            this.fetchData();
        }
    }
}
</script>

<style scoped>
.item__top-btn{
    width: 100%;
    background-color: #FF6F32;
    color: #fff;
    margin-top: 10px;
    padding: 5px 0;
    font-size: 16px;
    font-weight: medium;
}

.ticket__btn{
    margin-top: 20px;
    padding: 10px 0;
    width: 100%;
    background-color: #FF6F32;
    color: #fff;
    font-size: 20px;
}

.ticket__cancel{
    background-color: #bbbbbb;
    color: #000;
}

.ticket__number{
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
}

.ticket__row{
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
}

.item__bottom{
    background-color: #232323;
    margin-top: 20px;
    padding: 20px 35px;
}

.item__bottom-ticket{
    font-size: 20px;
    font-weight: medium;
    background-color: #fff;
    padding: 10px 20px;
}

.item__title{
    text-align: center;
    color: #fff;
    font-size: 26px;
    font-weight: bold;
}

.item__text-title{
    font-size: 20px;
    color: #000;
    margin-bottom: 10px;
    font-weight: medium;
}

.item__text-big{
    margin-top: 20px;
    background: #232323;
    padding: 20px 35px;
}

.item__text-bg{
    background-color: #fff;
    padding: 5px 10px;
    font-size: 16px;
}

.item{
    background-color: #fff;
    padding: 35px;
    margin: 50px 0 ;
}

.item__top{
    display: flex;
    justify-content: space-between;
    align-items: start;
}

.item__right{
    background-color: #D9D9D9;
    max-width: 400px;
    width: 100%;
    padding: 50px;
}

.item__left{
    width: 100%;
    max-width: 400px;
}

.item__label {
    font-weight: bold;
    margin-bottom: 5px;
}
</style>
