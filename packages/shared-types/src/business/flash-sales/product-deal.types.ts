/**
 * Product Deal Types
 * প্রোডাক্ট ডিল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Product } from '../product/product.types';
import { Deal } from './deal.types';

export interface ProductDeal extends BaseEntity {
  productId: string;
  product: Product;
  dealId: string;
  deal: Deal;
  variantId?: string;
  discount: number;
  discountPercentage: number;
  flashPrice: number;
  originalPrice: number;
  quantity: number;
  sold: number;
  minPurchase: number;
  maxPurchase: number;
  status: 'active' | 'inactive' | 'expired' | 'sold_out' | 'cancelled' | 'pending';
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDealCreateInput {
  productId: string;
  dealId: string;
  variantId?: string;
  discount: number;
  discountPercentage: number;
  flashPrice: number;
  originalPrice: number;
  quantity: number;
  minPurchase?: number;
  maxPurchase?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface ProductDealUpdateInput {
  discount?: number;
  discountPercentage?: number;
  flashPrice?: number;
  originalPrice?: number;
  quantity?: number;
  sold?: number;
  minPurchase?: number;
  maxPurchase?: number;
  status?: 'active' | 'inactive' | 'expired' | 'sold_out' | 'cancelled' | 'pending';
  metadata?: Record<string, string | number | boolean>;
}

export interface ProductDealResponse {
  productDeal: ProductDeal;
}
