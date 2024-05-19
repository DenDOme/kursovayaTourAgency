<template>
    <section class="admin__wrapper">
        <div class="container">
            <div class="admin">
                <router-link class="admin__link" to="/add-country">Добавить страну</router-link>
                <router-link class="admin__link" to="/add-hotel">Добавить отель</router-link>
                <router-link class="admin__link" to="/add-ticket">Добавить билеты</router-link>
                <router-link class="admin__link" to="/add-operator">Добавить тур оператора</router-link>
                <router-link class="admin__link" to="/add-tour">Добавить тур</router-link>
            </div>
        </div>
    </section>
</template>

<script>

</script>

<style scoped>
.admin{
    background-color: #fff;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    gap: 25px;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    margin: 20px 0;
    min-height: calc(100vh - 80px - 80px - 40px);
}

.admin__link{
    color: #232323;
}
</style>