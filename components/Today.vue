<template>
  <b-col class="todayCol d-flex no-gutters" cols="12" md="4" xl="3">
    <b-row>
      <b-col class="text-left" cols="8">
        <b-button>Search for places</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button>+</b-button>
      </b-col>

      <b-col class="iconCol text-center d-flex" cols="12">
        <b-img :src="`/${iconName}.png`" class="m-auto"></b-img>
      </b-col>

      <b-col
        class="text-center d-flex justify-content-center align-items-center"
        cols="12"
      >
        <h1 class="temp">
          <span v-for="(num, i) in temp" :key="i" :class="`temp-${i}`">{{
            num
          }}</span
          ><span class="tempDeg">°C</span>
        </h1>
      </b-col>

      <b-col class="text-center" cols="12">
        <h2 class="weatherText">
          {{ weatherObj.consolidated_weather[0].weather_state_name }}
        </h2>
      </b-col>
      <b-row>
        <b-col class="text-center opa-4" align-self="end" cols="12">
          Today .
          {{ new Date().toDateString() }}
        </b-col>
        <b-col class="text-center opa-4" align-self="end">
          {{ weatherObj.title }}
        </b-col>
      </b-row>
    </b-row>
  </b-col>
</template>

<script>
export default {
  props: {
    weatherObj: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },
  computed: {
    iconName() {
      const name = this.weatherObj.consolidated_weather[0].weather_state_name;
      return name.replace(/\s/g, '');
    },
    temp() {
      if (this.weatherObj) {
        const temp = Math.round(
          this.weatherObj.consolidated_weather[0].the_temp
        );
        return '' + temp;
      } else {
        return '15';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todayCol {
  background-color: $clr-blueBack;
  padding: 2rem 0 2rem 0;
  height: 100vh;
}

.temp {
  .temp-0 {
    font-size: 7rem;
    line-height: 144px;
    vertical-align: text-top;
    margin-right: 3px;
  }
  .temp-1 {
    font-size: 7.5rem;
    vertical-align: -78px;
  }
  .tempDeg {
    font-size: 3rem;
    line-height: 144px;
    vertical-align: -70px;
    opacity: 0.6;
  }
}

.weatherText {
  opacity: 0.6;
}

.opa-4 {
  opacity: 0.4;
}

.iconCol {
  padding: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -15%;
    bottom: 0;
    right: 0;
    background: url('/Cloud-background-left.png') no-repeat;
    background-size: contain;
    opacity: 0.1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 70%;
    bottom: 0;
    right: 0;
    background: url('/Cloud-background-right.png') no-repeat;
    background-size: cover;
    opacity: 0.1;
  }
}

@media screen and (min-width: 576px) {
  .iconCol {
    &::before {
      top: 0;
      left: -5%;
      bottom: 0;
      right: 0;
    }
  }
}

@media screen and (min-width: 768px) {
  .iconCol {
    &::before {
      top: 0;
      left: -45%;
      bottom: 0;
      right: 0;
    }
    &::after {
      right: 0;
    }
  }
}

@media screen and (min-width: 992px) {
  .iconCol {
    &::before {
      top: 0;
      left: -25%;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
