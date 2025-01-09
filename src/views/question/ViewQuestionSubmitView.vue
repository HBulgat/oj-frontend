<template>
  <div id="viewQuestionSubmitView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-card v-if="questionSubmit?.questionVO" title="题目">
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
                    questionSubmit?.questionVO?.judgeConfig.languageCJudgeConfig
                      .timeLimit
                  }}ms</a-tag
                >
                <a-tag :bordered="false" color="success"
                  >Cpp :{{
                    questionSubmit?.questionVO?.judgeConfig
                      .languageCppJudgeConfig.timeLimit
                  }}ms</a-tag
                >
                <a-tag :bordered="false" color="warning"
                  >Java :{{
                    questionSubmit?.questionVO?.judgeConfig
                      .languageJavaJudgeConfig.timeLimit
                  }}ms</a-tag
                >
                <a-tag :bordered="false" color="error"
                  >Python:{{
                    questionSubmit?.questionVO?.judgeConfig
                      .languagePythonJudgeConfig.timeLimit
                  }}ms</a-tag
                >
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="内存限制">
              <a-space :size="[0, 'small']" wrap>
                <a-tag :bordered="false" color="processing"
                  >C :{{
                    questionSubmit?.questionVO?.judgeConfig.languageCJudgeConfig
                      .memoryLimit
                  }}KB</a-tag
                >
                <a-tag :bordered="false" color="success"
                  >Cpp :{{
                    questionSubmit?.questionVO?.judgeConfig
                      .languageCppJudgeConfig.memoryLimit
                  }}KB</a-tag
                >
                <a-tag :bordered="false" color="warning"
                  >Java :{{
                    questionSubmit?.questionVO?.judgeConfig
                      .languageJavaJudgeConfig.memoryLimit
                  }}KB</a-tag
                >
                <a-tag :bordered="false" color="error"
                  >Python:{{
                    questionSubmit?.questionVO?.judgeConfig
                      .languagePythonJudgeConfig.memoryLimit
                  }}KB</a-tag
                >
              </a-space>
            </a-descriptions-item>
          </a-descriptions>
          <MdViewer
            :value="questionSubmit?.questionVO?.content"
            style="margin: 0"
          ></MdViewer>
          <template #extra>
            <a-space wrap>
              <a-tag
                v-for="(tag, index) of questionSubmit?.questionVO?.tags"
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
        <a-card v-if="questionSubmit?.questionVO?.title" title="代码">
          <MdViewer
            :value="formatQuestionSubmitResult(questionSubmit)"
            style="margin: 0"
          ></MdViewer>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, withDefaults, defineProps } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitVO,
} from "../../../generated";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import MdViewer from "@/components/MdViewer.vue";
import utils from "@/utils/formatUtils";
import {
  getColorByValue,
  QuestionSubmitJudgeStatusEnum,
} from "@/enums/QuestionSubmitJudgeStatusEnum";

const router = useRouter();

const questionSubmit = ref<QuestionSubmitVO>();

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionSubmitVoByIdUsingGet(
    props.id as any
  );
  if (res.code === 0) {
    questionSubmit.value = res.data;
  } else {
    message.error("加载失败," + res.message);
  }
};
onMounted(() => {
  loadData();
});
const formatQuestionSubmitResult = (questionSubmit) => {
  if (!questionSubmit) return "";
  // console.log(questionSubmit);
  return (
    "## 提交号：" +
    questionSubmit.id +
    "\n## 使用语言：" +
    questionSubmit.language +
    "\n### 状态：" +
    `<span style="color:${getColorByValue(questionSubmit.status)}">` +
    questionSubmit.status +
    `</span>` +
    (questionSubmit.status === QuestionSubmitJudgeStatusEnum.COMPILE_ERROR.value
      ? "\n#### 编译信息：\n```\n" + questionSubmit.judgeInfo[0].text + "\n```"
      : "") +
    "\n### 判题信息：" +
    "\n时间消耗：" +
    questionSubmit.maxTime +
    "ms\n" +
    "\n内存消耗：" +
    questionSubmit.maxMemory +
    "KB" +
    "\n### 代码：\n```" +
    questionSubmit.language +
    "\n" +
    questionSubmit.code +
    "\n```"
  );
};
</script>
<style>
#viewQuestionSubmitView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionSubmitView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
