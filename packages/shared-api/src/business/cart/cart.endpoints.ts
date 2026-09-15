import { API_ROUTES } from '@vubon/shared-constants/common';
import { paramEndpoint } from '../../common/endpoints/endpoint.builder';

export const CART_ENDPOINTS = {
  get: API_ROUTES.CART.GET,
  add: API_ROUTES.CART.ADD_ITEM,
  item: (id: string): string => paramEndpoint(API_ROUTES.CART.UPDATE_ITEM, { id }),
  remove: (id: string): string => paramEndpoint(API_ROUTES.CART.REMOVE_ITEM, { id }),
  clear: API_ROUTES.CART.CLEAR,
  applyCoupon: API_ROUTES.CART.APPLY_COUPON,
  removeCoupon: API_ROUTES.CART.REMOVE_COUPON,
} as const;
