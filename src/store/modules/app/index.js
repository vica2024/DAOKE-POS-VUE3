import { defineStore } from 'pinia';
import defaultSettings from '@/config/settings.json';

const useAppStore = defineStore('app', {
  state: () => ({ ...defaultSettings }),
  getters: {
    appCurrentSetting(state) {
      return { ...state };
    },
    appDevice(state) {
      return state.device;
    },
    appAsyncMenus(state) {
      return state.serverMenu;
    },
  },
  actions: {
    // Update app settings
    updateSettings(partial) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    // Set messageCount
    updateMessageCount(count) {
      this.messageCount = count?count:0;
    },

    // Change theme color
    toggleTheme(dark) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
    toggleDevice(device) {
      this.device = device;
    },
    toggleMenu(value) {
      this.hideMenu = value;
    },
    async fetchServerMenuConfig() {
     
    },
    clearServerMenu() {
      this.serverMenu = [];
    },
  },
});

export default useAppStore;
