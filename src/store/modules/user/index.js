import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout
  // LoginData,
} from '@/api/user.js';
import { getStoreInfo } from '@/api/store.js';
import { setToken, clearToken, setRole,clearRole } from '@/utils/auth.js';
import { removeRouteListener } from '@/utils/route-listener.js';
// import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: () => ({
    store_id: undefined,
    store_name: undefined,
    store_logo: undefined,
    currency:'¥',
    role: '',
  }),

  getters: {
    userInfo(state) {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Reset user's information
    resetInfo() {
      this.$reset();
      clearRole();
    },
    // Get user's information
    async getInfo() {
      const {data} = await getStoreInfo();
      setRole(data.role);
      this.store_id = data.store_id;
      this.store_name = data.store_name;
      this.store_logo = data.store_logo;
      this.currency = data.currency;
      this.role = data.role;
    },

    // Login
    async login(loginForm) {
      try {
        const {data} = await userLogin(loginForm);
        setToken(data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
