import axios from 'axios';

/**
 *To search customer list data
 */
export function customerListSearch(data) {
  return axios({
    url: 'customer/search',
    method: 'get',
    params:data
  });
}


export function getOneCustomerBasicInfo(user_id) {
  return axios({
    url: 'customer/basic-info/' +user_id,
    method: 'get'
  });
}


export function getCustomerDetails(user_id) {
  return axios({
    url: 'customer/detail-info/' +user_id,
    method: 'get'
  });
}

export function getCustomerInfoTemplate(customerId) {
  return axios({
    url: 'customer/template/'+customerId,
    method: 'get'
  });
}

export function createCustomer(data) {
  return axios({
    url: 'customer/create',
    method: 'post',
    data
  });
}

export function updateCustomer(data) {
  return axios({
    url: 'customer/update',
    method: 'post',
    data
  });
}

export function switchCustomerApi(cashierId,data) {
  return axios({
    url: 'customer/switch/'+cashierId,
    method: 'post',
    data
  });
}

/**
 *用户-用户列表-详情中tab选项
 */
 export function infoApi(uid,data) {
  return axios({
    url: `user/record/${uid}`,
    method: 'get',
    params: data
  });
}

/**
 *用户-用户列表- 充值列表
 */
 export function userRechargelApi() {
  return axios({
    url: `store/recharge_info`,
    method: 'get'
  });
}
