<template>
  <b-container class="mainContainer" fluid>
    <b-row class="mainRow">
      <Today :weatherObj="weatherObj" @geoloc="getGeoloc" />
      <NextDays :weather="weatherObj.consolidated_weather" />
    </b-row>
  </b-container>
</template>

<script>
import Today from '~/components/Today';
import NextDays from '~/components/NextDays';

export default {
  components: {
    Today,
    NextDays,
  },
  data() {
    return {};
  },

  async asyncData({ $axios }) {
    return await $axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=50.850000,4.350000`
      )
      .then(res => {
        const woeid = res.data[0].woeid;
        return $axios
          .get(
            `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
          )
          .then(res => {
            return { weatherObj: res.data };
          });
      });
  },
  methods: {
    getWeather(lat, lng) {
      this.$axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${lat},${lng}`
        )
        .then(res => {
          const woeid = res.data[0].woeid;
          this.$axios
            .get(
              `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
            )
            .then(res => {
              this.weatherObj = res.data;
            });
        });
    },
    getGeoloc() {
      //  GEOLOC
      // Try HTML geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            // search the area given by the geoloc
            this.getWeather(lat, lng);
          },
          () => {
            // denied geoloc
            this.handleLocationError(true);
          }
        );
      } else {
        // browser don't support geoloc
        this.handleLocationError(false);
      }
    },
    // open a modal if the geoloc is refuse or not supported
    handleLocationError(browserHasGeoloc) {
      if (browserHasGeoloc) {
        window.alert('The Geolocation service failed.');
      } else {
        window.alert("Your browser doesn't support geolocation.");
      }
    },
  },
};
</script>

<style lang="scss"></style>
