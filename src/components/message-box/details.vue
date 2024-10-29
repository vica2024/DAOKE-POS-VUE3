<template>
  <a-modal width="60%" v-model:visible="isShow" :footer="false" :mask-closable="false">
    <template #title>
      <a-tabs :active-key="active" type="text" class="mt-[20px]" @tab-click="onChange">
        <a-tab-pane key="all" title="全部" />
        <a-tab-pane key="message" title="消息" />
        <a-tab-pane key="notice" title="通知" />
        <a-tab-pane key="todo" title="待办" />
      </a-tabs>
    </template>
    <div v-resize="330" class="w-full h-full">
      <div class="flex h-full">
        <detailsLeft :list="list" @setContent="setView" />
        <detailsRight :content="content" :title="title" />
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import { inject, ref } from "vue";
import detailsLeft from "./details-left.vue";
import detailsRight from "./details-right.vue";
import {
  queryMessageList,
  setMessageStatus,
} from '@/api/message';
const showNoticeModal = inject("showNoticeModal");
const isShow = ref(showNoticeModal);
let data = [];
const list = ref([]);
const title = ref('');
const content = ref('');
const active = ref('all');
const handleOk = () => {
  isShow.value = false;
};
const handleCancel = () => {
  isShow.value = false;
};
const setView = (item, index) => {
  content.value = item.content;
  title.value = item.title;
  list.value[index].isReaded=1;
}
const onChange = (e) => {
  active.value = e;
  let ls = [];
  if (active.value == 'all') {
    list.value = data;
  } else {
    data.forEach((item) => {
      if (item.type == active.value) {
        ls.push(item);
      }
    })
    list.value = ls;
  }
  setView( list.value[0],0);
}
const getMessageList = () => {
  queryMessageList().then((res) => {
    data = res.data;
    onChange(active.value)
  });
}
getMessageList();
</script>