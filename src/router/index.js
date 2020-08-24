import Vue from "vue";
import VueRouter from "vue-router";
import MainContent from "../views/MainContent.vue";
// import Info from "../views/Info.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainContent",
    component: MainContent,
  },
  {
    path: "/info",
    name: "Info",
    // component: Info,

    component: () => import(/* webpackChunkName: "info" */ "../views/Info.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  // NOTA: la riga qui sotto è importante quando si fa il deploy dell'appliczione, per settare il path di root corretto
  // BASE_URL - corresponds to the publicPath option in vue.config.js and is the base path your app is deployed at.
  base: process.env.BASE_URL,
  routes,
});

export default router;
