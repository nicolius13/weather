<template>
  <b-sidebar id="sidebar" text-variant="light" shadow>
    <b-form @submit="onSubmit" class="mt-3" inline>
      <b-form-input
        id="cityInput"
        v-model="city"
        @change="validation = null"
        :state="validation"
        type="search"
        placeholder="search location"
      ></b-form-input>
      <b-form-invalid-feedback :state="validation">
        City not found. Try another one.
      </b-form-invalid-feedback>
      <b-button class="submitBtn" type="submit" variant="primary"
        >Search</b-button
      >
    </b-form>
  </b-sidebar>
</template>

<script>
export default {
  data() {
    return {
      city: '',
      validation: null,
      recentSearch: [],
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${this.city}`
        )
        .then(res => {
          // if city is not found
          if (res.data.length === 0) {
            this.validation = false;
          } else {
            this.$emit('citychange', res.data[0].woeid);
          }
        })
        .catch(error => {
          window.alert(error.response);
        });
    },
  },
};
</script>

<style lang="scss">
#sidebar {
  color: $clr-light !important;
  background-color: $clr-blueBack !important;
  padding: 1rem;
  width: 100%;
}

#cityInput {
  background-color: $clr-blueBack;
  color: $clr-light;
  border-radius: 0;
  border: 1px solid $clr-light;
  width: 70%;
}

.submitBtn {
  margin-left: 15px;
}

@media screen and (min-width: 768px) {
  #sidebar {
    width: 40%;
  }
}

@media screen and (min-width: 992px) {
  #sidebar {
    width: 33%;
  }
}

@media screen and (min-width: 1200px) {
  #sidebar {
    width: 25%;
  }
}
</style>
