<script>
import FuzzySearch from "fuzzy-search";
import axios from "axios";
import PopUp from "./components/PopUp.vue";
export default {
  data() {
    return {
      data: [],
      fuse: null,
      search: "",
      results: "",
      noResults: "",
      isOpen: false,
      selectedObj: "",

    };
  },
  components: {
    PopUp,
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData: function () {
      axios
        .get("https://restcountries.com/v3.1/all")
        .then((res) => {
          this.data = res.data;
          
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },
    fuzzySearch: function () {
      if (this.search === "") return this.fetchData();
      const searcher = new FuzzySearch(this.data, ["name.official"]);
      const result = searcher.search(this.search);
      this.data = result;
      return result;
    },
    sortAsc: function(prop,arr){
        prop = prop.split('.');
        var len = prop.length;
        
        arr.sort(function (a, b) {
            var i = 0;
            while( i < len ) {
                a = a[prop[i]];
                b = b[prop[i]];
                i++;
            }
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            } else {
                return 0;
            }
        });
        return arr;
    },
    closeDialog: function(){
      this.isOpen = false;
    },
    openModal(e){
      this.selectedObj = this.data[e?.target?.id]
      console.log(this.selectedObj, "e")
      this.isOpen = true;
    },
     clickCallback: (pageNum) => {
      console.log(pageNum)
    }

  },
};
</script>

<template>
  <div >
   
    <section class="flex direction-row justify-between ">
      <div class="grow">
      <label
        for="default-search"
        class="m-2 text-sm font-medium text-gray-100 sr-only text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
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
      
    </div>

    <div class="grow " >
      
      <button
        class="m-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="sortAsc('name.official',data)"
      >
        ASC
      </button>
      <button
        class="m-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="sortAsc('name.official',data).reverse()"
      >
        DSC
      </button>
    </div>
    </section>
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
    <div
      class="flex justify-center inline-flex"
      v-for="(d,i) in data"
      :key="i"
    >
      <div class="ml-4 block p-6 rounded-lg shadow-lg bg-grey max-w-sm mr-2">
        <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
          <img class="h-16" :src="`${d.flags.png}`" alt="" />
        </h5>
        <p class="text-gray-700 text-base w-44">
          Official: {{ d.name.official }}
        </p>
        <p class="text-gray-700 text-base mb-4 w-44">
          Native: {{ d.name?.nativeName?.zho?.official || d.name.common }}
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
              @click="openModal($event)"
              class="px-6 py-2 text-white bg-blue-600 rounded shadow"
              type="button"
              :id="i"
            >
              Show Details
            </button>
        <PopUp :isOpen="isOpen" :selected-object="selectedObj"  @close-dialog="closeDialog" />
      </div>
    </div>
  </div>
</template>

<style>
html {
  padding: 2rem;
}
</style>
