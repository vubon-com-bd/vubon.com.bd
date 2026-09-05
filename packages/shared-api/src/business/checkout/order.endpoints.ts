/**
 * Order Endpoints
 * অর্ডার সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { CHECKOUT } from '@vubon/shared-constants';
import type { Order } from '@vubon/shared-types';

export const orderEndpoints = {
  list: `${baseEndpoints.api}/orders`,
  detail: (id: string) => `${baseEndpoints.api}/orders/${id}`,
  create: `${baseEndpoints.api}/orders`,
  update: (id: string) => `${baseEndpoints.api}/orders/${id}`,
  delete: (id: string) => `${baseEndpoints.api}/orders/${id}`,
  cancel: (id: string) => `${baseEndpoints.api}/orders/${id}/cancel`,
  status: (id: string) => `${baseEndpoints.api}/orders/${id}/status`,
  confirm: (id: string) => `${baseEndpoints.api}/orders/${id}/confirm`,
  ship: (id: string) => `${baseEndpoints.api}/orders/${id}/ship`,
  deliver: (id: string) => `${baseEndpoints.api}/orders/${id}/deliver`,
  complete: (id: string) => `${baseEndpoints.api}/orders/${id}/complete`,
} as const;

export type OrderEndpointKey = keyof typeof orderEndpoints;

// CHECKOUT কনস্ট্যান্ট ব্যবহার করে order status চেক
export const isOrderComplete = (order: Order): boolean => {
  return order.status === CHECKOUT.STATUS.COMPLETED;
};
