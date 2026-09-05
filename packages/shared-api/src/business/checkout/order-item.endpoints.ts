/**
 * Order Item Endpoints
 * অর্ডার আইটেম সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import type { OrderItem } from '@vubon/shared-types';

export const orderItemEndpoints = {
  list: (orderId: string) => `${baseEndpoints.api}/orders/${orderId}/items`,
  detail: (orderId: string, itemId: string) =>
    `${baseEndpoints.api}/orders/${orderId}/items/${itemId}`,
  update: (orderId: string, itemId: string) =>
    `${baseEndpoints.api}/orders/${orderId}/items/${itemId}`,
  return: (orderId: string, itemId: string) =>
    `${baseEndpoints.api}/orders/${orderId}/items/${itemId}/return`,
} as const;

export type OrderItemEndpointKey = keyof typeof orderItemEndpoints;

// OrderItem টাইপ ব্যবহার করে helper function
export const calculateOrderItemTotal = (item: OrderItem): number => {
  return item.price * item.quantity;
};
