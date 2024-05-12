<template>
    <footer class="footer">
      <div class="container">
            <div class="footer__menu">
                <router-link to="/" class=""><img src="../assets/imgs/logo.svg" alt="logo" class="footer__logo"></router-link>
                <nav class="footer__menu-nav">
                    <a href="" class="footer__link"><img src="../assets/imgs/instagram.svg" alt=""></a>
                    <a href="" class="footer__link"><img src="../assets/imgs/twitter.svg" alt=""></a>
                    <a href="" class="footer__link"><img src="../assets/imgs/telegram.svg" alt=""></a>
                </nav>
            </div>
        </div>
    </footer>
</template>
  
<script>
export default {
    name: 'footerComponent',
    
};
</script>
  
<style>
.footer{
    background-color: #FFFFFF;
    font-weight: 500;
}

.footer__menu-nav{
    display: flex;
    align-items: center;
    gap: 20px;
}
.footer__menu{
    padding:20px 0 ;
    display:flex;
    align-items:center;
    justify-content: space-between;
}

.footer__menu-nav{
    display: flex;
    align-items: center;
}
</style>
  