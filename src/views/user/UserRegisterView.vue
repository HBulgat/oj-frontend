<template>
  <div id="userRegisterView">
    <h2 class="title">用户注册</h2>
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
        label="用户昵称"
        name="userName"
        :rules="[{ required: true, message: '请输入昵称' }]"
      >
        <a-input v-model:value="form.userName" placeholder="请输入昵称" />
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
      <a-form-item
        label="确认密码"
        name="checkPassword"
        :rules="[{ required: true, message: '请确认密码' }]"
      >
        <a-input-password
          v-model:value="form.checkPassword"
          placeholder="请确认密码"
        />
      </a-form-item>

      <div class="tips">
        已有账号？
        <RouterLink to="/user/login">立即登录</RouterLink>
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%"
          >注册</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { UserRegisterRequest, UserControllerService } from "../../../generated";

const form = reactive<UserRegisterRequest>({
  userAccount: "",
  userName: "",
  userPassword: "",
  checkPassword: "",
});
const router = useRouter();
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
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

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<style scoped>
#userRegisterView {
  max-width: 360px;
  margin: 0 auto;
}

.title {
  text-align: center;
  margin-bottom: 16px;
}
.tips {
  color: #bbb;
  text-align: right;
  font-size: 13px;
  margin-bottom: 13px;
}
</style>
