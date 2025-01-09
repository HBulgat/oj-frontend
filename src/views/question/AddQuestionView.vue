<template>
  <div id="addQuestionView"></div>
  <a-form
    :model="form"
    style="width: 90%; margin: 20px auto 20px"
    @finish="doSubmit"
  >
    <a-form-item label="标题">
      <a-input
        v-model:value="form.title"
        placeholder="请输入标题"
        allow-clear
      ></a-input>
    </a-form-item>
    <a-form-item label="标签">
      <a-input
        v-model:value="form.tags[0]"
        placeholder="请输入标签"
        allow-clear
      />
    </a-form-item>
    <a-form-item label="内容">
      <MdEditor
        :height="`500px`"
        style="min-width: 1500px"
        v-model="form.content"
      ></MdEditor>
    </a-form-item>

    <a-form-item label="判题配置">
      <div>
        <a-row :gutter="[24, 24]">
          <a-col :md="10" :xs="24">
            <a-form-item label="Java语言 &nbsp; &nbsp; &nbsp;时间限制（ms）">
              <a-input-number
                style="width: 80%"
                id="inputNumber"
                v-model:value="
                  form.judgeConfig.languageJavaJudgeConfig.timeLimit
                "
                placeholder="请输入时间限制（单位：ms）"
                size="large"
                :min="0"
              />
            </a-form-item>
          </a-col>
          <a-col :md="10" :xs="24">
            <a-form-item label="Java语言 &nbsp; &nbsp; &nbsp;内存限制（KB）">
              <a-input-number
                style="width: 80%"
                id="inputNumber"
                v-model:value="
                  form.judgeConfig.languageJavaJudgeConfig.memoryLimit
                "
                placeholder="请输入内存限制（单位：KB）"
                mode="button"
                size="large"
                :min="0"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="[24, 24]">
          <a-col :md="10" :xs="24">
            <a-form-item
              label="C语言 &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; 时间限制（ms）"
            >
              <a-input-number
                style="width: 80%"
                id="inputNumber"
                v-model:value="form.judgeConfig.languageCJudgeConfig.timeLimit"
                placeholder="请输入时间限制（单位：ms）"
                mode="button"
                size="large"
                :min="0"
              />
            </a-form-item>
          </a-col>
          <a-col :md="10" :xs="24">
            <a-form-item
              label="C语言 &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;内存限制（KB）"
            >
              <a-input-number
                style="width: 80%"
                id="inputNumber"
                v-model:value="
                  form.judgeConfig.languageCJudgeConfig.memoryLimit
                "
                placeholder="请输入内存限制（单位：KB）"
                mode="button"
                size="large"
                :min="0"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="[24, 24]">
          <a-col :md="10" :xs="24">
            <a-form-item label="C++语言 &nbsp;&nbsp; &nbsp;时间限制（ms）">
              <a-input-number
                style="width: 80%"
                id="inputNumber"
                v-model:value="
                  form.judgeConfig.languageCppJudgeConfig.timeLimit
                "
                placeholder="请输入时间限制（单位：ms）"
                mode="button"
                size="large"
                :min="0"
              />
            </a-form-item>
          </a-col>
          <a-col :md="10" :xs="24">
            <a-form-item
              label="C++语言 &nbsp; &nbsp;&nbsp;&nbsp;内存限制（KB）"
            >
              <a-input-number
                style="width: 80%"
                id="inputNumber"
                v-model:value="
                  form.judgeConfig.languageCppJudgeConfig.memoryLimit
                "
                placeholder="请输入内存限制（单位：KB）"
                mode="button"
                size="large"
                :min="0"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="[24, 24]">
          <a-col :md="10" :xs="24">
            <a-form-item
              field="judgeConfig.languagePythonJudgeConfig.timeLimit"
              label="Python语言 时间限制（ms）"
            >
              <a-input-number
                style="width: 80%"
                id="inputNumber"
                v-model:value="
                  form.judgeConfig.languagePythonJudgeConfig.timeLimit
                "
                placeholder="请输入时间限制（单位：ms）"
                mode="button"
                size="large"
                :min="0"
              />
            </a-form-item>
          </a-col>
          <a-col :md="10" :xs="24">
            <a-form-item
              field="judgeConfig.languagePythonJudgeConfig.memoryLimit"
              label="Python语言&nbsp; 内存限制（KB）"
            >
              <a-input-number
                style="width: 80%"
                id="inputNumber"
                v-model:value="
                  form.judgeConfig.languagePythonJudgeConfig.memoryLimit
                "
                placeholder="请输入内存限制（单位：KB）"
                mode="button"
                size="large"
                :min="0"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </div>
    </a-form-item>

    <!--------->
    <a-form-item label="判题设置">
      <a-card>
        <a-form-item>
          <div>
            <a-select
              style="width: 50%"
              ref="select"
              v-model:value="form.judgeType"
              :options="judgeTypeOptions"
            ></a-select>
          </div>
          <div
            style="margin-top: 20px"
            v-if="form.judgeType === 'special judge'"
          >
            <!--            <h3>目前仅支持java</h3>-->
            <div style="margin-left: 5%; margin-top: 1%; margin-bottom: 1%">
              <a-tooltip placement="top" title="详情请看说明文档">
                <a-tag
                  :bordered="false"
                  color="success"
                  style="font-size: large"
                  >目前仅支持java</a-tag
                >
              </a-tooltip>
            </div>
            <a-spin :spinning="doSubmitCompileSpinning">
              <a-row>
                <a-col :span="16">
                  <CodeEditor
                    language="java"
                    :value="form.specialJudgeProgramCode"
                    style="height: 60vh; width: 100%"
                    :handle-change="changeCode"
                  ></CodeEditor>
                </a-col>
                <a-col :span="8">
                  <a-form-item label="预期输出">
                    <a-textarea
                      v-model:value="form.exceptedOutput"
                      :auto-size="{ minRows: 3, maxRows: 6 }"
                    ></a-textarea>
                  </a-form-item>
                </a-col>
              </a-row>

              <div style="margin-top: 20px; display: grid; place-items: center">
                <a-button
                  type="primary"
                  @click="doSubmitCompile"
                  style="width: 70%; margin: 0 auto"
                  >提交编译
                </a-button>
              </div>
            </a-spin>
          </div>
        </a-form-item>
      </a-card></a-form-item
    >

    <!--------->
    <a-form-item label="测试用例配置">
      <a-form-item
        v-for="(judgeCaseItem, index) of form.judgeCase"
        :key="index"
        no-style
      >
        <a-row :gutter="[24, 24]">
          <a-col :md="10" :xs="24">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入样例-${index}`"
              :key="`input-${index}`"
            >
              <a-textarea
                v-model:value="form.judgeCase[index].input"
                placeholder="请输入测试输入样例"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </a-form-item>
          </a-col>
          <a-col :md="10" :xs="24">
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出样例-${index}`"
              :key="`output-${index}`"
            >
              <a-textarea
                v-model:value="form.judgeCase[index].output"
                placeholder="请输入测试输出样例"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </a-form-item>
          </a-col>
          <a-col :md="4" :xs="24">
            <a-button @click="handleDelete(index)" type="primary" :danger="true"
              >删除</a-button
            >
          </a-col>
        </a-row>
      </a-form-item>
      <div style="margin-top: 20px; display: grid; place-items: center">
        <a-button
          @click="handleAdd()"
          style="background: #03e071; width: 50%; margin: 0 auto"
          type="primary"
          >新增测试样例
        </a-button>
      </div>
    </a-form-item>
    <div style="margin-top: 16px"></div>
    <a-form-item>
      <div style="margin-top: 20px; display: grid; place-items: center">
        <a-button
          type="primary"
          html-type="submit"
          style="width: 70%; margin: 0 auto"
          >提交
        </a-button>
      </div>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import {
  JudgeTypeOption,
  type QuestionAddRequest,
  QuestionControllerService,
} from "../../../generated";
import { message } from "ant-design-vue";
import { useRoute } from "vue-router";
import { QuestionJudgeTypeEnum } from "@/enums/QuestionJudgeTypeEnum";
const doSubmitCompileSpinning = ref(false);
const judgeTypeOptions = ref<JudgeTypeOption[]>([]);
const isLoadJudgeTypeOptions = ref<boolean>(false);
const loadJudgeTypeOptions = async () => {
  if (isLoadJudgeTypeOptions.value) {
    return;
  }
  const res =
    await QuestionControllerService.listQuestionJudgeTypeOptionUsingGet();
  if (res.code === 0) {
    judgeTypeOptions.value = res.data;
    isLoadJudgeTypeOptions.value = true;
  } else {
    message.error("编程语言加载失败，" + res.message);
  }
};

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
      timeLimit: 100000,
      memoryLimit: 100000,
    },
    languageCppJudgeConfig: {
      timeLimit: 100000,
      memoryLimit: 100000,
    },
    languageJavaJudgeConfig: {
      timeLimit: 100000,
      memoryLimit: 100000,
    },
    languagePythonJudgeConfig: {
      timeLimit: 100000,
      memoryLimit: 100000,
    },
  },
  tags: [],
  title: "",
  exceptedOutput: "",
  judgeType: "",
  specialJudgeProgramCode: "",
  specialJudgeProgramPath: "",
});
const route = useRoute();
const updatePage = route.path.includes("update");
/**
 * 根据题目id获取老的数据
 */
