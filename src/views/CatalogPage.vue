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
                    <select @change="handleFilter" class="form__input form__select" v-model="selectedCountry" name="" id="">
                        <option value="" >Страна</option>
                        <option v-for="country in filterCountry" :key="country.id" :value="country.id">{{ country.name }}</option>
                    </select>
                    <select @change="handleFilter" class="form__input form__select" v-model="selectedTicket" name="" id="">
                        <option value="" >Билет</option>
                        <option v-for="ticket in filterTicket" :key="ticket.id" :value="ticket.id">{{ ticket.name }}</option>
                    </select>
                    <select @change="handleFilter" class="form__input form__select" v-model="selectedOperator" name="" id="">
                        <option value="" >Тур Оператор</option>
                        <option v-for="operator in filterOperator" :key="operator.id" :value="operator.id">{{ operator.name }}</option>
                    </select>
                    <select @change="handleFilter" class="form__input form__select" v-model="selectedHotel" name="" id="">
                        <option value="" >Отель</option>
                        <option v-for="hotel in filterHotel" :key="hotel.id" :value="hotel.id">{{ hotel.name }}</option>
                    </select>
                </div>
            </form>

            <div class="catalog__wrapper">
                <div class="catalog__items">
                    <div v-for="product in filteredProducts" :key="product.id" class="item">
                        <img :src="handleImgRender(product.img)" :alt="product.route" class="item__img">
                        <div class="text__row">
                            <div class="text__left">
                                <h2 class="text__left-title">{{ product.route }}</h2>
                                <p class="text__left-county">{{ product.country_id.name }}</p>
                            </div>
                            <div class="text__right">
                                <button @click="unlikeItem(product.id)" v-show="this.$store.getters.isAuthenticated" v-if="isLiked(product.id)" class="like"><img src="../assets/imgs/heart.svg" alt=""></button>
                                <button @click="likeItem(product.id)" v-show="this.$store.getters.isAuthenticated" v-else class="like"><img src="../assets/imgs/heart-active.svg" alt=""></button>
                                <router-link class="catalog__link" :to="'/catalog/'+ product.id">купить</router-link>
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
            search: '',
            products: [],
            filteredProducts: [],
            likeds: [],
            filterCountry: [],
            selectedCountry: '',
            filterOperator: [],
            selectedOperator: '',
            filterHotel: [],
            selectedHotel: '',
            filterTicket: [],
            selectedTicket: '',
        }
    },
    created(){
        this.fetchData();
        this.fetchLiked();
        this.fetchCatalog();
    },
    methods: {
        async fetchCatalog(){
            const res = await this.$store.dispatch('GET_TOURS');
            this.products = res
            this.filteredProducts = this.products
        },
        async fetchLiked(){
            const res = await this.$store.dispatch('GET_LIKEDS');
            this.likeds = res
        },
        handleImgRender(img){
            return 'http://localhost:8000/storage/' + img
        },
        isLiked(productId) {
            return this.likeds.some(item => item.tour_id === productId);
        },
        async likeItem(id){
            const res = await this.$store.dispatch('ADD_LIKE', id);
            this.fetchLiked();
        },
        async unlikeItem(id){
            const index = this.likeds.findIndex(item => item.tour_id === id);
            if (index !== -1) {
                const removedItem = this.likeds.splice(index, 1)[0];
                const res = await this.$store.dispatch('REMOVE_LIKE', removedItem.id);
                await this.fetchLiked();
            }
        },
        async handleSearch(){
            const text = typeof this.search === 'string' ? this.search : '';
            const res = await this.$store.dispatch('SEARCH_PRODUCT', text);
            this.products = res;
            this.filteredProducts = this.products
        },
        async handleFilter(){
            let filtered = this.products;

            if (this.selectedCountry !== '') {
                filtered = filtered.filter(product => product.country_id.id === parseInt(this.selectedCountry));
            }

            if (this.selectedTicket !== '') {
                filtered = filtered.filter(product => product.ticket_id.id === parseInt(this.selectedTicket));
            }

            if (this.selectedOperator !== '') {
                filtered = filtered.filter(product => product.tour_operator_id.id === parseInt(this.selectedOperator));
            }

            if (this.selectedHotel !== '') {
                filtered = filtered.filter(product => product.hotel_id.id === parseInt(this.selectedHotel));
            }

            this.filteredProducts = filtered;
        },
        async fetchData(){
            this.filterCountry = await this.$store.dispatch('GET_COUNTRY');
            this.filterHotel = await this.$store.dispatch('GET_HOTEL');
            this.filterTicket = await this.$store.dispatch('GET_TICKET');
            this.filterOperator = await this.$store.dispatch('GET_OPERATOR');
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
.catalog__filter-inputs select{
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