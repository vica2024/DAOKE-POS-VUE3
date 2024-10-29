<template>
  <div :class="['', { 'bg-blue-50': index === selected }]">
    <div class="flex items-center p-4 cursor-pointer">
      <div class="flex-1">
        <div class="text-base flex justify-between">
          <span class="w-2/3 flex items-center">
            <p class="w-full font-bold text-[11px] overflow-hidden text-ellipsis whitespace-nowrap lg:text-[13px]">
                {{ $t('writeOff.orderNo') }}:{{ orderInfo.order_id }}
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
            <span class="text-gray-400 text-[11px]">共{{ orderInfo.total_num }}件商品</span>
          </div>
        </div>
        <div class="text-xs flex justify-between">
          <span>{{orderInfo.status_name.status_name}}</span>
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
