<template>
  <div :class="['', { 'bg-blue-50': index === selected }]">
    <div class="flex items-center p-4 cursor-pointer">
      <div class="flex-1">
        <div class="text-base flex justify-between">
          <span class="w-2/3 flex items-center">
            <p class="w-full font-bold text-[11px] overflow-hidden text-ellipsis whitespace-nowrap lg:text-[13px]">
                {{ orderInfo.order_id }}
            </p>
          </span>
          <span class="text-gray-400 text-[12px]  overflow-hidden text-ellipsis whitespace-nowrap">{{ orderInfo.add_time }}</span>
        </div>
        <div class="flex justify-between mt-2">
          <div v-for="(attr, k2) in orderInfo.cartInfo" :key="k2">
            <a-image
              width="50"
              height="50"
              class="mr-2"
              fit="cover"
              :src="attr.attrInfo.image"
            />
          </div>
          <div class="flex-1 text-sm text-right">
            <span class="text-[11px] block"
              >￥<b class="text-base">-{{ orderInfo.refunded_price }}</b></span>
            <span class="text-gray-400 text-[11px]">{{$t('refund.count')}}<b class="text-base p-1">{{ orderInfo.total_num }}</b>{{$t('refund.pieces')}}</span>
          </div>
        </div>
        <div class="text-xs flex justify-between">
          <span class="text-gray-400">{{orderInfo.status_name.status_name}}</span>
          <div class="text-gray-500">
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
    orderInfo: {
        type: Object,   
        default: {},
    },
    index: {
        type: Number,
        default: 0,
    },
    selected: {
        type: Number,
        default: 0,
    }
})
</script>
