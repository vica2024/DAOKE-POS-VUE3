<script setup>
import { defineProps, computed, ref } from "vue";

const { orderDetailsData } = defineProps({
  orderDetailsData: {
    type: Object,
    default: {},
  },
});

const orderDetails = [
  {
    category: "categories.deliveryInfo",
    details: [
      { label: "deliveryInfo.recipient", value: "real_name" },
      { label: "deliveryInfo.phone", value: "user_phone" },
      { label: "deliveryInfo.address", value: "user_address" },
    ],
  },
  {
    category: "categories.userInfo",
    details: [
      { label: "userInfo.nickname", value: "nickname" },
      { label: "userInfo.boundPhone", value: "phone" },
    ],
  },
  {
    category: "categories.orderInfo",
    details: [
      { label: "orderInfo.creationTime", value: "_add_time" },
      {
        label: "orderInfo.totalProducts",
        value: "total_num",
        value2: "unit_name",
      },
      { label: "orderInfo.totalPrice", value: "total_price" },
      { label: "orderInfo.couponAmount", value: "promotions_price" },
      { label: "orderInfo.pointsDeduction", value: "use_integral" },
      { label: "orderInfo.memberDiscount", value: "vip_price" },
      { label: "orderInfo.promoter", value: "" },
      { label: "orderInfo.paymentTime", value: "_pay_time" },
      { label: "orderInfo.paymentMethod", value: "_payType" },
    ],
  },
];
function replaceValues(data, value) {
  if (typeof data === "object" && data !== null) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === value) {
          return data[key]; // 返回找到的值
        }
        const result = replaceValues(data[key], value); // 递归调用
        if (result !== undefined) {
          return result; // 如果找到值则返回
        }
      }
    }
  }
  return undefined; // 如果没有找到值则返回 undefined
}

  orderDetails.forEach((category) => {
    category.details.forEach((detail) => {
      const foundValue = replaceValues(orderDetailsData, detail.value);
      if (foundValue !== undefined) {
        detail.value = foundValue; // 替换 value 的值
      }
    });
  });

</script>

<template>
  <div class="p-4">
    <a-descriptions
      size="mini"
      v-for="(row, index) in orderDetails"
      :key="index"
      style="margin-bottom: 25px"
      :column="{ xs: 2, sm: 4, md: 4, lg: 4 }"
    >
      <template #title>
        <h3 class="text-[14px]">{{ $t(row.category) }}</h3>
      </template>
      <a-descriptions-item
        v-for="(item, index2) of row.details"
        :key="index2"
        :span="2"
      >
        <template #label>
          <h3 class="text-[13px] leading-[40px]">{{ $t(item.label) }}</h3>
        </template>
        <span class="text-[13px] leading-[40px]">{{ item.value }}</span>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<style scoped lang="less"></style>
