/**
 * Price History Types
 * মূল্য ইতিহাস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { PRODUCT } from '@vubon/shared-constants';

export interface ProductPriceHistory extends BaseEntity {
  productId: string;
  variantId?: string;
  oldPrice: number;
  newPrice: number;
  oldComparePrice?: number;
  newComparePrice?: number;
  oldCostPrice?: number;
  newCostPrice?: number;
  reason: string;
  reasonBangla?: string;
  changedBy: string;
  changedByUser?: User;
  createdAt: Date;
}

export interface ProductPriceHistoryCreateInput {
  productId: string;
  variantId?: string;
  oldPrice: number;
  newPrice: number;
  oldComparePrice?: number;
  newComparePrice?: number;
  oldCostPrice?: number;
  newCostPrice?: number;
  reason: string;
  reasonBangla?: string;
  changedBy: string;
}

export interface ProductPriceHistoryListResponse {
  items: ProductPriceHistory[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductPriceHistoryStats {
  productId: string;
  variantId?: string;
  priceChanges: number;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  currentPrice: number;
  percentageChange: number;
  lastChangeAt: Date;
}

// Constants from PRODUCT
export const PRICE_HISTORY_CONSTANTS = {
  MAX_RECORDS: PRODUCT.PRICE_HISTORY.MAX_RECORDS,
  RETENTION_DAYS: PRODUCT.PRICE_HISTORY.RETENTION_DAYS,
  BULK_LIMIT: PRODUCT.PRICE_HISTORY.BULK_LIMIT,
};
