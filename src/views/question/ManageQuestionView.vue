<template>
  <div id="manageQuestionView">
    <h2>题目管理</h2>
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
              v-for="(tag, index) of JSON.parse(record.tags)"
              :key="index"
              color="green"
              >{{ tag }}
            </a-tag>
          </a-space>
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          {{ moment(record.createTime).format("YYYY-MM-DD") }}
        </template>
        <template v-if="column.key === 'operation'">
          <a-space>
            <a-button type="primary" @click="doUpdate(record)">修改</a-button>
            <a-button type="primary" danger @click="doDelete(record)"
              >删除</a-button
            >
          </a-space>
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
  pageSize: 10,
  current: 1,
});
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
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
    title: "标题",
    dataIndex: "title",
    align: "center",
  },
  {
    title: "标签",
    dataIndex: "tags",
    align: "center",
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
    align: "center",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
    align: "center",
  },
  {
    title: "创建者用户ID",
    dataIndex: "userId",
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

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败" + res.message);
  }
};
watchEffect(() => {
  loadData();
});
const router = useRouter();
const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
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
#manageQuestionView {
  max-width: 1380px;
  margin: 0 auto;
}
</style>
