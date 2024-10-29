<template>
  <div class="w-[108px] border-l p-4 border-gray-100 mt-1">
    <div v-for="(item, index) in buttons" :key="index" class="mb-8">
      <a-button
        v-if="item.disabled"
        type="outline"
        size="small"
        shape="round"
        @click="openWindon(item)"
        :disabled="item.disabled"
      >
        <span class="w-[40px] overflow-hidden text-ellipsis whitespace-nowrap">
          {{ $t(item.label) }}
        </span>
      </a-button>
      <a-tooltip
        v-else
        :content="$t(item.label)"
        background-color="#3491FA"
        position="right"
      >
        <a-button type="outline" shape="round" size="small" @click="item.operate">
          <span
            class="w-[40px] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {{ $t(item.label) }}
          </span>
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>
<script setup>
import { defineProps} from "vue";
defineProps({
  buttons:{
    type:Array
  }
});
</script>
