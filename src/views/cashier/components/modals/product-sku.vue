<script setup>
import { defineProps, inject, reactive, watch } from "vue";
import CustomAmonuts from "@/components/custom/Amonut.vue";
import { cashierDetail } from "@/api/product.js";
defineProps({
  modalWidth: {
    type: Number,
    default: 700,
  },
});
const modalState = inject("modalState");

const productAttrs = reactive({
  attrs: {},
  stock: 0,
  price: 0,
  imageUrl: null,
  goodsName: null,
  isSkill: false,
});

const pickUpAttr = reactive({
  goodsId: 0,
  skuIds: [],
  skuName: null,
  stock: 0,
  skuPrice: 0,
  code: null,
  image: null,
});

const valueStyle = {
  fontSize: "14px",
};
// const cartNum = ref(productAttrs.cart_num);

watch(
  () => modalState.productAttr.show,
  async (val) => {
    if (val) {
      (pickUpAttr.goodsId = 0),
        (pickUpAttr.skuIds = []),
        (pickUpAttr.stock = 1),
        (pickUpAttr.skuPrice = 0),
        (pickUpAttr.image = null);

      productAttrs.attrs = {};
      productAttrs.stock = 0;
      productAttrs.price = 0;

      const product_id = modalState.productAttr.product_id;
      const uid = modalState.productAttr.uid;
      const { data } = await cashierDetail(product_id, uid);
      productAttrs.goodsName = data.storeInfo.store_name;
      productAttrs.imageUrl = data.storeInfo.image;
      productAttrs.price = data.storeInfo.price;
      productAttrs.vip_price = data.storeInfo.vip_price;
      productAttrs.stock = data.storeInfo.stock;
      productAttrs.productValue = data.productValue;
      productAttrs.unit_name = data.storeInfo.unit_name;
      productAttrs.cart_num = modalState.productAttr.cart_num;
      if (data.productAttr.length > 0) {
        productAttrs.attrs = data.productAttr;
        const defaultSku = [];
        for (let index in data.productAttr) {
          defaultSku.push(index);
        }
        if (modalState.productAttr.defaultSku) {
          setSku(modalState.productAttr.defaultSku);
        } else {
          modalState.productAttr.defaultSku = defaultSku;
          setSku(defaultSku);
        }
      } else {
        pickUpAttr.price = data.storeInfo.price;
        pickUpAttr.code = data.storeInfo.code;
        pickUpAttr.image = data.storeInfo.image;
        pickUpAttr.stock = data.storeInfo.stock;
        pickUpAttr.goodsId = data.storeInfo.id;
      }
    }
  }
);

//选择一个商品sku
const setSku = (defaultSku) => {
  let keyName;
  const skuName = [];
  //重置sku状态
  productAttrs.attrs.forEach((item, index) => {
    item.attr_value.forEach((attr, key) => {
      attr.check = false;
      if (defaultSku[index] == key || attr.attr == defaultSku[index]) {
        attr.check = true;
        skuName.push(attr.attr);
      }
    });
  });

  if (skuName.length > 0) {
    keyName = skuName.join(",");
  }
  //console.log(productAttrs)
  const { suk, stock, price, image, unique, code } =
    productAttrs.productValue[keyName];
  pickUpAttr.code = code;
  pickUpAttr.skuName = suk;
  pickUpAttr.stock = stock;
  pickUpAttr.price = price;
  pickUpAttr.image = image;
  modalState.productAttr.new_uniqueId = unique;
};

const pickupSku = (key, sku_name) => {
  modalState.productAttr.defaultSku[key] = sku_name;
  setSku(modalState.productAttr.defaultSku);
};

/**
 * 完成当前商品属性选择
 */
const donePickUp = () => {
  modalState.productAttr.new_cart_num = productAttrs.cart_num;
  if (modalState.productAttr.cart_id == 0) {
    modalState.productAttr.operateState = 1;
  }else{
    modalState.productAttr.operateState = 2;
  }
};
</script>

<template>
  <a-modal
    v-model:visible="modalState.productAttr.show"
    :title="$t('goodsAttr')"
    :footer="false"
    unmountOnClose
    :width="modalWidth"
  >
    <div class="h-full">
      <div class="flex h-full items-center mb-5 relative">
        <!-- Product Image -->
        <a-image
          fit="cover"
          width="158"
          height="158"
          :src="pickUpAttr.image"
          show-loader
        />
        <!-- Product Details -->
        <div class="flex-1 h-[158px] pl-3">
          <div>
            <h2 class="font-bold text-lg mb-1">{{ productAttrs.goodsName }}</h2>
            <!-- <p class="text-gray-700 text-xs mb-1">SKU: {{ pickUpAttr.skuName }}</p> -->
            <p class="text-xs mb-1"> {{ $t("item_no") }} {{ pickUpAttr.code }}</p>
            <p class="text-xs mb-1">
              {{ $t("stock_count") }} &nbsp;{{ pickUpAttr.stock }}
            </p>
            <div class="text-xs mb-1 cart_num">
              {{ $t("purchase_count") }}
              <a-input-number
                v-model="productAttrs.cart_num"
                size="mini"
                mode="button"
                :min="1"
                style="width: 110px; border-radius: 14px;"
              />
            </div>
          </div>
          <div class="text-red-500 flex gap-3">
            <custom-amonuts :amount="Number(pickUpAttr.price)" :valueStyle="valueStyle" />
            <custom-amonuts v-if="productAttrs.vip_price > 0" :amount="Number(productAttrs.vip_price)" :valueStyle="valueStyle" />
          </div>
        </div>
      </div>
      <div v-if="productAttrs.attrs.length > 0">
        <div v-for="(attr, k1) in productAttrs.attrs" :key="k1">
          <h3 class="text-sm font-bold tex rounded">{{ attr.attr_name }}</h3>
          <div class="pt-3 pb-5 pl-5">
            <a-tag
              :class="[
                'mr-3 mb-3 cursor-pointer rounded-xl  hover:text-blue-500',
                { 'border-blue-300 text-blue-500': value.check },
              ]"
              v-for="(value, k2) in attr.attr_value"
              @click="pickupSku(k1, value.attr)"
              :key="k2"
            >
              {{ value.attr }}
            </a-tag>
          </div>
        </div>
      </div>
      <div class="pt-2 text-center">
        <a-button
          type="primary"
          class="h-12 pl-20 pr-20 font-bold"
          shape="round"
          @click="donePickUp"
          >{{ $t("modal.footer.ok") }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>
<style scoped lang="less">
</style>
