<template>
  <div class="relative">
    <a-form :model="form" ref="formRef" @submit="handleSubmit">
      <a-descriptions
        v-for="(row, index) in customerInfoForm"
        :key="index"
        style="margin-bottom: 25px"
        :column="{ xs: 2, sm: 4, md: 4, lg: 4 }"
        layout="inline-vertical"
        bordered
      >
        <template #title>
          <div class="flex items-center">
            <span class="text-[12px] font-normal mr-2 cursor-pointer" @click="goBack"><icon-left /> {{ $t('customer.back') }}</span>
            <!-- <h3 class="text-[14px]">{{ $t(row.itemName) }}</h3> -->
          </div>
        </template>
        <a-descriptions-item
          v-for="(item, index2) of row.list"
          :key="index2"
          :span="item.span"
        >
          <div>
            {{ item.label != "" ? $t(item.label) : item.label }}
            <span
              v-if="item.rules.length > 0 && item.label != ''"
              class="text-red-500"
              >*</span
            >
            <a-tooltip v-if="item.tips" :content="$t(item.tips)">
              <icon-question-circle />
            </a-tooltip>
          </div>
          <a-form-item
            :field="item.field"
            :hide-label="true"
            :rules="item.rules"
            class="customer-create-item flex items-center relative mb-0"
            row-class="message-wrapper"
          >
            <a-input-group v-if="['phone'].includes(item.type)">
              <a-select
                :options="item.options"
                size="small"
                :style="{ width: '150px' }"
                class="border-0"
                v-model="form.countryCode"
                style="border-right: none; padding-left: 10px"
              />
              <a-input
                class="bg-white hover:bg-white border-0"
                style="padding-left: 5px"
                :placeholder="$t('placeholder.prefix') + $t(item.label)"
                v-model="form[item.field]"
              />
            </a-input-group>
            <a-input
              v-if="['text'].includes(item.type)"
              :placeholder="$t('placeholder.prefix') + $t(item.label)"
              v-model="form[item.field]"
              class="bg-white hover:bg-white border-0"
            >
            </a-input>
            <a-radio-group
              v-if="['radio'].includes(item.type)"
              v-model="form[item.field]"
              :options="item.options"
            >
              <template #label="{ data }">
                <span>{{ $t(data.label) }}</span>
              </template>
            </a-radio-group>
            <a-select
              v-if="['select'].includes(item.type)"
              size="small"
              :options="item.options"
              v-model="form[item.field]"
              :placeholder="$t('placeholder.prefix') + $t(item.label)"
              class="bg-white mr-1 hover:bg-white"
            />
            <a-cascader
              v-if="['cascader'].includes(item.type)"
              :options="item.options"
              :model-value="form[item.field]"
              expand-trigger="hover"
              class="bg-white mr-1 hover:bg-white"
              :placeholder="$t('placeholder.prefix') + $t(item.label)"
            />
            <a-date-picker
              v-if="['date'].includes(item.type)"
              v-model="form[item.field]"
              class="bg-white hover:bg-white border-0"
            >
            </a-date-picker>
            <a-checkbox
              v-if="['checkbox'].includes(item.type)"
              v-model="form[item.field]"
            >
              <a href="" target="_blank" class="border-b border-gray-500">{{
                $t("customer.policy")
              }}</a>
            </a-checkbox>
          </a-form-item>
        </a-descriptions-item>
      </a-descriptions>
      <div class="p-5 w-2/3 flex m-auto gap-5">
        <a-button
          type="outline"
          shape="round"
           class="w-1/2"
          @click="restForm"
        >
          {{ $t("modal.footer.reset") }}
        </a-button>
        <a-button
          type="primary"
          class="mb-5 w-1/2"
          shape="round"
          html-type="submit"
          :disabled="disabled"
        >
          {{ $t("modal.footer.create") }}
        </a-button>
      </div>
    </a-form>
  </div>
</template>
<script setup>
import { defineProps, inject, reactive, ref, watch } from "vue";
import {useCashierStore} from '@/store';
import { getCustomerInfoTemplate, createCustomer } from "@/api/customer";
import { Message } from "@arco-design/web-vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const emit = defineEmits(["messageSent",'setCustomer']);
const customerInfoForm = ref([]);
const formRef = ref(null);
const disabled = ref(true);
const loading = ref(true);
const verifyFields = reactive({});
const form = reactive({});
const cashierStore = useCashierStore();

watch(
  verifyFields,
  (newValue) => {
    disabled.value = !Object.values(verifyFields).every(
      (value) => value === true
    );
  },
  { deep: true }
);

const getTemplate = async () => {
  const { data } = await getCustomerInfoTemplate(0);
  loading.value = false;
  data[0].list.forEach((element) => {
    form[element.field] = element.value;
    if (element.verifyField) {
      verifyFields[element.verifyField] = false;
    }
    if (element.rules.length > 0) {
      element.rules.forEach((item) => {
        if (item.validatorType === "custom") {
          item.validator = (value, cb) => {
            const regex = new RegExp(item.regular.slice(1, -1));
            verifyFields[element.verifyField] = false;
            if (value && regex.test(value.toString())) {
              verifyFields[element.verifyField] = true;
            }
            if (!verifyFields[element.verifyField]) {
              cb(t(item.message));
            }
          };
        }
      });
    }
  });
  customerInfoForm.value = data;
};

const handleSubmit = async({ values, errors }) => {
  values['adminId'] = cashierStore.id;
  if (typeof errors != "undefined" && !errors) {
    Message.error(t("customer.policy"));
    return false;
  }
  emit("messageSent", { loading: true,index: 8 });
  const {data} = await createCustomer(values);
  emit("setCustomer",data);
  setTimeout(() => {
    emit("messageSent", { loading: false,index: 8 });
  },2000)
};

const clearValidate = (fields) => {
  formRef.value.clearValidate(fields);
};
const restForm = () => {
  formRef.value.resetFields();
};
const goBack = () => {
  restForm();
  emit("messageSent", { index: 3 });
};


getTemplate();

</script>

<style scoped lang="less"></style>