<template>
  <b-col class="todayCol d-flex no-gutters" cols="12" lg="4" xl="3">
    <b-row>
      <!-- BTN -->
      <b-col class="text-left" cols="8">
        <b-button v-b-toggle.sidebar>Search for places</b-button>
        <!-- SIDEBAR -->
        <SearchSidebar @citychange="$emit('citychange', $event)" />
      </b-col>
      <b-col class="text-right">
        <b-button @click="$emit('geoloc')" class="geolocBtn" pill
          ><b-img src="~/assets/icons/location.png"></b-img
        ></b-button>
      </b-col>
      <!-- IMG -->
      <b-col class="iconCol text-center d-flex" cols="12">
        <b-img :src="`/${iconName}.png`" class="m-auto"></b-img>
      </b-col>
      <!-- TEMPERATURE -->
      <b-col
        class="text-center d-flex justify-content-center align-items-center"
        cols="12"
      >
        <h1 class="temp">
          {{ temperature
          }}<span class="tempDeg">{{ tempType === 'cel' ? '°C' : '°F' }}</span>
        </h1>
      </b-col>
      <!-- WEATHER NAME -->
      <b-col class="text-center" cols="12">
        <h2 class="weatherText">
          {{ weatherObj.consolidated_weather[0].weather_state_name }}
        </h2>
      </b-col>
      <!-- DATE -->
      <b-row>
        <b-col class="text-center opa-4" align-self="end" cols="12">
          Today .
          {{ date }}
        </b-col>
        <!-- PLACE -->
        <b-col class="text-center opa-4" align-self="end">
          {{ weatherObj.title }}
        </b-col>
      </b-row>
    </b-row>
  </b-col>
</template>

<script>
import SearchSidebar from './UI/SearchSidebar';
export default {
  components: {
    SearchSidebar,
  },
  props: {
    weatherObj: {
      type: Object,
      default: () => {
        return null;
      },
    },
    tempType: {
      type: String,
      default: 'cel',
    },
  },
  computed: {
    // get the name without the space to use them in src
    iconName() {
      const name = this.weatherObj.consolidated_weather[0].weather_state_name;
      return name.replace(/\s/g, '');
    },
    // get the date format DD. DD MM
    date() {
      const date = new Date();
      const day = date.getDate();
      const weekDay = this.dayOfWeek(date.getDay());
      const month = this.monthOfYear(date.getMonth());
      return `${weekDay}. ${day} ${month}`;
    },
    // temperature convertion if needed
    temperature() {
      const temp = this.weatherObj.consolidated_weather[0].the_temp;
      if (this.tempType === 'far') {
        return Math.round(temp * (9 / 5) + 32);
      }
      return Math.round(temp);
    },
  },
  // get the day of the week
  methods: {
    dayOfWeek(dayIndex) {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex] || '';
    },
    // get the month of the year
    monthOfYear(monthIndex) {
      return (
        [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'June',
          'July',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec',
        ][monthIndex] || ''
      );
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

.geolocBtn {
  padding: 0.5rem;
  line-height: 0;
}

.temp {
  font-size: 7rem;

  .tempDeg {
    font-size: 3rem;
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
      left: -5%;
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
