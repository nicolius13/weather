<template>
  <b-container class="mainContainer" fluid>
    <b-row class="mainRow">
      <Today :weatherObj="weatherObj" />
      <NextDays />
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
    return {
      weatherObj: null,
    };
  },

  created() {
    this.$axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=17.395548,104.803526`
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
};
</script>

<style lang="scss"></style>