const loadData = async () => {
  loadJudgeTypeOptions();
  const id = route.query.id;
  if (!id) return;
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    console.log("loadData,res.data=", res.data);
    form.value = res.data as any;
    console.log("loadData,form.value=", form.value);
    form.value.content = res.data?.content;
    console.log(form.value.content);
    // onContentChange(form.value.content as string);
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
    //还需要加载出judgeMessage
    if (res.data?.judgeMessage) {
      const judgeMessage = JSON.parse(res.data?.judgeMessage);
      form.value.exceptedOutput = judgeMessage?.exceptedOutput ?? "";
      form.value.specialJudgeProgramCode =
        judgeMessage?.specialJudgeProgramCode ?? "";
      form.value.judgeType = judgeMessage?.judgeType ?? "";
      form.value.specialJudgeProgramPath =
        judgeMessage?.specialJudgeProgramCode ?? "";
    }
  } else {
    message.error("加载失败" + res.message);
  }
};
onMounted(() => {
  loadData();
});
const doSubmit = async () => {
  if (form.value.judgeType === QuestionJudgeTypeEnum.TEXT_COMPARE.value) {
    form.value.specialJudgeProgramPath = "";
    form.value.specialJudgeProgramCode = "";
    form.value.exceptedOutput = "";
  }
  //判断更新还是新增
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.error("更新失败", res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
    } else {
      message.error("创建失败", res.message);
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
const changeCode = (value: string) => {
  form.value.specialJudgeProgramCode = value;
};
const doSubmitCompile = async () => {
  doSubmitCompileSpinning.value = true;
  console.log("doSubmitCompile", form.value.specialJudgeProgramCode);
  const res = await QuestionControllerService.addSpecialJudgeProgramUsingPost({
    language: "java",
    specialJudgeProgramCode: form.value.specialJudgeProgramCode,
  });
  doSubmitCompileSpinning.value = false;
  console.log(res.data);
  if (res.code === 0) {
    form.value.specialJudgeProgramPath = res.data;
    message.success("编译成功");
  } else {
    message.error("编译失败，" + res.message);
  }
};
</script>
<style scoped></style>
