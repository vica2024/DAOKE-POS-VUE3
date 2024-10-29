<template>
  <component :is="iconComponent" :size="size" :class="iconClass" v-if="iconComponent" />
</template>

<script>
import * as Icons from '@arco-design/web-vue/dist/arco-vue-icon.js';

export default {
  name: 'DynamicInput',
  props: {
    type: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: 15
    },
    iconClass: {
      type: String,
      default: 'text-blue-600'
    }
  },
  computed: {
    iconComponent() {
      const iconName = `Icon${this.type.charAt(0).toUpperCase() + this.type.slice(1)}`;
      return Icons[iconName] || null;
    }
  }
}
</script>
