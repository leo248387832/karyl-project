<template>
  <div class="mdui-row-xs-12">
    <TextEdit
      class="mdui-col-md-12"
      v-model:content="videoId"
      label="BV号 / AV号"
      placeholder="12345"
    />
  </div>
  <div>
    <MduiButton
      :allow="!state.completeInputState || state.requestState"
      ripple
      raised
      class="mdui-m-r-1 mdui-m-b-1"
      color="theme-accent"
      v-on:click="getVideoCoverUrl()"
    >
      <MduiIcon :icon="MATERIAL_ICON_LINK" />&nbsp;获取
    </MduiButton>
    <MduiButton
      ripple
      raised
      class="mdui-m-r-1 mdui-m-b-1"
      color="green-600"
      v-on:click="resetAll"
    >
      <MduiIcon :icon="MATERIAL_ICON_REFRESH" />&nbsp;重置
    </MduiButton>
  </div>
  <p v-show="state.requestState">加载中...</p>
  <br />
  <TextEdit
    class="mdui-col-md-12"
    v-model:content="result"
    v-show="result"
    label="结果"
  />
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import TextEdit from "@/components/elements/normal/TextEdit.vue";
import MduiButton from "@/components/elements/mdui/MduiButton.vue";
import MduiIcon from "@/components/elements/mdui/MduiIcon.vue";
import { MATERIAL_ICON_LINK, MATERIAL_ICON_REFRESH } from "@/utils/MaterialIcons";
import { showDialog } from "@/utils/Dialog";
import { fetchVideoCover } from "@/api/video";
import { isVideo, isBV } from "@/utils/IdCheck";
import { bv2av } from "@/utils/BIdTools";

const state = reactive({
  requestState: false,
  completeInputState: false,
});

const videoId = ref("");
const result = ref("");

function resetAll() {
  if (state.requestState) {
    showDialog("Info", "请求进行中...");
    return;
  }

  videoId.value = "";
  result.value = "";
}

async function getVideoCoverUrl() {
  if (state.requestState) {
    return;
  }

  if (!state.completeInputState) {
    return;
  }

  if (isBV(videoId.value)) {
    videoId.value = bv2av(videoId.value);
  }
  const reqId = videoId.value.replace("av", "");

  try {
    state.requestState = true;
    const res = await fetchVideoCover(reqId);
    result.value = res.data.pic;
  } catch (e) {
    showDialog("Error", (e as Error).message);
  } finally {
    state.requestState = false;
  }
}

watch(videoId, (newValue, oldValue) => {
  if (newValue === oldValue) {
    return;
  }
  state.completeInputState = isVideo(videoId.value);
});
</script>
