<script setup>
import CustomAmonuts from "@/components/custom/Amonut.vue";
import { defineProps} from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const prop = defineProps({
  payPrice: {
    type: Number,
    default: 0,
  },
});

</script>

<template>
  <div class="mb-10 mt-20 text-center"> 
    <p>
      <custom-amonuts :title="$t('acount_receicable')" :precision="2" :amount="Number(payPrice)" :valueStyle="{ fontSize: '16px', fontWeight: '800' }" />
    </p>
    <a-input class="w-[420px] bg-white border-blue-400 mt-10" size="large" :placeholder="$t('paymentScanPlaceholder')" />
    <div class="w-90 h-[320px] bg-img mt-20"></div>
  </div>
</template>
<style scoped lang="less">
.bg-img {
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url("https://multi-store.crmeb.net/view_cashier/img/balance.90215d31.png");
}
</style>
