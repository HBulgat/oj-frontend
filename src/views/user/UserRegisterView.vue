<template>
  <div id="userRegisterView">
    <h2 style="margin-bottom: 16px">用户注册</h2>
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
      <a-form-item field="userName" label="昵称">
        <a-input v-model="form.userName" placeholder="请输入昵称" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于八位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item field="checkPassword" tooltip="请确认密码" label="确认密码">
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请确认密码"
        />
      </a-form-item>
      <a-form-item>
        <!-- <a-button
          type="primary"
          status="success"
          html-type="submit"
          style="width: 120px"
          >注册</a-button
        > -->
        <a-row :gutter="180">
          <a-col :span="12">
            <div>
              <a-button
                type="primary"
                @click="toLoginPage()"
                style="width: 100px"
                >返回登录</a-button
              >
            </div>
          </a-col>
          <a-col :span="12">
            <div>
              <div>
                <a-button
                  type="primary"
                  html-type="submit"
                  status="success"
                  style="width: 100px"
                  >注册</a-button
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
import { reactive, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { UserRegisterRequest, UserControllerService } from "../../../generated";

const form = ref({
  userAccount: "",
  userName: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);
const router = useRouter();
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form.value);
  // console.log("res", res);
  if (res.code === 0) {
    message.success("注册成功");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败," + res.message);
  }
};
const toLoginPage = () => {
  router.push({
    path: "/user/login",
  });
};
</script>
