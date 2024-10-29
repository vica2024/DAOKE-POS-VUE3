<template>
  <div class="pr-4 pl-4 pt-5">
    <div
      class="border-l border-r border-b rounded-b-lg border-gray-100 rounded-tl-lg rounded-tr-lg overflow-hidden"
    >
      <div
        class="flex p-4 bg-gray-100 justify-between text-gray-500 text-[13px]"
      >
        <div
          v-for="(header, index) in headers"
          :key="index"
          :style="{ width: header.width + '%', textAlign: header.align }"
        >
          {{$t(header.name) }}
        </div>
      </div>
      <!-- list start -->
      <div v-resize="245" class="pr-4 pl-4 overflow-hidden overflow-y-auto">
        <div v-if="orderStuateList.length>0">
      <div class="flex items-center justify-between border-b border-gray-100 pt-2"  v-for="(item, index) in orderStuateList" :key="index" >
        <div
          v-for="(header, hIndex) in headers"
          :key="hIndex"
          :style="{ width: header.width + '%', textAlign: header.align }"
        >
       <div :class="['pb-2', { 'flex items-center text-left': hIndex === 0 }]">
              <p v-if="hIndex === 1">3</p>
              <p v-if="hIndex === 2">3</p>
              <p v-if="hIndex === 3">3</p>
              <p v-if="hIndex === 4">3</p>
            </div>
        </div>
      </div>
    </div>
      <a-empty v-else class="mt-[150px]"/>
    </div>
      <!-- list end -->
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const {cartList} = defineProps({
  orderStuateList: {
    type: Array,
    default: [],
  }
});
const headers = [
  {
    name: "refund.table.operationOrderNo",
    align: "left",
  },
  {
    name: "refund.table.operationRecord",
    align: "center",
  },
  {
    name: "refund.table.operationTime",
    align: "center",
  }
];
</script>
