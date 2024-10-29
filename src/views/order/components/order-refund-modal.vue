<template>
    <a-modal v-model:visible="isShow" :title="$t('orderInfo.refund')" :footer="false" unmountOnClose :width="780">
        <div class="mt-[-10px]">
            <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-[12px]">{{ $t('orderInfo.orderNumber') }}:{{ orderNumber }}</span>
            </div>
            <a-table :data="cartList" :bordered="false" size="small" :pagination="false">
                <template #columns>
                    <a-table-column>
                        <template #cell="{ record }">
                            <a-checkbox v-model="record.selected" @change="onChange()"></a-checkbox>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('refundTable.goodsInfo')">
                        <template #cell="{ record }">
                            <div class="flex">
                                <a-image width="70" height="70" fit="cover" :src="record.cart_info.attrInfo.image"
                                    show-loader />
                                <div class="pl-2 flex-1">
                                    <a-typography-paragraph style="margin-bottom: -1px;" :ellipsis="{
                                        rows: 1,
                                    }">{{ record.cart_info.productInfo.store_name }}</a-typography-paragraph>
                                    <p>
                                        <a-tag class="text-[10px]" size="small">{{ record.cart_info.attrInfo.code
                                            }}</a-tag>
                                    </p>
                                    <a-tag class="text-[10px]" size="small">{{ record.cart_info.attrInfo.suk }}</a-tag>
                                </div>
                            </div>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('refundTable.num')" align="center">
                        <template #cell="{ record }">
                            <p>{{ record.cart_info.cart_num }}</p>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('refundTable.weight')" align="center">
                        <template #cell="{ record }">
                            <p>{{ record.cart_info.attrInfo.weight }}</p>
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('refundTable.price')" align="center">
                        <template #cell="{ record }">
                            <custom-amonuts  :amount="Number(record.cart_info.attrInfo.price)" :valueStyle="{}" />
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('refundTable.total')" align="center">
                        <template #cell="{ record }">
                            <custom-amonuts  :amount="Number(record.total)" :valueStyle="{}" />
                        </template>
                    </a-table-column>
                    <a-table-column :title="$t('refundTable.operation')" align="center">
                        <template #cell="{ record }">
                            <a-input-number v-model="record.refund_amount" :style="{ width: '100px' }" class="text-left"
                                placeholder="Please Enter" :min="0" :max="record.refund_amount" @change="onChange()">
                                <template #prefix>
                                    ¥
                                </template>
                            </a-input-number>
                        </template>
                    </a-table-column>
                </template>
            </a-table>
            <div class="font-bold text-[12px] mt-3 mb-3 text-right">{{ $t('orderInfo.refundAmount') }}:
                <custom-amonuts  :amount="Number(refundAmount)" :valueStyle="{fontSize: '18px'}" />
            </div>
            <div class="text-center pt-3 pb-3">
                <a-button type="primary" :disabled="refundAmount==0" shape="round" class="w-[200px]" @click="onRefund">{{ $t('orderInfo.refund') }}</a-button>
            </div>
        </div>
    </a-modal>
</template>
<script setup>
import { inject, ref, reactive, watch, computed } from 'vue';
import CustomAmonuts from "@/components/custom/Amonut.vue";
const props = defineProps({
    orderNumber: {
        type: String
    },
    cartList: {
        type: Array
    }
});
const emit =  defineEmits(['toRefund']);

const valueStyle = { fontSize: '12px' };
const isShow = inject('isShowRefundModal');
const refundAmount = ref(0);
let refundIds = [];
watch(isShow, (a, b) => {
    refundAmount.value=0;
    onChange();
})
const onChange = () => {
    let total = 0;
    let ids=[];
    props.cartList.forEach(item => {
        if (item.selected) {
            total += item.refund_amount;
            ids.push(item.cart_info.id);   
        }
    })
    refundIds = ids;
    refundAmount.value = total;
}
const onRefund = () => {
    emit('toRefund',{order_ids:refundIds,refund_price:refundAmount.value});
}
</script>