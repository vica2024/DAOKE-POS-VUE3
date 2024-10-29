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

/**
 *收银台-获取收银台商品 list.
 */
export function cashierProduct(data) {
    return axios({
        url: `product/get_list`,
        method: 'get',
        params: data
    });
}

/**
 *收银台-获取收银台商品分类信息
 */
export function cashierCate() {
    return axios({
        url: 'product/get_one_category',
        method: 'get'
    });
}

/**
 *收银台-获取收银台商品属性信息
 */
export function cashierProductAttr() {
    return axios({
        url: 'product/get_info',
        method: 'get'
    });
}

/**
 *收银台-商品详情
 */
export function cashierDetail(id, uid) {
    return axios({
        url: `product/get_info/${id}/${uid}`,
        method: 'get'
    });
}
/**
 *收银台-秒杀商品规格
 */
export function cashierGetAttr(id, uid) {
    return axios({
        url: `product/get_attr/${id}/${uid}`,
        method: 'get'
    });
}

export function cashierProductV2(data)
{
    return axios({
        url: `product/v2/get_list`,
        method: 'get',
        params: data
    });
}





