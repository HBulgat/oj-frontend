<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-card v-if="question" title="题目">
          <a-descriptions
            layout="vertical"
            bordered
            title="判题条件"
            :column="{ xs: 2, md: 2, lg: 3 }"
          >
            <a-descriptions-item label="时间限制">
              <a-space :size="[0, 'small']" wrap>
                <a-tag :bordered="false" color="processing"
                  >C :{{
                    question.judgeConfig.languageCJudgeConfig.timeLimit
                  }}ms</a-tag
                >
                <a-tag :bordered="false" color="success"
                  >Cpp :{{
                    question.judgeConfig.languageCppJudgeConfig.timeLimit
                  }}ms</a-tag
                >
                <a-tag :bordered="false" color="warning"
                  >Java :{{
                    question.judgeConfig.languageJavaJudgeConfig.timeLimit
                  }}ms</a-tag
                >
                <a-tag :bordered="false" color="error"
                  >Python:{{
                    question.judgeConfig.languagePythonJudgeConfig.timeLimit
                  }}ms</a-tag
                >
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="内存限制">
              <a-space :size="[0, 'small']" wrap>
                <a-tag :bordered="false" color="processing"
                  >C :{{
                    question.judgeConfig.languageCJudgeConfig.memoryLimit
                  }}KB</a-tag
                >
                <a-tag :bordered="false" color="success"
                  >Cpp :{{
                    question.judgeConfig.languageCppJudgeConfig.memoryLimit
                  }}KB</a-tag
                >
                <a-tag :bordered="false" color="warning"
                  >Java :{{
                    question.judgeConfig.languageJavaJudgeConfig.memoryLimit
                  }}KB</a-tag
                >
                <a-tag :bordered="false" color="error"
                  >Python:{{
                    question.judgeConfig.languagePythonJudgeConfig.memoryLimit
                  }}KB</a-tag
                >
              </a-space>
            </a-descriptions-item>
          </a-descriptions>
          <MdViewer :value="question.content" style="margin: 0"></MdViewer>
          <template #extra>
            <a-space wrap>
              <a-tag
                v-for="(tag, index) of question.tags"
                :key="index"
                color="green"
                closable
                >{{ tag }}
              </a-tag>
            </a-space>
          </template>
        </a-card>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-card v-if="question" title="代码">
          <a-form :model="form" layout="inline">
            <a-form-item
              field="language"
              label="编程语言"
              style="min-width: 240px; margin-bottom: 10px"
            >
              <a-select
                ref="select"
                v-model:value="form.language"
                :options="languageOptions"
                style="width: 120px"
              >
              </a-select>
            </a-form-item>
          </a-form>
          <CodeEditor
            :value="form.code as string"
            :language="form.language as string"
            :handle-change="changeCode"
          ></CodeEditor>
        </a-card>
        <div style="margin-top: 20px; display: grid; place-items: center">
          <a-button
            type="primary"
            style="width: 90%; margin: 0 auto"
            @click="doSubmit"
            >提交代码
          </a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps } from "vue";
import {
  LanguageOption,
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";
import { message } from "ant-design-vue";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

const languageOptions = ref<LanguageOption[]>([]);
const isLoadLanguageOptions = ref<boolean>(false);
const loadLanguageOptions = async () => {
  if (isLoadLanguageOptions.value) {
    return;
  }
  const res =
    await QuestionControllerService.listQuestionSubmitLanguageOptionUsingGet();
  if (res.code === 0) {
    languageOptions.value = res.data;
    isLoadLanguageOptions.value = true;
  } else {
    message.error("编程语言加载失败，" + res.message);
  }
};
const question = ref<QuestionVO>();
const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

interface Props {
  id: string;
}

const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败");
  }
};
const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});
const loadData = async () => {
  loadLanguageOptions();
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载失败" + res.message);
  }
};
onMounted(() => {
  loadData();
});
const changeCode = (value: string) => {
  form.value.code = value;
};
</script>
<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
