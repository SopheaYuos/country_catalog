import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

const URL = "https://restcountries.com/v3.1/all";

export default {
    getAllCountryInfo() {
        return Vue.axios.get(URL);
    }

}