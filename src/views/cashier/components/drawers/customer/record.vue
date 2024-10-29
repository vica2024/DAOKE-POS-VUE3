<template>
  <a-table
    v-if="columns.length > 0"
    size="small"
    :columns="columns"
    :data="data"
  />
  <a-empty v-else class="mt-[150px]" />
</template>
<script setup>
import { watch } from "vue";
const { columns, data } = defineProps({
  columns: {
    type: Array,
    default: [],
  },
  data: {
    tyype: Array,
    default: [],
  },
});
</script>
<style lang="less"></style>
