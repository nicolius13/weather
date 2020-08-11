<template>
  <b-sidebar
    id="sidebar"
    v-model="visible"
    @hidden="resetForm"
    text-variant="light"
    shadow
  >
    <b-form
      @submit="onSubmit"
      class="justify-content-between mt-3"
      inline
      novalidate
    >
      <b-input-group class="cityInputGrp align-items-center">
        <b-input-group-prepend>
          <b-icon-search class="lens"></b-icon-search>
        </b-input-group-prepend>
        <b-form-input
          id="cityInput"
          v-model="city"
          @change="validation = null"
          :state="validation"
          :placeholder="`search location`"
          required
          type="search"
        ></b-form-input>
      </b-input-group>
      <b-button class="submitBtn" type="submit" variant="primary" squared
        >Search</b-button
      >
      <b-form-invalid-feedback :state="validation">
        City not found. Try another one.
      </b-form-invalid-feedback>
    </b-form>
    <div
      v-for="result in lastResults"
      :key="result.woeid"
      @click="$emit('citychange', result.woeid)"
      class="searchResult d-flex align-items-center justify-content-between mt-4"
    >
      <span>{{ result.title }}</span>
      <b-icon-chevron-right class="chevron"></b-icon-chevron-right>
    </div>
  </b-sidebar>
</template>

<script>
import { BIconChevronRight, BIconSearch } from 'bootstrap-vue';

export default {
  components: {
    BIconChevronRight,
    BIconSearch,
  },
  data() {
    return {
      visible: false,
      city: '',
      validation: null,
      recentSearch: [
        {
          latt_long: '50.848381,4.349680',
          location_type: 'City',
          title: 'Brussels',
          woeid: 968019,
        },
        {
          latt_long: '13.753330,100.504822',
          location_type: 'City',
          title: 'Bangkok',
          woeid: 1225448,
        },
        {
          latt_long: '51.506321,-0.12714',
          location_type: 'City',
          title: 'London',
          woeid: 44418,
        },
      ],
    };
  },

  computed: {
    // get the last 8 result to show and reverse them to show the last on top
    lastResults() {
      const rev = [];
      rev.push(...this.recentSearch);
      rev.reverse();
      return rev.slice(0, 8);
    },
  },
  // Listen to closing event
  created() {
    this.$nuxt.$on('sidebarclose', $event => {
      this.visible = $event;
    });
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      // make a query for the city
      this.$axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${this.city}`
        )
        .then(res => {
          // if city is not found
          if (res.data.length === 0) {
            this.validation = false;
            // if only 1 city in result =>
            // fetch the weather
            // check if the city is not already present in recentSearch array
            // push the city in the recentSearch array
          } else if (res.data.length === 1) {
            this.$emit('citychange', res.data[0].woeid);
            this.filterCity(res.data);
            this.recentSearch.push(...res.data);
            this.city = '';
            // if more than 1 city =>
            // filter the resultto remove the cities from recentSearch array
            // push the results in the recentSearch array
          } else {
            this.filterCity(res.data);
            this.recentSearch.push(...res.data);
            this.city = '';
          }
        })
        .catch(error => {
          window.alert(error.response);
        });
    },
    filterCity(cities) {
      cities.forEach(city => {
        this.recentSearch = this.recentSearch.filter(
          res => res.woeid !== city.woeid
        );
      });
    },
  },
  resetForm() {
    this.city = '';
    this.validation = null;
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

.cityInputGrp {
  background-color: $clr-blueBack;
  border-radius: 0;
  padding-left: 0.75rem;
  border: 1px solid $clr-light;

  &:focus-within {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .lens {
    opacity: 0.6;
  }

  #cityInput {
    background-color: $clr-blueBack;
    border: none;
    padding: 0.75rem 0.75rem 0.75rem 0.5rem;
    color: $clr-light;
    height: auto;
    width: 70%;

    &:focus {
      box-shadow: none;
    }
  }
}

.submitBtn {
  padding: 0.75rem;
  background-color: #3c47e9;
  border: 1px solid #3c47e9;

  &:hover {
    background-color: #4e58e4;
    border-color: #4e58e4;
  }
}

.searchResult {
  padding: 1rem 0.75rem;
  border: 1px solid transparent;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  .chevron {
    color: #616475;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    border: 1px solid #616475;

    .chevron {
      opacity: 1;
    }
  }
}

@media screen and (min-width: 768px) {
  #sidebar {
    width: 40%;
  }
}

@media screen and (min-width: 992px) {
  #sidebar {
    width: 33.33%;
  }
}

@media screen and (min-width: 1200px) {
  #sidebar {
    width: 25%;
  }
}
</style>
