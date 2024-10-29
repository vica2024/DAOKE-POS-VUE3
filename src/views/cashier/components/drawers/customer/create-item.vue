<!-- FormItem.vue -->
<template>
    <component :is="getComponentType(item.type)" v-model="form[item.field]" class="bg-white hover:bg-white border-0"
        v-bind="getComponentProps(item)">
        <template v-if="item.type === 'checkbox'">
            <a href="" target="_blank" class="border-b border-gray-500">
                {{ $t("customer.policy") }}
            </a>
        </template>
        <template #label="{ data }" v-if="item.type === 'radio'">
            {{ $t(data.label) }}
        </template>
    </component>
</template>

<script setup>
import { defineProps } from "vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({
    item: Object,
    form: Object
});

const getComponentType = (type) => {
    const componentMap = {
        phone: 'a-input-group',
        text: 'a-input',
        radio: 'a-radio-group',
        select: 'a-select',
        cascader: 'a-cascader',
        date: 'a-date-picker',
        checkbox: 'a-checkbox',
    };
    return componentMap[type] || 'a-input';
};

const getComponentProps = (item) => {
    const propsMap = {
        phone: {
            components: {
                select: {
                    options: item.options,
                    size: "small",
                    style: { width: '150px' },
                },
                input: {
                    placeholder: t('placeholder.prefix') + (item.label != '' ? t(item.label) : ''),
                }
            }
        },
        text: {
            placeholder: t('placeholder.prefix') + (item.label != '' ? t(item.label) : ''),
        },
        radio: {
            options: item.options || [],
            onChange: (e) => {
                form[item.field] = e.target.value; // 更新表单值
            }
        },
        select: {
            options: item.options || [],
            placeholder: t('placeholder.prefix') + (item.label != '' ? t(item.label) : ''),
            allowClear: true, // 允许清除
        },
        cascader: {
            options: item.options || [],
            placeholder: t('placeholder.prefix') + (item.label != '' ? t(item.label) : ''),
            changeOnSelect: true, // 选择时立即更新
        },
        date: {
            placeholder: t('placeholder.prefix') + (item.label != '' ? t(item.label) : ''),
            format: 'YYYY-MM-DD', // 日期格式
        },
        checkbox: {
            options: item.options || [],
            onChange: (checkedValues) => {
                form[item.field] = checkedValues; // 更新表单值
            }
        },
    };
    return propsMap[item.type] || {};
};
</script>