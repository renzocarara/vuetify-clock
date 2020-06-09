<template>
  <span>

      <div class="my-2">
        <v-btn color="red" class="my-button" @click="goBack">Torna indietro</v-btn>
      </div>
  </span>
</template>

<script>
export default {
    name: "BackButton",
    methods: {
        goBack() {
            // vado indietro di 1 "pagina"
            return this.$router.go(-1);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/sass/app.scss";
</style>
