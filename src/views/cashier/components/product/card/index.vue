<script setup>
import { defineProps, inject } from "vue";
import CustomAmonuts from "@/components/custom/Amonut.vue";
defineProps({
  product: {
    type: Object,
    default: {},
  },
  isShow: {
    type: Boolean,
  },
});
const valueStyle = {
  fontSize: "16px",
  fontWeight: "800",
};
const modalState = inject("modalState");
const setAttr = (product) => {
  modalState.setProduct(product);
};
</script>
<template>
  <div class="bg-white p-4 rounded-xl">
    <a-skeleton :animation="true" v-if="isShow">
      <a-skeleton-shape
        class="mb-2 m-auto w-full h-[120px]"
        :line-height="72"
      />
      <a-skeleton-line :line-height="22" :line-spacing="12" />
      <a-space direction="vertical" :style="{ width: '100%' }">
        <a-space class="w-full flex justify-between mt-2">
          <a-skeleton-line :line-height="20" :widths="[60]" />
          <a-skeleton-line :line-height="20" :widths="[60]" />
        </a-space>
      </a-space>
    </a-skeleton>
    <div v-else>
      <div class="rounded-lg overflow-hidden">
        <a-image
          width="100%"
          height="150"
          fit="cover"
          :src="product.image"
          :preview="false"
        />
        <div
          v-if="product.stock === 0"
          class="absolute pt-[2px] pb-[2px] top-[17px] left-[17px] bg-gray-400 text-blue-50 text-[10px] rounded-tl-lg rounded-br-lg px-1"
        >
          {{ $t("soldOut") }}
        </div>
      </div>
      <div class="font-500 pr-1">
        <div class="overflow-hidden text-ellipsis whitespace-nowrap goodsName">
          {{ product.store_name }}
        </div>
        <custom-amonuts :amount="Number(product.price)" :valueStyle="valueStyle" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
