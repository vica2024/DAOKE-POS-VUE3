<template>
  <div class="flex h-full">
    <div class="w-2/5 h-full min-w-[360px] max-w-[460px] rounded-2xl bg-white">
      <div class="pr-4 pl-4 pt-4">
        <div class="flex justify-between">
          <h3 class="text-[14px] ml-3 font-bold lg:text-lg">{{$t('refund.title')}}</h3>
          <span
            v-if="!isSelect"
            class="leading-7 cursor-pointer text-[12px] text-gray-500"
            @click="isSelect = true"
          >
          {{$t('refund.options')}} <icon-find-replace size="13" />
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
        <div class="search-custom rounded-2xl overflow-hidden mr-4 ml-4 mt-2 mb-4">
          <a-input-search
            v-model="condition.keyword"
            :placeholder="$t('refund.searchPlaceholder')"
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
        @onFinish="onSearch"
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
        <div class="w-full bg-white" v-if="orderInfoData" v-resize="154">
          <order-info
            :orderInfo="orderInfoData"
            v-if="setIndex == 0"
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
    <refund-marks :orderInfoData="orderInfoData" @onRefundMark="onRefundreMark" />
  </div>
</template>

<script setup>
import { provide, reactive, ref } from "vue";
import OrderDetails from "@/views/order/components/order-details.vue";
import tabsMenus from "./components/tabs.vue";
import orderInfo from "./components/order-info.vue";
import orderRecord from "./components/order-record.vue";
import orderListCard from "./components/order-list-card.vue";
import orderSelect from "@/components/custom/Filters.vue";
import refundMarks from "./components/refund-marks.vue";
import { Message } from "@arco-design/web-vue";
import { getRefundList, getOrderStatusList, getOrderRefundInfo,putRefundRemarkData } from "@/api/order";
import { cashierList } from "@/api/user";
const isSelect = ref(false);
const setIndex = ref(0);
const selected = ref(0);
const orderInfoData = ref({});
const menus = ["refund.info", "refund.details", "refund.record"];
const orderList = ref([]);
const orderStuateList = ref([]);
const orderDetailsData = ref({});
const isShowRefundMarkModal = ref(false);
const selcetOptions = ref();
const condition = reactive({
  limit: 7,
  page: 1,
  keyword: "",
  time: "",
  refund_type: "",
});


const chooseTab = async (index) => {
  if(orderList.value.length == 0) {
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

const onSearch = (params) => {
  if(params.key && params.value){
    condition[params.key] = params.value;
  }
  if(params.isDone){
    isSelect.value = false;
    getList();
  }
};

const getOrderDetails = async () => {
  const { data } = await getOrderRefundInfo(orderInfoData.value.id);
  orderDetailsData.value = data;
};

const getList = async () => {
  orderList.value = [];
  const { data } = await getRefundList(condition);
  if (data.list.length > 0) {
    orderList.value = data.list;
    toShowDetails(data.list[0], 0);
  }
  data.conditions.forEach((item) => {
      item.list.forEach((itemb, key) => {
        if(key==0){
          itemb.checked = true;
        }else{
          itemb.checked = false;
        }
      });
  });
  selcetOptions.value = data.conditions;
};

const getOrderStuatus = async () => {
  const { data } = await getOrderStatusList(orderInfoData.value.id);
  orderStuateList.value = data;
};
const toShowDetails = (item, index) => {
  selected.value = index;
  setIndex.value = 0;
  orderInfoData.value = item;
};
const onRefundreMark = (content)=>{
  if(content==''){
    Message.error(res.msg)
  }
  putRefundRemarkData(orderInfoData.value.id,{remark:content}).then(res=>{
    orderInfoData.value.remark=content;
    isShowRefundMarkModal.value=false;
    Message.success(res.msg)
  });
}
getList();
provide('isShowRefundMarkModal',isShowRefundMarkModal);
</script>

<style scoped lang="less"></style>
