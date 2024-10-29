<template>
  <div class="flex items-center border-gray-100 border-b pb-5 pt-5">
    <a-avatar :size="40" :imageUrl="item.avatar?item.avatar:'https://multi-store.crmeb.net/view_cashier/img/yonghu.908b01d3.png'" />
    <div class="pl-3 flex-1">
      <div class="text-base flex justify-between">
        <h3 class="w-1/3 text-[13px] font-bold overflow-hidden text-ellipsis whitespace-nowrap"
          >{{item.nickname?item.nickname:$t('temporayCustomer')}}
          </h3>
        <span class="text-sm text-gray-400">{{item._add_time}}</span>
      </div>
      <div class="flex-1 flex justify-between">
        <span class="text-amber-700 text-xs">￥<b class="text-[15px]">{{item.price}}</b></span>
        <div class="text-[12px] flex justify-end w-1/2 min-w-[80px]">
          <span class="flex text-blue-500" @click="operateOrder(item,false,$event)">{{$t('pending.pickOrder')}}</span>
          <span class="ml-2 mr-2"> <icon-minus :rotate="90" class="text-gray-300" /></span>
          <a-popconfirm :content="$t('deleteCartConfirm')" @ok="operateOrder(item,true)">
             <span class="text-rose-600" @click="$event.stopPropagation()">{{$t('modal.footer.delete')}}</span>
          </a-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, inject } from "vue";
defineProps({
  item: {
    type: Object,
  },
});
const operateOrder = inject('operateOrder');
</script>
