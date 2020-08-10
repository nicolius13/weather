<template>
  <b-col
    class="blueBack d-flex flex-column justify-content-around mr-auto ml-auto mt-2 mb-2"
    cols="5"
    md="2"
  >
    <p class="text-center mb-2">Date</p>
    <b-img class="d-flex mr-auto ml-auto" src="/Thunderstorm.png" fluid></b-img>
    <div class="d-flex justify-content-around mt-3">
      <p><span>1</span><span>6°C</span></p>
      <p><span>1</span><span>1°C</span></p>
    </div>
  </b-col>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.blueback {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
@media screen and (max-width: 1310px) {
  .blueback {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>
