<template>
  <b-container class="mainContainer" fluid>
    <b-row class="mainRow">
      <Today :weatherObj="weatherObj" />
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
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=17.395548,104.803526`
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
};
</script>

<style lang="scss"></style>
