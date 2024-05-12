<template>
    <header class="header">
      <div class="container">
            <div class="header__menu">
                <router-link to="/" class=""><img src="../assets/imgs/logo.svg" alt="logo" class="header__logo"></router-link>
                <nav class="header__menu-nav">
                    <router-link to="/" class="header__link">home</router-link>
                    <router-link to="/catalog" class="header__link">catalog</router-link>
                    <router-link v-if="UserAuthed" to="/profile" class="header__link header__link-rounded"><img src="../assets/imgs/profile.svg" alt=""></router-link>
                    <button v-if="UserAuthed" @click="handleLogout" class="header__link header__link-rounded header__link-exit"><img src="../assets/imgs/exit.svg" alt=""></button>
                    <router-link v-if="!UserAuthed" to="/login" class="header__link header__link-rounded header__link-login"><img src="../assets/imgs/login.svg" alt=""></router-link>
                </nav>
            </div>
        </div>
    </header>
</template>
  
<script>
export default {
    name: 'headerComponent',
    data(){
        return{
            UserAuthed: null,
        }
    },
    computed:{
        UserAuthed(){
            return this.$store.getters.isAuthenticated
        },
    },
    methods: {
        handleLogout(){
            this.$store.dispatch('LOGOUT_USER').then(() => this.$router.push('/')).catch((err) => {console.error(err)});
        }
    }
};
</script>
  
<style>
.header{
    background-color: #FFFFFF;
    font-weight: 500;
}

.header__link{
    font-size: 20px;
    color: #232323;
}
.header__link-exit, .header__link-login{
    position: relative;
}
.header__link-exit img{
    position: absolute;
    left: 2px;
    transform: translateX(50%);
}
.header__link-login img{
    position: absolute;
    right: 2px;
    transform: translateX(-50%);
}

.header__link-rounded{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 30px;
    background-color: #232323;
}
.header__menu-nav{
    display: flex;
    align-items: center;
    gap: 20px;
}
.header__menu{
    padding:20px 0 ;
    display:flex;
    align-items:center;
    justify-content: space-between;
}

.header__menu-nav{
    display: flex;
    align-items: center;

}
</style>
  