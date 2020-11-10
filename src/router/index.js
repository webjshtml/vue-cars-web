import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/index/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Home,
    children: [
      {
        path: "/user",
        name: "User",
        meta: {
          title: "用户中心"
        },
        component: () => import("../views/user/index")
      },
      /**
       * 帐户
       */
      // 登录
      {
        path: "/login",
        name: "Login",
        meta: {
          title: "登录"
        },
        component: () => import("../views/account/login")
      },
      // 注册
      {
        path: "/register",
        name: "Register",
        meta: {
          title: "注册"
        },
        component: () => import("../views/account/register")
      },
      // 忘记密码
      {
        path: "/forget",
        name: "Forget",
        meta: {
          title: "忘记密码"
        },
        component: () => import("../views/account/forget")
      },
      // 安全设置 - 首页
      {
        path: "/safe",
        name: "Safe",
        meta: {
          title: "注册",
          keyword: "adfadsf",
          icon: ""
        },
        component: () => import("../views/safe/index")
      },
      {
        path: "/password",
        name: "Password",
        meta: {
          title: "重置密码"
        },
        component: () => import("../views/safe/password")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
