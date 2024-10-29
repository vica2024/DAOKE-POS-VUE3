<template>
  <a-modal
    v-model:visible="isShowRefundMarkModal"
    :title="$t('remark')"
    :width="modalWidth"
    :footer="false"
  >
    <div class="w-full">
      <a-textarea
        v-model="content"
        class="bg-white border border-blue-300 shadow-md rounded-lg hover:bg-white hover:border-blue-300"
        style="height: 260px"
        placeholder="退货订单备注"
        :max-length="300"
        show-word-limit
        auto-size
      />
      <div class="pt-5 text-center">
        <a-button
          type="primary"
          class="h-12 pl-20 pr-20"
          shape="round"
          @click="finish"
          ><b>{{ $t("modal.footer.confirm") }}</b></a-button
        >
      </div>
    </div>
  </a-modal>
</template>

<script setup>
import {ref, inject, watch } from "vue";
const emits = defineEmits(['onRefundMark']);
const isShowRefundMarkModal = inject("isShowRefundMarkModal");
const prop = defineProps({
  modalWidth: {
    type: String,
    default: "700",
  },
  orderInfoData:{
    type:Object,
    default:{}
  }
});
const content = ref("");
watch(
  isShowRefundMarkModal,
  (newValue) => {
    if (newValue) {
      content.value = prop.orderInfoData.remark;
    }
  }
)
const finish = () => {
  emits('onRefundMark',content.value);
};
</script>

<style scoped lang="less"></style>
