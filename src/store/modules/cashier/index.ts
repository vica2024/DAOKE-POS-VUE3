// src/stores/customerStore.ts
import { defineStore } from 'pinia';

const deafultAvatar = 'https://multi-store.crmeb.net/view_cashier/img/yonghu.908b01d3.png';
export interface CashierState {
  id:number,
  account:string,
  phone: string,
  avatar: string,
  staff_name: string,
  language:string,
  store_id:Number,
  type:string,
  is_admin:Number,
  is_cashier:Number,
  is_manager:Number,
  pickUpOrder:Object,
}

const useCashierStore = defineStore('cashier', {
  state: (): CashierState => ({
    id:0,
    account:'',
    phone: '',
    avatar: deafultAvatar,
    staff_name: '',
    language:'',
    store_id:0,
    type:'',
    is_admin:0,
    is_cashier:0,
    is_manager:0,
    pickUpOrder:{//this is a temporaty data from hand list oder
      uid:0,
      staff_id:0,
      tourist_uid:0,
      index:0
    }
  }),
  actions: {

    updateCashierInfo(cashier: CashierState) {
      this.id = cashier.id;
      this.avatar = cashier.avatar;
      this.staff_name = cashier.staff_name;
      this.account = cashier.account;
    },
    updatePickUpOrderInfo(order: Object) {
      this.pickUpOrder = order;
    },
    resetPickUpOrderInfo() {
      this.pickUpOrder = {
        uid:0,
        staff_id:0,
        tourist_uid:0,
        index:0
      }
    },
    resetState() {
      this.id = 0;
      this.phone = '';
      this.avatar = deafultAvatar;
      this.staff_name = '';
    }
  },
});
export default useCashierStore;