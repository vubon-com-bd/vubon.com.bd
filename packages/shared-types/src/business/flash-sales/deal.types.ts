/**
 * Deal Types
 * ডিল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Product } from '../product/product.types';
import { DEAL_STATUS } from '@vubon/shared-constants';

export interface Deal extends BaseEntity {
  name: string;
  nameBangla?: string;
  description?: string;
  status: (typeof DEAL_STATUS)[keyof typeof DEAL_STATUS];
  type: 'single' | 'bundle' | 'buy_get' | 'tiered' | 'bogo';
  discountType: 'percentage' | 'fixed' | 'bundle' | 'buy_x_get_y';
  value: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  minQuantity: number;
  maxQuantity: number;
  startDate?: Date;
  endDate?: Date;
  products: Product[];
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface DealCreateInput {
  name: string;
  nameBangla?: string;
  description?: string;
  type: 'single' | 'bundle' | 'buy_get' | 'tiered' | 'bogo';
  discountType: 'percentage' | 'fixed' | 'bundle' | 'buy_x_get_y';
  value: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  minQuantity?: number;
  maxQuantity?: number;
  startDate?: Date;
  endDate?: Date;
  products: string[];
  metadata?: Record<string, string | number | boolean>;
}

export interface DealUpdateInput {
  name?: string;
  nameBangla?: string;
  description?: string;
  status?: (typeof DEAL_STATUS)[keyof typeof DEAL_STATUS];
  value?: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  minQuantity?: number;
  maxQuantity?: number;
  startDate?: Date;
  endDate?: Date;
  products?: string[];
  metadata?: Record<string, string | number | boolean>;
}

export interface DealResponse {
  deal: Deal;
}
