<template>
    <a-statistic
          separator=","
          :title="title"
          :value-style="valueStyle"
          :value="amount"
          :precision="precision"
          show-group-separator
        >
          <template v-if="currency!='€'" #prefix
            ><span class="font-normal">{{ currency }}</span></template
          >
          <template v-else #suffix
            ><span class="font-normal">€</span></template
          >
        </a-statistic>
</template>
<script setup>
import {useUserStore} from "@/store";
defineProps({
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 金额
  amount: {
    type: Number,
    default: 0
  },
  // 类型
  valueStyle: {
    type: Object,
    default: () => ({ color: 'red',fontSize:'20px',fontWeight:'700' })
  },
  precision: {
    type: Number,
    default: 0
  }
});
const userStore = useUserStore();
const currency = userStore.currency;
</script>