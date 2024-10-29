<template>
  <a-layout class="layout" :class="{ mobile: appStore.hideMenu }">
    <div v-if="navbar" class="layout-navbar">
      <NavBar />
    </div>
    <a-layout>
      <a-layout>
        <a-layout-sider
          v-if="renderMenu"
          class="layout-sider"
          :collapsible="true"
          :width="menuWidth"
          theme="dark"
          :style="{ paddingTop: navbar ? paddingStyle.paddingTop : '' }"
          :hide-trigger="true"
        >
          <div class="menu-wrapper">
            <Menu />
          </div>
        </a-layout-sider>
        <a-layout class="layout-content">
          <a-layout-content class="layout-main">
            <PageLayout />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
  import { ref, computed, watch, provide, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useAppStore, useUserStore } from '@/store';
  import NavBar from '@/components/navbar/index.vue';
  import Menu from '@/components/menu/index.vue';
  import Footer from '@/components/footer/index.vue';
  import TabBar from '@/components/tab-bar/index.vue';
  import usePermission from '@/hooks/permission';
  import useResponsive from '@/hooks/responsive';
  import PageLayout from './page-layout.vue';

  const isInit = ref(false);
  const appStore = useAppStore();
  const userStore = useUserStore();
  const router = useRouter();
  const route = useRoute();
  const permission = usePermission();
  useResponsive(true);
  const navbarHeight = `63px`;
  const navbar = computed(() => appStore.navbar);
  const renderMenu = computed(() => appStore.menu && !appStore.topMenu);
  const hideMenu = computed(() => appStore.hideMenu);
  const footer = computed(() => appStore.footer);
  const menuWidth = computed(() => {
    return appStore.menuWidth;
  });
  const collapsed = computed(() => {
    console.log(appStore.menuCollapse)
    return false;//appStore.menuCollapse;
  });
  const paddingStyle = computed(() => {
    const paddingLeft ={ paddingLeft: `${menuWidth.value}px` }
    const paddingTop = {paddingTop: navbarHeight };
    return { ...paddingLeft, ...paddingTop };
  });
  const setCollapsed = (val) => {
    if (!isInit.value) return; // for page initialization menu state problem
    appStore.updateSettings({ menuCollapse: val });
  };
  watch(
    () => userStore.role,
    (roleValue) => {
      if (roleValue && !permission.accessRouter(route))
        router.push({ name: 'notFound' });
    }
  );
  const drawerVisible = ref(false);
  const drawerCancel = () => {
    drawerVisible.value = false;
  };
  provide('toggleDrawerMenu', () => {
    drawerVisible.value = !drawerVisible.value;
  });
  onMounted(() => {
    isInit.value = true;
  });
</script>

<style scoped lang="less">
  @nav-size-height: 72px;
  @layout-max-width: 1100px;

  .layout {
    width: 100%;
    height: 100%;
  }

  .layout-navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 97;
    width: 100%;
    height: @nav-size-height;
  }

  .layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 96;
    height: 100%;
    border: none;
    &::after {
      position: absolute;
      top: 0;
      right: -1px;
      display: block;
      width: 1px;
      height: 100%;
      content: '';
    }

    > :deep(.arco-layout-sider-children) {
      overflow-y: hidden;
    }
  }

  .menu-wrapper {
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
    :deep(.arco-menu) {
      ::-webkit-scrollbar {
        width: 12px;
        height: 4px;
      }

      ::-webkit-scrollbar-thumb {
        border: 4px solid transparent;
        background-clip: padding-box;
        border-radius: 7px;
      }
    }
  }

  .layout-content {
    height: calc(100vh - 65px);
    border-radius: 20px 0 0 0;
    margin-left: 85px;
    margin-top: 64px;
    z-index: 99;
    overflow: hidden;
    background-color: var(--color-fill-2);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-auto-rows: auto;
    grid-template-areas:
        'tabBar'
        'main'
        'footer';
        .layout-tabBar {
          grid-area: tabBar;
        }
        .layout-main {
          grid-area: main;
          overflow: hidden;
          padding: 15px;
        }
        .layout-footer {
          grid-area: footer;
        }
  }
</style>
