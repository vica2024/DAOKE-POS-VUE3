<script setup>
import {provide, reactive } from "vue";
import DrawerCustomerInfoDetails from "../drawers/customer-info-details.vue";
const { customerInfo } = defineProps({
  customerInfo: {
    type: Object,
  }
});
const CUSTOMER_DRAWER_STATE = reactive({
  createDrawerState: false,
});
provide("CUSTOMER_DRAWER_STATE", CUSTOMER_DRAWER_STATE);
</script>
<template>
  <div
    class="flex items-center p-4 bg-orange-100 shadow-lg rounded-xl mt-4 ml-4 mr-4 mb-1"
  >
    <a-avatar :size="52">
      <img alt="avatar" :src="customerInfo.avatar" />
    </a-avatar>
    <div class="flex-1 flex pl-1 justify-between">
      <div class="user-info">
        <h2 class="font-bold text-[13px] lg:text-[14px]">{{ customerInfo.uid==0?$t('temporayCustomer') :customerInfo.full_name}}</h2>
        <div class="flex text-[10px] lg:text-[12px]">
          <span class="mr-2">
            {{$t('balance')}}
            <b class="text-red-500 text-[12px] lg:text-[14px]">{{ customerInfo.balance }}</b>
          </span>
          <span>
            {{$t('integral')}}
            <b class="text-red-500 text-[12px] lg:text-[14px]">{{ customerInfo.integral }}</b>
          </span>
        </div>
      </div>
      <div class="min-w-[60px] h-[20px] flex items-center justify-end text-[#e87109] cursor-pointer lg:text-sm">
        <span @click="CUSTOMER_DRAWER_STATE.searchDrawerState = true" class="text-[12px] mr-1">{{ $t("switchCustomer") }}</span>
        <icon-swap />
      </div>
    </div>
      <!-- for customer infomation that to operate -->
      <drawer-customer-info-details />
  </div>
</template>

<style scoped lang="less"></style>
