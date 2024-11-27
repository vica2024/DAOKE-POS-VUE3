<template>
  <div class="h-full flex-1">
    <serving-v2 :customerInfo="customerInfo" />
    <cart-list
      :total_price="cartInfo.total_price"
      :isUnPayment="isUnPayment"
      :count="cartInfo.count"
      :list="cartInfo.list"
      :goToPay="goToPay"
      :clearCart="clearCart"
      :cashierInfo="cashierInfo"
      :setNewCashier="setNewCashier"
    />
  </div>
</template>
<script setup>
import { provide, ref, inject, reactive, watch} from "vue";
import servingV2 from "./serving-v2.vue";
import cartList from "./cart-list.vue";
import { fetchData } from "@/utils/customFunc.js";
import { Message } from "@arco-design/web-vue";
import { staffInfoApi } from "@/api/user";
import { switchCustomerApi } from "@/api/customer";
import { useStorage } from "@vueuse/core";
import {
  cashierCart,
  cashierCartDel,
  cashierCartList,
  cashierCompute,
  cashierCartNum,
  cashierchangeCart,
} from "@/api/order.js";

const { cashierInfo, customerInfo, toolsButtons } = defineProps({
  cashierInfo: {
    type: Object,
  },
  customerInfo: {
    type: Object,
  },
  toolsButtons: {
    type: Array,
  },
});
const paymentRef = inject("paymentRef");
const modalState = inject("modalState");
const priorCustomer = useStorage("customer-info", {});
const isUnPayment = ref(true);
const cartInfo = reactive({
  list: [],
  ids: [],
  count: 0,
  total_price: 0,
  order_sn: null,
  tourist_uid: null,
  staff_id: null,
  remarks: "",
});

watch(
  [
    ()=>customerInfo.uid,
    ()=>cartInfo.count,
    () => modalState.productAttr.operateState,
  ],
  (
    [
      newUid,
      newCount,
      newOperateState,
    ],
    [oldUid,oldCount,oldOperateState]
  ) => {

    toolsButtons[2].disabled = toolsButtons[0].disabled = newUid == 0;
    toolsButtons[5].disabled = toolsButtons[1].disabled = !newCount > 0;

    //The customer's info has been changed.
    if(newUid!=oldUid){
       switchCustomer(newUid);
    }
    //To added a goods in the cart.
    if (newOperateState==1) {
      addCart();
    }
    //To changed sku or quality for one of the item.
    if (newOperateState==2) {
      let isChange = false;
      if(modalState.productAttr.new_cart_num && modalState.productAttr.new_cart_num != modalState.productAttr.cart_num){
        isChange = true;
        ChangeCartNum(modalState.productAttr.new_cart_num);
      }
      if(modalState.productAttr.new_uniqueId && modalState.productAttr.new_uniqueId != modalState.productAttr.uniqueId){
        isChange = true;
        modifyCartSku();
      }
      //To Close the modal if everythink not change.
      if(!isChange){
        modalState.productAttr.show = false;
      }
    }
    //this one is very important never never never don't remove otherwise will to unceasinf create cart order a lot as below;
    //this one is very important never never never don't remove otherwise will to unceasinf create cart order a lot as below;
    //this one is very important never never never don't remove otherwise will to unceasinf create cart order a lot as below;
    resetAttrs();
  },
  { deep: true }
);

if(customerInfo.uid == 0 && customerInfo.tourist_uid==0){
    customerInfo.updateTouristUid({tourist_uid:Date.now()});
}

const handUp = () => {
  customerInfo.updateTouristUid({tourist_uid:Date.now()});
  fetchCashierCartList();
};

const goToPay = () => {
  paymentRef.value?.openPaymentDrawer(cartInfo);
};

const resetAttrs = ()=>{
  modalState.productAttr.operateState = 0;
}

const addCart = () => {
  const attrs = modalState.productAttr;
  const params = {
    new: 0,
    seckillId: 0,
    cartId: attrs.cart_id,
    staff_id: cashierInfo.id,
    cartNum: attrs.new_cart_num?attrs.new_cart_num:attrs.cart_num,
    productId: attrs.product_id,
    uniqueId: attrs.new_uniqueId?attrs.new_uniqueId:attrs.uniqueId,
  };
  //console.log(params,attrs);
  
  if (customerInfo.uid === 0) {
    params.tourist_uid = customerInfo.tourist_uid;
  }
  fetchData(
    () => cashierCart(customerInfo.uid, params),
    (data, msg) => {
      modalState.productAttr.show = false;
      if (data.cartId) {
      !cartInfo.ids.includes(data.cartId)
        ? cartInfo.ids.push(data.cartId)
        : null;
      fetchCashierCartList();
    }
    }
  );
};

