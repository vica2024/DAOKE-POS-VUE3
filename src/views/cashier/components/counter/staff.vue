<script setup>
import { defineProps, inject, computed } from "vue";

const cashierModalState = inject('CACHIER_MODAL_STATE');

const props = defineProps({
  cashierInfo: {
    type: Object,
    default: {},
  },
});
const cashierValue = computed(() => {
  return `${t("cashierStoreLoacate", { store: props.cashierInfo.account })}`;
});
</script>
<template>
  <div>
    <a-skeleton :animation="true" v-if="!cashierInfo.id">
      <a-skeleton-shape class="mb-1 m-auto" shape="circle" />
      <a-skeleton-line :line-height="12" :line-spacing="5" />
      <a-space direction="vertical" :style="{ width: '100%' }">
        <a-space class="w-full flex justify-between">
          <a-skeleton-line :line-height="12" :widths="[35]" />
          <a-skeleton-line :line-height="12" :widths="[35]" />
        </a-space>
      </a-space>
    </a-skeleton>
    <div v-else class="w-full">
      <div class="text-center relative">
        <a-avatar :size="50" class="border-2 border-gray-300 cursor-pointer" @click="cashierModalState.seachCashierModalState=true">
          <img :src="cashierInfo.avatar" />
        </a-avatar>
        <icon-swap class="absolute right-0 left-0 bottom-[-5px] m-auto text-gray-400" />
      </div>
      <div class="vertical text-center mt-1">
        <h3
          class="font-bold text-sm overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {{ cashierInfo.staff_name }}
        </h3>
        <div class="text-gray-400 text-xs">
          <icon-location size="13" /><span class="font-bold">{{ cashierInfo.account }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
