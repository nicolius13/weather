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
      <p>{{ convertTemp(day.max_temp) }}{{ tempSign }}</p>
      <p class="min_temp">{{ convertTemp(day.min_temp) }}{{ tempSign }}</p>
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
    tempType: {
      type: String,
      default: 'cel',
    },
  },
  computed: {
    // get the name without the space to use them in src
    iconName() {
      const name = this.day.weather_state_name;
      return name.replace(/\s/g, '');
    },
    // get the date format DD. DD MM
    date() {
      const date = new Date(Date.now() + this.index * 1000 * 60 * 60 * 24);
      const day = date.getDate();
      const weekDay = this.dayOfWeek(date.getDay());
      const month = this.monthOfYear(date.getMonth());
      return `${weekDay}. ${day} ${month}`;
    },
    // change temperature sign if needed
    tempSign() {
      if (this.tempType === 'far') {
        return '°F';
      } else {
        return '°C';
      }
    },
  },
  methods: {
    // get the day of the week
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
    // temperature convertion if needed
    convertTemp(temp) {
      if (this.tempType === 'far') {
        return Math.round(temp * (9 / 5) + 32);
      } else {
        return Math.round(temp);
      }
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
