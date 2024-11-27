<script setup>
defineProps({
  customerInfo: {
    type: Object,
    default: {},
  },
});
</script>
<template>
  <div class="flex items-center p-4 bg-orange-100 rounded-xl">
    <a-avatar :size="52">
      <img alt="avatar" :src="customerInfo.avatar?customerInfo.avatar:'https://multi-store.crmeb.net/view_cashier/img/yonghu.908b01d3.png'" />
    </a-avatar>
    <div class="flex-1 flex pl-2 justify-between">
      <div class="user-info">
        <h2 class="text-base font-bold">
          {{
            customerInfo.uid == 0
              ? $t("temporayCustomer")
              : customerInfo.full_name
          }}
        </h2>
        <div class="flex text-xs">
          <span class="mr-2">
            {{ $t("balance") }}
            <b class="text-base text-red-500">{{ customerInfo.balance }}</b>
          </span>
          <span>
            {{ $t("integral") }}
            <b class="text-base text-red-500">{{ customerInfo.integral }}</b>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
