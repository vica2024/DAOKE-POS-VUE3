<script lang="tsx">
import { ref, h, compile, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter, RouteRecordRaw } from "vue-router";
import { useAppStore } from "@/store";
import { listenerRouteChange } from "@/utils/route-listener";
import { openWindow, regexUrl } from "@/utils";
import useMenuTree from "./use-menu-tree";
interface Item {
      path: string;
      name: string;
      meta: {
        hideInMenu?: boolean,
        activeMenu?: boolean,
      };
}
export default {
  emit: ["collapse"],
  setup() {
    const { t } = useI18n();
    const appStore = useAppStore();
    const router = useRouter();
    const route = useRoute();
    const { menuTree } = useMenuTree();
    const collapsed = computed({
      get() {
        if (appStore.device === "desktop") return appStore.menuCollapse;
        return false;
      },
      set(value) {
        appStore.updateSettings({ menuCollapse: value });
      },
    });

    const topMenu = computed(() => appStore.topMenu);
    const openKeys = ref<string[]>([]);
    const selectedKey = ref<string[]>([]);
    const goto = (item:Item) => {
      // Open external link
      if (regexUrl.test(item.path)) {
        openWindow(item.path);
        selectedKey.value = [item.name];
        return;
      }
      // Eliminate external link side effects
      const { hideInMenu, activeMenu } = item.meta;
      if (route.name === item.name && !hideInMenu && !activeMenu) {
        selectedKey.value = [item.name];
        return;
      }
      // Trigger router change
      router.push({
        name: item.name,
      });
    };
    const findMenuOpenKeys = (target: any) => {
      const result: any = [];
      let isFind = false;
      const backtrack = (item: any, keys: any) => {
        if (item.name === target) {
          isFind = true;
          result.push(...keys);
          return;
        }
        if (item.children?.length) {
          item.children.forEach((el:any) => {
            backtrack(el, [...keys, el.name]);
          });
        }
      };
      menuTree.value.forEach((el:any) => {
        if (isFind) return; // Performance optimization
        backtrack(el, [el.name]);
      });
      return result;
    };
    listenerRouteChange((newRoute:any) => {
      const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
      if (requiresAuth && (!hideInMenu || activeMenu)) {
        const menuOpenKeys = findMenuOpenKeys(activeMenu || newRoute.name);

        const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
        openKeys.value = [...keySet];

        selectedKey.value = [
          activeMenu || menuOpenKeys[menuOpenKeys.length - 1],
        ];
      }
    }, true);
    const setCollapse = (val:any) => {
      if (appStore.device === "desktop")
        appStore.updateSettings({ menuCollapse: val });
    };

    const renderSubMenu = () => {
      function travel(_route:any, nodes = []) {
        const menus = _route[0]?.children;
        if (menus) {
          menus.forEach((element:any) => {
            // This is demo, modify nodes as needed
            const icon = element?.meta?.icon
              ? () => h(compile(`<${element?.meta?.icon}/>`))
              : null;
            const node =
              element?.children && element?.children.length !== 0 ? (
                <a-sub-menu
                  key={element?.name}
                  v-slots={{
                    icon,
                    title: () => h(compile(t(element?.meta?.locale || ""))),
                  }}
                >
                  {travel(element?.children)}
                </a-sub-menu>
              ) : (
                <a-menu-item
                  key={element?.name}
                  v-slots={{ icon }}
                  onClick={() => goto(element)}
                >
                  {t(element?.meta?.locale || "")}
                </a-menu-item>
              );
            nodes.push(node);
          });
        } else {
          console.log("No Childs");
        }
        return nodes;
      }
      return travel(menuTree.value);
    };

    return () => (
      <a-menu
        mode={topMenu.value ? "horizontal" : "vertical"}
        v-model:collapsed={collapsed.value}
        v-model:open-keys={openKeys.value}
        auto-open={false}
        theme="dark"
        selected-keys={selectedKey.value}
        auto-open-selected={true}
        level-indent={34}
        style="height: 100%;width:100%;"
        onCollapse={setCollapse}
      >
        {renderSubMenu()}
      </a-menu>
    );
  },
};
</script>

<style lang="less" scoped>
:deep(.arco-menu-inner) {
  padding: 15px 10px;

  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }

  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }

  .arco-menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 13px;
    border-radius: 10px;
    width: 66px;
    padding-top: 5px;
    padding-bottom: 10px;
    margin-bottom: 15px;

    span:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 3px;
      padding-left: 18px;

      svg {
        font-size: 28px;
        margin-bottom: 5px;
      }
    }

    span:last-child {
      text-align: center;
      font-size: 15px;
      display: block;
      width: 95px;
      padding-top: 2px;
      padding-bottom: 2px;
    }
  }
}
</style>
