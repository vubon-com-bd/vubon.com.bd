/**
 * Saved For Later Types
 * পরে সংরক্ষিত সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { Product } from '../product/product.types';
import { Variant } from '../product/variant.types';

export interface SavedForLater extends BaseEntity {
  userId: string;
  user?: User;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: Variant;
  quantity: number;
  price: number;
  attributes?: Record<string, string | number | boolean>;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavedForLaterCreateInput {
  productId: string;
  variantId?: string;
  quantity?: number;
  attributes?: Record<string, string | number | boolean>;
  note?: string;
}

export interface SavedForLaterUpdateInput {
  quantity?: number;
  note?: string;
}

export interface SavedForLaterResponse {
  savedForLater: SavedForLater;
}

export interface SavedForLaterList {
  items: SavedForLater[];
  total: number;
}
