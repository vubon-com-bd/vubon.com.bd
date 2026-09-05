/**
 * Order Tracking Endpoints
 * অর্ডার ট্র্যাকিং সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import type { OrderTracking } from '@vubon/shared-types';

export const orderTrackingEndpoints = {
  get: (id: string) => `${baseEndpoints.api}/orders/tracking/${id}`,
  update: (id: string) => `${baseEndpoints.api}/orders/tracking/${id}`,
  list: (orderId: string) => `${baseEndpoints.api}/orders/${orderId}/tracking`,
  create: (orderId: string) => `${baseEndpoints.api}/orders/${orderId}/tracking`,
} as const;

export type OrderTrackingEndpointKey = keyof typeof orderTrackingEndpoints;

// OrderTracking টাইপ ব্যবহার করে helper function
export const getTrackingStatus = (tracking: OrderTracking): string => {
  return tracking.status;
};
