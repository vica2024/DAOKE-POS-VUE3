
const stores = createPinia();
import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useCashierStore from './modules/cashier';
import useCustomerStore from './modules/customer';
import useTabBarStore from './modules/tab-bar';
export { useAppStore, useUserStore, useTabBarStore ,useCustomerStore,useCashierStore};
export default stores;
