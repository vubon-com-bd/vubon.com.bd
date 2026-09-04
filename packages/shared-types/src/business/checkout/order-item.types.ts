/**
 * Order Item Types
 * অর্ডার আইটেম সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { Product } from '../product/product.types';
import { Variant } from '../product/variant.types';

export interface OrderItem extends BaseEntity {
  orderId: string;
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
  status: 'pending' | 'confirmed' | 'processed' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | 'refunded';
  returnRequested?: boolean;
  returnStatus?: 'pending' | 'approved' | 'rejected' | 'processed' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemCreateInput {
  orderId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  originalPrice: number;
  discount: number;
  tax: number;
  attributes?: Record<string, string | number | boolean>;
}

export interface OrderItemUpdateInput {
  status?: 'pending' | 'confirmed' | 'processed' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | 'refunded';
  returnRequested?: boolean;
  returnStatus?: 'pending' | 'approved' | 'rejected' | 'processed' | 'completed';
}

export interface OrderItemResponse {
  orderItem: OrderItem;
}
