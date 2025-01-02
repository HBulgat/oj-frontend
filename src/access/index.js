import store from "@/store";
import router from "@/router";
import checkAccess from "./checkAccess";
import ACCESS_ENUM from "./accessEnum";
router.beforeEach(async (to, from, next) => {
    console.log("登录用户信息" + store.state.user.loginUser);
    let loginUser = store.state.user.loginUser;
    //如果没登陆，自动登录
    if (!loginUser || !loginUser.userRole) {
        await store.dispatch("user/getLoginUser");
        loginUser = store.state.user.loginUser;
    }
    const needAccess = to.meta?.access ?? ACCESS_ENUM.NOT_LOGIN;
    //要跳转的页面需要登录
    if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
        //如果没登录，跳转登录页
        if (!loginUser ||
            !loginUser.userRole ||
            loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
            next(`/user/login?redirect=${to.fullPath}`);
            return;
        }
        if (!checkAccess(loginUser, needAccess)) {
            next("/noAuth");
            return;
        }
    }
    next();
});
//# sourceMappingURL=index.js.map