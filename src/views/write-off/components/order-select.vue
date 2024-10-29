<template>
  <div class="h-full relative overflow-hidden rounded-b-2xl">
    <div v-resize="210" class="p-4">
      <div class="w-full" v-for="(item, index) in selcetOptions" :key="index">
        <h3 class="font-bold mb-3 mt-4">{{ $t(item.title) }}</h3>
        <div class="w-full overflow-hidden">
          <div
            class="float-left mr-4 mb-4"
            v-for="(item, key) in item.list"
            :key="key"
          >
            <a-button
              :type="item.checked ? 'primary' : null"
              shape="round"
              size="small"
              @click="chooseOne(index, key)"
            >
              {{ $t(item.name) }}
            </a-button>
          </div>
          <div class="w-full flex items-center" v-if="index == 1">
            <a-date-picker class="w-[180px] rounded-2xl" />
            <span class="pl-2 pr-2 font-bold"> ~ </span>
            <a-date-picker class="w-[180px] rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-between gap-3 p-4 shadow-t">
      <a-button class="w-1/2" shape="round" @click="reset">{{$t('modal.footer.reset')}}</a-button>
      <a-button
        class="w-1/2"
        type="primary"
        shape="round"
        @click="onSearch"
        >{{$t('modal.footer.confirm')}}</a-button
      >
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const { selcetOptions,onSearch } = defineProps({
  selcetOptions: {
    type: Array,
    default: [],
  },
  onSearch: {
    type: Function,
  },
});
const chooseOne = (index, key) => {
  selcetOptions[index].list.forEach((item) => {
    item.checked = false;
  });
  selcetOptions[index].list[key].checked = true;
};
const reset = () => {
  selcetOptions.forEach((item,index) => {
    item.list.forEach((itemb, key) => {
      if(key==0 && item.type != "cashier"){
        itemb.checked = true;
      }else{
        itemb.checked = false;
      }
    });
  });
};
</script>
<style lang="less" scoped>
.shadow-t {
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.06);
}
</style>
