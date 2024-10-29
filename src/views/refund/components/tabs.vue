<template>
    <div class="flex text-base rounded-tl-3xl bg-white tabs">
        <div
          v-for="(tab, index) in menus"
          :key="index"
          :class="`cursor-pointer bg-gray none-${setIndex}`"
        >
          <div
            :class="['p-4 pl-6 pr-6 text-[14px] lg:text-base', { 'active': setIndex === index }]"
            @click="chooseTab(index)"
          >
            {{ $t(tab) }}
          </div>
        </div>
        <div
          :class="`bg-gray-100 flex-1 ${setIndex === 2 ? 'none-2' : ''}`"
        ></div>
      </div>
</template>
<script setup>
import { defineProps, ref } from 'vue';
const {onChange,setIndex} =defineProps({
    menus: {
    type: Array,
    default: [],
  },
  onChange: {
    type: Function
  },
  setIndex:{
    type:Number,
    default:0
  }
});
const chooseTab = (index) => {
    onChange(index);
}
</script>
<style lang="less">
.tabs {
  .bg-gray {
    background-color: #f2f3f5;
  }
  .none-0:nth-child(1) {
    border-bottom-right-radius: 18px;
  }

  .none-0:nth-child(2) {
    border-bottom-left-radius: 18px;
  }

  .none-1:nth-child(1) {
    border-bottom-right-radius: 18px;
  }

  .none-1:nth-child(3) {

    border-bottom-left-radius: 18px;
  }

  .none-2:nth-child(2) {
    border-bottom-right-radius: 18px;
  }

  .none-2:nth-child(4) {
    border-bottom-left-radius: 18px;
  }

  .active {
    /* 选中状态的样式 */
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    background-color: #FFFFFF;
    font-weight: bold;
  }
}
</style>