//To empty the cart.
const clearCart = () => {
  if (cartInfo.ids.length == 0) {
    return false;
  }
  fetchData(
    () => cashierCartDel(customerInfo.uid, { ids: cartInfo.ids }),
    (data, msg) => {
      cartInfo.ids = [];
      // get cart newly list again.
      fetchCashierCartList();
      Message.success(msg);
    }
  );
};

// To delete one item in cart
const delCart = (cart_id) => {
  fetchData(
    () => cashierCartDel(customerInfo.uid, { ids: [cart_id] }),
    (data, msg) => {
      let index = cartInfo.ids.indexOf(cart_id);
      if (index !== -1) {
        cartInfo.ids.splice(index, 1);
      }
      fetchCashierCartList();
      Message.success(msg);
    }
  );
};

const modifyCartSku = () => {
  const attrs = modalState.productAttr;
  fetchData(
    () =>
      cashierchangeCart({
        cart_id: attrs.cart_id,
        product_id: attrs.product_id,
        unique: attrs.new_uniqueId,
        number: attrs.new_cart_num?attrs.new_cart_num:attrs.cart_num,
      }),
    (res) => {
      modalState.productAttr.show = false;
      fetchCashierCartList();
    }
  );
};

const ChangeCartNum = (num) => {
  const attrs = modalState.productAttr;
  fetchData(
    () =>
      cashierCartNum(customerInfo.uid, {
        id: attrs.cart_id,
        number:num,
      }),
    (data) => {
      modalState.productAttr.show = false;
      fetchCashierCartList();
    }
  );
};

// Fetch cart list and update the cart state
const fetchCashierCartList = () => {

  cartInfo.total_price = 0;
  cartInfo.order_sn = null;
  cartInfo.count = 0;
  isUnPayment.value = true;
  let maps = {};
  if (customerInfo.uid === 0) {
    maps.tourist_uid = customerInfo.tourist_uid;
  }
  fetchData(
    () => cashierCartList(customerInfo.uid, cashierInfo.id, maps),
    async (res) => {
      cartInfo.list = [];
      if (res.count > 0) {
        cartInfo.count = res.count;
        isUnPayment.value = false;
        cartInfo.list = res.valid;
        for (const element of res.valid) {
          const { cart } = element;
          for (const item of cart) {
            cartInfo.tourist_uid = item.tourist_uid;
            cartInfo.staff_id = item.staff_id;
            !cartInfo.ids.includes(item.id) ? cartInfo.ids.push(item.id) : null;
          }
        }
        fetchCashierCompute();
      }
    }
  );
};

//To calculate the cart price.
const fetchCashierCompute = () => {
  fetchData(
    () =>
      cashierCompute(customerInfo.uid, {
        cart_id: cartInfo.ids,
        coupon: false,
        coupon_id: 0,
        integral: false,
      }),
    (data) => {
      cartInfo.total_price = data.payPrice;
      cartInfo.order_sn = data.order_sn;
    }
  );
};

/**
 * get staff list
 */
const fetchCachierList = () => {

  fetchData(
    () => staffInfoApi(),
    (data) => {
      cashierInfo.updateCashierInfo(data);
      fetchCashierCartList();
      //to switch customer info
      //switchCustomer();
    }
  );
};

/**
 * switch customer
 */
const switchCustomer = (toUid) => {
  let params = {
    uid: customerInfo.uid,
    to_uid: toUid ? toUid : customerInfo.tourist_uid,
    is_tourist: toUid ? 0 : 1,
  };
  fetchData(
    () => switchCustomerApi(cashierInfo.id, params),
    (res) => {}
  );
};

/**
 * set new cashier
 * @param cashier
 */
const setNewCashier = (cashier) => {
  cashierInfo.updateCashierInfo(cashier);
  fetchCashierCartList();
};

/**
 * 1. To get customer's data;
 * 2. To get cashier's data;
 * 3. To get cart list data that is current of the store;
 * 4. To compute amount for the cart list;
 */
const init = () => {
  if (priorCustomer.value?.uid != 0) {
    customerInfo.updateCustomerInfo(priorCustomer.value);
  }
  console.log(customerInfo.tourist_uid);
  fetchCachierList();
};
init();

provide("delCart", delCart);
provide("clearCart", clearCart);

defineExpose({
  handUp,
  addCart,
  modifyCartSku,
  ChangeCartNum,
  fetchCashierCartList,
});
</script>
