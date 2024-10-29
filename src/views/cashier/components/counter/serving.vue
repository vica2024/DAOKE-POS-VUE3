<template>
  <div class="pt-4 pl-4 pr-4 pb-3 border-b border-gray-100">
    <div class="grid grid-cols-2 gap-12">
      <staff :cashierInfo="cashierInfo" />
      <customer :isShow="isShowCustomer" :customerInfo="customerInfo" />
    </div>
    <!-- for customer infomation that to operate -->
    <drawer-customer-search :setNewCustomer="setNewCustomer" />
    <drawer-customer-create :setNewCustomer="setNewCustomer" />
    <drawer-customer-modify :setNewCustomer="setNewCustomer" :customerId="customerInfo.uid" />
    <!-- for cashier infomation that to operate -->
    <modal-cashier-list :setNewCashier="setNewCashier" />
  </div>
</template>
<script setup>
import { ref, provide, reactive } from "vue";
import customer from "./customer.vue";
import staff from "./staff.vue";
import { staffInfoApi } from "@/api/user";
import DrawerCustomerSearch from "../drawers/customer-search.vue";
import DrawerCustomerCreate from "../drawers/customer-create.vue";
import DrawerCustomerModify from "../drawers/customer-modify.vue";
import ModalCashierList from "../modals/cashier-list.vue";

const {customerInfo,cashierInfo} = defineProps({
  customerInfo:{
    type:Object
  },
  cashierInfo:{
    type:Object
  },
})

const isShowCustomer = ref(false);


const CUSTOMER_DRAWER_STATE = reactive({
  createDrawerState: false,
  searchDrawerState: false,
  modifyDrawerState: false,
});

const CACHIER_MODAL_STATE = reactive({
  seachCashierModalState: false,
});
/**
 * get staff list
 */
staffInfoApi().then((res) => {
  cashierInfo.updateCashierInfo(res.data);
  isShowCustomer.value = true;
});

/**
 * set new customer
 * @param customer 
 */
const setNewCustomer = (customer) => {
  customerInfo.updateCustomerInfo(customer)
};

/**
 * set new cashier
 * @param customer 
 */
const setNewCashier = (cashier) => {
  cashierInfo.value = cashier;
  CACHIER_MODAL_STATE.seachCashierModalState = false;
  cashierStore.updateCashierInfo(cashier)
};
// provide
provide("CACHIER_MODAL_STATE", CACHIER_MODAL_STATE);
provide("CUSTOMER_DRAWER_STATE", CUSTOMER_DRAWER_STATE);
</script>
