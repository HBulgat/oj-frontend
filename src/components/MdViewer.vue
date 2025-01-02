<template>
  <v-md-preview :text="value"></v-md-preview>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style></style>
