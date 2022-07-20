import { createApp } from "vue";
import { router } from "./router";
import VueMatomo from "vue-matomo";
import App from "./App.vue";
import VueGtag from "vue-gtag";
import mdui from "mdui";

mdui
  .$("body")
  .addClass(
    "mdui-drawer-body-left mdui-theme-primary-blue-indigo mdui-theme-accent-pink"
  );

router.afterEach((to) => {
  const baseTitle = " - 哔哩哔哩工具箱";
  if (to.name === undefined) {
    window.document.title = "404";
    return;
  }
  window.document.title = `${to.meta.pageTitle}${baseTitle}`;
});

createApp(App)
  .use(router)
  .use(
    VueGtag,
    {
      pageTrackerScreenviewEnabled: true,
      config: { id: "G-SMXPN2V2GY" },
    },
    router
  )
  .use(VueMatomo, {
    host: "https://tracker.rsplwe.com",
    siteId: 1,
    trackerFileName: "matomo",
    router,
    enableLinkTracking: true,
    requireConsent: false,
    trackInitialView: true,
    enableHeartBeatTimer: true,
    heartBeatTimerInterval: 15,
  })
  .mount("#app");
