<template>
    <section class="login__wrapper">
        
        <div class="container">
            <div class="login">
                <h1 class="login__title">Создание отеля</h1>

                <form class="form" @submit.prevent="handleCreateHotel">
                    <div class="form__group">
                        <input type="text" v-model="name" class="form__input" placeholder="Имя">
                        <span v-if="errors.name" class="error-text">{{ errors.name[0] }}</span>
                    </div>
                    <div class="form__group">
                        <input type="text" v-model="address" class="form__input" placeholder="Адресс">
                        <span v-if="errors.address" class="error-text">{{ errors.address[0] }}</span>
                    </div>
                    <div class="form__group">
                        <input type="text" v-model="info" class="form__input" placeholder="Информация">
                        <span v-if="errors.info" class="error-text">{{ errors.info[0] }}</span>
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
        return{
            name: '',
            address: '',
            info: '',
            errors: {}
        }
    },
    methods: {  
        handleCreateHotel(){
            this.errors = {};
            const hotel = {
                name: this.name,
                address: this.address,
                info: this.info
            }
            this.$store.dispatch('ADD_HOTEL',hotel).then(() => {this.$router.go(0)}).catch((err) => {this.errors = err.response.data.errors});
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