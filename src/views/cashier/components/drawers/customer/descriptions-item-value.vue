<template>
  <a-typography-text>
   <span class="text-[13px]">{{ item.value }}</span>
    <a-popconfirm
      position="right"
      @ok="onConfirm(item)"
      @cancel="item.isVisible = false"
      :popup-visible="item.isVisible"
      :ok-loading="item.loading"
      content-class="popconfirm"
      cancel-text="Close"
      :ok-text="okText"
    >
      <template #icon>
        <icon-edit class="text-gray-500" />
        <span class="text-[13px]"
          >{{ $t("customer.modify") }}{{ $t(item.label) }}</span
        >
      </template>
      <template #content>
        <div class="mt-2">
          <a-input
            :style="{ width: `${item.width}px` }"
            :placeholder="$t('customer.placeholderPrefix') + $t(item.label)"
            v-model="item.value"
            allow-clear
          />
        </div>
      </template>
      <icon-edit
        @click="openEdit(item)"
        class="text-gray-400 hover:text-gray-500 cursor-pointer"
        v-if="item.isEdit"
      />
    </a-popconfirm>
  </a-typography-text>
</template>
<script setup>
import { ref } from "vue";

defineProps({
  item: {
    type: Object,
    default: {},
  },
});
const okText = ref("Save");
const openEdit = (item) => {
  item.isVisible = true;
};

const onConfirm = (item) => {
  item.loading = true;
  okText.value = "Loading";
  setTimeout(() => {
    okText.value = "Save";
    item.isVisible = false;
  }, 2000);
};
</script>
