<template>
  <v-md-editor
    :model-value="modelValue"
    @update:model-value="(newValue) => emit('update:modelValue', newValue)"
    :height="height"
    @change="handleChange"
  ></v-md-editor>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import VMdEditor from "@kangc/v-md-editor";

// 定义props，明确指定类型和默认值
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "700px",
  },
});

// 定义emits，列出组件向外触发的事件
const emit = defineEmits(["update:modelValue", "htmlContent"]);

const handleChange = (markdownContent, htmlContent) => {
  emit("update:modelValue", markdownContent);
  emit("htmlContent", htmlContent);
};
</script>

<style scoped>
/* 这里可以添加针对该组件的样式调整，如果有的话，示例中暂未添加额外样式 */
</style>
