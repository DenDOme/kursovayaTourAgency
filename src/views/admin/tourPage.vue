<template>
    <section class="login__wrapper">
        
        <div class="container">
            <div class="login">
                <h1 class="login__title">Создание тура</h1>
                <form class="form" @submit.prevent="handleCreateTour">
                    <div class="form__group">
                        <select class="form__input form__select" v-model="selectedCountry" name="" id="">
                            <option value="" >Страна</option>
                            <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}</option>
                        </select>
                        <span v-if="errors.country_id" class="error-text">{{ errors.country_id[0]}}</span>
                    </div>
                    <div class="form__group">
                        <select class="form__input form__select" v-model="selectedTicket" name="" id="">
                            <option value="" >Билет</option>
                            <option v-for="ticket in tickets" :key="ticket.id" :value="ticket.id">{{ ticket.name }}</option>
                        </select>
                        <span v-if="errors.ticket_id" class="error-text">{{ errors.ticket_id[0]}}</span>
                    </div>
                    <div class="form__group">
                        <input type="text" v-model="route" class="form__input" placeholder="Маршрут">
                        <span v-if="errors.route" class="error-text">{{ errors.route[0]}}</span>
                    </div>
                    <div class="form__group">
                        <input type="text" v-model="description" class="form__input" placeholder="Описание">
                        <span v-if="errors.description" class="error-text">{{ errors.description[0]}}</span>
                    </div>
                    <div class="form__group">
                        <select class="form__input form__select" v-model="selectedOperator" name="" id="">
                            <option value="" >Тур Оператор</option>
                            <option v-for="operator in tourOperators" :key="operator.id" :value="operator.id">{{ operator.name }}</option>
                        </select>
                        <span v-if="errors.tour_operator_id" class="error-text">{{ errors.tour_operator_id[0]}}</span>
                    </div>
                    <div class="form__group">
                        <select class="form__input form__select" v-model="selectedHotel" name="" id="">
                            <option value="" >Отель</option>
                            <option v-for="hotel in hotels" :key="hotel.id" :value="hotel.id">{{ hotel.name }}</option>
                        </select>
                        <span v-if="errors.hotel_id" class="error-text">{{ errors.hotel_id[0]}}</span>
                    </div>                    
                    <div class="form__group">
                        <input type="file" ref="fileInput" @change="handleFileUpload">
                        <span v-if="errors.img" class="error-text">{{ errors.img[0]}}</span>
                    </div>
                    <button type="submit" class="form__button">Создать</button>
                </form>
                
            </div>
        </div>
        
    </section>
</template>

<script>
export default{
    data(){
        return {
            route: '',
            description: '',
            countries: [],
            selectedCountry: '',
            tickets: [],
            selectedTicket: '',
            tourOperators: [],
            selectedOperator: '',
            hotels: [],
            selectedHotel: '',
            imageFile: null,
            errors: {},
        }
    },
    created(){
        this.fetchData();
    },
    methods:{
        async fetchData(){
            this.countries = await this.$store.dispatch('GET_COUNTRIES');
            this.tickets = await this.$store.dispatch('GET_TICKETS');
            this.hotels = await this.$store.dispatch('GET_HOTELS');
            this.tourOperators = await this.$store.dispatch('GET_TOUROPERATORS');
        },
        handleFileUpload(event) {
            this.imageFile = event.target.files[0];
        },
        handleCreateTour(){
            this.errors = {};
            const formData = new FormData();
            formData.append('country_id', this.selectedCountry);
            formData.append('route', this.route);
            formData.append('ticket_id', this.selectedTicket);
            formData.append('description', this.description);
            formData.append('tour_operator_id', this.selectedOperator);
            formData.append('hotel_id', this.selectedHotel);
            formData.append('img', this.imageFile);
            this.$store.dispatch('ADD_TOUR',formData).then(() => {this.$router.go(0)}).catch((err) => {this.errors = err.response.data.errors});
        }
    }
}

</script>

<style scoped>
    .login__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 80px - 80px);
    }
    .login{
        max-width: 450px;
        width: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: start;
        padding: 62px;
    }
    .login__title{
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
        margin-top: 30px;
        padding: 5px 0;
    }

    .form__input::placeholder {
        color: #B0B0B0;
    }
    .login__bottom{
        margin-top: 20px ;
        width: 100%;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .login__link{
        color: #0C73FE;
    }
</style>