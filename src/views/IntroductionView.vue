<template>
  <div id="introductionView">
    <MdViewer :value="buildIntroduction()"></MdViewer>
  </div>
</template>
<script setup lang="ts">
import MdViewer from "@/components/MdViewer.vue";
const buildIntroduction = () => {
  return "introduction";
};
</script>

<style scoped>
#introductionView {
}
</style>
