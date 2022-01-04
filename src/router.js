import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue"),
        },
        {
          path: "/uploadinfo",
          name: "uploadinfo",
          component: () => import("@/view/pages/kmhs/UploadInformasi.vue"),
        },
        {
          path: "/validasiaktas",
          name: "validasiaktas",
          component: () => import("@/view/pages/kmhs/ValidasiAktivitas.vue"),
        },
        {
          path: "/pencarianaktas",
          name: "pencarianaktas",
          component: () => import("@/view/pages/kmhs/PencarianAktivitas.vue"),
        },
        {
          path: "/laporaktas",
          name: "laporaktas",
          component: () => import("@/view/pages/kmhs/LaporanAktivitas.vue"),
        },
        {
          path: "/detailaktas",
          name: "detailaktas",
          component: () => import("@/view/pages/kmhs/DetailAktas.vue"),
        },
        {
          path: "/usermanage",
          name: "usermanage",
          component: () => import("@/view/pages/kmhs/ManageUser.vue"),
        },
        {
          path: "/custom-wizard",
          name: "wizard",
          component: () => import("@/view/pages/wizard/Wizard.vue"),
          children: [
            {
              path: "wizard-1",
              name: "wizard-1",
              component: () => import("@/view/pages/wizard/Wizard-1.vue"),
            },
            {
              path: "wizard-2",
              name: "wizard-2",
              component: () => import("@/view/pages/wizard/Wizard-2.vue"),
            },
            {
              path: "wizard-3",
              name: "wizard-3",
              component: () => import("@/view/pages/wizard/Wizard-3.vue"),
            },
            {
              path: "wizard-4",
              name: "wizard-4",
              component: () => import("@/view/pages/wizard/Wizard-4.vue"),
            },
          ],
        },
        {
          path: "/custom-plugins",
          name: "plugins",
          component: () => import("@/view/pages/plugins/Plugins.vue"),
          children: [
            {
              path: "cropper",
              name: "cropper",
              component: () => import("@/view/pages/plugins/Cropper.vue"),
            },
            {
              path: "treeselect",
              name: "treeselect",
              component: () => import("@/view/pages/plugins/Treeselect.vue"),
            },
          ],
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("@/view/pages/profile/Profile.vue"),
          children: [
            {
              path: "profile-1",
              name: "profile-1",
              component: () => import("@/view/pages/profile/Profile-1.vue"),
            },
            {
              path: "profile-2",
              name: "profile-2",
              component: () => import("@/view/pages/profile/Profile-2.vue"),
            },
            {
              path: "profile-3",
              name: "profile-3",
              component: () => import("@/view/pages/profile/Profile-3.vue"),
            },
            {
              path: "profile-4",
              name: "profile-4",
              component: () => import("@/view/pages/profile/Profile-4.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/custom-error",
      name: "error",
      component: () => import("@/view/pages/error/Error.vue"),
      children: [
        {
          path: "error-1",
          name: "error-1",
          component: () => import("@/view/pages/error/Error-1.vue"),
        },
        {
          path: "error-2",
          name: "error-2",
          component: () => import("@/view/pages/error/Error-2.vue"),
        },
        {
          path: "error-3",
          name: "error-3",
          component: () => import("@/view/pages/error/Error-3.vue"),
        },
        {
          path: "error-4",
          name: "error-4",
          component: () => import("@/view/pages/error/Error-4.vue"),
        },
        {
          path: "error-5",
          name: "error-5",
          component: () => import("@/view/pages/error/Error-5.vue"),
        },
        {
          path: "error-6",
          name: "error-6",
          component: () => import("@/view/pages/error/Error-6.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/view/pages/auth/login_pages/Login-1"),
    },
    {
      path: "/random",
      name: "random",
      component: () => import("@/view/pages/plugins/Plugins.vue"),
      children: [
        {
          path: "1",
          name: "1",
          component: () => import("@/view/pages/plugins/Treeselect.vue"),
        },
      ],
    },
    {
      path: "*",
      redirect: "/404",
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-3.vue"),
    },
  ],
});
