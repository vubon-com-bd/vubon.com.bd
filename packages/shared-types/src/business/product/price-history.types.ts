/**
 * Price History Types
 * মূল্য ইতিহাস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';

export interface PriceHistoryEntry extends BaseEntity {
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

export interface PriceHistoryCreateInput {
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

export interface PriceHistoryListResponse {
  items: PriceHistoryEntry[];
  total: number;
  page: number;
  limit: number;
}

export interface PriceHistoryStats {
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
