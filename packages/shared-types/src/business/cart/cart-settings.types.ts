/**
 * Cart Settings Types
 * কার্ট সেটিংস সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

export interface CartSettings extends BaseEntity {
  userId: string;
  maxItems: number;
  maxQuantityPerItem: number;
  minQuantityPerItem: number;
  abandonedTimeout: number;
  sessionTimeout: number;
  autoSave: boolean;
  saveForLater: boolean;
  couponEnabled: boolean;
  promotionEnabled: boolean;
  guestCheckout: boolean;
  currency: string;
  taxRate: number;
  shippingRate: number;
  freeShippingThreshold: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartSettingsCreateInput {
  userId: string;
  maxItems?: number;
  maxQuantityPerItem?: number;
  minQuantityPerItem?: number;
  abandonedTimeout?: number;
  sessionTimeout?: number;
  autoSave?: boolean;
  saveForLater?: boolean;
  couponEnabled?: boolean;
  promotionEnabled?: boolean;
  guestCheckout?: boolean;
  currency?: string;
  taxRate?: number;
  shippingRate?: number;
  freeShippingThreshold?: number;
}

export interface CartSettingsUpdateInput {
  maxItems?: number;
  maxQuantityPerItem?: number;
  minQuantityPerItem?: number;
  abandonedTimeout?: number;
  sessionTimeout?: number;
  autoSave?: boolean;
  saveForLater?: boolean;
  couponEnabled?: boolean;
  promotionEnabled?: boolean;
  guestCheckout?: boolean;
  currency?: string;
  taxRate?: number;
  shippingRate?: number;
  freeShippingThreshold?: number;
}

export interface CartSettingsResponse {
  cartSettings: CartSettings;
}
