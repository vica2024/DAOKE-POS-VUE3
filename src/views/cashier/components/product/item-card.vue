<template>
  <div
    v-resize="225"
    class="mt-4 overflow-y-auto"
  >
    <div
      v-if="productList.length > 0"
      class="grid grid-cols-1 gap-3 transition-transform duration-300 ease-in-out transform xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
    >
      <card
        v-for="(item, index) in productList"
        :key="index"
        :product="item"
        class="cursor-pointer hover:shadow-lg"
        @click="setAttr(item)"
      />
    </div>
    <div class="flex items-center bg-white rounded-2xl" v-resize="225" v-else>
      <div class="w-3/4 m-auto text-center">
        <img alt="" src="../../../../assets/images/no-order.png" class="w-1/2 m-auto" />
        <span class="text-gray-400 text-xs">{{ $t("noGoodsData") }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import card from "./card/index.vue";
import { defineProps, inject } from "vue";
const props = defineProps({
  productList: {
    type: Array,
    deafult: [],
  },
});
const modalState = inject("modalState");
const setAttr = (product) => {
  modalState.productAttr.uniqueId = null;
  modalState.productAttr.product_id = product.id;
  modalState.productAttr.cart_id =[];
  modalState.productAttr.defaultSku = null;
  modalState.productAttr.show = true;
};
</script>
