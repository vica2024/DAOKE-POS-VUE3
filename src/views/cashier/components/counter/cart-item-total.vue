<template>
  <div
    class="pl-4 pr-4 pt-2 pb-2 border-gray-100 border-b flex justify-between"
  >
    <span v-html="formattedSelectedMessage" />
    <a-popconfirm v-if="itemCount>0"
      content="Do you want to discard the items?"
      okText="Discard"
      cancelText="No"
      @ok="clearCart"
    >
      <icon-font type="icon-qingsao" class="cursor-pointer" :size="26" />
    </a-popconfirm>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// 定义 props
const props = defineProps({
  itemCount: {
    type: Number,
    default: 0,
  },
  clearCart:{
    type:Function
  }
});
const toShow = ref(false);
//
const formattedSelectedMessage = computed(() => {
  return `${t("selected", { count: props.itemCount })}`;
}); 
</script>
