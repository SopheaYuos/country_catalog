<script setup>
import { ref } from "vue";
const counter = ref(0);

function add() {
  counter.value++;
  console.log(counter);
}
const subtract = () => {
  counter.value--;
};
</script>

<template>
  <div>
    <div>Counter app</div>
    <h2>{{ counter }}</h2>
    <button @click="subtract">Substract</button>
    <button @click="add">Add</button>
  </div>
</template>

<style scoped>

</style>
