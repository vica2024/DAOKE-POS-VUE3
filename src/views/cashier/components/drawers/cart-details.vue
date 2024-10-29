<script setup>
import { defineProps, inject, reactive, ref, watch } from "vue";
import { useCustomerStore, useCashierStore } from "@/store";
import { cashierCompute, cashierCartList } from "@/api/order.js";
import cartDetailsList from "./cart-details-list.vue";
const drawerState = inject("drawerState");
const width60Percent = window.innerWidth * 0.55;
const payPrice = ref(0);
const cartList = ref([]);
const count = ref(0);
const customerInfo = useCustomerStore();
const cashierInfo = useCashierStore();

watch(
  () => drawerState.showCartDetails,
  (isOpen) => {
    if (isOpen) {
      fetchCashierCartList();
    }
  }
);

// Fetch cart list and update the cart state
const fetchCashierCartList = async () => {
  let params = {};
  if (customerInfo.uid === 0) {
    params.tourist_uid = customerInfo.tourist_uid;
  }
  const { data } = await cashierCartList(
    customerInfo.uid,
    cashierInfo.id,
    params
  );
  cartList.value = data.valid;
  count.value = data.count;
  const cart_ids = [];
  for (const element of data.valid) {
    const { cart } = element;
    for (const item of cart) {
      if (!cart_ids.includes(item.id)) {
        cart_ids.push(item.id);
      }
    }
  }
  await fetchCashierCompute(customerInfo.uid, cart_ids);
};

//To calculate the cart price.
const fetchCashierCompute = async (uid, cartIds) => {
  const { data } = await cashierCompute(uid, {
    cart_id: cartIds,
    coupon: false,
    coupon_id: 0,
    integral: false,
  });
  payPrice.value = data.totalPrice;
};
</script>

<template>
  <a-drawer
    :width="width60Percent"
    :title="$t('cartOrderDetails')"
    v-model:visible="drawerState.showCartDetails"
    :footer="false"
  >
    <cart-details-list
      :payPrice="payPrice"
      :cartList="cartList"
      :count="count"
    />
  </a-drawer>
</template>
<style scoped lang="less"></style>
