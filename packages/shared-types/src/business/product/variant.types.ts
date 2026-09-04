/**
 * Variant Types
 * ভেরিয়েন্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { VARIANT_STATUS } from '@vubon/shared-constants';

export interface VariantImage {
  id: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Variant extends BaseEntity {
  productId: string;
  sku: string;
  name: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  stock: number;
  lowStockThreshold: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  attributes: Record<string, string>;
  images: VariantImage[];
  status: (typeof VARIANT_STATUS)[keyof typeof VARIANT_STATUS];
  isDefault: boolean;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VariantCreateInput {
  productId: string;
  sku: string;
  name: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  stock: number;
  lowStockThreshold?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  attributes: Record<string, string>;
  images?: VariantImage[];
  isDefault?: boolean;
  position?: number;
}

export interface VariantUpdateInput extends Partial<VariantCreateInput> {
  status?: (typeof VARIANT_STATUS)[keyof typeof VARIANT_STATUS];
}

export interface VariantResponse {
  variant: Variant;
}
