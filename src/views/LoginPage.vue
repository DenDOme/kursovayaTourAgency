<template>
    <section class="login__wrapper">
        
        <div class="container">
            <div class="login">
                <h1 class="login__title">Авторизация</h1>
                <form class="form" @submit.prevent="handleLogin">
                    <div class="form__group">
                        <input type="text" v-model="login" class="form__input" placeholder="Логин">
                        <span v-if="errors.login" class="error-text">{{ errors.login[0] }}</span>
                    </div>
                    <div class="form__group">
                        <input type="password" v-model="password" class="form__input" placeholder="Пароль">
                        <span v-if="errors.password" class="error-text">{{ errors.password[0] }}</span>
                        <span v-if="passwordError" class="error-text">{{ passwordError }}</span>
                    </div>
                    <button type="submit" class="form__button">Войти</button>
                </form>
                <div class="login__bottom">
                    <p class="login__text">Нет аккаунта?</p>
                    <router-link to="/register" class="login__link">Зарегистрироваться</router-link>
                </div>
            </div>
        </div>
        
    </section>
</template>

<script>
export default{
    data(){
        return {
            login: '',
            password: '',
            errors: {},
            passwordError: ''
        }
    },
    methods: {
        handleLogin(){
            this.errors = {};
            this.passwordError = '';
            const user = {
                login: this.login,
                password: this.password                
            }
            this.$store.dispatch('LOGIN_USER', user).then(() => {this.$router.push('/')}).catch((err) => {
                if(err.response.data.status === false){
                    this.passwordError = err.response.data.errors
                }
                else{
                    this.errors = err.response.data.errors
                }
            });
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
@media screen and (max-width:420px) {
    .login{
        padding: 31px;
    }
}
</style>