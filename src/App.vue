<template>
    <v-app> <!-- NOTA: il tag "v-app" è OBBLIGATORIO e deve racchiudere tutti gli altri componenti di Vuetify -->
        <AppBar/> 
        <v-content>
            <transition name="fade" mode="out-in" appear>
                <router-view/>
            </transition>
        </v-content>
        <MyFooter/>
    </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
import MyFooter from "@/components/MyFooter.vue";

export default {
    name: "App",
    components: {
        AppBar,
        MyFooter
    }
};
</script>


<style lang="scss" scoped>
@import "@/sass/app.scss";

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    background-image: url("assets/en_bcg.png");
    background-color: $white-color;
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
