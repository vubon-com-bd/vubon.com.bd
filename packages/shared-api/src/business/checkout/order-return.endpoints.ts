/**
 * Order Return Endpoints
 * অর্ডার রিটার্ন সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import type { OrderReturn } from '@vubon/shared-types';

export const orderReturnEndpoints = {
  create: (id: string) => `${baseEndpoints.api}/orders/${id}/return`,
  get: (id: string) => `${baseEndpoints.api}/orders/return/${id}`,
  list: (orderId: string) => `${baseEndpoints.api}/orders/${orderId}/returns`,
  approve: (id: string) => `${baseEndpoints.api}/orders/return/${id}/approve`,
  reject: (id: string) => `${baseEndpoints.api}/orders/return/${id}/reject`,
  process: (id: string) => `${baseEndpoints.api}/orders/return/${id}/process`,
} as const;

export type OrderReturnEndpointKey = keyof typeof orderReturnEndpoints;

// OrderReturn টাইপ ব্যবহার করে helper function
export const isReturnApproved = (orderReturn: OrderReturn): boolean => {
  return orderReturn.status === 'approved';
};
