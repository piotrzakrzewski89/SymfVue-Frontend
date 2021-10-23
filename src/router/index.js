import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import store from "../store/index.js";

Vue.use(VueRouter);

store.dispatch("autologin");

const authGuard = (to, from, next) => {
  if (store.getters.isAuth) {
    next();
  } else {
    next({ name: "Login" });
  }
};

const notAuthGuard = (to, from, next) => {
  if (!store.getters.isAuth) {
    next();
  } else {
    next({ name: "Table" });
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
      beforeEnter: notAuthGuard
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
      beforeEnter: notAuthGuard
  },
  {
    path: "/table",
    name: "Table",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Table.vue"),
      beforeEnter: authGuard
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),

  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Logout.vue"),
      beforeEnter: authGuard
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

if (store.getters.isAuth) {
  const expirationDate = new Date(localStorage.getItem("expires"));
  const now = new Date();

  if (expirationDate <= now) {
    store.dispatch("logout");
  } else {
    setTimeout(() => {
      store.dispatch("logout");
    }, expirationDate.getTime() - now.getTime());
  }
}
