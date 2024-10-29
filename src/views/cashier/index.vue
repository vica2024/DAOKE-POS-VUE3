<template>
  <div class="flex h-full">
    <!-- for counter and product which to show where left and right in main -->
    <counter ref="counterRef" />
    <product />
    <drawer-cart-details />
    <drawer-payment-drawer ref="paymentRef" :orderData="orderData" :customerInfo="customerInfo" />
    <modal-order-marks :doneMark="doneMark" />
    <modal-recharge />
    <modal-product-sku />
  </div>
</template>
<script setup>
import { provide, ref, reactive} from "vue";
import counter from "./components/counter/index.vue";
import product from "./components/product/index.vue";
import modalProductSku from "./components/modals/product-sku.vue";
import drawerPaymentDrawer from "./components/drawers/payment.vue";
import modalOrderMarks from "./components/modals/order-marks.vue"
import modalRecharge from "./components/modals/recharge.vue"
import drawerCartDetails from "./components/drawers/cart-details.vue"
import { useCustomerStore } from "@/store";

const paymentRef = ref(null);
const counterRef = ref(null);
const customerInfo = useCustomerStore();

const orderData = reactive({
  integral: 0,
  coupon: 0,
  cart_id: [],
  pay_type: "alipay",
  remarks: "",
  staff_id: 0,
  change_price: 0,
  is_price: 0,
  userCode: "",
  coupon_id: 0,
  auth_code: "",
  tourist_uid: "",
  seckill_id: 0,
  new: 0,
});

const drawerState = reactive({
  showCartDetails:false,
});

const modalState = reactive({
  showMark:false,
  productAttr:{
    product_id:0,
    cart_id:0,
    cart_num:1,
    defaultSku:[0,0],
    uniqueId:null,
    uid:customerInfo.uid,
    operateState:0,
    show:false
  },
  showRecharge:false,
});

const doneMark=(content)=>{
  modalState.showMark= false;
  orderData.remarks = content;
}

provide("drawerState",drawerState);
provide("modalState",modalState);
provide("paymentRef", paymentRef);
provide("counterRef", counterRef);
</script>
