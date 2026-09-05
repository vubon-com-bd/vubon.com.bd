/**
 * Order Fulfillment Endpoints
 * অর্ডার পরিপূর্ণতা সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import type { OrderFulfillment } from '@vubon/shared-types';

export const orderFulfillmentEndpoints = {
  get: (id: string) => `${baseEndpoints.api}/orders/fulfillment/${id}`,
  update: (id: string) => `${baseEndpoints.api}/orders/fulfillment/${id}`,
  list: (orderId: string) => `${baseEndpoints.api}/orders/${orderId}/fulfillment`,
  create: (orderId: string) => `${baseEndpoints.api}/orders/${orderId}/fulfillment`,
  process: (id: string) => `${baseEndpoints.api}/orders/fulfillment/${id}/process`,
  ship: (id: string) => `${baseEndpoints.api}/orders/fulfillment/${id}/ship`,
  deliver: (id: string) => `${baseEndpoints.api}/orders/fulfillment/${id}/deliver`,
} as const;

export type OrderFulfillmentEndpointKey = keyof typeof orderFulfillmentEndpoints;

// OrderFulfillment টাইপ ব্যবহার করে helper function (টাইপ সেফ - string as any ছাড়া)
export const isFulfillmentComplete = (fulfillment: OrderFulfillment): boolean => {
  // status কে string হিসেবে তুলনা করছি, যেহেতু এটা union type
  const status = fulfillment.status as string;
  const completedStatuses = ['delivered', 'completed'];
  return completedStatuses.includes(status);
};

// ফুলফিলমেন্ট প্রক্রিয়াজাত হচ্ছে কিনা চেক
export const isFulfillmentProcessing = (fulfillment: OrderFulfillment): boolean => {
  const status = fulfillment.status as string;
  const processingStatuses = ['processing', 'picked', 'packed'];
  return processingStatuses.includes(status);
};

// ফুলফিলমেন্ট শিপ হয়েছে কিনা
export const isFulfillmentShipped = (fulfillment: OrderFulfillment): boolean => {
  const status = fulfillment.status as string;
  const shippedStatuses = ['shipped', 'delivered'];
  return shippedStatuses.includes(status);
};
