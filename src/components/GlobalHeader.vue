<template>
  <a-row id="globalHeader" :wrap="false">
    <a-col flex="280px">
      <router-link to="/">
        <div class="title-bar">
          <img class="logo" src="../assets/oj-logo.png" alt="logo" />
          <div class="title">XOJ判题系统</div>
        </div>
      </router-link>
    </a-col>
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        v-model:selected-keys="selectedKeys"
        @click="doMenuClick"
        :items="visibleRoutes"
      />
    </a-col>
    <a-col flex="120px">
      <div class="user-login-status">
        <div
          v-if="
            !(store.state.user?.loginUser?.userRole === ACCESS_ENUM.NOT_LOGIN)
          "
        >
          <a-dropdown>
            <a-space>
              <div v-if="store.state.user.loginUser?.userAvatar">
                <a-avatar :src="store.state.user.loginUser.userAvatar" />
              </div>
              <div v-else>
                <a-avatar style="background-color: #87d068">
                  {{ store.state.user?.loginUser?.userName[0] ?? "U" }}
                </a-avatar>
              </div>
              {{ store.state.user?.loginUser?.userName ?? "unknown" }}
            </a-space>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="doLogout">
                  <LogoutOutlined />
                  退出登录
                </a-menu-item>
                <a-menu-item @click="toUserMessageView">
                  <UserOutlined />
                  个人主页
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div v-else>
          <a-button type="primary" href="/user/login">登录</a-button>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { routes } from "@/router/routes";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { message } from "ant-design-vue";
import { UserControllerService } from "../../generated";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons-vue";
const router = useRouter();
const route = useRoute();
const store = useStore();

const visibleRoutes = computed(() => {
  return routes
    .filter((item, index) => {
      if (item.meta?.hideInMenu) {
        return false;
      }
      if (
        !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
      )
        return false;
      if (item?.meta?.hideInMenu ?? false) return false;
      return true;
    })
    .map((route) => ({
      key: route.path,
      label: route.name,
      title: route.name,
    }));
});
// console.log("visibleRoutes", visibleRoutes);
const selectedKeys = ref(["/"]);
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = ({ key }) => {
  router.push({
    path: key,
  });
};
// const doLogin = () => {
//   router.push({
//     path: "/user/login",
//   });
// };
const toUserMessageView = () => {
  router.push({
    path: "/user/message",
  });
};
const doLogout = async () => {
  let loginUser = store.state.user.loginUser;
  if (loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
    message.error("未登录");
    // console.log("未登录");
    return;
  }
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
    const needAccess = route.meta.access;
    // console.log("doLogout", loginUser, route.name);
    if (!checkAccess(loginUser, needAccess as any)) {
      router.push({
        path: "/",
      });
    }
  } else {
    message.error("登出失败，", res.message);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#globalHeader .title-bar {
  display: flex;
  align-items: center;
}
.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}
.logo {
  height: 48px;
  margin-left: 50px;
}
</style>
