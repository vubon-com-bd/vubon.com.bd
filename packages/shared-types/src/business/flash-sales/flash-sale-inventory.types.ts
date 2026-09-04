/**
 * Flash Sale Inventory Types
 * ফ্ল্যাশ সেল ইনভেন্টরি সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Product } from '../product/product.types';
import { INVENTORY_STATUS } from '@vubon/shared-constants';

export interface FlashSaleInventory extends BaseEntity {
  flashSaleId: string;
  productId: string;
  product: Product;
  variantId?: string;
  quantity: number;
  reserved: number;
  sold: number;
  available: number;
  status: (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS];
  allocationType: 'fixed' | 'dynamic' | 'per_user' | 'total';
  perUserLimit: number;
  minPurchase: number;
  maxPurchase: number;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSaleInventoryCreateInput {
  flashSaleId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  allocationType?: 'fixed' | 'dynamic' | 'per_user' | 'total';
  perUserLimit?: number;
  minPurchase?: number;
  maxPurchase?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleInventoryUpdateInput {
  quantity?: number;
  reserved?: number;
  sold?: number;
  available?: number;
  status?: (typeof INVENTORY_STATUS)[keyof typeof INVENTORY_STATUS];
  perUserLimit?: number;
  minPurchase?: number;
  maxPurchase?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleInventoryResponse {
  flashSaleInventory: FlashSaleInventory;
}

export interface FlashSaleInventorySummary {
  totalQuantity: number;
  totalReserved: number;
  totalSold: number;
  totalAvailable: number;
  sellThroughRate: number;
}
