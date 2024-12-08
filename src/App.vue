<template>
  <div id="app">
    <template
      v-if="
        route.path.startsWith('/user/login') ||
        route.path.startsWith('/user/register')
      "
    >
      <router-view />
    </template>
    <template v-else><BasicLayout /></template>
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const doInit = () => {
  console.log("");
};
onMounted(() => {
  doInit();
});
</script>
