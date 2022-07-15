<template>
  <!-- Background -->
  <div :style="backgroundStyle"></div>

  <!-- Drawer -->
  <div ref="_drawer" class="mdui-drawer drawer-opactity">
    <ul class="mdui-list">
      <li class="mdui-subheader mdui-text-color-white">Tools</li>
      <router-link
        custom
        v-slot="{ isActive, navigate }"
        v-for="item in navigateItems"
        :key="item.pageTitle"
        :to="item.pagePath"
      >
        <li
          :class="[
            'mdui-text-color-white',
            'mdui-list-item',
            'mdui-ripple',
            isActive ? 'mdui-list-item-active' : '',
          ]"
          @click="navigate"
        >
          <MduiIcon
            :icon="item.pageIcon"
            class="mdui-list-item-icon mdui-text-color-white"
          />
          <div class="mdui-list-item-content">
            <div class="mdui-list-item-title">{{ item.pageTitle }}</div>
            <div class="mdui-list-item-text">{{ item.pageDescription }}</div>
          </div>
        </li>
      </router-link>
    </ul>
  </div>

  <!-- AppBar -->
  <div class="mdui-toolbar mdui-text-color-white">
    <button v-on:click="drawer.toggle" class="mdui-btn mdui-btn-icon">
      <MduiIcon :icon="MATERIAL_ICON_LIST" />
    </button>
    <a class="mdui-typo-title">${title}</a>
    <div class="mdui-toolbar-spacer"></div>

    <!-- Menu List -->
    <ul id="app-toolbar-menu" class="mdui-menu">
      <li class="mdui-menu-item">
        <a v-on:click="openAboutDialog" class="mdui-ripple">
          <MduiIcon class="mdui-menu-item-icon" :icon="MATERIAL_ICON_INFO" />关于
        </a>
      </li>
    </ul>

    <!-- Open Menu Button -->
    <button
      id="app-toolbar-menu-button"
      v-on:click="openAppBarMenu"
      class="mdui-btn mdui-btn-icon"
    >
      <MduiIcon :icon="MATERIAL_ICON_MENU" />
    </button>
  </div>

  <!-- Content -->
  <div class="mdui-container-fluid mdui-typo mdui-p-x-3 mdui-text-color-white">
    <div :class="[route.path != '/' ? 'mdui-row' : '']">
      <h2 v-if="route.path != '/'" class="mdui-typo-title">
        <MduiIcon :icon="(route.meta.pageIcon as string)" />&nbsp;
        {{ route.meta.pageTitle }}
      </h2>
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import BackgroundImageWithDay from "@/assets/Background/DeviantArt/tokyo_street_day_by_arsenixc.jpg";
import BackgroundImageWithSunset from "@/assets/Background/DeviantArt/tokyo_street_sunset_by_arsenixc.jpg";
import BackgroundImageWithNight from "@/assets/Background/DeviantArt/tokyo_street_night_by_arsenixc.jpg";
import { StyleValue, ref, onMounted } from "vue";
import { routerDefine } from "@/router";
import { useRoute } from "vue-router";

import "mdui/dist/css/mdui.css";
import mdui from "mdui";
import MduiIcon from "@/components/elements/mdui/MduiIcon.vue";
import {
  MATERIAL_ICON_INFO,
  MATERIAL_ICON_MENU,
  MATERIAL_ICON_LIST,
} from "@/utils/MaterialIcons";
import { showDialog } from "@/utils/Dialog";

const route = useRoute();
const drawer: any = ref(null);
const _drawer: any = ref(null);

interface RouteMeta {
  pageTitle: string;
  pageIcon: string;
  pagePath: string;
  pageDescription: string;
}

const getBackgroundImage = (): string => {
  const data = [
    [0, 6, BackgroundImageWithNight],
    [7, 16, BackgroundImageWithDay],
    [17, 19, BackgroundImageWithSunset],
    [18, 24, BackgroundImageWithNight],
  ];
  const nowHours = new Date().getHours();
  let result = BackgroundImageWithDay;
  data.forEach((value) => {
    const leftHours = value[0];
    const rightHours = value[1];
    const HoursPeriod = value[2];
    if (nowHours >= leftHours && nowHours <= rightHours) {
      result = HoursPeriod as string;
    }
  });
  return (result as unknown) as string;
};

const backgroundStyle: StyleValue = {
  background: `url(${getBackgroundImage()})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  zIndex: -1,
  position: "fixed",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const getRouteMetas = (): RouteMeta[] => {
  const result = routerDefine.map((item) => {
    return {
      pageTitle: item.meta.pageTitle,
      pageIcon: item.meta.pageIcon,
      pagePath: item.path,
      pageDescription: item.meta.pageDescription,
    };
  });
  return result;
};

const openAppBarMenu = () => {
  const inst = new mdui.Menu("#app-toolbar-menu-button", "#app-toolbar-menu");
  inst.open();
};

const openAboutDialog = () => {
  const content =
    '<div class="mdui-typo">' +
    '    Background Source: <a href="https://www.deviantart.com/arsenixc">@ArseniXC</a><br>' +
    '    E-mail: <a href="mailto:i@rsplwe.com">i@rsplwe.com</a><br>' +
    '    Framework: <a href="https://www.mdui.org/">MDUI</a>,<a href="https://vuejs.org/index.html">Vue.js</a><br>' +
    '    <br>Copyright &copy; 2017-2022 <a href="https://github.com/yescallop">Scallop Ye</a>, <a href="https://github.com/Rsplwe">Rsplwe</a><br><br>' +
    "    <b>願ったんなら叶えてしまえやって</b>" +
    "</div>";
  showDialog("关于", content);
};

// TODO: 订阅提示

const navigateItems = getRouteMetas();

onMounted(() => {
  drawer.value = new mdui.Drawer(_drawer.value);
});
</script>
<style scoped>
.drawer-opactity {
  background-color: rgba(0, 0, 0, 0.35);
}
</style>
