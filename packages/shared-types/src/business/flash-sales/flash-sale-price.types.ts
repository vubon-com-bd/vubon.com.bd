/**
 * Flash Sale Price Types
 * ফ্ল্যাশ সেল মূল্য সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Product } from '../product/product.types';
import { PRICING_TYPES } from '@vubon/shared-constants';

export interface FlashSalePrice extends BaseEntity {
  flashSaleId: string;
  productId: string;
  product: Product;
  variantId?: string;
  type: (typeof PRICING_TYPES)[keyof typeof PRICING_TYPES];
  originalPrice: number;
  flashPrice: number;
  discount: number;
  discountPercentage: number;
  currency: string;
  isActive: boolean;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSalePriceCreateInput {
  flashSaleId: string;
  productId: string;
  variantId?: string;
  originalPrice: number;
  flashPrice: number;
  discount: number;
  discountPercentage: number;
  currency?: string;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSalePriceUpdateInput {
  flashPrice?: number;
  discount?: number;
  discountPercentage?: number;
  isActive?: boolean;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSalePriceResponse {
  flashSalePrice: FlashSalePrice;
}

export interface FlashSalePriceSummary {
  averageDiscount: number;
  maxDiscount: number;
  minDiscount: number;
  totalSavings: number;
}
