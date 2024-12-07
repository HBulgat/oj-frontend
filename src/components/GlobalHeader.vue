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
      <div>{{ store.state.user?.loginUser?.userName ?? "未登录" }}</div>
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
const selectedKeys = ref(["/"]);
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "bulgat",
    userRole: ACCESS_ENUM.ADMIN,
  });
  console.log("----------------");
}, 3000);
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
