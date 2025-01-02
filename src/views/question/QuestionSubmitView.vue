<template>
  <div id="questionSubmitView">
    <h2>题目提交列表</h2>
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入题号" />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          :style="{ width: '320px' }"
          placeholder="请选择编程语言"
          v-model="searchParams.language"
        >
          <a-option value="java">java</a-option>
          <a-option value="cpp">cpp</a-option>
          <a-option value="c">c</a-option>
          <a-option value="python">python</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button @click="doSubmit()" type="primary">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0"></a-divider>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: show,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
      }"
      @page-change="onPageChange"
    >
      <template #id="{ record }">
        <a
          @click="toQuestionSubmitPage(record.id)"
          style="color: blue; text-decoration: underline"
          >{{ record.id }}</a
        >
      </template>
      <template #result="{ record }">
        <span
          :style="{
            color: getColorByValue(record.status),
          }"
          >{{ record.status }}</span
        >
      </template>
      <template #user="{ record }">
        {{ record.userVO.userName }}
      </template>
      <template #maxTime="{ record }">
        {{ record.maxTime + `ms` }}
      </template>
      <template #maxMemory="{ record }">
        {{ record.maxMemory + `KB` }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #questionId="{ record }">
        <a
          @click="toQuestionPage(record.questionId)"
          style="color: blue; text-decoration: underline"
        >
          {{ record.questionId }}
        </a>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import moment from "moment";
import { getColorByValue } from "@/enums/QuestionSubmitJudgeStatusEnum";

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    Message.error("加载失败" + res.message);
  }
};
const show = ref(true);
onMounted(() => {
  loadData();
});
const columns = [
  {
    title: "提交号",
    slotName: "id",
    align: "center",
  },
  {
    title: "编程语言",
    dataIndex: "language",
    align: "center",
  },
  {
    title: "判题结果",
    slotName: "result",
    align: "center",
  },
  {
    title: "消耗内存",
    slotName: "maxMemory",
    align: "center",
  },
  {
    title: "消耗时间",
    slotName: "maxTime",
    align: "center",
  },
  {
    title: "题号",
    slotName: "questionId",
    align: "center",
  },
  {
    title: "提交者",
    slotName: "user",
    align: "center",
  },
  {
    title: "提交时间",
    slotName: "createTime",
    align: "center",
  },
];
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
const router = useRouter();
const toQuestionPage = (questionId: number) => {
  router.push({
    path: `/view/question/${questionId}`,
  });
};
const toQuestionSubmitPage = (questionSubmitId: number) => {
  router.push({
    path: `/view/question_submit/${questionSubmitId}`,
  });
};
watchEffect(() => {
  loadData();
});

const doSubmit = () => {
  //重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
  loadData();
};
</script>
<style scoped>
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
