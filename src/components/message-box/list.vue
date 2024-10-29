<template>
  <a-list :bordered="false" :max-height="400">
    <a-list-item
      v-for="item in renderList"
      :key="item.id"
      action-layout="vertical"
      :style="{
        opacity: item.status ? 0.5 : 1,
      }"
    >
      <template #extra>
        <a-tag v-if="item.messageType === 0" color="gray">待接单</a-tag>
        <a-tag v-else-if="item.messageType === 1" color="green">待处理</a-tag>
        <a-tag v-else-if="item.messageType === 2" color="blue">进行中</a-tag>
        <a-tag v-else-if="item.messageType === 3" color="red">已完成</a-tag>
      </template>
      <div class="item-wrap overflow-hidden" @click="onItemClick(item)">
        <a-list-item-meta>
          <template v-if="item.avatar" #avatar>
            <a-avatar shape="circle">
              <img v-if="item.avatar" :src="item.avatar" />
              <icon-desktop v-else />
            </a-avatar>
          </template>
          <template #title>
            <a-space :size="4">
              <span>{{ item.title }}</span>
              <a-typography-text type="secondary">
                {{ item.subTitle }}
              </a-typography-text>
            </a-space>
          </template>
          <template #description>
            <div>
              <a-typography-paragraph
                :ellipsis="{
                  rows: 1,
                }"
                >{{ item.content }}</a-typography-paragraph
              >
              <a-typography-text
                class="float-right text-[12px] text-gray-400"
              >
                {{ item.create_time }}
              </a-typography-text>
            </div>
          </template>
        </a-list-item-meta>
      </div>
    </a-list-item>
    <template #footer>
      <a-space
        fill
        :size="0"
        :class="{ 'flex border-t': renderList.length < showMax }"
      >
        <div @click="allRead" class="cursor-pointer flex-1 text-blue-500 text-center active:bg-gray-50">
          <span>{{ $t('messageBox.allRead') }}</span>
        </div>
        <div @click="showNoticeModal=true" class="cursor-pointer flex-1 text-blue-500 text-center active:bg-gray-50">
          <span>{{ $t('messageBox.viewMore') }}</span>
        </div>
      </a-space>
    </template>
    <div
      v-if="renderList.length && renderList.length < 3"
      :style="{ height: (showMax - renderList.length) * 86 + 'px' }"
    ></div>
  </a-list>
</template>

<script setup>
   import { inject } from 'vue';
  // import { MessageRecord, MessageListType } from '@/api/message';
  const showNoticeModal = inject("showNoticeModal");
  const props = defineProps({
    renderList: {
      type: Array,
      required: true,
    },
    unreadCount: {
      type: Number,
      default: 0,
    },
  });
  const emit = defineEmits(['itemClick']);
  const allRead = () => {
    emit('itemClick', [...props.renderList]);
  };

  const onItemClick = (item) => {
    if (!item.status) {
      emit('itemClick', [item]);
    }
  };
  const showMax = 3;
</script>

<style scoped lang="less">
  :deep(.arco-list) {
    .arco-list-item {
      min-height: 86px;
      border-bottom: 1px solid rgb(var(--gray-3));
    }
    .arco-list-item-extra {
      position: absolute;
      right: 20px;
    }
    .arco-list-item-meta-content {
      flex: 1;
    }
    .item-wrap {
      cursor: pointer;
    }
   
    .arco-empty {
      display: none;
    }
    .arco-list-footer {
      padding: 0;
      height: 50px;
      line-height: 50px;
      border-top: none;
      .arco-space-item {
        width: 100%;
        border-right: 1px solid rgb(var(--gray-3));
        &:last-child {
          border-right: none;
        }
      }
      .add-border-top {
        border-top: 1px solid rgb(var(--gray-3));
      }
    }
  }
</style>
