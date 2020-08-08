<template>
  <b-col class="nextDaysCol d-flex">
    <b-row>
      <b-col class="text-right" cols="12">
        <b-button pill>°C</b-button>
        <b-button pill>°F</b-button>
      </b-col>

      <b-col v-for="i in 5" :key="i" class="blueBack">
        <p>Date</p>
        <b-img src="~/assets/icons/Thunderstorm.png" fluid></b-img>
      </b-col>

      <b-col cols="12">
        <h1>Today's Hightlights</h1>
      </b-col>
      <b-col v-for="i in 4" :key="i" cols="12" md="6" class="blueBack">
        <p>Things</p>
        <h2>7mph</h2>
      </b-col>
      <Footer />
    </b-row>
  </b-col>
</template>

<script>
import Footer from './Footer'

export default {
  components: {
    Footer,
  },
}
</script>

<style lang="scss" scoped>
.nextDaysCol {
  padding-top: 2rem;
}

.blueBack {
  background-color: $clr-blueBack;
}
</style>
