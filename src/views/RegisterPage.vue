<template>
    <div class="register__wrapper">
        <div class="container">
            <div class="register">
                <h1 class="register__title">Регистрация</h1>
                <form class="form" @submit.prevent="handleRegister">
                    <div class="form__row">
                        <input type="text" v-model="surname" class="form__input form__input-small" placeholder="Фамилия">
                        <input type="text" v-model="name" class="form__input form__input-small" placeholder="Имя">
                    </div>
                    <input type="text" v-model="patronym" class="form__input" placeholder="Отчество">
                    <input type="text" v-model="login" class="form__input" placeholder="Логин">
                    <input type="password" v-model="password" class="form__input" placeholder="Пароль">
                    <button type="submit" class="form__button">Регистрировать</button>
                </form>
                <div class="register__bottom">
                    <p class="register__text">Есть аккаунта?</p>
                    <router-link to="/login" class="register__link">Авторизоваться</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            surname : '',
            name: '',
            patronym: '',
            login: '',
            password: ''
        }
    },
    methods: {
        handleRegister(){
            const data = {
                surname : this.surname,
                name: this.name,
                patronym: this.patronym,
                login: this.login,
                password: this.password
            }
            this.$store.dispatch('REGISTER_USER', data).then(() => {this.$router.push('/')}).catch(() => {console.error(err)});
        }
    }
}
</script>

<style scoped>
    .register__wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 80px - 80px);
    }
    .register{
        max-width: 450px;
        width: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: start;
        padding: 62px;
    }
    .register__title{
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
    .register__bottom{
        margin-top: 20px ;
        max-width: 320px;
        width: 100%;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .register__link{
        color: #0C73FE;
    }
@media screen and (max-width:500px) {
    .form__input{
        font-size: 20px;
    }
}
@media screen and (max-width:420px) {
    .register{
        margin: 20px 0;
        padding: 31px;
    }
}
</style>