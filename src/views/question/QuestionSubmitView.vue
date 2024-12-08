<template>
  <div id="questionSubmitView">
    <h2>题目列表</h2>
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input-tag
          v-model="searchParams.questionId"
          placeholder="请输入题号"
        />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          :style="{ width: '320px' }"
          placeholder="请选择编程语言"
          v-model="searchParams.language"
        >
          <a-option value="java">java</a-option>
          <a-option value="cpp">cpp</a-option>
          <a-option value="go">go</a-option>
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
      <template #judgeInfo="{ record }">
        <div style="white-space: pre">
          {{
            "返回信息:" +
            record.judgeInfo.message +
            "\n" +
            "时间消耗:" +
            record.judgeInfo.time +
            "\n" +
            "内存消耗:" +
            record.judgeInfo.memory
          }}
        </div>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
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
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    dataIndex: "status",
  },
  {
    title: "题目 ID",
    dataIndex: "questionId",
  },
  {
    title: "提交者 ID",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
];
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};
const router = useRouter();
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};
watchEffect(() => {
  loadData();
});

const doSubmit = () => {
  console.log("doSubmit", searchParams.value);
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
