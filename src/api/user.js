import axios from 'axios';
// import type { RouteRecordNormalized } from 'vue-router';
// import { UserState } from '@/store/modules/user/types';

// export interface LoginData {
//   username: string;
//   password: string;
// }

// export interface LoginRes {
//   token: string;
// }
export function login(data) {
  return axios.post('/login', data);
}

export function logout() {
  return axios.post('/api/user/logout');
}

export function getUserInfo() {
  return axios.post('/api/user/info');
}

export function getMenuList() {
  return axios.post('/api/user/menu');
}
// 用户标签
/**
 *用户标签-标签分类
 */
export function userlabelListInfo() {
  return axios({
    url: 'user/user_label_cate',
    method: 'get',
  });
}

/**
 *用户标签-添加标签分类
 */
export function userLabelCreate() {
  return axios({
    url: `user/user_label_cate/create`,
    method: 'get'
  });
}

/**
 *用户标签-标签分类编辑
 */
export function userLabelEdit(id) {
  return axios({
    url: `user/user_label_cate/${id}/edit`,
    method: 'get'
  });
}

/**
 *用户标签-获取标签列表
 */
export function LabeInfo(data) {
  return axios({
    url: `user/user_label`,
    method: 'get',
    params: data
  });
}

/**
 *用户标签-添加标签列表
 */

export function usercreateApi() {
  return axios({
    url: `user/user_label/create`,
    method: 'get'
  });
}

/**
 *用户标签-标签列表编辑
 */
export function userEditApi(id) {
  return axios({
    url: `user/user_label/${id}/edit`,
    method: 'get'
  });
}


/**
 *用户-用户列表-获取用户列表
 */
export function userListApi(data) {
  return axios({
    url: `user/get_list`,
    method: 'get',
    params: data
  });
}



/**
 *用户-用户列表-获取搜索用户列表
 */
export function usersearchApi(data) {
  return axios({
    url: `user/search`,
    method: 'get',
    params: data
  });
}

/**
 * 获取用户标签
 */
export function getUserLabel(uid) {
  return axios({
    url: `user/label/${uid}`,
    method: 'get'
  });
}

/**
 * 设置用户标签
 */
export function putUserLabel(uid, data) {
  return axios({
    url: `user/label/${uid}`,
    method: 'post',
    data
  });
}


/**
 *用户-用户列表- 详情
 */
export function detailsApi(id) {
  return axios({
    url: `user/info/${id}`,
    method: 'get'
  });
}


/**
 *用户-用户列表- 获取设置会员标签表单
 */
export function userSetLabelApi(data) {
  return axios({
    url: `user/set_label`,
    method: 'post',
    data
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


/**
 *用户-用户列表- 充值会员列表
 */
export function usermemberApi() {
  return axios({
    url: `user/member/ship`,
    method: 'get'
  });
}


/**
 *用户-用户列表- 充值保存
 */
export function userSaveApi(data) {
  return axios({
    url: `store/recharge`,
    method: 'post',
    data
  });
}


/**
 *用户-用户列表- 充值保存
 */
export function usermeberApi(data) {
  return axios({
    url: `/user/member`,
    method: 'post',
    data
  });
}

/**
 *用户-用户列表- 修改店员保存
 */
export function setUserSaveApi(data) {
  return axios({
    url: `staff/binding/user`,
    method: 'post',
    data
  });
}

/**
 * @description 个人中心 --- 修改密码
 * data 请求参数
 */
export function updtaeAdmin(data) {
  return axios({
    url: `updatePwd`,
    method: 'PUT',
    data
  });
}

/**
 *用户-用户列表- 修改店员保存
 */
export function checkOrderApi(type,data) {
  return axios({
    url: `check_order_status/${type}`,
    method: 'post',
    data
  });
}

/**
 *用户-个人中心
 */
export function staffInfoApi() {
  return axios({
    url: `user/cashier_info `,
    method: 'get'
  });
}

/**
 *用户-当前门店店员列表和店员信息
 */
 export function cashierList(data) {
  return axios({
    url: `user/cashier_list`,
    method: 'get',
    params: data
  });
}

