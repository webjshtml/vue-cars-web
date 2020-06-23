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
        component: () => import("../views/user/index")
      },
      // 安全设置 - 首页
      {
        path: "/safe",
        name: "Safe",
        component: () => import("../views/safe/index")
      },
      {
        path: "/password",
        name: "Password",
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
