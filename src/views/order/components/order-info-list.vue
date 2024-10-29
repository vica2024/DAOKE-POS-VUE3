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
  remarks: {
    type: String,
    default: "",
  },
  payPrice:{
    type:String,
    default:'0'
  },
  totalPrice:{
    type:String,
    default:'0'
  }
});

const headers = [
  {
    name: "refundTable.goodsInfo",
    width: 40,
    align: "left",
  },
  {
    name: "refundTable.num",
    align: "center",
    width: 8,
  },
  {
    name: "refundTable.weight",
    align: "center",
    width: 8,
  },
  {
    name: "refundTable.price",
    width: 10,
    align: "center",
  },
  {
    name: "refundTable.discount",
    align: "center",
  },
  {
    name: "refundTable.total",
    width: 12,
    align: "center"
  },
];
</script>

<template>
  <div class="pl-4 pr-4">
    <div class="mb-2">
      <span class="text-[13px] lg:text-[14px]">{{$t('orderInfo.count')}} <b class="text-amber-700 text-[14px] lg:text-base">{{ count }}</b> {{$t('orderInfo.totalPiece')}}</span>
    </div>
    <div class="border-l border-r border-b rounded-b-lg border-gray-100 rounded-tl-lg rounded-tr-lg overflow-hidden">
    <div class="flex p-4 bg-gray-100 justify-between text-gray-500 text-[12px] lg:text-[13px]">
      <div
        v-for="(header, index) in headers"
        :key="index"
        :style="{ width: header.width + '%', textAlign: header.align }"
      >
        {{ $t(header.name) }}
      </div>
    </div>
    <div v-resize="550" class="pr-4 pl-4 overflow-hidden overflow-y-auto">
        <div v-if="cartList.length>0">
      <div class="flex items-center justify-between border-b border-gray-100 pt-2" v-for="(item, index) in cartList" :key="index" >
        <div
          v-for="(header, hIndex) in headers"
          :key="hIndex"
          :style="{ width: header.width + '%', textAlign: header.align }"
        >
       <div :class="['pb-2', { 'flex items-center text-left': hIndex === 0 }]">
            <a-image
              v-if="hIndex === 0"
              width="60"
              height="60"
              fit="cover"
              :src="item.cart_info.attrInfo.image"
              show-loader
            />
            <div :class="['text-[12px]', { 'pl-2 overflow-hidden text-ellipsis whitespace-nowrap': hIndex === 0 }]">
              <p class="mt-1" v-if="hIndex === 0">
                <h3>{{ item.cart_info.productInfo.store_name }}</h3>
                <a-tag class="text-[10px]" size="small">{{ item.cart_info.attrInfo.suk }}</a-tag>
              </p>
              <p v-if="hIndex === 1">{{item.cart_info.cart_num}}</p>
              <p v-if="hIndex === 2">{{item.cart_info.attrInfo.weight}}</p>
              <p v-if="hIndex === 3">{{item.cart_info.attrInfo.price}}</p>
              <p v-if="hIndex === 4">-0</p>
              <p v-if="hIndex === 5">{{item.total.toFixed(2)}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-empty v-else class="mt-[150px]"/>
      </div>
    </div>
      <div  class="h-[160px] flex justify-between text-sm mt-4 rounded-lg overflow-hidden">
        <div class="flex-1 text-[12px] lg:text-[14px]">
            {{$t('remark')}}：
            <p class="text-sm mt-1 text-gray-400">{{remarks}}</p>
        </div>
        <div class="text-right text-[12px] lg:text-[14px]">
        <p class="mb-2">
          {{$t('order.tax')}}: ¥0
        </p>
        <p class="mb-2">
          {{$t('order.totalDiscount')}}: ¥0
        </p>
        <p class="mb-1">
          {{$t('order.orderAmount')}}: ¥{{ totalPrice }}
        </p>
        <p>{{$t('order.totalPay')}}: ¥<b class="text-base">{{ payPrice }}</b></p>
    </div>
      </div>
  </div>
</template>

<style scoped lang="less"></style>
