<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <div class="logo">
        <img
          alt="logo"
          src="../../assets/images/logo.png"
        />
      </div>
        <a-typography-title
          class="text-blue-50"
          v-if="appStore.device === 'desktop'"
          :style="{ margin: 0, fontSize: '18px', fontWeight: 'bold' }"
          :heading="5"
        >
          {{ title }}
        </a-typography-title>
        <span
          class="text-white"
          v-if="appStore.device === 'desktop'"
          >v{{ version }}</span
        >
      </a-space>
    </div>
    <div class="center-side">
      <Menu v-if="topMenu" />
    </div>
    <ul class="right-side">
      <!-- <li>
        <a-tooltip :content="$t('settings.search')">
          <a-button class="nav-btn"  type="text" size="large" :shape="'circle'">
            <template #icon>
              <icon-search size="28"/>
            </template>
</a-button>
</a-tooltip>
</li> -->
      <!-- 查询图标开始 -->
      <li>
        <a-tooltip :content="$t('settings.language')">
          <icon-language
            size="28"
            class="nav-btn cursor-pointer"
            @click="setDropDownVisible"
          />
        </a-tooltip>
        <a-dropdown trigger="click" @select="changeLocale">
          <div ref="triggerBtn" class="trigger-btn"></div>
          <template #content>
            <a-doption
              v-for="item in locales"
              :key="item.value"
              :value="item.value"
            >
              <template #icon>
                <icon-check v-show="item.value === currentLocale" />
              </template>
              {{ item.label }}
            </a-doption>
          </template>
        </a-dropdown>
      </li>
      <!-- 查询图标结束 -->
      <!-- 夜间模式开始 -->
      <li>
        <a-tooltip
          :content="
            theme === 'light'
              ? $t('settings.navbar.theme.toDark')
              : $t('settings.navbar.theme.toLight')
          "
        >
          <span class="nav-btn cursor-pointer" @click="handleToggleTheme">
            <icon-moon-fill size="28" v-if="theme === 'dark'" />
            <icon-sun-fill v-else size="28" />
          </span>
        </a-tooltip>
      </li>
      <!-- 夜间模式结束 -->
      <!-- 消息通知开始 -->
      <li>
        <a-tooltip :content="$t('settings.navbar.alerts')">
          <div class="message-box-trigger">
            <a-badge :count="messageCount" dot>
              <span class="nav-btn cursor-pointer" @click="setPopoverVisible">
                <icon-notification
                  :class="['bell', { shake: messageCount > 0 }]"
                  size="28"
                />
              </span>
            </a-badge>
          </div>
        </a-tooltip>
        <a-popover
          trigger="click"
          :arrow-style="{ display: 'none' }"
          :content-style="{ padding: 0, width: '450px' }"
          content-class="message-popover"
        >
          <div ref="refBtn" class="ref-btn"></div>
          <template #content>
            <message-box />
          </template>
        </a-popover>
      </li>
      <!-- 消息通知结束 -->
      <!-- 全屏开始 -->
      <li>
        <a-tooltip
          :content="
            isFullscreen
              ? $t('settings.navbar.screen.toExit')
              : $t('settings.navbar.screen.toFull')
          "
        >
          <span class="nav-btn cursor-pointer" @click="toggleFullScreen">
            <icon-fullscreen-exit size="28" v-if="isFullscreen" />
            <icon-fullscreen size="28" v-else />
          </span>
        </a-tooltip>
      </li>
      <!-- 全屏结束 -->
      <!-- 个人中心开始 -->
      <li>
        <a-dropdown trigger="click">
          <div class="flex items-center justify-center cursor-pointer">
            <a-avatar
              :size="35"
              shape="square"
              :style="{ marginRight: '8px', cursor: 'pointer' }"
            >
              <img alt="avatar" class="rotate-180" :src="store_logo" />
            </a-avatar>
            <div class="text-center cursor-pointer">
              <span class="flex text-blue-50 m-0 text-xs font-bold">{{
                store_name
              }}</span>
              <span class="text-blue-50 text-xs">{{
                $t("user." + positionTitle)
              }}</span>
            </div>
          </div>
          <template #content>
            <!-- <a-doption>
              <a-space @click="switchRoles">
                <icon-tag />
                <span>
                  {{ $t("messageBox.switchRoles") }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'Info' })">
                <icon-user />
                <span>
                  {{ $t("messageBox.userCenter") }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'Setting' })">
                <icon-settings />
                <span>
                  {{ $t("messageBox.userSettings") }}
                </span>
              </a-space>
            </a-doption> -->
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>
                  {{ $t("messageBox.logout") }}
                </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
      <!-- 个人中心结束 -->
      <!--      <li>-->
      <!--        <a-tooltip :content="$t('settings.title')">-->
      <!--          <a-button-->
      <!--              class="nav-btn"-->
      <!--              size="large"-->
      <!--              shape="round"-->
      <!--              @click="setVisible"-->
      <!--          >-->
      <!--            <template #icon>-->
      <!--              <icon-settings size="28"/>-->
      <!--            </template>-->
      <!--          </a-button>-->
      <!--        </a-tooltip>-->
      <!--      </li>-->
    </ul>
    <MessageDetails />
  </div>
