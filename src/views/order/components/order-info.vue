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
    <div class="w-full shaw-1 h-16 p-4 flex justify-between absolute bottom-0 bg-white">
      <div class="flex-1 text-[13px] flex items-center lg:text-sm">
        {{$t('orderInfo.cashier')}}: <b> {{ orderInfo.clerk_name }}</b>
      </div>
      <div class="flex-1 justify-end flex gap-4">
        <a-button type="primary" status="success" shape="round"
          ><span class="text-[12px] font-bold lg:text-sm">{{$t('orderInfo.printer')}}</span></a-button
        >
        <a-button type="primary" :disabled="!orderInfo.refund_status==0" status="warning" shape="round" @click="isShow=true"
          ><span class="text-[12px] font-bold lg:text-sm">{{$t('orderInfo.refund')}}</span></a-button
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import CustomerCard from "./customer-card.vue";
import orderInfoList from "./order-info-list.vue";
import { inject } from 'vue';
const isShow = inject('isShowRefundModal');
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
const onRefundOrder= ()=>{
  emit('refundOrder');
}
</script>
