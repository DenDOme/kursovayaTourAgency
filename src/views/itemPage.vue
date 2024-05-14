<template>
    <section class="item__wrapper">
        <div class="container">
            <div class="item">
                <div class="item__top">
                    <img src="" alt="" class="item__left">
                    <div class="item__right">
                        <p class="item__text"></p>
                        <p class="item__text"></p>
                        <p class="item__text"></p>
                        <p class="item__text"></p>
                        <p class="item__text"></p>
                    </div>
                </div>
                <p class="item__text-big">

                </p>
                <div class="item__bottom">
                    <h2 class="item__title"></h2>
                    <div class="item__bottom-ticket">
                        <p class="ticket__number"></p>
                        <div class="ticket__row">
                            <p class="ticket__text"></p>
                            <p class="ticket__text"></p>
                        </div>
                        <p class="ticket__text"></p>
                        <button class="ticket__btn">Купить</button>
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
            ticket: {}
        }
    },
    created(){
        this.fetchTour();
    },
    methods: {
        async fetchTour(){
            const id = this.$route.params.id;
            this.ticket = await this.$store.dispatch('GET_ONE_TOUR', id);
        }
    }
}
</script>

<style scoped>
.item__top{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>