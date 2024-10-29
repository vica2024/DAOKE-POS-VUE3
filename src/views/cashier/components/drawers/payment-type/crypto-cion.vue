<template>
      <div class="m-auto pt-20">
        <div style="width: 120px; height: 120px" class="border m-auto mt-20" ></div>
                <a-steps class="pt-10">
                  <a-step :description="$t('scanToPay.steps[0]')"
                    >Prepare to Pay</a-step
                  >
                  <a-step :description="$t('scanToPay.steps[1]')"
                    >Enter the third-party payment app</a-step
                  >
                  <a-step :description="$t('scanToPay.steps[2]')"
                    >Complete Payment</a-step
                  >
                </a-steps>
                <a-result
                  status="success"
                  class="mt-20"
                  v-if="status"
                  :title="$t('sendEmail.success')"
                >
                  <template #subtitle>
                    <div class="mt-20">{{ $t("sendEmail.subtitle") }}</div>
                  </template>
                  <template #extra>
                    <a-space>
                      <a-button type="primary">{{
                        $t("sendEmail.resend")
                      }}</a-button>
                    </a-space>
                  </template>
                </a-result>
      </div>
</template>

<script setup>
import {defineProps} from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
  status: {
    type: Boolean,
    default: false
  }
});
</script>
