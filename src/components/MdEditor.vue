<template>
  <v-md-editor
    v-model="localValue"
    height="900px"
    @change="handleChange"
  ></v-md-editor>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed, defineEmits, ref } from "vue";
import VMdEditor from "@kangc/v-md-editor";

interface Props {
  value: string;
  mode?: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});
const localValue = ref<string>("");
</script>

<style scoped>
/* 这里可以添加针对该组件的样式调整，如果有的话，示例中暂未添加额外样式 */
</style>
