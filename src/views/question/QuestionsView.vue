<template>
  <div id="questionsView">
    <h2>题目列表</h2>
    <a-form :model="searchParams" layout="inline" @finish="doSubmit">
      <a-form-item label="标题" style="min-width: 240px">
        <a-input v-model:value="searchParams.title" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item label="标签" style="min-width: 240px">
        <a-input
          v-model:value="searchParams.tags[0]"
          placeholder="请输入标签"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
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
        <template v-if="column.dataIndex === 'tags'">
          <a-space wrap>
            <a-tag
              v-for="(tag, index) of record.tags"
              :key="index"
              color="green"
              >{{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template v-if="column.key === 'acceptedRate'">
          {{
            record.submitNum != 0
              ? ((record.acceptedNum / record.submitNum) * 100).toFixed(2) +
                `%(${record.acceptedNum}/${record.submitNum})`
              : "0"
          }}
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </template>
        <template v-if="column.key === 'operation'">
          <a-button type="primary" @click="toQuestionPage(record)"
            >做题</a-button
          >
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import moment from "moment";

const dataList = ref([]);
const total = ref(0);
const searchParams = reactive<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});
const loadData = async () => {
  console.log(searchParams);
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
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
    title: "题号",
    dataIndex: "id",
    align: "center",
  },
  {
    title: "题目名称",
    dataIndex: "title",
    align: "center",
  },
  {
    title: "标签",
    dataIndex: "tags",
    align: "center",
  },
  {
    title: "通过率",
    key: "acceptedRate",
    align: "center",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: "center",
  },
  {
    title: "操作",
    key: "operation",
    align: "center",
  },
];
const doTablePageChange = (page: any) => {
  searchParams.current = page.current;
  searchParams.pageSize = page.pageSize;
  loadData();
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
#questionsView {
  max-width: 1380px;
  margin: 0 auto;
}
</style>
