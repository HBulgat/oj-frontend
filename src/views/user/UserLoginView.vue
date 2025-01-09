<template>
  <div id="userLoginView">
    <h2 class="title">用户登录</h2>
    <a-form
      :model="form"
      name="basic"
      @finish="handleSubmit"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="用户账号"
        name="userAccount"
        :rules="[{ required: true, message: '请输入账号' }]"
      >
        <a-input v-model:value="form.userAccount" placeholder="请输入账号" />
      </a-form-item>

      <a-form-item
        label="用户密码"
        name="userPassword"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 8, message: '密码长度不能小于8位' },
        ]"
      >
        <a-input-password
          v-model:value="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>

      <div class="tips">
        没有账号？
        <RouterLink to="/user/register">立即注册</RouterLink>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { UserControllerService, UserLoginRequest } from "../../../generated";
import { reactive } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
const router = useRouter();
const store = useStore();
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // console.log("res", res);
  if (res.code === 0) {
    // console.log("00000000000000");
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败," + res.message);
  }
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<style scoped>
#userLoginView {
  max-width: 360px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 16px;
}
.tips {
  color: #aaa7a7;
  text-align: right;
  font-size: 13px;
  margin-bottom: 13px;
}
</style>
