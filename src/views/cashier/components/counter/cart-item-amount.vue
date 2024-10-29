<template>
  <div
    class="flex items-center pl-4 pr-4 pt-2 pb-2 border-t border-gray-100 justify-between shadow-md shadow-gray-200"
  >
    <div
      class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
      @click="CACHIER_MODAL_STATE.seachCashierModalState = true"
    >
      <a-avatar :size="20" :imageUrl="cashierInfo.avatar" object-fit="cover" />
      {{ cashierInfo.staff_name }} <icon-down class="text-gray-400" />
    </div>
    <div class="flex-1 flex justify-end items-center">
      <span v-if="total_amount>0" class="mr-1 text-xs text-blue-400 cursor-pointer min-w-[40px]" @click="drawerState.showCartDetails = true">
        {{ $t("details") }}
      </span>
      <span class="mr-1 text-xs min-w-[36px]">{{ $t("total_amount") }}</span>
      <custom-amonuts :amount="Number(total_amount)" :precision="2" />
    </div>
    <!-- for cashier infomation that to operate -->
    <modal-cashier-list :setNewCashier="setNewCashier" />
  </div>
</template>
<script setup>
import CustomAmonuts from "@/components/custom/Amonut.vue";
import { defineProps, provide, reactive,inject } from "vue";
import ModalCashierList from "../modals/cashier-list.vue";
const drawerState = inject("drawerState");
const props = defineProps({
  total_amount: {
    type: Number,
    default: 0,
  },
  start: {
    type: Boolean,
    default: false,
  },
  cashierInfo:{
    type:Object
  },
  setNewCashier:{
    type:Function
  }
});
const CACHIER_MODAL_STATE = reactive({
  seachCashierModalState: false,
});
provide("CACHIER_MODAL_STATE", CACHIER_MODAL_STATE);
</script>
