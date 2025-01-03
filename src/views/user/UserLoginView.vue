<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于八位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-row :gutter="180">
          <a-col :span="12">
            <div>
              <a-button
                type="primary"
                status="success"
                @click="handleRegister()"
                style="width: 120px"
                >注册</a-button
              >
            </div>
          </a-col>
          <a-col :span="12">
            <div>
              <div>
                <a-button type="primary" html-type="submit" style="width: 120px"
                  >登录</a-button
                >
              </div>
            </div>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { UserControllerService, UserLoginRequest } from "../../../generated";
import { reactive } from "vue";
import { Message } from "@arco-design/web-vue";
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
    Message.error("登录失败," + res.message);
  }
};
const handleRegister = () => {
  router.push({
    path: "/user/register",
  });
};
</script>
