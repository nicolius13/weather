<template>
  <b-container class="mainContainer" fluid>
    <b-row class="mainRow">
      <Today />
      <NextDays />
    </b-row>
  </b-container>
</template>

<script>
import Today from '~/components/Today'
import NextDays from '~/components/NextDays'

export default {
  components: {
    Today,
    NextDays,
  },
}
</script>

<style lang="scss"></style>
