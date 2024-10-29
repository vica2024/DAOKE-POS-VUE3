<template>
  <div class="w-full">
    <div class="mb-10 mt-20 text-center">
      <custom-amonuts :title="$t('acount_receicable')" :precision="2" :amount="Number(payPrice)" :valueStyle="{ fontSize: '16px', fontWeight: '800' }" />
    </div>
    <div class="p-5 rounded-2xl mt-2 bg-indigo-50 shadow-xl">
      <div
        class="ml-5 mt-3 rounded-lg pl-5 pt-3 pb-3 text-2xl bg-white w-[93%]"
      >
        {{ state.collectionString }}
      </div>
      <div class="text-left pl-5 mt-5">
        {{ $t('return_change') }}
        <span class="text-blue-500 text-base"
          >¥ {{ formattedReturnAmount }}</span
        >
      </div>
      <div class="p-5 flex">
        <div class="grid w-3/4 gap-4 grid-cols-3">
          <a-button
            v-for="(item, index) in numList"
            size="large"
            :key="index"
            class="pt-4 pb-4 pl-5 pr-5 font-bold text-2xl rounded-lg transition-transform transform active:scale-95"
            @click="numTap(item)"
          >
            <span class="text-blue-700">{{ item }}</span>
          </a-button>
        </div>
        <div class="w-1/4 pl-4">
          <a-button long size="large" class="mb-4 p-4 rounded-lg cursor-pointer transition-transform transform active:scale-95" @click="delNum">
            <icon-arrow-left class="text-blue-700" size="25" />
          </a-button>
          <a-button
            long
            size="large"
            class="mb-4 p-4 text-2xl font-bold rounded-lg cursor-pointer transition-transform transform active:scale-95"
            @click="clearNumber"
          >
            <span class="text-blue-700">C</span>
          </a-button>
          <a-button
            long
            type="primary"
            size="large"
            class="h-[135px] text-xl font-bold rounded-lg cursor-pointer transition-transform transform active:scale-95"
            @click="cashBnt"
          >
            <span class="text-cyan-50">{{$t('modal.footer.confirm')}}</span>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, reactive, watchEffect } from "vue";
import { Message } from "@arco-design/web-vue";
import { useI18n } from "vue-i18n";
import CustomAmonuts from "@/components/custom/Amonut.vue";
const { t } = useI18n();
const {payPrice,PaymentComfirm,finishOrder} = defineProps({
  payPrice: {
    type: Number,
    default: 0.0,
  },
  PaymentComfirm:{
    type:Function
  }
});

// 使用 reactive 来管理响应式状态
const state = reactive({
  collectionArray: [], // 存储输入的数字
  collectionString: 0, // 用于输入框显示的字符串
  returnAmount: 0, // 计算的找零金额
  collection: 0, // 当前的输入
});

const numList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00", "."];

// 处理数字按钮点击事件
const numTap = (item) => {
  let x = String(state.collection).indexOf(".") + 1;
  let y = String(state.collection).length - x;
  if (x === 0 || y < 2) {
    if (state.collectionArray.join("") <= 9999999) {
      state.collectionArray.push(item);
    }
    state.collection =
      state.collectionArray.join("") > 99999999
        ? 99999999
        : state.collectionArray.join("");
  }
};

// 清除所有输入的数字
const clearNumber = () => {
  state.collectionArray = [];
  state.collection = 0;
};

// 删除最后一个输入的数字
const delNum = () => {
  state.collectionArray.pop();
  state.collection = state.collectionArray.length
    ? state.collectionArray.join("")
    : 0;
};

// 确认按钮事件（可根据需要实现具体逻辑）
const cashBnt = () => {
   if(Number(state.collectionString) >= Number(payPrice)){
    PaymentComfirm();
    clearNumber();
   }else{
    Message.error(t('paymentPriceWrong'));
   }
};

// 同步 collectionString 和 collectionArray
watchEffect(() => {
  state.collectionString =
    state.collectionArray.length === 0 ? 0 : state.collectionArray.join("");
});

watchEffect(() => {
  state.returnAmount = state.collectionArray.length === 0 ? 0 : Number(state.collectionString) - payPrice;
});

// 千位数格式化函数
const numberFormatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formattedReturnAmount = computed(() => {
  return numberFormatter.format(state.returnAmount);
});
</script>

<style scoped>

.arco-btn-secondary {
  background-color: #ffffff !important;
}
</style>
