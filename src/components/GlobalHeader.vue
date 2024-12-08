<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="100px"> </a-col>
    <a-col flex="auto">
      <div>
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../assets/oj-logo.svg" />
              <div class="title">OJ</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">{{
            item.name
          }}</a-menu-item>
        </a-menu>
      </div>
    </a-col>
    <a-col flex="100px">
      <div>
        {{
          store.state.user?.loginUser?.userRole === ACCESS_ENUM.NOT_LOGIN
            ? "未登录"
            : store.state.user?.loginUser?.userName
        }}
      </div>
    </a-col>
    <a-col flex="100px">
      <div>
        <template
          v-if="store.state.user.loginUser.userRole === ACCESS_ENUM.NOT_LOGIN"
          ><a-button type="primary" status="success" @click="doLogin()"
            >登录</a-button
          ></template
        ><template v-else
          ><a-button type="primary" status="danger" @click="doLogout()"
            >登出</a-button
          ></template
        >
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
import { Message } from "@arco-design/web-vue";
import { UserControllerService } from "../../generated";

const router = useRouter();
const route = useRoute();
const store = useStore();

const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    if (!checkAccess(store.state.user.loginUser, item?.meta?.access as string))
      return false;
    if (item?.meta?.hideInMenu ?? false) return false;
    return true;
  });
});
console.log("visibleRoutes", visibleRoutes);
const selectedKeys = ref(["/user/message"]);
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
const doLogin = () => {
  router.push({
    path: "/user/login",
  });
};
const doLogout = async () => {
  let loginUser = store.state.user.loginUser;
  if (loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
    Message.error("未登录");
    console.log("未登录");
    return;
  }
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
    const needAccess = route.meta.access;
    console.log("doLogout", loginUser, route.name);
    if (!checkAccess(loginUser, needAccess as any)) {
      router.push({
        path: "/",
      });
    }
  } else {
    Message.error("登出失败，", res.message);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}
.title {
  color: #444;
  margin-left: 16px;
}
.logo {
  height: 48px;
}
</style>
