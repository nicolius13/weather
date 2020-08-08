<template>
  <b-col class="nextDaysCol d-flex">
    <b-row>
      <b-col class="text-right" cols="12">
        <b-button pill>°C</b-button>
        <b-button pill>°F</b-button>
      </b-col>

      <b-row class="mt-3 justify-content-center">
        <DaysPrevisions v-for="i in 5" :key="i" />
      </b-row>

      <b-col class="mt-4 mb-4" align-self="center" cols="12">
        <h1>Today's Hightlights</h1>
      </b-col>
      <b-col
        v-for="i in 4"
        :key="i"
        cols="12"
        md="5"
        class="blueBack d-flex flex-column justify-content-around mt-2 mb-2 mr-auto ml-auto"
      >
        <p class="text-center">Things</p>
        <h2 class="text-center"><span class="miles">7</span>mph</h2>
      </b-col>
      <Footer />
    </b-row>
  </b-col>
</template>

<script>
import DaysPrevisions from './UI/DaysPrevisions'
import Footer from './Footer'

export default {
  components: {
    DaysPrevisions,
    Footer,
  },
}
</script>

<style lang="scss" scoped>
.nextDaysCol {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.miles {
  font-size: 4rem;
}
</style>
