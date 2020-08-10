<template>
  <b-col class="nextDaysCol d-flex">
    <b-row>
      <b-col class="text-right" cols="12">
        <b-button pill>°C</b-button>
        <b-button pill>°F</b-button>
      </b-col>

      <b-row class="mt-3 justify-content-center">
        <DaysPrevisions
          v-for="(day, i) in weather"
          :key="i"
          :day="day"
          :index="i"
        />
      </b-row>

      <b-col class="mt-4 mb-4" align-self="center" cols="12">
        <h1>Today's Hightlights</h1>
      </b-col>
      <!-- WIND STATUS -->
      <b-col
        cols="12"
        md="5"
        class="blueBack d-flex flex-column justify-content-around mt-2 mb-2 mr-auto ml-auto"
      >
        <p class="text-center">Wind status</p>
        <h2 class="text-center">
          <span class="numbers">{{ Math.round(weather[0].wind_speed) }}</span
          >mph
        </h2>
        <div
          class=" d-flex justify-content-center align-items-center text-center mt-2"
        >
          <b-badge :style="direction" class="windDirection mr-2" pill
            ><b-img src="~/assets/icons/nav_arrow.svg"></b-img
          ></b-badge>
          <p>{{ weather[0].wind_direction_compass }}</p>
        </div>
      </b-col>
      <!-- HUMIDITY -->
      <b-col
        cols="12"
        md="5"
        class="blueBack d-flex flex-column justify-content-around mt-2 mb-2 mr-auto ml-auto"
      >
        <p class="text-center">Humidity</p>
        <h2 class="text-center">
          <span class="numbers">{{ weather[0].humidity }}</span
          >%
        </h2>
        <div class="humidityProgress d-flex flex-column mr-auto ml-auto mt-2">
          <div class="barNotation d-flex justify-content-between">
            <span>0</span>
            <span class="middle">50</span>
            <span>100</span>
          </div>
          <b-progress :value="50" max="100"></b-progress>
          <span class="barNotation text-right">%</span>
        </div>
      </b-col>
      <!-- VISIBILITY -->
      <b-col
        cols="12"
        md="5"
        class="blueBack d-flex flex-column justify-content-around mt-2 mb-2 mr-auto ml-auto"
      >
        <p class="text-center">Visibility</p>
        <h2 class="text-center">
          <span class="numbers">{{
            Math.round(weather[0].visibility * 10) / 10
          }}</span>
          miles
        </h2>
      </b-col>
      <!-- AIR PRESSURE -->
      <b-col
        cols="12"
        md="5"
        class="blueBack d-flex flex-column justify-content-around mt-2 mb-2 mr-auto ml-auto"
      >
        <p class="text-center">Air Pressure</p>
        <h2 class="text-center">
          <span class="numbers">{{ weather[0].air_pressure }}</span>
          mb
        </h2>
      </b-col>

      <Footer />
    </b-row>
  </b-col>
</template>

<script>
import DaysPrevisions from './UI/DaysPrevisions';
import Footer from './Footer';

export default {
  components: {
    DaysPrevisions,
    Footer,
  },
  props: {
    weather: {
      type: Array,
      default: () => {
        return null;
      },
    },
  },
  computed: {
    direction() {
      return { transform: `rotate(${this.weather[0].wind_direction}deg)` };
    },
  },
};
</script>

<style lang="scss" scoped>
.nextDaysCol {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.numbers {
  font-size: 4rem;
  font-weight: 700;
}

.windDirection {
  padding: 0.3rem;
}

.humidityProgress {
  width: 100%;
  max-width: 400px;
}
.barNotation {
  font-size: 0.8rem;
  opacity: 0.6;

  .middle {
    margin-left: 7px;
  }
}
</style>
