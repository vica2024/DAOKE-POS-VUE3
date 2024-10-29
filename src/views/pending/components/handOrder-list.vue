<script setup>
import { defineProps } from "vue";

const {cartList} = defineProps({
  cartList: {
    type: Array,
    default: [],
  },
  count: {
    type: Number,
    default: 0,
  },
  payPrice:{
    type:Number,
    default:0
  }
});
const headers = [
  {
    name: "商品",
    width: 40,
    align: "left",
  },
  {
    name: "数量",
    align: "center",
    width: 8,
  },
  {
    name: "重量",
    align: "center",
    width: 8,
  },
  {
    name: "单价",
    width: 10,
    align: "center",
  },
  {
    name: "优惠",
    align: "center",
  },
  {
    name: "金额",
    width: 12,
    align: "center"
  },
];
</script>

<template>
  <div class="w-full">
    <div class="mb-2 mt-2">
      <span class="text-base">共 <b class="text-lg text-amber-700">{{ count }}</b> 件商品</span>
    </div>
    <div class="border-l border-r border-b rounded-b-lg border-gray-100 rounded-tl-lg rounded-tr-lg overflow-hidden">
    <div class="flex p-4 bg-gray-100 justify-between text-gray-500 text-[13px]">
      <div
        v-for="(header, index) in headers"
        :key="index"
        :style="{ width: header.width + '%', textAlign: header.align }"
      >
        {{ header.name }}
      </div>
    </div>
    <div v-resize="480" class="min-w-[380px] pr-4 pl-4 overflow-hidden overflow-y-auto">
      <div class="flex items-center justify-between border-b border-gray-100 pt-2" v-for="(item, index) in cartList" :key="index" >
        <div
          v-for="(header, hIndex) in headers"
          :key="hIndex"
          :style="{ width: header.width + '%', textAlign: header.align }"
        >
       <div :class="['pb-2', { 'flex text-left': hIndex === 0 }]">
            <a-image
              v-if="hIndex === 0"
              width="60"
              height="60"
              fit="cover"
              :src="item.cart[0].attrInfo.image"
              show-loader
            />
            <div :class="['text-[12px]', { 'pl-2 flex-1 overflow-hidden': hIndex === 0 }]">
              <p class="mt-1" v-if="hIndex === 0">
                <h3 :title="item.cart[0].productInfo.store_name" class="overflow-hidden text-ellipsis whitespace-nowrap">{{ item.cart[0].productInfo.store_name }}</h3>
                <a-tag class="text-[10px]" size="small">{{ item.cart[0].attrInfo.suk }}</a-tag>
              </p>
              <p v-if="hIndex === 1">{{item.cart[0].cart_num}}</p>
              <p v-if="hIndex === 2">{{item.cart[0].attrInfo.weight}}</p>
              <p v-if="hIndex === 3">{{item.cart[0].attrInfo.price}}</p>
              <p v-if="hIndex === 4">-0</p>
              <p v-if="hIndex === 5">{{Number(item.cart[0].attrInfo.price * item.cart[0].cart_num).toFixed(2)}}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
      <div  class="h-[160px] text-sm text-right mt-4 p-4 rounded-lg overflow-hidden">
        <p class="mb-2">
          {{$t('pending.tax')}}: ¥0
        </p>
        <p class="mb-2">
          {{$t('pending.totalDiscount')}}: ¥0
        </p>
        <p class="mb-2">
          {{$t('pending.orderAmount')}}: ¥0
        </p>
        <p>{{$t('pending.totalPay')}}: ¥<b>{{ payPrice }}</b></p>
      </div>
  </div>
</template>

<style scoped lang="less"></style>