</template>

<script setup>
import { computed, ref, inject, provide } from "vue";
import NotificationService from "@/utils/notification-service";
import { Message } from "@arco-design/web-vue";
import { useDark, useToggle, useFullscreen } from "@vueuse/core";
import { useAppStore, useUserStore } from "@/store";
import { LOCALE_OPTIONS } from "@/locale";
import useLocale from "@/hooks/locale";
import useUser from "@/hooks/user";
import Menu from "@/components/menu/index.vue";
import MessageBox from "../message-box/index.vue";
import MessageDetails from "./../message-box/details.vue";

const showNoticeModal = ref(false);
const appStore = useAppStore();
const userStore = useUserStore();
const { logout } = useUser();
const { changeLocale, currentLocale } = useLocale();
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
const locales = [...LOCALE_OPTIONS];
const title = import.meta.env.VITE_APP_TITLE || appStore.projectName;
const version = import.meta.env.VITE_APP_VERSION;
// 实例化 NotificationService
const noticeServer = new NotificationService();
const messageCount = computed(() => {
  return appStore.messageCount;
});
const store_logo = computed(() => {
  return userStore.store_logo;
});
const store_name = computed(() => {
  return userStore.store_name;
});
const positionTitle = computed(() => {
  return userStore.role;
});
const theme = computed(() => {
  return appStore.theme;
});
const topMenu = computed(() => appStore.topMenu && appStore.menu);
const isDark = useDark({
  selector: "body",
  attribute: "arco-theme",
  valueDark: "dark",
  valueLight: "light",
  storageKey: "arco-theme",
  onChanged(dark) {
    // overridden default behavior
    appStore.toggleTheme(dark);
  },
});
const toggleTheme = useToggle(isDark);
const handleToggleTheme = () => {
  toggleTheme();
};
const setVisible = () => {
  appStore.updateSettings({ globalSettings: true });
};
const refBtn = ref();
const triggerBtn = ref();
const setPopoverVisible = () => {
  const event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  refBtn.value.dispatchEvent(event);
};
const handleLogout = () => {
  logout();
};
const setDropDownVisible = () => {
  const event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  triggerBtn.value.dispatchEvent(event);
};
const switchRoles = async () => {
  const res = await userStore.switchRoles();
  Message.success(res);
};
const openMore = () => {
  showDeatils.value = true;
};

provide("openMore", openMore);
provide("showNoticeModal", showNoticeModal);
const toggleDrawerMenu = inject("toggleDrawerMenu");
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-menu-dark-bg);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;

  :deep(.locale-select) {
    border-radius: 20px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-left: 15px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }

  .nav-btn {
    color: rgb(var(--gray-3));
    font-size: 16px;
  }

  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }

  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}

.shake {
  animation: shake 1s infinite;
  transform: translateX(-50%);
}

@keyframes shake {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }

  25% {
    transform: scale(1.2) rotate(15deg);
  }

  50% {
    transform: scale(1.2) rotate(-15deg);
  }

  75% {
    transform: scale(1.2) rotate(5deg);
  }
}
.logo {
  width: 25px;
  img{
    filter: hue-rotate(250deg);
  }
}
</style>
