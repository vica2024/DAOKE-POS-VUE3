<template>
  <div class="flex w-[48%] min-w-[390px] bg-white rounded-xl overflow-hidden">
    <cart
      ref="cartRef"
      :toolsButtons="toolsButtons"
      :cashierInfo="cashierStore"
      :customerInfo="customerStore"
    />
    <tools :buttons="toolsButtons" />
  </div>
</template>
<script setup>
import { defineExpose, ref, inject } from "vue";
import cart from "./cart.vue";
import tools from "./tools.vue";
import { useCashierStore, useCustomerStore } from "@/store";

const cartRef = ref(null);
const cashierStore = useCashierStore();
const customerStore = useCustomerStore();
const modalState = inject("modalState");


const toolsButtons = ref([
{
    label: "temporayCustomer",
    value: 0,
    disabled: true,
    operate: () => {
      customerStore.resetState();
    },
  },
  {
    label: "hangOrder",
    value: 0,
    disabled: true,
    operate: () => {
      customerStore.resetState();
      cartRef.value?.handUp();
    },
  },
  {
    label: "recharge",
    value: 0,
    disabled: true,
    operate: () => {
      modalState.showRecharge=true; 
    },
  },
  {
    label: "changePrice",
    value: 0,
    disabled: true,
    operate: () => {
     modalState.showRecharge=true; 
    },
  },
  {
    label: "eCoupon",
    value: 0,
    disabled: true,
    operate: () => {

    },
  },
  {
    label: "remark",
    value: 0,
    disabled: true,
    operate: () => {
      modalState.showMark=true;
    },
  },
]);

const operateCartFinish = () => {
  cartRef.value?.fetchCashierCartList();
};

defineExpose({
  operateCartFinish,
});
</script>
