<script setup>
import { defineProps, reactive, ref ,inject} from "vue";
// import AliPayment from "./payment-type/alipay.vue";
import WechatPayment from "./payment-type/wepay.vue";
import CreditCardPayment from "./payment-type/credit-card.vue";
import CashPayment from "./payment-type/cash-pay.vue";
import BalancePayment from "./payment-type/balance-pay.vue";
import CryptoCionPayment from "./payment-type/crypto-cion.vue";
import { cashierCreate } from "@/api/order";
import { Message } from "@arco-design/web-vue";

const {customerInfo,orderData} = defineProps({
  customerInfo: {
    type: Object,
    default:{},
  },
  modalWidth: {
    type: Number,
    default: 680,
  },
  orderData:{
    type:Object,
    default: {},
  }
});

const counterRef = inject("counterRef");

const isShow = ref(false);

const payType = ref('alipayWechat');

const paymentInfo = reactive({
  total_price: 0,
});

const paymentMethods = [
  { label: "wepay_alipay", value: 'alipayWechat' },
  { label: "creditCard", value: 'creditCard' },
  { label: "cash", value: 'cash' },
  { label: "balancePayment", value: 'yue' },
  { label: "cryptocurrency", value: 'crypto' },
];

const openPaymentDrawer = (order) => {
  isShow.value = true;
  paymentInfo.total_price = order.total_price;
  orderData.cart_id = order.ids;
  orderData.tourist_uid = order.tourist_uid;
  orderData.staff_id = order.staff_id;
};

const PaymentComfirm = () => {
  orderData.pay_type = payType.value;
  cashierCreate(customerInfo.uid, orderData).then((res) => {
    isShow.value=false;
    Message.success(res.msg);
    payType.value = 'alipayWechat';
    counterRef.value?.operateCartFinish()
  });
};

defineExpose({
  openPaymentDrawer,
});
</script>
<template>
  <a-drawer
    :width="modalWidth"
    :title="$t('modalTitle')"
    v-model:visible="isShow"
    :closable="false"
    :mask-closable="false"
  >
    <div class="payment">
      <div class="flex justify-center items-center">
        <a-button-group shape="round" class="mt-5">
          <a-button
            :type="item.value === payType ? 'primary' : 'dashed'"
            v-for="(item, index) in paymentMethods"
            :key="index"
            @click="payType = item.value"
          >
            <span class="text-base">{{ $t(item.label) }}</span>
          </a-button>
        </a-button-group>
      </div>
      <div class="w-4/5 m-auto">
        <!-- <ali-payment v-if="payType === 1" :payPrice="paymentInfo.total_price" /> -->
        <wechat-payment
          v-if="payType === 'alipayWechat'"
          :payPrice="paymentInfo.total_price"
        />
        <credit-card-payment
          v-if="payType === 'creditCard'"
          :payPrice="paymentInfo.total_price"
        />
        <cash-payment
          v-if="payType === 'cash'"
          :PaymentComfirm="PaymentComfirm"
          :payPrice="paymentInfo.total_price"
        />
        <balance-payment
          v-if="payType === 'yue'"
          :payPrice="paymentInfo.total_price"
        />
        <crypto-cion-payment
          v-if="payType === 'crypto'"
          :payPrice="paymentInfo.total_price"
        />
      </div>
    </div>
    <template #footer>
      <div class="w-full text-center flex justify-center">
        <a-button
          @click="isShow = false"
          type="outline"
          class="w-[60%] h-[42px]"
          shape="round"
          long
        >
          {{ $t("cancelPayment") }}
        </a-button>
      </div>
    </template>
  </a-drawer>
</template>
<style scoped lang="less"></style>
