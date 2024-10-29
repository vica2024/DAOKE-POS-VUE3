<template>
  <div :class="['', { 'bg-blue-50': setIndex === selected }]">
    <div class="flex items-center p-4 cursor-pointer">
      <div class="flex-1">
        <div class="text-base flex justify-between">
          <span class="w-2/3 flex items-center">
            <p class="w-full text-[11px] overflow-hidden text-ellipsis whitespace-nowrap lg:text-[13px]">
                <b>{{ orderInfo.order_id }} </b> 
            </p>
          </span>
          <span class="text-gray-400 text-[12px]  overflow-hidden text-ellipsis whitespace-nowrap">{{ orderInfo.add_time }}</span>
        </div>
        <div class="flex justify-between mt-2">
          <div v-for="(attr, k2) in orderInfo._info" :key="k2">
            <a-image
              width="50"
              height="50"
              class="mr-2"
              fit="cover"
              :src="attr.cart_info.attrInfo.image"
            />
          </div>
          <div class="flex-1 text-sm text-right">
            <span class="text-[11px] text-rose-600 block"
              >￥<b class="text-base">{{ orderInfo.total_price }}</b></span>
            <span class="text-gray-400 text-[11px]">{{$t('orderInfo.count')}}{{ orderInfo.total_num }}{{$t('orderInfo.totalPiece')}}</span>
          </div>
        </div>
        <div class="text-xs flex justify-between">
          <span class="text-gray-400">{{orderInfo.status_name.status_name}}</span>
          <div class="text-gray-500">
          <span v-if="orderInfo.plat_name" class="mr-2 border text-[10px] p-1" >{{ orderInfo.plat_name }}</span>
          <span class="mr-2 border text-[10px] p-1" >{{ orderInfo.pay_type_name }}</span>
          <span class="border text-[10px] p-1">{{ orderInfo.pink_name }}</span>
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
    setIndex: {
        type: Number,
        default: 0,
    },
    selected: {
        type: Number,
        default: 0,
    }
})
</script>
