<template>
  <div class="w-4/6 min-w-[320px] max-w-370px] h-full ml-4">
    <search :categorys="categorys" :goodsList="goodsList" :getProductList="getProductList" />
    <item-card :productList="productList" />
  </div>
</template>
<script setup>
import search from "./search.vue";
import itemCard from "./item-card.vue";
import { fetchData } from "@/utils/customFunc.js";
import {
  cashierProduct,
  cashierCate,
  cashierProductV2,
} from "@/api/product.js";
import { inject, ref } from "vue";
import { useCustomerStore, useCashierStore } from "@/store";

const customerInfo = useCustomerStore();
const useCashierInfo = useCashierStore();

const productList = ref([]);

const goodsList = ref([]);

const categorys = ref({});

const getProductList = (condition, isMore) => {
  condition.uid = customerInfo.uid;
  condition.staff_id = useCashierInfo.id;
  goodsList.value=[];
  if (isMore) {
    if (condition.keyword.trim() == "") {
      return false;
    }
    const list=[];
    cashierProductV2(condition).then((res) => {
      res.data.forEach((item) => {
        let isAdd = false;
        if (
          item.product_name
            .toLowerCase()
            .includes(condition.keyword.toLowerCase())
        ) {
          list.push({
            ...item,
            label: item.product_name,
            value: item.product_name,
            type: 1,
          });
          isAdd = true;
        }

        if (
          !isAdd &&
          item.barcode.toLowerCase().includes(condition.keyword.toLowerCase())
        ) {
          list.push({
            ...item,
            label: item.barcode,
            value: item.barcode,
            type: 2,
          });
          isAdd = true;
        }
      });
      goodsList.value = list;
    });

    return false;
  }
  cashierProduct(condition).then((res) => {
    productList.value = res.data.list;
  });
};

const fetchProductCategory = () => {
  fetchData(cashierCate, (data) => {
    categorys.value = data;
  });
};

fetchProductCategory();
</script>
