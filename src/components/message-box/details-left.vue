<template>
  <div class="h-full overflow-y-auto w-[200px] border-r border-gray-100">
    <a-list :bordered="false">
      <a-list-item v-for="(item, index) in list" :key="index"
        :class="['cursor-pointer', { 'bg-[#f1f4f9]': setIndex === index }]"
        @click="viewDetails(item, index)">
        <div class="flex items-start">
          <a-badge v-if="item.isReaded == 0" color="red" /> 
          <p class="ml-1"> {{ item.title }}</p>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const emit = defineEmits(["setContent"]);
defineProps({
  list: {
    type: Array
  },
});
const config = {
  rows: 1,
}
const setIndex = ref(0);
const viewDetails = (item, index) => {
  setIndex.value = index;
  emit('setContent', item,index);
}
</script>