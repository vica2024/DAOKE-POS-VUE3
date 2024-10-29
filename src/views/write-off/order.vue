<template>
  <div class="flex h-full">
    <div class="w-2/5 h-full min-w-[360px] max-w-[460px] rounded-2xl bg-white">
      <div class="pr-4 pl-4 pt-4">
        <div class="flex justify-between">
          <div class="flex items-center">
            <sapn
              class="text-[12px] mr-3 cursor-pointer lg:text-md"
              @click="closeVerify"
              ><icon-left size="14" /> {{$t('writeOff.back')}}</sapn
            >|
            <h3 class="text-[14px] ml-3 font-bold lg:text-lg">{{$t('writeOff.title')}}</h3>
          </div>
          <span
            v-if="!isSelect"
            class="leading-7 cursor-pointer text-[12px] text-gray-500"
            @click="isSelect = true"
          >
            {{ $t("writeOff.options") }} <icon-find-replace size="13" />
          </span>
          <span
            v-else
            class="leading-7 cursor-pointer text-gray-400"
            @click="isSelect = false"
            ><icon-close size="13"
          /></span>
        </div>
      </div>
      <div v-if="!isSelect">
        <div class="rounded-2xl overflow-hidden mr-4 ml-4 mt-2 mb-4">
          <a-input-search
            v-model="condition.keyword"
            :placeholder="$t('writeOff.searchPlaceholder2')"
            size="large"
            @search="getList"
            search-button
          />
        </div>
        <div
          v-resize="200"
          class="overflow-hidden overflow-y-auto"
          v-if="orderList.length > 0"
        >
          <order-list-card
            v-for="(item, index) in orderList"
            :key="index"
            :index="index"
            :orderInfo="item"
            :selected="selected"
            @click="toShowDetails(item, index)"
          />
        </div>
        <div class="flex items-center" v-resize="380" v-else>
          <div class="w-3/5 m-auto text-center">
            <img alt="" src="../../assets/images/no-order.png" />
            <span class="text-gray-400 text-xs">{{ $t("noItems") }}</span>
          </div>
        </div>
      </div>
      <!-- 筛选开始 -->
      <order-select
        v-else
        :selcetOptions="selcetOptions"
        :onSearch="onSearch"
      />
      <!--筛选结束 -->
    </div>
    <div class="ml-5 flex-1 min-w-[500px] h-full rounded-2xl">
      <tabs-menus :onChange="chooseTab" :menus="menus" :setIndex="setIndex" />
      <div
        :class="[
          'content-hide overflow-hidden bg-white',
          { 'rounded-2xl': setIndex > 0 },
          { 'rounded-bl-2xl rounded-br-2xl rounded-tr-2xl': setIndex == 0 },
        ]"
      >
        <div class="w-full bg-white" v-if="cartList.length > 0" v-resize="154">
          <order-info
            :orderInfo="orderInfoData"
            :cartList="cartList"
            v-if="setIndex == 0 && cartList.length > 0"
          />
          <order-details
            v-if="setIndex === 1 && orderDetailsData.orderInfo"
            :orderDetailsData="orderDetailsData"
          />
          <order-record
            v-if="setIndex === 2"
            :orderStuateList="orderStuateList"
          />
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
</template>

<script setup>
import { reactive, ref } from "vue";
import OrderDetails from "@/views/order/components/order-details.vue";
import tabsMenus from "./components/tabs.vue";
import orderInfo from "./components/order-info.vue";
import orderRecord from "./components/order-record.vue";
import orderListCard from "./components/order-list-card.vue";
import orderSelect from "./components/order-select.vue";
import { getVerifyList, getOrderStatusList, getOrderInfo } from "@/api/order";
import { cashierList } from "@/api/user";

defineProps({
  closeVerify: Function,
});

const isSelect = ref(false);
const setIndex = ref(0);
const selected = ref(0);
const orderInfoData = ref({});
const menus = ["writeOff.info", "writeOff.details", "writeOff.record"];
const orderList = ref([]);
const cartList = ref([]);
const orderStuateList = ref([]);
const orderDetailsData = ref({});
const selcetOptions = ref([
  {
    title: "writeOff.select.status",
    type: "orderStatus",
    list: [
      { name: "writeOff.select.all", value: "all", checked: true },
      { name: "writeOff.select.pending", value: "unpaid", checked: false },
      { name: "writeOff.select.payed", value: "paid", checked: false },
      { name: "writeOff.select.done", value: "completed", checked: false },
      { name: "writeOff.select.cancle", value: "canceled", checked: false },
    ],
  },
  {
    title: "writeOff.select.createTime",
    type: "time",
    list: [
      { name: "writeOff.select.all", value: "all", checked: true },
      { name: "writeOff.select.taday", value: "today", checked: false },
      { name: "writeOff.select.week", value: "week", checked: false },
      { name: "writeOff.select.month", value: "month", checked: false },
      { name: "writeOff.select.year", value: "year", checked: false }
    ],
  },
  {
    title: "writeOff.select.source",
    type: "source",
    list: [
      { name: "writeOff.select.all", value: "all", checked: true },
      { name: "writeOff.select.online", value: "online", checked: false },
      { name: "writeOff.select.offline", value: "offline", checked: false },
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
    return false;
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
  const { data } = await getOrderInfo(orderInfoData.value.id);
  orderDetailsData.value = data;
};

const getList = async () => {
  orderList.value = [];
  const { data } = await getVerifyList(condition);
  if (data.data.length > 0) {
    orderList.value = data.data;
    toShowDetails(data.data[0], 0);
  }
};
const getCartList = async () => {
  const { data } = await cashierList();
  const cachierCondition = {
    title: "Cashier",
    type: "cashier",
    list: [],
  };
  data.staffList.forEach((item) => {
    cachierCondition.list.push({
      name: item.staff_name,
      value: item.id,
      checked: false,
    });
  });
  selcetOptions.value.push(cachierCondition);
};

const getOrderStuatus = async () => {
  const { data } = await getOrderStatusList(orderInfoData.value.id);
  orderStuateList.value = data;
};
const toShowDetails = async (item, index) => {
  selected.value = index;
  setIndex.value = 0;
  cartList.value = [];
  for (const key in item._info) {
    cartList.value.push(item._info[key]);
  }
  orderInfoData.value = item;
};
getList();
getCartList();
</script>

<style scoped lang="less"></style>
