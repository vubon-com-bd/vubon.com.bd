/**
 * Flash Sale Types
 * ফ্ল্যাশ সেল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Product } from '../product/product.types';
import { FLASH_SALE_STATUS } from '@vubon/shared-constants';
import { FlashSaleInventory } from './flash-sale-inventory.types';
import { FlashSalePrice } from './flash-sale-price.types';
import { FlashSaleParticipant } from './flash-sale-participant.types';

export interface FlashSale extends BaseEntity {
  name: string;
  nameBangla?: string;
  slug: string;
  description?: string;
  status: (typeof FLASH_SALE_STATUS)[keyof typeof FLASH_SALE_STATUS];
  type:
    | 'regular'
    | 'limited'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'holiday'
    | 'seasonal'
    | 'flash'
    | 'mega';
  visibility: 'public' | 'private' | 'members_only' | 'preview';
  startDate: Date;
  endDate: Date;
  products: FlashSaleInventory[];
  productList?: Product[];
  prices: FlashSalePrice[];
  participants: FlashSaleParticipant[];
  totalProducts: number;
  totalParticipants: number;
  totalOrders: number;
  totalRevenue: number;
  maxDiscount: number;
  minDiscount: number;
  maxQuantityPerUser: number;
  minQuantityPerUser: number;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface FlashSaleCreateInput {
  name: string;
  nameBangla?: string;
  description?: string;
  type:
    | 'regular'
    | 'limited'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'holiday'
    | 'seasonal'
    | 'flash'
    | 'mega';
  visibility?: 'public' | 'private' | 'members_only' | 'preview';
  startDate: Date;
  endDate: Date;
  products: {
    productId: string;
    product?: Product;
    discount: number;
    quantity: number;
  }[];
  maxDiscount?: number;
  minDiscount?: number;
  maxQuantityPerUser?: number;
  minQuantityPerUser?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleUpdateInput {
  name?: string;
  nameBangla?: string;
  description?: string;
  status?: (typeof FLASH_SALE_STATUS)[keyof typeof FLASH_SALE_STATUS];
  startDate?: Date;
  endDate?: Date;
  products?: {
    productId: string;
    product?: Product;
    discount: number;
    quantity: number;
  }[];
  maxDiscount?: number;
  minDiscount?: number;
  maxQuantityPerUser?: number;
  minQuantityPerUser?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleResponse {
  flashSale: FlashSale;
}

export interface FlashSaleSummary {
  totalSales: number;
  totalRevenue: number;
  totalOrders: number;
  totalParticipants: number;
  averageDiscount: number;
  conversionRate: number;
}
