<template>
  <a-skeleton
    :animation="true"
    class="p-4 bg-white"
  >
    <a-space direction="vertical" class="w-full">
      <a-skeleton-line :line-height="38" />
      <a-space class="w-full flex justify-between">
        <a-skeleton-line :widths="[160]" :line-height="25" />
        <a-skeleton-line :widths="[160]" :line-height="25"/>
      </a-space>
    </a-space>
  </a-skeleton>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  is_show: {
    type: Boolean,
    default: true,
  },
});
</script>
