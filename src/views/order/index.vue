<template>
  <div>
    <div class="flex h-full">
      <div class="w-2/5 h-full min-w-[360px] max-w-[460px] rounded-2xl bg-white">
        <div class="pr-4 pl-4 pt-4">
          <div class="flex justify-between">
            <h3 class="text-lg font-bold">{{ $t("order.title") }}</h3>
            <span v-if="!isSelect" class="leading-7 cursor-pointer text-[12px] text-gray-500" @click="isSelect = true">
              {{ $t("order.options") }} <icon-find-replace size="13" />
            </span>
            <span v-else class="leading-7 cursor-pointer text-gray-400" @click="isSelect = false"><icon-close
                size="13" /></span>
          </div>
        </div>
        <div v-if="!isSelect">
          <div class="search-custom rounded-2xl overflow-hidden mr-4 ml-4 mt-2 mb-4">
            <a-input-search v-model="condition.keyword" :placeholder="$t('order.searchPlaceholder')" size="large" @search="getList"
              search-button />
          </div>
          <div v-if="orderList.length > 0">
            <div v-resize="200" class="overflow-hidden overflow-y-auto">
              <order-list-card v-for="(item, index) in orderList" :key="index" :setIndex="index" :orderInfo="item"
                :selected="selected" @click="toShowDetails(item, index)" />
            </div>
          </div>
          <div class="flex items-center" v-resize="380" v-if="orderList.length == 0">
            <div class="w-3/5 m-auto text-center">
              <img alt="" src="../../assets/images/no-order.png" />
              <span class="text-gray-400 text-xs">{{ $t("noItems") }}</span>
            </div>
          </div>
        </div>
        <!-- 筛选开始 -->
        <order-select v-else :selcetOptions="selcetOptions" :onSearch="onSearch" />
        <!--筛选结束 -->
      </div>
      <div class="ml-5 flex-1 min-w-[500px] h-full rounded-2xl">
        <tabs-menus :onChange="chooseTab" :menus="menus" :setIndex="setIndex" />
        <div :class="[
          'content-hide overflow-hidden bg-white',
          { 'rounded-2xl': setIndex > 0 },
          { 'rounded-bl-2xl rounded-br-2xl rounded-tr-2xl': setIndex == 0 },
        ]">
          <div class="w-full bg-white" v-if="cartList.length > 0" v-resize="154">
            <order-info :orderInfo="orderInfoData" :cartList="cartList" @refundOrder="refundOrder"
              v-if="setIndex == 0 && cartList.length > 0" />
            <order-details v-if="setIndex === 1 && orderDetailsData.orderInfo" :orderDetailsData="orderDetailsData" />
            <order-record v-if="setIndex === 2" :orderStuateList="orderStuateList" />
          </div>
          <div class="flex items-center" v-resize="154" v-else>
            <div class="w-3/5 m-auto text-center">
              <img alt="" src="../../assets/images/no-record.png" />
              <span class="text-gray-400 text-xs">{{ $t("noItems") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <order-refund-modal :orderNumber="orderInfoData?.order_id" :cartList="cartList" @toRefund="refundOrder" />
  </div>
</template>

<script setup>
import { nextTick, provide, reactive, ref } from "vue";
import OrderDetails from "@/views/order/components/order-details.vue";
import tabsMenus from "./components/tabs.vue";
import orderInfo from "./components/order-info.vue";
import orderRecord from "./components/order-record.vue";
import orderListCard from "./components/order-list-card.vue";
import orderSelect from "./components/order-select.vue";
import orderRefundModal from "./components/order-refund-modal.vue";
import { getOrderList, getOrderStatusList, getOrderInfo, postRefundOrder } from "@/api/order";
import { cashierList } from "@/api/user";
import { Message } from "@arco-design/web-vue";

const isSelect = ref(false);
const setIndex = ref(0);
const selected = ref(0);
const orderInfoData = ref({});
const menus = ["order.info", "order.details", "order.record"];
const orderList = ref([]);
const cartList = ref([]);
const orderStuateList = ref([]);
const orderDetailsData = ref({});
const isShowRefundModal = ref(false);
const selcetOptions = ref([
  {
    title: "order.select.status",
    type: "orderStatus",
    list: [
      { name: "order.select.all", value: "all", checked: true },
      { name: "order.select.pending", value: "unpaid", checked: false },
      { name: "order.select.payed", value: "paid", checked: false },
      { name: "order.select.done", value: "completed", checked: false },
      { name: "order.select.cancle", value: "canceled", checked: false },
    ],
  },
  {
    title: "order.select.createTime",
    type: "time",
    list: [
      { name: "order.select.all", value: "all", checked: true },
      { name: "order.select.today", value: "today", checked: false },
      { name: "order.select.week", value: "week", checked: false },
      { name: "order.select.month", value: "month", checked: false },
      { name: "order.select.year", value: "year", checked: false },
    ],
  },
  {
    title: "order.select.source",
    type: "source",
    list: [
      { name: "order.select.all", value: "all", checked: true },
      { name: "order.select.online", value: "online", checked: false },
      { name: "order.select.offline", value: "offline", checked: false },
    ],
  },
]);
const condition = reactive({
  limit: 7,
  page: 1,
  keyword: "",
  real_name: "",
  staff_id: "",
  status: "",
  time: "",
  type: "",
});

const chooseTab = async (index) => {
  if (orderList.value.length == 0) {
    return false
  }
  setIndex.value = index;
  if (index == 1) {
    await getOrderDetails();
  }
  if (index == 2) {
    await getOrderStuatus();
  }
};

const onSearch = () => {
  isSelect.value = false;
  condition.page = 1;
  getList();
};

const getOrderDetails = async () => {
  orderDetailsData.value = {};
  const { data } = await getOrderInfo(orderInfoData.value.id);
  nextTick(() => {
    orderDetailsData.value = data;
  });
};

const getList = async () => {
  try {
    orderList.value = [];
    const { data } = await getOrderList(condition);
    if (data.list.length > 0) {
      orderList.value = data.list;
      toShowDetails(data.list[0], 0);
    }
    await getCartList();
  } catch (error) {
    console.error("获取订单列表失败：", error);
  }
};
const getCartList = async () => {
  const { data } = await cashierList();
  const cachierCondition = {
    title: "cashier",
    type: "cashier",
    list: []
  }
  data.staffList.forEach((item) => {
    cachierCondition.list.push({ name: item.staff_name, value: item.id, checked: false });
  });
  selcetOptions.value.push(cachierCondition);
};

const getOrderStuatus = async () => {
  const { data } = await getOrderStatusList(orderInfoData.value.id);
  orderStuateList.value = data;
};
const toShowDetails =  (item, index) => {
  selected.value = index;
  setIndex.value = 0;
  cartList.value = [];
  const ls = [];
  for (const key in item._info) {
    item._info[key].selected = false;
    const total = Number(item._info[key].cart_info.attrInfo.price * item._info[key].cart_info.cart_num);
    item._info[key].refund_amount = total;
    item._info[key].total = total;
    ls.push(item._info[key]);
  }
  //console.log(item);
  cartList.value = ls;
  orderInfoData.value = item;
};
const refundOrder = (params) => {
  postRefundOrder(orderInfoData.value.id,params).then(res=>{
    if(res.code==200){
      Message.success(res.msg);
      isShowRefundModal.value = false;
      getList();
    }
  })
}
getList();
provide('isShowRefundModal', isShowRefundModal);
</script>

<style scoped lang="less"></style>
