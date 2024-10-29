<template>
  <div class="flex">
    <div
      class="w-2/5 min-w-[360px] max-w-[460px] rounded-2xl bg-white overflow-hidden"
    >
      <div class="search-custom rounded-2xl overflow-hidden mr-4 ml-4 mt-5 mb-4">
        <a-input-search
          v-model="condition.keyword"
          :placeholder="$t('pending.placeholder')"
          size="large"
          @search="fetchHandList"
          search-button
        />
      </div>
      <order-items :list="orderList" :toShowDetails="getOneDeatails" />
    </div>
    <div class="ml-4 flex-1">
      <div class="p-4 content-hide overflow-hidden bg-white rounded-2xl">
        <customer-card :customerInfo="currentCustomerInfo" />
        <hand-order-details
          v-if="count > 0"
          :payPrice="payPrice"
          :cartList="cartList"
          :count="count"
        />
        <div class="flex items-center" v-resize="205" v-else>
          <div class="w-3/5 m-auto text-center">
            <img alt="" src="../../assets/images/no-record.png" />
            <span class="text-gray-400 text-xs">{{ $t("noItems") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { provide, reactive, ref } from "vue";
import {
  getHangList,
  cashierCompute,
  cashierCartList,
  delHang,
} from "@/api/order.js";
import { cashierList } from "@/api/user.js";
import { getOneCustomerBasicInfo } from "@/api/customer.js";
import customerCard from "./components/customer-card.vue";
import handOrderDetails from "./components/handOrder-list.vue";
import OrderItems from "./components/order-items.vue";
import { Message } from "@arco-design/web-vue";
import { useCashierStore, useCustomerStore } from "@/store";
import { useRouter } from "vue-router";

const cashierInfo = useCashierStore();
const customerInfo = useCustomerStore();
const currentCustomerInfo = ref(customerInfo);

const condition = reactive({
  keyword: "",
  page: 1,
  limit: 12,
});
const payPrice = ref(0);
const orderCount = ref(0);
const orderList = ref([]);
const isUnPayment = ref(true);
const cartList = ref([]);
const count = ref(0);
const router = useRouter();

const getOneDeatails = async (order) => {
  isUnPayment.value = false;
  let uid = 0;
  let params = {};
  if (order.uid) {
    uid = order.uid;
    const { data } = await getOneCustomerBasicInfo(uid);
    currentCustomerInfo.value = data;
  } else {
    currentCustomerInfo.value = {
      uid: 0,
      phone: "",
      avatar: null,
      full_name: "temporayCustomer",
      balance: 0.0,
      integral: 0,
    };
    params.tourist_uid = order.tourist_uid;
  }

  const { data } = await cashierCartList(uid, cashierInfo.id, params);
  cartList.value = data.valid;
  count.value = data.count;
  //To compute aamount of the cart;
  let ids = [];
  if (order.cart_id.includes(",")) {
    ids = order.cart_id.split(",");
  } else {
    ids = [order.cart_id];
  }
  await fetchCashierCompute(uid, ids);
};

const fetchCashierList = async () => {
  const { data } = await cashierList(condition);
  cashierInfo.updateCashierInfo(data.staffInfo);
  await fetchHandList();
};

const fetchHandList = async () => {
  const { data } = await getHangList(cashierInfo.id, condition);
  orderList.value = data.data;
  orderCount.value = data.count;
  if (data.count == 0) {
    count.value=0;
    currentCustomerInfo.value.uid=0;
    currentCustomerInfo.value.avatar=null;  
    currentCustomerInfo.value.balance=0; 
    currentCustomerInfo.value.integral=0;
    currentCustomerInfo.value.full_name=null;
    return false;
  }
  // to get first one hand order details;
  await getOneDeatails(data.data[0]);
};

//To calculate the cart price.
const fetchCashierCompute = async (uid, cartIds) => {
  cashierCompute(uid, {
    cart_id: cartIds,
    coupon: false,
    coupon_id: 0,
    integral: false,
  }).then((res) => {
    payPrice.value = res.data.totalPrice;
  });
};

const operateOrder = async (order, isDel, event) => {
  event ? event.stopPropagation() : null; // 阻止事件冒泡
  if (isDel) {
    //To del order in database
    const res = await delHang({ id: order.cart_id });
    if (res.code == 200) {
      Message.success(res.msg);
      await fetchHandList();
    }
    return false;
  }
  //To pick up A order to the cashier counter.
  //1. To set up order info to store as temporary data;
  cashierInfo.updatePickUpOrderInfo(order);
  //2. To rest customer info to store
  if (order.uid) {
    const { data } = await getOneCustomerBasicInfo(order.uid);
    customerInfo.updateCustomerInfo(data);
  } else {
    customerInfo.resetState();
  }
  //3. To redirect to cashier page;
  router.push({ name: "menu.cashier" });
};

fetchCashierList();

provide("operateOrder", operateOrder);
</script>

<style scoped lang="less"></style>
