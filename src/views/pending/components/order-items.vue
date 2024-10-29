<template>
  <div v-resize="160" class="overflow-hidden overflow-y-auto border-gray-100 border-t" v-if="list.length > 0">
    <div
      :class="['pl-4 pr-4 cursor-pointer', { 'bg-blue-50': currentIndex === index }]"
      v-for="(item, index) in list"
      :key="index"
      @click="getOne(index, item)"
    >
      <item-card :item="item"></item-card>
    </div>
  </div>
  <div v-resize="160" class="flex justify-center" v-else>
    <div class="w-3/5 m-auto text-center">
      <img alt="" src="../../../assets/images/no-order.png" />
      <span class="text-gray-400 text-xs">{{$t('pending.noItems')}}</span>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
import ItemCard from "./order-items-card.vue";
const {list,toShowDetails} = defineProps({
  list: {
    type: Array,
  },
  toShowDetails:{
    type:Function
  }
});
const isUnPayment = ref(true);
const currentIndex = ref(0);
const getOne = (index,item)=>{
  currentIndex.value = index;
  toShowDetails(item);
}
</script>
