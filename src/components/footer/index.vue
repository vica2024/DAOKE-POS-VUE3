<template>
  <a-layout-footer class="text-center text-[12px] pt-2 pb-2">
    <div class="w-full">
      <div class="flex w-[120px] text-blue-400 justify-between m-auto">
        <!-- <span>主页</span>
        <span>文档</span>
        <span>联系</span> -->
      </div>
    </div>
    <p class="text-gray-400">Copyright © {{ appStore.appName }} {{ new Date().getFullYear() }}</p>
 </a-layout-footer>
</template>

<script setup>
import { useAppStore } from '@/store'
const appStore = useAppStore()
</script>
<style lang="less" scoped>
</style>
