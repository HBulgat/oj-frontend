<template>
  <div id="addQuestionView"></div>
  <a-form :model="form" :style="{ width: '1250px' }" @submit="handleSubmit">
    <a-form-item field="title" label="标题">
      <a-input v-model="form.title" placeholder="请输入标题"></a-input>
    </a-form-item>
    <a-form-item field="tags" label="标签">
      <a-input-tag v-model="form.tags" placeholder="请输入标签" allow-clear />
    </a-form-item>
    <a-form-item field="content" label="内容">
      <MdEditor
        style="min-width: 1500px"
        :value="form.content"
        :handle-change="onContentChange"
      ></MdEditor>
    </a-form-item>

    <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
      <div>
        <a-space direction="vertical" style="min-width: 800px">
          <a-form-item
            field="judgeConfig.languageJavaJudgeConfig.timeLimit"
            label="Java语言 时间限制"
          >
            <a-input-number
              v-model="form.judgeConfig.languageJavaJudgeConfig.timeLimit"
              placeholder="请输入时间限制（单位：ms）"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfig.languageJavaJudgeConfig.memoryLimit"
            label="Java语言 内存限制"
          >
            <a-input-number
              v-model="form.judgeConfig.languageJavaJudgeConfig.memoryLimit"
              placeholder="请输入内存限制（单位：KB）"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
        </a-space>
        <a-space direction="vertical" style="min-width: 800px">
          <a-form-item
            field="judgeConfig.languageCJudgeConfig.timeLimit"
            label="C语言 时间限制"
          >
            <a-input-number
              v-model="form.judgeConfig.languageCJudgeConfig.timeLimit"
              placeholder="请输入时间限制（单位：ms）"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfig.languageCJudgeConfig.memoryLimit"
            label="C语言 内存限制"
          >
            <a-input-number
              v-model="form.judgeConfig.languageCJudgeConfig.memoryLimit"
              placeholder="请输入内存限制（单位：KB）"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
        </a-space>
        <a-space direction="vertical" style="min-width: 800px">
          <a-form-item
            field="judgeConfig.languageCppJudgeConfig.timeLimit"
            label="C++语言 时间限制"
          >
            <a-input-number
              v-model="form.judgeConfig.languageCppJudgeConfig.timeLimit"
              placeholder="请输入时间限制（单位：ms）"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfig.languageCppJudgeConfig.memoryLimit"
            label="C++语言 内存限制"
          >
            <a-input-number
              v-model="form.judgeConfig.languageCppJudgeConfig.memoryLimit"
              placeholder="请输入内存限制（单位：KB）"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
        </a-space>
        <a-space direction="vertical" style="min-width: 800px">
          <a-form-item
            field="judgeConfig.languagePythonJudgeConfig.timeLimit"
            label="Python语言 时间限制"
          >
            <a-input-number
              v-model="form.judgeConfig.languagePythonJudgeConfig.timeLimit"
              placeholder="请输入时间限制（单位：ms）"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
          <a-form-item
            field="judgeConfig.languagePythonJudgeConfig.memoryLimit"
            label="Python语言 内存限制"
          >
            <a-input-number
              v-model="form.judgeConfig.languagePythonJudgeConfig.memoryLimit"
              placeholder="请输入内存限制（单位：KB）"
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
        </a-space>
      </div>
    </a-form-item>
    <a-form-item
      label="测试用例配置"
      :content-flex="false"
      :merge-props="false"
    >
      <a-form-item
        v-for="(judgeCaseItem, index) of form.judgeCase"
        :key="index"
        no-style
      >
        <a-space direction="vertical" style="min-width: 640px">
          <a-form-item
            :field="`form.judgeCase[${index}].input`"
            :label="`输入样例-${index}`"
            :key="index"
          >
            <a-textarea
              v-model="judgeCaseItem.input"
              placeholder="请输入测试输入样例"
            />
          </a-form-item>
          <a-form-item
            :field="`form.judgeCase[${index}].output`"
            :label="`输出样例-${index}`"
            :key="index"
          >
            <a-textarea
              v-model="judgeCaseItem.output"
              placeholder="请输入测试输出样例"
            />
          </a-form-item>
          <a-button @click="handleDelete(index)" status="danger">删除</a-button>
        </a-space>
      </a-form-item>
      <div style="margin-top: 32px">
        <a-button @click="handleAdd()" type="outline" status="success"
          >新增测试样例
        </a-button>
      </div>
    </a-form-item>
    <div style="margin-top: 16px"></div>
    <a-form-item>
      <a-button type="primary" style="min-width: 200px" @click="doSubmit()"
        >提交
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  type QuestionAddRequest,
  QuestionControllerService,
} from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRoute } from "vue-router";

let form = ref<QuestionAddRequest>({
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    languageCJudgeConfig: {
      timeLimit: 1000,
      memoryLimit: 1000,
    },
    languageCppJudgeConfig: {
      timeLimit: 1000,
      memoryLimit: 1000,
    },
    languageJavaJudgeConfig: {
      timeLimit: 1000,
      memoryLimit: 1000,
    },
    languagePythonJudgeConfig: {
      timeLimit: 1000,
      memoryLimit: 1000,
    },
  },
  tags: [],
  title: "",
});
const route = useRoute();
const updatePage = route.path.includes("update");
/**
 * 根据题目id获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) return;
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    // console.log("loadData", form.value);
    form.value.content = res.data?.content;
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        languageCJudgeConfig: {
          timeLimit: 1000,
          memoryLimit: 1000,
        },
        languageCppJudgeConfig: {
          timeLimit: 1000,
          memoryLimit: 1000,
        },
        languageJavaJudgeConfig: {
          timeLimit: 1000,
          memoryLimit: 1000,
        },
        languagePythonJudgeConfig: {
          timeLimit: 1000,
          memoryLimit: 1000,
        },
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    Message.error("加载失败" + res.message);
  }
};
onMounted(() => {
  loadData();
});
const doSubmit = async () => {
  // console.log(form);
  //判断更新还是新增
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      Message.success("更新成功");
    } else {
      Message.error("更新失败" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      Message.success("创建成功");
    } else {
      Message.error("创建失败" + res.message);
    }
  }
};

const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};
const handleSubmit = () => {
  // console.log(1);
};
const onContentChange = (value: string) => {
  // console.log("onContentChange", form.value.content);
  form.value.content = value;
};
</script>
<style scoped></style>
