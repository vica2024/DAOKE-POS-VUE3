<script setup>
import { defineProps, inject ,computed} from "vue";
import { useI18n } from "vue-i18n";

const props=defineProps({
  customerInfo: {
    type: Object,
    default: {},
  },
  isShow:{
    type:Boolean,
    default:false
  }
});
const { t } = useI18n();
const customerDrawerState = inject("CUSTOMER_DRAWER_STATE");

const integralValue = computed(() => {
  return `${t('customerIntegral', { integral: props.customerInfo.integral })}`;
});
const balanceValue = computed(() => {
  return `${t('customerBalance', { balance: props.customerInfo.balance })}`;
})

</script>
<template>
  <div>
    <a-skeleton :animation="true" v-if="!isShow">
      <a-skeleton-shape class="mb-1 m-auto" shape="circle" />
      <a-skeleton-line :line-height="12" :line-spacing="5" />
      <a-space direction="vertical" :style="{ width: '100%' }">
        <a-space class="w-full flex justify-between">
          <a-skeleton-line :line-height="12" :widths="[35]" />
          <a-skeleton-line :line-height="12" :widths="[35]" />
        </a-space>
      </a-space>
    </a-skeleton>
    <div v-else>
      <div class="text-center relative">
        <a-avatar :size="50" class="border-2 border-yellow-300 cursor-pointer" @click="customerDrawerState.searchDrawerState=true">
           <img :src="customerInfo.avatar" />
        </a-avatar>
        <icon-swap  class="absolute right-0 left-0 bottom-[-5px] m-auto text-gray-400" />
      </div>
      <div class="vertical text-center mt-1">
        <h3 class="font-bold text-sm overflow-hidden text-ellipsis whitespace-nowrap">
             {{ customerInfo.full_name }}
        </h3>
        <div class="text-xs text-red-600 font-bold">
          <span class="overflow-hidden text-ellipsis whitespace-nowrap mr-2">
            <icon-strikethrough class="text-yellow-600" size="13" />{{ customerInfo.integral }}
          </span>
          <span class="overflow-hidden text-ellipsis whitespace-nowrap mr-2">
            <icon-strikethrough class="text-yellow-600" size="13" />{{ customerInfo.balance }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
