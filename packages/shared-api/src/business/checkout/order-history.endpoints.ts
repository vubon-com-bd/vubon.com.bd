/**
 * Order History Endpoints
 * অর্ডার ইতিহাস সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import type { OrderHistory } from '@vubon/shared-types';

export const orderHistoryEndpoints = {
  list: (orderId: string) => `${baseEndpoints.api}/orders/${orderId}/history`,
} as const;

export type OrderHistoryEndpointKey = keyof typeof orderHistoryEndpoints;

// OrderHistory টাইপ ব্যবহার করে helper function
export const getOrderHistoryCount = (history: OrderHistory[]): number => {
  return history.length;
};
