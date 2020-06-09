<template>      
    <v-app-bar
        app
        color="red"
        dark
        height="56"
        >
        <div class="d-flex align-center flex-grow-1 justify-space-between">
            <router-link to="/">
                <v-img
                alt="uk flag"
                class="shrink mr-4"
                contain
                src="@/assets/vuetify_logo.svg"
                transition="scale-transition"
                width="40"
                />
            </router-link>

            <h1>Vuetify-Clock</h1>

            <router-link class="my-link" to="/info"><h5 class="ml-5">Info</h5></router-link>

        </div>
    </v-app-bar>
</template>  


<style lang="scss" scoped>
@import "@/sass/app.scss";
</style>
