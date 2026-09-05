/**
 * Delivery Method Endpoints
 * ডেলিভারি মেথড সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import type { DeliveryMethod } from '@vubon/shared-types';

export const deliveryMethodEndpoints = {
  list: `${baseEndpoints.api}/delivery-methods`,
  select: (checkoutId: string) => `${baseEndpoints.api}/checkout/${checkoutId}/delivery`,
  get: (id: string) => `${baseEndpoints.api}/delivery-methods/${id}`,
  calculate: `${baseEndpoints.api}/delivery-methods/calculate`,
} as const;

export type DeliveryMethodEndpointKey = keyof typeof deliveryMethodEndpoints;

// DeliveryMethod টাইপ ব্যবহার করে helper function
export const getDeliveryCost = (method: DeliveryMethod): number => {
  return method.cost || 0;
};
