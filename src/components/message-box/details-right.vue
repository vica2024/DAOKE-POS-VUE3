<template>
  <div class="details-left flex-1 pl-4">
    <a-typography :style="{ marginTop: '-40px' }">
      <a-typography-title>
        {{title}}
      </a-typography-title>
      <a-typography-paragraph>
       {{content}}
      </a-typography-paragraph>
    </a-typography>
  </div>
</template>
<script setup>
defineProps({
  title:{
    type: String
  },
  content: {
    type: String
  }
})
</script>