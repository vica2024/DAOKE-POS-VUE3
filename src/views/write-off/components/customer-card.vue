<script setup>
import { defineProps } from "vue";
defineProps({
  avatar:{
    type: String,
    default: '',
  },
  fullName: {
    type: String,
    default: '',
  },
  balance:{
   type:String,
    default:'0'
  },
  integral:{
    type:Number,
    default:'0'
  }
});
</script>
<template>
  <div class="flex items-center p-4 bg-[#fff8f2] rounded-xl">
    <a-avatar :size="52">
      <img alt="avatar" :src="avatar?avatar:'https://multi-store.crmeb.net/view_cashier/img/yonghu.908b01d3.png'" />
    </a-avatar>
    <div class="flex-1 flex pl-2 justify-between">
      <div class="user-info">
        <h2 class="font-bold text-[13px] lg:text-base">
          {{
            fullName?fullName:$t("temporayCustomer")
          }}
        </h2>
        <div class="flex text-[11px] lg:text-[13]">
          <span class="mr-2">
            {{ $t("balance") }}
            <b class="text-red-500 text-[14px] lg:text-base">{{ balance?balance:0 }}</b>
          </span>
          <span>
            {{ $t("integral") }}
            <b class="text-red-500 text-[14px] lg:text-base">{{ integral?integral:0}}</b>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
