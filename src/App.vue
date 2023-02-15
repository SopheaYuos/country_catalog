<script>

import FuzzySearch from "fuzzy-search";
import axios from "axios";
export default {
  data() {
    return {
      data: [],
      fuse: null,
      search: "",
      results: "",
      noResults: "",
    };
  },
  computed: {
   
  },
  watch: {
     
  },

  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData: function() {
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((res) => {
          this.data = res.data;
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
     fuzzySearch: function() {
      console.log("herer")
      if (this.search === "") return this.fetchData();
      const searcher = new FuzzySearch(this.data, ["name.official"]);
      const result = searcher.search(this.search);
      this.data = result;
      console.log(result, "result");
      return result;
    },
  },
 
};
</script>

<template>
  <div>
      <section>
          <label
          for="default-search"
          class="m-2 text-sm font-medium text-gray-100 sr-only text-white"
          >Search</label
          >
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            v-model="search"
            @keyup="fuzzySearch"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none max-w-lg"
            placeholder="Search Country Name..."
            required
          />
        </div>
      </section>


    <div class="flex">
      <button
        class="m-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="orderedUsers"
      >
        Sort ASC
      </button>
      <button
        class="m-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="orderedUsers"
      >
        Sort DESC
      </button>
    </div>
    <span v-if="data.length == 0">
      <div
        class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 bg-gray-800 text-blue-400"
        role="alert"
      >
        <svg
          aria-hidden="true"
          class="flex-shrink-0 inline w-5 h-5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          ></path>
        </svg>

        <div>
          <span class="font-medium">No searching matches!</span>
        </div>
      </div>
    </span>
    <div class="flex justify-center inline-flex" v-for="d in data" :key="d.name.common">
      <div class="ml-4 block p-6 rounded-lg shadow-lg bg-grey max-w-sm mr-2">
        <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
          <img class="h-16" :src="`${d.flags.png}`" alt="" />
        </h5>
        <p class="text-gray-700 text-base w-44">Official: {{ d.name.official }}</p>
        <p class="text-gray-700 text-base mb-4 w-44">
          Native: {{ d.name.nativeName + d.languages?.official }}
        </p>
        <p class="text-gray-700 text-base mb-4 w-44">
          Alternative Country Name: {{ d.altSpellings[0] }}
        </p>
        <p class="text-gray-700 text-base mb-4 w-44">
          Calling Codes: {{ d.idd.root + d.idd.suffixes }}
        </p>

        <p>2 Country Code: {{ d.cca2 }}</p>
        <p>3 Country Code:{{ d.cca3 }}</p>
        <button
          data-modal-target="popup-modal"
          data-modal-toggle="popup-modal"
          class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Toggle modal
        </button>
      </div>
      <div
        id="popup-modal"
        tabindex="-1"
        class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
      >
        <div class="relative w-full h-full max-w-md md:h-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
              <svg
                aria-hidden="true"
                class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style >
  html{
    padding: 2rem;
  }
</style>
