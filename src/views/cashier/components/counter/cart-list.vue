<template>
  <cart-item-total :itemCount="count" :clearCart="clearCart" />
  <div class="overflow-y-auto w-full" v-resize="380" v-if="list.length>0">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="w-full pl-3 pr-3 pt-2 pb-2 border-b border-gray-100 hover:bg-gray-100 flex"
    >
      <a-image
        width="78"
        height="78"
        fit="cover"
        :src="item.cart[0].attrInfo.image"
        show-loader
      />
      <cart-item-product
        :title="item.cart[0].productInfo.store_name"
        :sku="item.cart[0].attrInfo.suk"
        :cart_num="item.cart[0].cart_num"
        :price="item.cart[0].productInfo.price"
        :product_id="item.cart[0].productInfo.id"
        :cart_id="item.cart[0].id"
        :unique = "item.cart[0].attrInfo.unique"
      />
    </div>
  </div>
  <div class="flex items-center" v-resize="380" v-else>
    <div class="w-3/5 m-auto text-center">
        <img alt="" src="../../../../assets/images/no-cart.png" />
        <span class="text-gray-400 text-xs">{{ $t("noItems") }}</span>
      </div>
  </div>
  <cart-item-amount :total_amount="total_price" :cashierInfo="cashierInfo" :setNewCashier="setNewCashier" />
  <div class="flex justify-center items-center">
    <a-button
      type="primary"
      class="h-11 mt-5 font-bold text-md w-[60%]"
      :disabled="isUnPayment"
      shape="round"
      @click="goToPay"
      long
      >{{ $t("checkout") }}</a-button
    >
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import cartItemTotal from "./cart-item-total.vue";
import cartItemAmount from "./cart-item-amount.vue";
import cartItemProduct from "./cart-item-product.vue";
const props = defineProps({
  list:{
    type:Array,
    default:[]
  },
  total_price:{
    type:Number,
    default:0
  },
  cashierInfo:{
     type:Object
  },
  count:{
    type:Number,
    default:0
  },
  isUnPayment:{
    type:Boolean,
    default:true
  },
  goToPay:{
    type:Function
  },
  clearCart:{
    type:Function
  },
  setNewCashier:{
    type:Function
  }
});

</script>
