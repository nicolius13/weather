<template>
  <b-col
    v-if="index !== 0"
    class="blueBack d-flex flex-column justify-content-around mr-auto ml-auto mt-2 mb-2"
    cols="5"
    md="2"
  >
    <p class="text-center mb-2">
      {{ index === 1 ? 'Tomorrow' : date }}
    </p>
    <b-img
      :src="`/${iconName}.png`"
      class="d-flex mr-auto ml-auto"
      fluid
    ></b-img>
    <div class="d-flex justify-content-around mt-3">
      <p>{{ Math.round(day.max_temp) }}°C</p>
      <p class="min_temp">{{ Math.round(day.min_temp) }}°C</p>
    </div>
  </b-col>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    day: {
      type: Object,
      default: () => {
        return null;
      },
    },
  },
  computed: {
    iconName() {
      const name = this.day.weather_state_name;
      return name.replace(/\s/g, '');
    },
    date() {
      const date = new Date(Date.now() + this.index * 1000 * 60 * 60 * 24);
      const day = date.getDate();
      const weekDay = this.dayOfWeek(date.getDay());
      const month = this.monthOfYear(date.getMonth());
      return `${weekDay}. ${day} ${month}`;
    },
  },
  methods: {
    dayOfWeek(dayIndex) {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex] || '';
    },
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
.blueback {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.min_temp {
  opacity: 0.6;
}
@media screen and (max-width: 1310px) {
  .blueback {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>
