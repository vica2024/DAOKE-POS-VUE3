<template>
  <a-modal
    v-model:visible="modalState.showRecharge"
    :title="$t(modalTitle)"
    :width="modalWidth"
    :footer="false"
  >
    <div class="w-full">
      <!-- 头部顾客信息-->
      <div class="flex items-center mb-5">
        <div class="">
          <a-avatar :size="60" :imageUrl="customerInfo.avatar" />
        </div>
        <div class="flex-1 pl-2">
          <div class="text-base font-bold">{{ customerInfo.full_name }}</div>
          <div class="flex items-center text-xs">
            <span class="mr-5"
              >{{ $t("balance") }}
              <b class="text-red-600 text-base">{{
                customerInfo.balance
              }}</b></span
            >
            <span class="mr-5"
              >{{ $t("integral") }}
              <b class="text-red-600 text-base">{{
                customerInfo.integral
              }}</b></span
            >
            <span
              >{{ $t("vip_member_expires")
              }}<span class="text-blue-600">2029-11-04 20:20:00</span></span
            >
          </div>
        </div>
      </div>
      <!--充值区域-->
        <a-tabs v-model:active-key="setIndex" :animation="true" type="rounded">
          <a-tab-pane :key="0" :title="$t('recharege_packege')">
            <div
              v-if="rechargeData.recharge_attention.length > 0"
              class="pl-0 pr-4 flex items-center h-[300px] overflow-hidden"
            >
              <a-row :gutter="24">
                <a-col
                  :span="8"
                  v-for="(item, index) in rechargeData.recharge_quota"
                  :key="index"
                  @click="cardIndex = index"
                  class="mb-6"
                >
                  <div
                    :class="[
                      'p-5 rounded-lg border border-blue-300',
                      { 'shadow-lg': cardIndex == index },
                    ]"
                  >
                  <custom-amonuts  :amount="Number(item.price)" :valueStyle="{ fontSize: '16px', fontWeight: '800' }" />
                    <div>
                      {{ $t("extra_give") }}：
                      <custom-amonuts :amount="Number(item.give_money)" :valueStyle="{ fontSize: '16px', fontWeight: '800' }" />
                    </div>
                  </div>
                </a-col>
              </a-row>
            </div>
            <div class="text-center pt-10" v-else>
              <a-spin dot />
            </div>
          </a-tab-pane>
          <a-tab-pane :key="1" :title="$t('recharege_custom')">
            <div class="w-2/4 m-auto h-[300px] overflow-hidden">
              <a-input-number
                :model-value="recharge_value"
                class="pt-2 mt-20 pb-2 rounded-3xl"
                :min="0.1"
              ></a-input-number>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <!--充值注意事项-->
      <div class="text-[11px] text-gray-400">
        <p
          v-for="(attention, index) in rechargeData.recharge_attention"
          :key="index"
        >
          {{ index + 1 }}. {{ attention }}
        </p>
      </div>
      <div class="pt-5 pb-5 text-center">
        <a-button
          type="primary"
          class="h-10 pl-20 pr-20"
          shape="round"
          @click="done"
          ><b>{{ $t("recharge_confirm") }}</b></a-button
        >
      </div>
  </a-modal>
</template>

<script setup>
import { defineProps, inject, reactive, ref, watch } from "vue";
import { useCustomerStore } from "@/store";
import { userRechargelApi } from "@/api/customer";
import CustomAmonuts from "@/components/custom/Amonut.vue";
const customerInfo = useCustomerStore();
const modalState = inject("modalState");
const paymentRef = inject("paymentRef");
const props = defineProps({
  modalTitle: {
    type: String,
    default: "member_recharge",
  },
  modalWidth: {
    type: Number,
    default: 680,
  },
});
const setIndex = ref(0);
const cardIndex = ref(0);
const recharge_value = ref(0.1);
const rechargeData = ref({
  recharge_attention: [],
  recharge_quota: [],
});
const done = () => {
  const {id,price} = rechargeData.value.recharge_quota[cardIndex.value];
  const cartInfo={
    total_price:price,
    staff_id:1,
    ids:id,
    type:'recharge',
    uid:customerInfo.uid,
    tourist_uid:0
  }
  console.log(rechargeData.value.recharge_attention[cardIndex.value])
  paymentRef.value?.openPaymentDrawer(cartInfo);
  modalState.showRecharge=false;
};

watch(
  () => modalState.showRecharge,
  async (newValue) => {
    if (newValue) {
      await getRechargeList();
    }
  }
);

const getRechargeList = async () => {
  const { data } = await userRechargelApi();
  rechargeData.value = data;
  console.log(data);
};
</script>

<style scoped lang="less"></style>
