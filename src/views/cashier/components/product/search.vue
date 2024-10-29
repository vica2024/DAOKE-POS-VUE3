<template>
  <div class="overflow-hidden rounded-xl p-4 bg-white">
    <search-skeleton v-if="isShow" />
    <div class="pl-2 pr-2" v-else>
      <a-auto-complete
        v-model="condition.keyword"
        :data="goodsList"
        @change="handleSearch"
        @select="onSelect"
        @clear="onClear"
        @focus="onReadySearch"
        :allow-clear="true"
        autocomplete="off"
        :placeholder="$t('searchPlaceholder')"
        class="bg-white border-gray-200 w-full rounded-3xl pt-1 pb-1"
      >
        <template #option="{ data }">
          <div
            class="flex w-[500px] text-xs pt-2 pb-2 border-b border-gray-100"
          >
            <a-image
              width="60"
              height="60"
              fit="cover"
              :src="data.raw.image"
              show-loader
            />
            <div class="flex-1 pl-2 overflow-hidden flex-col items-center">
              <p>
                <highlight-words
                  v-if="data.raw.type === 1"
                  class="text-[14px]"
                  :search-words="[condition.keyword]"
                  :text-to-highlight="data.raw.product_name"
                />
                <span class="text-[13px]" v-else>{{
                  data.raw.product_name
                }}</span>
              </p>
              <p class="text-gray-400 mt-[3px]">
                <highlight-words
                  v-if="data.raw.type === 2"
                  :search-words="[condition.keyword]"
                  :text-to-highlight="data.raw.barcode"
                />
                <span v-else>编码:{{ data.raw.barcode }}</span>
                <span class="ml-2">库存：{{ data.raw.stock }}</span>
              </p>
              <p class="text-xs mt-2">
                <span class="text-red-500">
                  ¥<b class="text-[13px]">{{ data.raw.price }}</b>
                </span>
              </p>
            </div>
          </div>
        </template>
      </a-auto-complete>
    </div>
    <div class="w-full mt-3 flex justify-between">
      <div>
        <a-cascader
          :options="categorys.cateList"
          @change="onSelectCate"
          :style="{ width: '200px' }"
          :placeholder="$t('categoryPlaceholder')"
          class="bg-white w-[200px] active:bg-white border-0 hover:bg-white"
        />
      </div>
      <div>
        <a-select
          :bordered="false"
          :default-value="condition.hot"
          :placeholder="$t('hotSales')"
        >
          <a-option
            v-for="(option, index) in categorys.recommendOptions"
            :key="index"
            :value="option.value"
            >{{ $t(option.label) }}</a-option
          >
        </a-select>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, reactive, ref } from "vue";
import HighlightWords from "vue-highlight-words";
import searchSkeleton from "./search-skeleton.vue";
import { throttle } from "@/utils/customFunc";
import dynamicIcon from "@/components/custom/DynamicIcon.vue";

const { getProductList, goodsList, categorys } = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  categorys: {
    type: Object,
    default: {},
  },
  goodsList: {
    type: Array,
    default: [],
  },
  getProductList: {
    type: Function,
  },
});

// Query conditions
const condition = reactive({
  keyword: "",
  cate_id: null,
  hot: "",
  page: 1,
  limit: 20,
  uid: 22690,
  staff_id: 4,
});

const handleSearch = throttle(async () => {
  getProductList(condition, true);
}, 1300);

const onSelect = () => {
  getProductList(condition);
};
const onSelectCate = (cate_id) => {
  condition.cate_id = cate_id;
  getProductList(condition);
};
const onReadySearch = () => {
  getProductList(condition, true);
};

const onClear = () => {
  condition.keyword = "";
};
getProductList(condition);
</script>
