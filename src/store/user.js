import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";
export default {
    namespaced: true,
    state: () => ({
        loginUser: {
            userName: "未登录",
        },
    }),
    actions: {
        async getLoginUser({ commit, state }, payload) {
            const res = await UserControllerService.getLoginUserUsingGet();
            console.log("getLoginUser", res.data);
            if (res.code === 0) {
                commit("updateUser", res.data);
                console.log("state", state);
            }
            else {
                commit("updateUser", {
                    ...state.loginUser,
                    userRole: ACCESS_ENUM.NOT_LOGIN,
                });
            }
        },
    },
    mutations: {
        updateUser(state, payload) {
            state.loginUser = payload;
        },
    },
};
//# sourceMappingURL=user.js.map