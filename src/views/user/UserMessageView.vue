<template>
  <div id="userMessageView">
    <a-card>
      <a-descriptions class="margin-top" title="简介" :column="3" bordered>
        <a-descriptions-item>
          <template v-slot:label>
            <!-- <i class="a-icon-picture-outline"></i> -->
            头像
          </template>
          <img
            class="img"
            src="../../assets/avatar.png"
            height="40px"
            width="40px"
          />
        </a-descriptions-item>
        <a-descriptions-item>
          <template v-slot:label>
            <!-- <i class="a-icon-user"></i> -->
            昵称
          </template>
          {{ userData.userName }}
        </a-descriptions-item>
        <a-descriptions-item>
          <template v-slot:label>
            <!-- <i class="a-icon-user"></i> -->
            用户角色
          </template>
          {{ convertUserRoleToChinese(userData.userRole as string) }}
        </a-descriptions-item>
        <a-descriptions-item>
          <template v-slot:label>
            <!-- <i class="a-icon-user"></i> -->
            简介
          </template>
          {{ userData.userProfile === null ? "空白" : userData.userProfile }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>
<script setup lang="ts">
import ACCESS_ENUM from "@/access/accessEnum";
import { LoginUserVO, UserControllerService, UserVO } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { onMounted, ref } from "vue";

const userData = ref<LoginUserVO>({
  createTime: "",
  id: 0,
  updateTime: "",
  userAvatar: "",
  userName: "",
  userProfile: "",
  userRole: "",
} as LoginUserVO);
const loadData = async () => {
  const res = await UserControllerService.getLoginUserUsingGet();
  if (res.code === 0) {
    userData.value = res.data;
  } else {
    Message.error("加载失败，", res.message as any);
  }
};
const convertUserRoleToChinese = (userRole: string) => {
  switch (userRole) {
    case ACCESS_ENUM.ADMIN:
      return "管理员";
    case ACCESS_ENUM.NOT_LOGIN:
      return "未登录";
    case ACCESS_ENUM.USER:
      return "普通用户";
    default:
      return "被ban";
  }
};
onMounted(() => {
  loadData();
});
</script>
<style scoped>
#userMessageView {
}
</style>
