<template>
  <a-modal v-model:visible="cashierModalState.seachCashierModalState" :title="modalTitle" :width="modalWidth" :footer="false">
    <div class="w-full">
      <!-- <div class="text-center">
        <a-input-search class="w-2/3" :placeholder="$t('searchSalespersonPlaceholder')" size="large" search-button />
      </div> -->
      <div v-if="show" class="pr-2 flex w-full overflow-hidden overflow-y-auto cursor-pointer">
        <a-row :gutter="24">
          <a-col v-for="staff in staffList" :key="staff.id" :span="12" @click="changeCacher(staff)">
            <div class="p-3 mb-3 flex items-center rounded-lg bg-gray-100">
              <div class="text-center">
                <a-avatar :size="40">
                  <img alt="" :src="staff.avatar">
                </a-avatar>
              </div> 
              <div class="flex-1 pl-1">
                <span class="font-bold flex items-center">
                  {{ staff.staff_name }} <span class="text-xs font-light text-gray-400">（id:{{staff.id}}）</span>
                </span>
                <span class="text-xs text-gray-500">{{ $t('phone') }}：{{ staff.phone }}</span>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div v-else class="text-center p-5">
        <a-spin dot>{{ $t('loading') }}</a-spin>
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import {defineProps, inject,ref,watch,nextTick} from 'vue';
import { cashierList } from "@/api/user";
const {setNewCashier} = defineProps({
  modalTitle: {
    type: String,
    default: '收银员列表'
  },
  modalWidth: {
    type: String,
    default: '680'
  },
  setNewCashier:{
    type:Function}
});
const staffList = ref([]);
const show = ref(false);
const cashierModalState = inject('CACHIER_MODAL_STATE');
watch(
  () => cashierModalState.seachCashierModalState,
  (newValue) => {
    if (newValue) {
      cashierList().then((res) => {
        nextTick(() => {
          staffList.value = res.data.staffList;
          show.value = true;
        })
        
      })
    }
  }
);
const changeCacher =(staff)=>{
  setNewCashier(staff);
  cashierModalState.seachCashierModalState = false;
}
</script>

<style scoped lang="less">


</style>
