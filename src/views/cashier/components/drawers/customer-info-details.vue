<template>
  <a-drawer
    :width="width"
    :mask-closable="true"
    :footer="false"
    :title="$t(drawerTitle)"
    v-model:visible="customerDrawerState.searchDrawerState"
  >
    <div class="w-full">
      <createCustomer v-if="showCustomerCreateForm" @messageSent="onMessage" @setCustomer="setNewCustomer" />
      <!-- menus start -->
      <a-tabs
        type="rounded"
        :animation="true"
        :justify="true"
        :destroy-on-hide="true"
        @change="onChange"
        :default-active-key="0"
        lazy-load
        v-if="showCustomerSearchform"
      >
        <a-tab-pane
          v-for="(tabs, index) in menus_list"
          :key="index"
          :disabled="tabs.disabled"
        >
          <template #title>{{ $t('customer.menus.'+tabs.label) }}</template>
          <div class="overflow-hidden overflow-y-auto">
            <div v-if="setIndex == 0">
              <!-- search form start -->
              <search-form :setNewCustomer="setNewCustomer" />
              <!-- search form end -->
              <customer-descriptions
                ref="descriptionsRef"
                @messageSent="onMessage"
              />
            </div>
            <record :columns="columns" :data="recordData" v-else></record>
          </div>
        </a-tab-pane>
      </a-tabs>
      <!-- menus end -->
      <a-spin
        dot
        class="absolute top-56 left-0 right-0 m-auto"
        style="width: 100px"
        v-if="loading"
      />
    </div>
  </a-drawer>
</template>
<script setup>
import { inject, reactive, ref, watch, onMounted } from "vue";
import { useCustomerStore } from "@/store";
import customerDescriptions from "./customer/descriptions.vue";
import searchForm from "./customer/search-form.vue";
import createCustomer from "./customer/create.vue";
import record from "./customer/record.vue";
import culomnsFiels from "./customer/columns";
import {infoApi} from "@/api/customer";

const drawerTitle = ref("customer.searchCustomerTitle");
const customerDrawerState = inject("CUSTOMER_DRAWER_STATE");
const width = parseInt((window.innerHeight / 100) * 80);
const setIndex = ref(0);
const customerStore = useCustomerStore();
const loading = ref(true);
const descriptionsRef = ref(null);
const showCustomerCreateForm = ref(false);
const showCustomerSearchform = ref(true);
const recordData = ref([]);
const columns = ref([]);
const menus_list = [
  {
    label: "customerInfo",
    disabled: true,
  },
  {
    label: "consumptionRecord",
    disabled: true,
  },
  {
    label: "pointsDetail",
    disabled: true,
  },
  {
    label: "coupons",
    disabled: true,
  },
  {
    label: "balanceChange",
    disabled: true,
  },
  {
    label: "customerFootprint",
    disabled: true,
  },
  {
    label: "guideChange",
    disabled: true,
  },
];
watch(
  [() => customerDrawerState.searchDrawerState, () => descriptionsRef.value],
  ([isOpen, isFormReady], [oldIsOpen, oldIsFormReady]) => {
    if (isOpen) {
      pageInit();
    }
  }
);
const pageInit = () => {
  loading.value = true;
  drawerTitle.value = "customer.searchCustomerTitle";
  showCustomerSearchform.value = true;
  showCustomerCreateForm.value = false;
  menus_list.forEach((menus) => {
    menus.disabled = customerStore.uid == 0;
  });
  const timer = setInterval(() => {
    if (descriptionsRef.value[0]) {
      descriptionsRef.value[0]?.initicalCutomerInfo(customerStore.uid);
      loading.value = false;
      clearInterval(timer);
    }
  }, 200);
};
/**
 * To set the tab menus status.
 * @param index
 */
const onChange = async (index) => {
  setIndex.value = index;
  const tabName = menus_list[index].label;
  const tabCuloumn = culomnsFiels[tabName];
  if(tabCuloumn){
      columns.value =  tabCuloumn;
      const types = ['','order','integral','coupon','balance_change','visit','spread_change'];
      const params ={
        type:types[index],
        page:1,
        limit:10
      }
      const res = await infoApi(customerStore.uid,params);
      recordData.value = res.data.list;
  }
  switch (index) {
    case 0:
      pageInit();
      break;
  }
};

const onMessage = (event) => {
  switch (event?.index) {
    case 0:
      setNewCustomer();
      break;
    case 1:
      showCustomerSearchform.value = false;
      showCustomerCreateForm.value = true;
      drawerTitle.value = "customer.createCustomerTitle";
      break;
    case 2:
      showCustomerSearchform.value = false;
      showCustomerCreateForm.value = true;
      drawerTitle.value = "customer.modifyCustomerTitle";
      break;
    case 3:
      pageInit();
      break;
    default:
      loading.value = event?.loading;
  }
};
/**
 * To update customer info and get a custmer details.
 * @param item
 */
const setNewCustomer = (item) => {
  let uid = 0;
  if (!item) {
    customerStore.resetState();
  } else {
    uid = item.uid;
    customerStore.updateCustomerInfo(item);
  }
  pageInit();
};
</script>
<style scoped lang="less"></style>
