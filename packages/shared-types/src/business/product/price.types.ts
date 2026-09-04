/**
 * Price Types
 * মূল্য সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface Price extends BaseEntity {
  productId: string;
  variantId?: string;
  amount: number;
  currency: string;
  compareAmount?: number;
  costAmount?: number;
  taxRate: number;
  isActive: boolean;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceHistory extends BaseEntity {
  productId: string;
  variantId?: string;
  oldPrice: number;
  newPrice: number;
  reason: string;
  changedBy: string;
  createdAt: Date;
}

export interface PriceCreateInput {
  productId: string;
  variantId?: string;
  amount: number;
  currency?: string;
  compareAmount?: number;
  costAmount?: number;
  taxRate?: number;
  effectiveFrom?: Date;
  effectiveTo?: Date;
}

export interface PriceUpdateInput extends Partial<PriceCreateInput> {
  isActive?: boolean;
}

export interface PriceResponse {
  price: Price;
}
