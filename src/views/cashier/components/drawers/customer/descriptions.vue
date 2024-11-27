<template>
  <div class="relative">
    <span
      class="absolute pt-[3px] right-1 text-blue-500 cursor-pointer hover:text-gray-600"
      @click="createCutomerInfo"
    >
      <icon-plus /> {{ $t("customer.createCustomer") }}
    </span>

    <a-descriptions
      size="mini"
      v-for="(row, index) in customerForms"
      :key="index"
      style="margin-bottom: 15px"
      :column="{ xs: 2, sm: 4, md: 4, lg: 4 }"
      layout="inline-vertical"
      bordered
    >
      <template #title>
        <h3 class="text-[14px]">{{ $t(row.itemName) }}</h3>
      </template>
      <a-descriptions-item
        v-for="(item, key) of row.list"
        :key="key"
        :span="item.span"
      >
        <template #label
          ><span class="text-[13px]">{{$t(item.label)}}</span></template
        >
        <descriptions-item-value :item="item" />
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<style lang="less">
.popconfirm {
  .arco-popconfirm-body {
    display: block;
  }
}
</style>
<script setup>
import { ref } from "vue";
import { getCustomerDetails } from "@/api/customer";
import { replaceValues } from "@/utils/customFunc";
import descriptionsItemValue from "./descriptions-item-value.vue";

const customerForms = ref([]);
const isReady = ref(false);
const emit = defineEmits(["messageSent"]);

const froms = [
  {
    itemName: "customer.userInfo",
    list: [
      {
        label: "customer.givenName",
        value: "last_name",
        span: 2,
      },
      {
        label: "customer.lastName",
        value: "full_name",
        span: 2,
      },
      {
        label: "customer.email",
        value: "email",
        span: 2,
      },
      {
        label: "customer.phoneNumber",
        value: "phone",
        span: 2,
      },
      {
        label: "customer.birthday",
        value: "birthday",
      },
      {
        label: "customer.gender",
        value: "sex",
      },
      {
        label: "customer.country",
        value: "country",
        span: 2,
      },
      {
        label: "customer.city",
        value: "city",
        span: 1,
      },
      {
        label: "customer.district",
        value: "district",
        span: 1,
      },
      {
        label: "customer.postalCode",
        value: "post_code",
        span: 2,
      },
      {
        label: "customer.address",
        value: "addres",
        span: 4,
      },
      {
        label: "customer.policy",
        value: "agreeded",
        span: 4,
      },
    ],
  }
];

const initicalCutomerInfo = (uid) => {
  isReady.value = uid > 0;
  customerForms.value = froms.map((item) => ({
    ...item,
    list: item.list.map((subItem) => ({
      ...subItem,
      value: isReady.value ? subItem.value : "--",
    })),
  }));
  if (isReady.value) {
    getCustomerInfo(uid);
  }
};

const getCustomerInfo = (uid) => {
  const allowEdit = [0, 1, 10];
  getCustomerDetails(uid).then((res) => {
    const { data } = res;
    customerForms.value.forEach((items, index) => {
      items.list.forEach((row, key) => {
        row.isEdit = false;
        row.loading = false;
        row.isVisible = false;
        if (index == 0 && allowEdit.includes(key)) {
          row.isEdit = true;
          row.width = row.span == 4 ? 380 : 180;
        }
        if (data) {
          const foundValue = replaceValues(data, row.value);
          if (foundValue !== undefined) {
            row.value = foundValue;
          } else {
            row.value = "--";
          }
        } else {
          row.value = "--";
        }
      });
    });
  });
};
const createCutomerInfo = () => {
  emit("messageSent", { index: 1 });
};
defineExpose({
  initicalCutomerInfo,
});
</script>
