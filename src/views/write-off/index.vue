<script setup>
import { ref } from "vue";
import order from "./order.vue";
import { getDataInfo, getHangList } from "@/api/order.js";

const openVerify = ref(false);
const keyWords = ref("");
const userInfo = ref({});
const customerList = ref([]);
const getOne = ref(0);
const selIndex = ref(0);
const tabs = ["writeOff.info", "writeOff.details", "writeOff.record"];

</script>

<template>
  <div class="w-full h-full overflow-hidden">
    <div class="h-full rounded-2xl">
      <div
        class="content-center p-5 h-full text-center bg-white rounded-3xl"
        v-if="!openVerify"
      >
        <a-typography-title heading="5">{{ $t("writeOff.title") }}</a-typography-title>
        <div class="w-2/3 m-auto mt-5 mb-5">
          <div class="search-custom rounded-3xl overflow-hidden mr-4 ml-4 mt-2 mb-4">
            <a-input-search
              size="large"
              :placeholder="$t('writeOff.searchPlaceholder')"
              :button-text="$t('writeOff.search')"
              search-button
            />
          </div>
        </div>
        <div class="btn">
          <a-button type="text" @click="openVerify = true"
            >{{$t("writeOff.checkedOrder")}}</a-button
          >
        </div>
      </div>
      <order :closeVerify="()=>{openVerify=false}" v-else />
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
