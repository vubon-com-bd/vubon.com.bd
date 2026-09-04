/**
 * Cart Promotion Types
 * কার্ট প্রমোশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Product } from '../product/product.types';

export interface CartPromotion extends BaseEntity {
  cartId: string;
  promotionId: string;
  name: string;
  nameBangla?: string;
  description?: string;
  type: 'discount' | 'free_shipping' | 'buy_get' | 'gift';
  discountType: 'percentage' | 'fixed' | 'buy_x_get_y';
  value: number;
  condition?: {
    minAmount?: number;
    minQuantity?: number;
    products?: string[];
    productDetails?: Product[];
    categories?: string[];
  };
  appliedProducts?: string[];
  appliedProductDetails?: Product[];
  savings: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartPromotionCreateInput {
  promotionId: string;
  type: 'discount' | 'free_shipping' | 'buy_get' | 'gift';
  discountType: 'percentage' | 'fixed' | 'buy_x_get_y';
  value: number;
  condition?: {
    minAmount?: number;
    minQuantity?: number;
    products?: string[];
    categories?: string[];
  };
  appliedProducts?: string[];
}

export interface CartPromotionResponse {
  cartPromotion: CartPromotion;
}
