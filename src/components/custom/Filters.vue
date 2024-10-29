<template>
    <div class="h-full relative overflow-hidden rounded-b-2xl">
      <div v-resize="210" class="p-4">
        <div class="w-full" v-for="(item, index) in selcetOptions" :key="index">
          <h3 class="font-bold mb-3 mt-4">{{ item.title }}</h3>
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
                {{ item.name }}<span v-if="item.hasOwnProperty('count')">({{ item.count }})</span>
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
          >{{$t('modal.footer.search')}}</a-button
        >
      </div>
    </div>
  </template>
  <script setup>
import { reactive } from 'vue';
  const emits = defineEmits(['onFinish']);
  const props = defineProps({
    selcetOptions: {
      type: Array,
      default: [],
    },
  });
  const chooseOne = (index, key) => {
    const options = props.selcetOptions;
    options[index].list.forEach((item) => {
      item.checked = false;
    });
    emits('onFinish',{key:options[index].fiels,value:options[index].list[key].value});
    options[index].list[key].checked = true;
  };
  const reset = () => {
    const options = props.selcetOptions;
    options.forEach((item,index) => {
      item.list.forEach((itemb, key) => {
        if(key==0 && item.type != "cashier"){
          itemb.checked = true;
        }else{
          if(itemb.checked){
            conditions[options[index].type] = item.value
          }   
          itemb.checked = false;
        }
      });
    });
  };
  const onSearch = () => {
    emits('onFinish',{isDone:true});
  }
  </script>
  <style lang="less" scoped>
  .shadow-t {
    box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.06);
  }
  </style>
  