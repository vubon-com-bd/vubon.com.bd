/**
 * Bundle Deal Types
 * বান্ডেল ডিল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Deal } from './deal.types';
import { Product } from '../product/product.types';

export interface BundleDeal extends BaseEntity {
  dealId: string;
  deal: Deal;
  products: BundleProduct[];
  totalPrice: number;
  bundlePrice: number;
  savings: number;
  savingsPercentage: number;
  minItems: number;
  maxItems: number;
  status: 'active' | 'inactive' | 'expired' | 'sold_out' | 'cancelled' | 'pending';
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface BundleProduct {
  productId: string;
  product: Product;
  variantId?: string;
  quantity: number;
  price: number;
}

export interface BundleDealCreateInput {
  dealId: string;
  products: {
    productId: string;
    variantId?: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  bundlePrice: number;
  savings: number;
  savingsPercentage: number;
  minItems?: number;
  maxItems?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface BundleDealUpdateInput {
  products?: {
    productId: string;
    variantId?: string;
    quantity: number;
    price: number;
  }[];
  totalPrice?: number;
  bundlePrice?: number;
  savings?: number;
  savingsPercentage?: number;
  minItems?: number;
  maxItems?: number;
  status?: 'active' | 'inactive' | 'expired' | 'sold_out' | 'cancelled' | 'pending';
  metadata?: Record<string, string | number | boolean>;
}

export interface BundleDealResponse {
  bundleDeal: BundleDeal;
}
