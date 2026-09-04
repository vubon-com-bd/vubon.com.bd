/**
 * Cart Item Types
 * কার্ট আইটেম সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Product } from '../product/product.types';
import { Variant } from '../product/variant.types';

export interface CartItem extends BaseEntity {
  cartId: string;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: Variant;
  quantity: number;
  price: number;
  originalPrice: number;
  discount: number;
  tax: number;
  total: number;
  attributes?: Record<string, string | number | boolean>;
  isSelected: boolean;
  isSavedForLater: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItemCreateInput {
  productId: string;
  variantId?: string;
  quantity: number;
  attributes?: Record<string, string | number | boolean>;
  isSelected?: boolean;
}

export interface CartItemUpdateInput {
  quantity?: number;
  isSelected?: boolean;
  isSavedForLater?: boolean;
}

export interface CartItemResponse {
  cartItem: CartItem;
}

export interface CartItemValidation {
  valid: boolean;
  errors: {
    code: string;
    message: string;
  }[];
  warnings: {
    code: string;
    message: string;
  }[];
}
