<template>
  <div class="h-full relative">

    <div class="p-4">
      <customer-card
        :integral="orderInfo.integral"
        :balance="orderInfo.now_money"
        :avatar="orderInfo.avatar"
        :fullName="orderInfo.nickname"
      />
    </div>
    <order-info-list
      :remarks="orderInfo.mark"
      :cartList="cartList"
      :count="orderInfo.total_num"
      :payPrice="orderInfo.pay_price"
      :totalPrice="orderInfo.total_price"
    />
    <div class="w-full shaw-1 h-16 p-4 flex justify-between absolute bottom-0">
      <div class="flex-1 text-[13px] flex items-center lg:text-sm">
        收银员: <b> {{ orderInfo.clerk_name }}</b>
      </div>
      <div class="flex-1 justify-end flex gap-4">
        <a-button type="primary" status="success" shape="round"
          ><span class="text-[12px] font-bold lg:text-sm"
            >打印小票</span
          ></a-button
        >
        <!-- <a-button type="primary" status="warning" shape="round"
          ><span class="text-[12px] font-bold lg:text-sm">订单退款</span></a-button
        > -->
      </div>
    </div>
  </div>
</template>
<script setup>
import CustomerCard from "./customer-card.vue";
import orderInfoList from "./order-info-list.vue";
defineProps({
  orderInfo: {
    type: {
      type: Object,
      default: {},
    },
  },
  cartList: {
    type: Array,
    default: [],
  },
});
</script>
