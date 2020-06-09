<template>      
    <v-app-bar
        app
        color="red"
        dark
        height="56"
        >
        <div class="d-flex align-center flex-grow-1 justify-space-between">
            <v-img
            alt="uk flag"
            class="shrink mr-4 img-rounded"
            contain
            src="@/assets/en.svg"
            transition="scale-transition"
            width="40"
            />

            <h1>Vuetify-Clock</h1>

            <router-link class="my-link" to="/info"><h5 class="ml-5">Info</h5></router-link>

        </div>
    </v-app-bar>
</template>  


<style lang="scss" scoped>
@import "@/sass/app.scss";

// questa puo' servire nella AppBar style
#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
