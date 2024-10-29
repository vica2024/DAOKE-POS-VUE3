import { DEFAULT_LAYOUT } from '../base';
// import { AppRouteRecordRaw } from '../types';

export default {
  path: '/',
  name: 'home',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.profile',
    requiresAuth: true,
    icon: 'icon-file',
    order: 4,
  },
  children: [
    {
      path: 'cashier',
      name: 'menu.cashier',
      component: () => import('@/views/cashier/index.vue'),
      meta: {
        locale: 'menu.cashier',
        icon: 'icon-gift',
        requiresAuth: true,
        roles: ['admin','cashier'],
      },
    },
    {
      path: 'pending-order',
      name: 'menu.pendingOrder',
      component: () => import('@/views/pending/index.vue'),
      meta: {
        locale: 'menu.pendingOrder',
        icon: 'icon-drive-file',
        requiresAuth: true,
        roles: ['admin','cashier'],
      },
    },
    {
      path: 'order',
      name: 'menu.order',
      component: () => import('@/views/order/index.vue'),
      meta: {
        locale: 'menu.order',
        icon: 'icon-bookmark',
        requiresAuth: true,
        roles: ['admin','cashier'],
      },
    },
    {
      path: 'redeem-coupon',
      name: 'menu.redeem-coupon',
      component: () => import('@/views/write-off/index.vue'),
      meta: {
        locale: 'menu.redeem-coupon',
        icon: 'icon-check-square',
        requiresAuth: true,
        roles: ['admin','cashier'],
      },
    },
    {
      path: 'refund',
      name: 'menu.refund',
      component: () => import('@/views/refund/index.vue'),
      meta: {
        locale: 'menu.refund',
        icon: 'icon-rotate-left',
        requiresAuth: true,
        roles: ['admin','cashier'],
      },
    }
  ],
};

