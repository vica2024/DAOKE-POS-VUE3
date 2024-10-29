// src/stores/customerStore.ts
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
const customerStorage = useStorage('customer-info',{});
const deafultAvatar = 'https://multi-store.crmeb.net/view_cashier/img/yonghu.908b01d3.png';
export interface CustomerState {
  uid:number,
  phone: string,
  avatar: string,
  full_name: string,
  balance: number,
  integral: number,
  tourist_uid:number
}

const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({
    uid:0,
    phone: '',
    avatar: deafultAvatar,
    full_name: 'temporayCustomer',
    balance: 0.00,
    integral: 0,
    tourist_uid:0
  }),
  actions: {
    updateCustomerInfo(customer: CustomerState) {
      this.uid = customer.uid??0;
      this.phone = customer.phone??'';
      this.avatar = customer.avatar??deafultAvatar;
      this.full_name = customer.full_name??'temporayCustomer';
      this.balance = customer.balance??0.00;
      this.integral = customer.integral??0;
      if(customerStorage.value){
        customerStorage.value = {
          uid:customer.uid,
          phone: customer.phone,
          avatar: customer.avatar,
          full_name: customer.full_name,
          balance: customer.balance,
          integral:customer.integral,
        }
      }else{
        useStorage('customer-info', customer);
      }
    },
    updateTouristUid(customer: CustomerState) {
      this.tourist_uid = customer.tourist_uid;
    },
    resetState() {
      this.uid = 0;
      this.phone = '';
      this.avatar = deafultAvatar;
      this.full_name = 'temporayCustomer';
      this.balance = 0;
      this.integral = 0;
      customerStorage.value = {
        uid:0,
        phone: '',
        avatar: deafultAvatar,
        full_name: 'temporayCustomer',
        balance: 0.00,
        integral: 0,
      }

    }
  },
});
export default useCustomerStore;