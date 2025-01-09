<template>
  <div id="questionSubmitView">
    <h2>题目提交列表</h2>
    <a-form :model="searchParams" layout="inline" @finish="doSubmit">
      <a-form-item label="题号" style="min-width: 240px">
        <a-input
          v-model:value="searchParams.questionId"
          placeholder="请输入题号"
        />
      </a-form-item>
      <a-form-item label="编程语言" style="min-width: 240px">
        <a-select
          ref="select"
          v-model:value="searchParams.language"
          :options="languageOptions"
          style="width: 120px"
        >
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider style="margin-top: 20px; margin-bottom: 20px" />
    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="pagination"
      @change="doTablePageChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'id'">
          <a
            @click="toQuestionSubmitPage(record.id)"
            style="color: blue; text-decoration: underline"
            >{{ record.id }}</a
          >
        </template>
        <template v-if="column.dataIndex === 'status'">
          <span
            :style="{
              color: getColorByValue(record.status),
            }"
            >{{ record.status }}</span
          >
        </template>
        <template v-if="column.dataIndex === 'user'">
          {{ record.userVO.userName }}
        </template>
        <template v-if="column.dataIndex === 'maxTime'">
          {{ record.maxTime + `ms` }}
        </template>
        <template v-if="column.dataIndex === 'maxMemory'">
          {{ record.maxMemory + `KB` }}
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </template>
        <template v-if="column.dataIndex === 'questionId'">
          <a
            @click="toQuestionPage(record.questionId)"
            style="color: blue; text-decoration: underline"
          >
            {{ record.questionId }}
          </a>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watchEffect } from "vue";
import {
  LanguageOption,
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import moment from "moment";
import { getColorByValue } from "@/enums/QuestionSubmitJudgeStatusEnum";
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
const dataList = ref([]);
const total = ref(0);
const searchParams = reactive<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});
const loadData = async () => {
  loadLanguageOptions();
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    searchParams
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败" + res.message);
  }
};
onMounted(() => {
  loadData();
});
const columns = [
  {
    title: "提交号",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "编程语言",
    dataIndex: "language",
    align: "center",
  },
  {
    title: "判题结果",
    dataIndex: "status",
    align: "center",
  },
  {
    title: "消耗内存",
    dataIndex: "maxMemory",
    align: "center",
  },
  {
    title: "消耗时间",
    dataIndex: "maxTime",
    align: "center",
  },
  {
    title: "题号",
    dataIndex: "questionId",
    align: "center",
  },
  {
    title: "提交者",
    dataIndex: "user",
    align: "center",
  },
  {
    title: "提交时间",
    dataIndex: "createTime",
    align: "center",
  },
];
const doTablePageChange = (page: any) => {
  searchParams.current = page.current;
  searchParams.pageSize = page.pageSize;
  loadData();
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
  searchParams.current = 1;
  loadData();
};
const pagination = computed(() => {
  return {
    current: searchParams.current,
    pageSize: searchParams.pageSize,
    total: total.value,
    showSizeChanger: true,
    showTotal: (total) => {
      return `共 ${total} 条`;
    },
  };
});
</script>
<style scoped>
#questionSubmitView {
  max-width: 1380px;
  margin: 0 auto;
}
</style>
