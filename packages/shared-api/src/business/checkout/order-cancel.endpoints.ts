/**
 * Order Cancel Endpoints
 * অর্ডার বাতিল সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import type { OrderCancel } from '@vubon/shared-types';

export const orderCancelEndpoints = {
  create: (id: string) => `${baseEndpoints.api}/orders/${id}/cancel`,
  get: (id: string) => `${baseEndpoints.api}/orders/cancel/${id}`,
  approve: (id: string) => `${baseEndpoints.api}/orders/cancel/${id}/approve`,
  reject: (id: string) => `${baseEndpoints.api}/orders/cancel/${id}/reject`,
} as const;

export type OrderCancelEndpointKey = keyof typeof orderCancelEndpoints;

// OrderCancel টাইপ ব্যবহার করে helper function
export const isCancelApproved = (orderCancel: OrderCancel): boolean => {
  return orderCancel.status === 'approved';
};
