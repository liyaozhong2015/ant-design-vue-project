import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFind from "../views/404"
import Forbiden from "../views/403"
import nProgress from "nprogress";
import { isLogin, check } from "@/utils/auth";
let originPush = VueRouter.prototype.push
let originReplace = Vue.prototype.originReplace

VueRouter.prototype.push = function (location, res, rej) {
  if (res && rej) {
    originPush.call(this, location, res, rej)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

VueRouter.prototype.replace = function (location, res, rej) {
  if (res && rej) {
    originReplace.call(this, location, res, rej)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "Userlayout" */ "../Layout/UserLayout"),
    children: [
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/LoginLayout"),
      },
      {
        path: "/user/register",
        name: "Register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user/RegisterLayout"),
      },
    ],
    //import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "Layout" */ "../Layout/BasicLayout.vue"),
    children: [
      {
        path: "/",
        redirect: "dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue"),
          }
        ]
      },
      {
        path: "/table",
        name: "table",
        component: { render: (h) => h("router-view") },
        meta: { icon: "table", title: "表格" },
        children: [
          {
            path: "/table/basetable",
            name: "basetable",
            meta: { title: "基础表格" },
            component: () =>
              import(/* webpackChunkName: "table" */ "../views/table/basetable"),
          },
          {
            path: "/table/toptable",
            name: "toptable",
            meta: { title: "升级表格" },
            component: () =>
              import(/* webpackChunkName: "table" */ "../views/table/toptable"),
          },
          {
            path: "/table/fenyetable",
            name: "fenyetable",
            meta: { title: "分页表格" },
            component: () =>
              import(/* webpackChunkName: "table" */ "../views/table/fenyetable"),
          }
        ]
      },
      {
        path: "/form",
        name: "from",
        component: { render: (h) => h("router-view") },
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm"),
          },
          {
            path: "/form/step-form",
            name: "stepform",
            hideChildrenInMenu: true,
            meta: { title: "分布表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info",

              },
              {
                path: "/form/step-form/info",
                name: "info",
                hideInMenu: true,
                component: () =>
                  import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1")
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                hideInMenu: true,
                component: () =>
                  import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2")
              },
              {
                path: "/form/step-form/result",
                name: "result",
                hideInMenu: true,
                component: () =>
                  import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3")
              }
            ]
          }
        ]
      }

    ]
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbiden,

  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFind,

  }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "user/login") {
      next({
        path: "/user/login"

      })
    } else if (to.path !== "/40") {
      path: "/403"
    }
    nProgress.done();
  }

  next();
})
router.afterEach(() => {

  nProgress.done();
})
export default router;
