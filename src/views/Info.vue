<template>

<v-container class="main-content">
      <v-row class="text-center">
        <v-col cols="12" class="pt-0 pb-0">
          <v-img
            :src="require('../assets/clock.png')"
            class="clock-img mb-5"
            contain
          />

        <h4>Questa è un mero esercizio sull'utilizzo di <span class="vuetify-text">Vuetify</span>.</h4>
            <p>L'algoritmo traduce l'ora espressa in numeri in una stringa di testo in lingua inglese.</p>
            <p>L'applicazione si appoggia su di uno scaffold di Vue CLI 4.x ed utilizza minimamente vue-router.</p>
        </v-col>

        <v-col cols="12" class="pt-0 pb-0">
          <BackButton/>
        </v-col>


      </v-row>
</v-container>
</template>


<script>
import BackButton from "@/components/BackButton.vue";

export default {
    name: "Info",
    components: {
        BackButton
    }
};
</script>

<style lang="scss" scoped>
@import "../sass/app.scss";

// .info {
//     background-image: #{$bcg-app-color};
// }
.vuetify-text {
    font-weight: bold;
    color: red;
}
</style>
