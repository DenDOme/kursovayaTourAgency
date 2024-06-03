<template>
    <header class="header">
      <div class="container">
            <div class="header__menu">
                <router-link to="/" class=""><img src="../assets/imgs/logo.svg" alt="logo" class="header__logo"></router-link>
                <nav class="header__menu-nav" :class="{ 'active': isMenuOpen }">
                    <router-link @click="toggleMenu" to="/" class="header__link">home</router-link>
                    <router-link @click="toggleMenu" to="/catalog" class="header__link">catalog</router-link>
                    <router-link @click="toggleMenu" v-if="UserAuthed" to="/profile" class="header__link header__link-rounded"><img src="../assets/imgs/profile.svg" alt=""></router-link>
                    <button v-if="UserAuthed" @click="handleLogout" class="header__link header__link-rounded header__link-exit"><img src="../assets/imgs/exit.svg" alt=""></button>
                    <router-link @click="toggleMenu" v-if="!UserAuthed" to="/login" class="header__link header__link-rounded header__link-login"><img src="../assets/imgs/login.svg" alt=""></router-link>
                </nav>
                <div class="burger-menu" @click="toggleMenu">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
        </div>
    </header>
</template>
  
<script>
export default {
    name: 'headerComponent',
    data(){
        return{
            isMenuOpen: false
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
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
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
.burger-menu {
    display: none; 
    cursor: pointer;
    position: relative; 
    z-index: 1001; 
}

.burger-menu .bar {
    width: 25px;
    height: 3px;
    background-color: #000000;
    margin: 5px 0;
    transition: 0.4s;
}


@media screen and (max-width:600px) {
    .burger-menu {
        display: block;
    }
    .header__logo{
        max-width: 150px;
    }
    .header__link{
        font-size: 16px;
    }
    .header__menu-nav {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background-color: #333;
        padding: 20px;
        z-index: 1000;
    }

    .header__menu-nav.active {
        display: flex;
    }

    .header__menu-nav a {
        color: #d9d9d9;
    }
}
</style>
  