<script setup>
import { defineProps, ref } from "vue";
import CustomAmonuts from "@/components/custom/Amonut.vue";
const prop = defineProps({
  payPrice: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: false,
  },
});
const progressValue = ref(0);
const loadingtext = ref("loading....");
const progressState = ref("normal");
let itemer = setInterval(() => {
  if (progressValue.value < 0.9) {
    progressValue.value += Number((Math.random() * (0.07 - 0.01) + 0.01).toFixed(2));
  } else {
    loadingtext.value = "Cannot to connect POS of terminal.";
    progressState.value = "danger";
    clearInterval(itemer);
  }
}, 1000);
</script>

<template>
  <div class="pt-20 w-full">
    <div class="text-center">
      <div class="mb-10 text-rose-600">
        <custom-amonuts :title="$t('acount_receicable')" :precision="2" :amount="Number(payPrice)" :valueStyle="{ fontSize: '16px', fontWeight: '800' }" />
      </div>
      <div class="text-sm">
        <a-progress
          :status="progressState"
          :percent="progressValue"
          :show-text="false"
          :style="{ width: '50%' }"
        />
        <p class="text-gray-400 mt-2" v-if="progressValue<0.9">
          {{ loadingtext }}
        </p>
        <a-result v-else status="warning" title="Cannot to connect POS of terminal.">
          <template #subtitle>Please switch other one payment methods </template>
        </a-result>
      </div>
      <a-spin v-if="status" class="mt-20" dot size="15" />
    </div>
  </div>
</template>

<style scoped lang="less"></style>
