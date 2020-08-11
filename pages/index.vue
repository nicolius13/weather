<template>
  <b-container class="mainContainer" fluid>
    <b-row class="mainRow">
      <b-col class="todayCol d-flex no-gutters" cols="12" lg="4" xl="3">
        <Today
          v-if="!pending"
          :weatherObj="weatherObj"
          :tempType="tempType"
          @geoloc="getGeoloc"
          @citychange="getWeather($event)"
        />
        <div
          v-if="pending"
          class="d-flex align-items-center justify-content-center w-100"
        >
          <b-spinner class="spin"></b-spinner>
        </div>
      </b-col>
      <b-col ref="nextDayCol" class="nextDaysCol d-flex">
        <NextDays
          v-if="!pending"
          :weather="weatherObj.consolidated_weather"
          @tempconvertion="tempType = $event"
        />
        <div
          v-if="pending"
          class="d-flex align-items-center justify-content-center w-100"
        >
          <b-spinner class="spin"></b-spinner>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// OFFLINE TESTING
// import obj from '../static/obj';

import Today from '~/components/Today';
import NextDays from '~/components/NextDays';

export default {
  components: {
    Today,
    NextDays,
  },
  data() {
    return {
      tempType: 'cel',
      weatherObj: null,
      pending: true,
      currentCity: null,
    };
  },

  // OFFLINE TESTING
  // created() {
  // this.weatherObj = obj.obj;
  // },

  mounted() {
    this.getGeoloc(true);
  },

  methods: {
    // Get the weather infos with a lat and long
    getWoeid(lat, lng, load = true) {
      if (load) {
        // Start laoding
        this.$nuxt.$loading.start();
      }
      // first get the woeid
      this.$axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${lat},${lng}`
        )
        .then(res => {
          // then get the weather infos
          const woeid = res.data[0].woeid;
          this.getWeather(woeid);
        })
        .catch(error => {
          window.alert(error.response);
        });
    },

    // ask for the geolocalisation
    getGeoloc(start = false) {
      if (!start) {
        // Start laoding
        this.$nuxt.$loading.start();
      }
      //  GEOLOC
      // Try HTML geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            // search the area given by the geoloc
            this.getWoeid(lat, lng, false);
          },
          () => {
            // denied geoloc
            this.handleLocationError(true);
            // if it's at start-up and fail => get brussels weather
            if (start) {
              this.getWeather(968019);
            }
          }
        );
      } else {
        // browser don't support geoloc
        this.handleLocationError(false);
        // if it's at start-up and fail => get brussels weather
        if (start) {
          this.getWeather(968019);
        }
      }
    },

    // open a modal if the geoloc is refuse or not supported
    handleLocationError(browserHasGeoloc) {
      if (browserHasGeoloc) {
        window.alert(
          "The Geolocation service failed. You can search for specific cities by clicking 'Search for places' button."
        );
      } else {
        window.alert(
          "Your browser doesn't support geolocation. You can search for specific cities by clicking 'Search for places' button."
        );
      }
    },

    // get the weather infos with the woeid
    getWeather(id) {
      if (id === this.currentCity) {
        return;
      }
      this.$axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`
        )
        .then(res => {
          // emit an event to close the sidebar
          if (this.currentCity !== null) {
            this.$nuxt.$emit('sidebarclose', false);
          }
          this.weatherObj = res.data;
          this.currentCity = res.data.woeid;
          this.pending = false;
          // Finish the loading
          this.$nuxt.$loading.finish();
        })
        .catch(error => {
          window.alert(error.response);
        });
    },
  },
};
</script>

<style lang="scss">
.nextDaysCol {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.todayCol {
  background-color: $clr-blueBack;
  padding: 2rem 0 2rem 0;
}

.spin {
  width: 4rem;
  height: 4rem;
  border-width: 0.5rem;
}
</style>
