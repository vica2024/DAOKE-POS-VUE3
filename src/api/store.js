import axios from 'axios';

/**
 *收银台-充值数据
 */
export function getRechargeInfo() {
  return axios({
    url: '/store/recharge_info',
    method: 'get'
  });
}

export function getStoreInfo() {
  return axios({
    url: '/store/info',
    method: 'get'
  });
}
