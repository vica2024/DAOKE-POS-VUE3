<template>
  <div
    class="flex-1 pl-2 overflow-hidden flex-col items-center space-y-2 relative"
  >
    <div class="w-full">
      <a-typography-paragraph
       style="margin-bottom: -1px;"
        :ellipsis="{
          rows: 1,
        }"
        >{{ title }}</a-typography-paragraph
      >
      <div class="flex justify-between">
        <span
          class="cursor-pointer flex items-center text-gray-400 text-xs hover:text-gray-600"
          @click="setAttr(cart_num, sku, cart_id, product_id, unique)"
        >
          {{ sku }}&nbsp;x{{ cart_num }}&nbsp;
          <icon-caret-down size="16" />
        </span>
        <a-popconfirm
          :content="$t('deleteCartConfirm')"
          type="warning"
          @ok="del_cart(cart_id)"
          :okText="$t('yes')"
          :cancelText="$t('no')"
        >
          <span class="cursor-pointer text-gray-500 pt-1 pr-1">
            <icon-delete size="16" />
          </span>
        </a-popconfirm>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <custom-amonuts :amount="Number(price)" :valueStyle="valueStyle" />
      <span size="mini" class="text-[10px]"
        >{{ $t("discount_amount") }} -0</span
      >
    </div>
  </div>
</template>
<script setup>
import { defineProps, inject } from "vue";
import CustomAmonuts from "@/components/custom/Amonut.vue";
defineProps({
  product_id: {
    type: Number,
  },
  cart_id: {
    type: Number,
    default: null,
  },
  title: {
    type: String,
  },
  sku: {
    type: String,
  },
  unique: {
    type: String,
  },
  cart_num: {
    type: Number,
    default: 1,
  },
  price: {
    type: String,
    default: 0,
  },
});
const del_cart = inject("delCart");
const modalState = inject("modalState");
const valueStyle = {
  fontSize: "16px",
  fontWeight: "800",
  marginTop: "-7px",
};
const setAttr = (num, newSku, cart_id, product_id, uniqueId) => {
  modalState.productAttr.product_id = product_id;
  modalState.productAttr.defaultSku = newSku.includes(",")
    ? newSku.split(",")
    : [newSku];
  modalState.productAttr.cart_id = cart_id;
  modalState.productAttr.cart_num = num;
  modalState.productAttr.show = true;
  modalState.productAttr.uniqueId = uniqueId;
};
</script>
