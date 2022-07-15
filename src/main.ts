import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import mdui from "mdui";

mdui
  .$("body")
  .addClass(
    "mdui-drawer-body-left mdui-theme-primary-blue-indigo mdui-theme-accent-pink"
  );

router.afterEach((to) => {
  const baseTitle = " - ${title}";
  if (to.name === undefined) {
    window.document.title = "404";
    return;
  }
  window.document.title = `${to.meta.pageTitle}${baseTitle}`;
});

createApp(App).use(router).mount("#app");
