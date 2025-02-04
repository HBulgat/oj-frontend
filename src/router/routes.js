import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import QuestionSubmitView from "@/views/question/QuestionSubmitView.vue";
import ViewQuestionView from "@/views/question/ViewQuestionView.vue";
import ViewQuestionSubmitView from "@/views/question/ViewQuestionSubmitView.vue";
import UserMessageView from "@/views/user/UserMessageView.vue";
import { useStore } from "vuex";
const store = useStore();
export const routes = [
    {
        path: "/",
        name: "主页",
        component: QuestionsView,
    },
    {
        path: "/user/message",
        name: "用户信息",
        component: UserMessageView,
        meta: {
            access: ACCESS_ENUM.USER,
        },
    },
    {
        path: "/user",
        name: "用户",
        component: UserLayout,
        meta: {
            hideInMenu: true,
        },
        children: [
            {
                path: "/user/login",
                name: "用户登录",
                component: UserLoginView,
                meta: {
                    hideInMenu: true,
                },
            },
            {
                path: "/user/register",
                name: "用户注册",
                component: UserRegisterView,
                meta: {
                    hideInMenu: true,
                },
            },
        ],
    },
    {
        path: "/view/question/:id",
        name: "在线做题",
        props: true,
        component: ViewQuestionView,
        meta: {
            access: ACCESS_ENUM.USER,
            hideInMenu: true,
        },
    },
    {
        path: "/questions",
        name: "浏览题目",
        component: QuestionsView,
        meta: {
            hideInMenu: true,
        },
    },
    {
        path: "/question_submit",
        name: "浏览题目提交",
        component: QuestionSubmitView,
        meta: {
            access: ACCESS_ENUM.USER,
        },
    },
    {
        path: "/view/question_submit/:id",
        name: "题目提交详情",
        props: true,
        component: ViewQuestionSubmitView,
        meta: {
            access: ACCESS_ENUM.USER,
            hideInMenu: true,
        },
    },
    {
        path: "/add/question",
        name: "创建题目",
        component: AddQuestionView,
        meta: {
            access: ACCESS_ENUM.ADMIN,
        },
    },
    {
        path: "/update/question",
        name: "更新题目",
        component: AddQuestionView,
        meta: {
            access: ACCESS_ENUM.ADMIN,
            hideInMenu: true,
        },
    },
    {
        path: "/question/manage",
        name: "题目管理",
        component: ManageQuestionView,
        meta: {
            access: ACCESS_ENUM.ADMIN,
        },
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    // },
    // {
    //   path: "/admin",
    //   name: "仅管理员可见",
    //   component: AdminView,
    //   meta: {
    //     access: ACCESS_ENUM.ADMIN,
    //   },
    // },
    {
        path: "/noAuth",
        name: "权限缺失",
        component: NoAuthView,
        meta: {
            hideInMenu: true,
            access: ACCESS_ENUM.NOT_LOGIN,
        },
    },
];
//# sourceMappingURL=routes.js.map