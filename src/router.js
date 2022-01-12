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
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) next();
        else next("/login");
      },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue")
        },
        {
          path: "/uploadinfo",
          name: "uploadinfo",
          component: () => import("@/view/pages/kmhs/UploadInformasi.vue")
        },
        {
          path: "/validasiaktas",
          name: "validasiaktas",
          component: () => import("@/view/pages/kmhs/ValidasiAktivitas.vue")
        },
        {
          path: "/listaktas",
          name: "listaktas",
          component: () => import("@/view/pages/kmhs/ListAktivitas.vue")
        },
        {
          path: "/pencarianaktas",
          name: "pencarianaktas",
          component: () => import("@/view/pages/kmhs/PencarianAktivitas.vue")
        },
        {
          path: "/mahasiswamanage",
          name: "mahasiswamanage",
          component: () => import("@/view/pages/kmhs/ManageMahasiswa.vue")
        },
        {
          path: "/detailaktas/:nim",
          name: "detailaktas",
          component: () => import("@/view/pages/kmhs/DetailAktas.vue")
        },
        {
          path: "/usermanage",
          name: "usermanage",
          component: () => import("@/view/pages/kmhs/ManageUser.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/view/pages/auth/LoginMahasiswa"),
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("token")) next();
        else next("/dashboard");
      }
    },
    {
      path: "/login/admin",
      name: "loginAdmin",
      component: () => import("@/view/pages/auth/LoginAdmin"),
      beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("token")) next();
        else next("/dashboard");
      }
    },
    {
      // the 404 route, when none of the above matches
      path: "*",
      name: "404",
      component: () => import("@/view/pages/error/Error-3.vue")
    }
  ]
});
