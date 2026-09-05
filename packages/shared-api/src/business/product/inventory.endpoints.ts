/**
 * Inventory Endpoints
 * ইনভেন্টরি সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PRODUCT } from '@vubon/shared-constants';
import type { Inventory } from '@vubon/shared-types';

export const inventoryEndpoints = {
  // baseEndpoints ব্যবহার করা হয়েছে
  get: (productId: string): string => `${baseEndpoints.list}${productId}/inventory`,
  update: (productId: string): string => `${baseEndpoints.list}${productId}/inventory`,
  bulk: `${baseEndpoints.list}bulk`,
  history: (productId: string): string => `${baseEndpoints.list}${productId}/inventory/history`,
  adjust: (productId: string): string => `${baseEndpoints.list}${productId}/inventory/adjust`,
  restock: (productId: string): string => `${baseEndpoints.list}${productId}/inventory/restock`,
  lowStock: `${baseEndpoints.list}low-stock`,
  stats: `${baseEndpoints.list}stats`,
  // PRODUCT থেকে ডিফল্ট ভ্যালু ব্যবহার
  lowStockThreshold: PRODUCT.DEFAULTS.LOW_STOCK_THRESHOLD,
  minQuantity: PRODUCT.DEFAULTS.MIN_QUANTITY,
  maxQuantity: PRODUCT.DEFAULTS.MAX_QUANTITY,
  // baseEndpoints এর create এবং delete ব্যবহার
  create: baseEndpoints.create,
  delete: (id: string): string => baseEndpoints.delete(id),
} as const;

export type InventoryEndpoint = {
  endpoints: typeof inventoryEndpoints;
  response: Inventory;
};

export type InventoryEndpointKey = keyof typeof inventoryEndpoints;
