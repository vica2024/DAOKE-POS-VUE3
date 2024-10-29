<template>
  <div class="w-2/3 m-auto mb-4">
    <a-auto-complete
      v-model="conditison.keyword"
      :data="customerList"
      @change="handleSearch"
      @select="onSelect"
      @clear="onClear"
      @focus="onReadySearch"
      :allow-clear="true"
      autocomplete="off"
      :placeholder="$t('customer.searchCustomerPlaceholder')"
      class="rounded-3xl pt-1 pb-1"
    >
      <template #option="{ data }">
        <div class="flex text-xs pt-3 pb-3">
          <div v-for="(item, index) in formattedData(data.raw)" :key="index" class="mr-2 flex items-center">
            <dynamic-icon :type="item.icon" />
            <highlight-words
              v-if="data.raw.type === item.type"
              :search-words="[conditison.keyword]"
              :text-to-highlight="item.text"
            />
            <span v-else>{{ item.text }}</span>
          </div>
        </div>
      </template>
    </a-auto-complete>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import HighlightWords from "vue-highlight-words";
import dynamicIcon from "@/components/custom/DynamicIcon.vue";
import { throttle } from "@/utils/customFunc";
import { customerListSearch } from "@/api/customer";

const { setNewCustomer } = defineProps({
  setNewCustomer: {
    type: Function,
  },
});
const customerList = ref([]);

/**
 * This is a condition for search.
 */
const conditison = reactive({
  keyword: "",
  page: 1,
  limit: 10,
});

/**
 * To format data made it simple.
 * @param raw 
 */
const formattedData = (raw) => {
  return [
    { icon: "user", type: 1, text: raw.full_name },
    { icon: "phone", type: 2, text: raw.phone_no },
    { icon: "email", type: 3, text: raw.email },
  ];
};

/**
 * This is to handdle data form search.
 */
const handleSearch = throttle(async () => {
  if (!conditison.keyword) {
    customerList.value = [];
    return false;
  }
  const list = [];
  const { data } = await customerListSearch(conditison);
  if(!data.list){
   return false;
  }
  data.list.forEach((item) => {
    const conditions = [
      { key: "full_name", type: 1 },
      { key: "phone_no", type: 2 },
      { key: "email", type: 3 },
    ];

    for (const { key, type } of conditions) {
      if (item[key].toLowerCase().includes(conditison.keyword.toLowerCase())) {
        list.push({
          ...item,
          label: item[key],
          value: item[key],
          type: type,
        });
        break;
      }
    }
  });
  customerList.value = list;
}, 1300);

/**
 * This is to remove old data which are prior customer data list.
 */
const onClear = () => {
  conditison.keyword = "";
  customerList.value = [];
  setNewCustomer(false);
};
const onReadySearch = ()=>{
  customerList.value = [];
}
/**
 * This is filter one.
 * @param e
 */
const onSelect = (e) => {
  customerList.value.forEach((item) => {
    if (item.value == e) {
      setNewCustomer(item);
    }
  });
};
</script>
