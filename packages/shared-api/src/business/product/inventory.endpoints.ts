/**
 * Inventory Endpoints
 * ইনভেন্টরি সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { INVENTORY } from '@vubon/shared-constants';
import type { Inventory } from '@vubon/shared-types';

export const inventoryEndpoints = {
  // baseEndpoints ব্যবহার করা হয়েছে
  get: (productId: string): string => `/inventory/product/${productId}`,
  update: (productId: string): string => `/inventory/product/${productId}`,
  bulk: '/inventory/bulk',
  history: (productId: string): string => `/inventory/product/${productId}/history`,
  adjust: (productId: string): string => `/inventory/product/${productId}/adjust`,
  restock: (productId: string): string => `/inventory/product/${productId}/restock`,
  lowStock: '/inventory/low-stock',
  stats: '/inventory/stats',
  // INVENTORY থেকে status, types, movementTypes ব্যবহার
  status: INVENTORY.STATUS,
  types: INVENTORY.TYPES,
  movementTypes: INVENTORY.MOVEMENT_TYPES,
  // baseEndpoints এর ভ্যালু ব্যবহার
  baseList: baseEndpoints.list,
  baseCreate: baseEndpoints.create,
} as const;

export type InventoryEndpoint = {
  endpoints: typeof inventoryEndpoints;
  response: Inventory;
};

export type InventoryEndpointKey = keyof typeof inventoryEndpoints;
