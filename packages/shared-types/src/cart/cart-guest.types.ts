/**
 * Cart Guest Types
 * Type definitions for guest carts based on shared-constants
 * @module CartGuestTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants cart
// ============================================================
import {
  // Cart Core
  CartType,
  CartCategory,
  CartStatus,
  CartPriority,
  // Cart Item
  CartItemType,
  CartItemStatus,
} from '@vubon/shared-constants';

// ============================================================
// Cart Guest Extended Types
// ============================================================

/**
 * Guest cart session
 */
export interface GuestCartSession extends BaseEntity, Timestamp {
  id: ID;
  sessionId: string;
  cartId: ID;
  userId?: ID;
  email?: string;
  phone?: string;
  ipAddress?: string;
  userAgent?: string;
  deviceType?: string;
  expiresAt: Date;
  lastActivityAt: Date;
  isActive: boolean;
  isConverted: boolean;
  metadata?: Metadata;
}

/**
 * Guest cart
 */
export interface GuestCart extends BaseEntity, Timestamp {
  id: ID;
  sessionId: string;
  type: CartType;
  category: CartCategory;
  status: CartStatus;
  priority: CartPriority;
  items: GuestCartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  email?: string;
  phone?: string;
  ipAddress?: string;
  userAgent?: string;
  deviceType?: string;
  isActive: boolean;
  isAbandoned: boolean;
  isConverted: boolean;
  isEditable: boolean;
  expiresAt: Date;
  lastActivityAt: Date;
  metadata?: Metadata;
}

/**
 * Guest cart item
 */
export interface GuestCartItem extends BaseEntity, Timestamp {
  id: ID;
  cartId: ID;
  productId: ID;
  variantId?: ID;
  sku: string;
  name: string;
  type: CartItemType;
  status: CartItemStatus;
  quantity: number;
  price: number;
  total: number;
  currency: string;
  isAvailable: boolean;
  isInStock: boolean;
  metadata?: Metadata;
}

/**
 * Guest cart filter
 */
export interface GuestCartFilter {
  sessionIds?: string[];
  cartIds?: ID[];
  userIds?: ID[];
  types?: CartType[];
  categories?: CartCategory[];
  statuses?: CartStatus[];
  priorities?: CartPriority[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minTotal?: number;
  maxTotal?: number;
  isActive?: boolean;
  isAbandoned?: boolean;
  isConverted?: boolean;
  isEditable?: boolean;
  hasEmail?: boolean;
  hasPhone?: boolean;
  searchTerm?: string;
  ipAddress?: string;
}

/**
 * Guest cart statistics
 */
export interface GuestCartStatistics {
  sessionId: string;
  totalGuestCarts: number;
  activeGuestCarts: number;
  abandonedGuestCarts: number;
  convertedGuestCarts: number;
  byType: Record<CartType, number>;
  byCategory: Record<CartCategory, number>;
  byStatus: Record<CartStatus, number>;
  byPriority: Record<CartPriority, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageCartValue: number;
  maxCartValue: number;
  minCartValue: number;
  totalItems: number;
  averageItems: number;
  conversionRate: number;
  abandonmentRate: number;
  mostFrequentType: CartType;
  mostFrequentCategory: CartCategory;
  mostFrequentStatus: CartStatus;
}

/**
 * Guest cart summary
 */
export interface GuestCartSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalGuestCarts: number;
  active: number;
  abandoned: number;
  converted: number;
  byType: Record<CartType, number>;
  byCategory: Record<CartCategory, number>;
  byStatus: Record<CartStatus, number>;
  byPriority: Record<CartPriority, number>;
  cartTrend: {
    date: Date;
    total: number;
    active: number;
    abandoned: number;
  }[];
  topTypes: {
    type: CartType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: CartCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: CartStatus;
    count: number;
    label: string;
  }[];
  conversionMetrics: {
    conversionRate: number;
    averageConversionTime: number;
    totalConvertedValue: number;
  };
}

/**
 * Guest cart configuration
 */
export interface GuestCartConfiguration {
  enabled: boolean;
  allowGuestCart: boolean;
  defaultType: CartType;
  defaultCategory: CartCategory;
  defaultPriority: CartPriority;
  defaultCurrency: string;
  defaultExpiryHours: number;
  defaultMaxItems: number;
  sessionTimeout: number;
  requireEmail: boolean;
  requirePhone: boolean;
  autoMergeOnLogin: boolean;
  mergeStrategy: 'newest' | 'oldest' | 'largest' | 'smallest';
  notificationOnAbandon: boolean;
  notificationOnConvert: boolean;
  notificationOnExpiry: boolean;
  alertConfig?: GuestCartAlertConfig;
}

/**
 * Guest cart alert configuration
 */
export interface GuestCartAlertConfig {
  enabled: boolean;
  abandonmentAlert: boolean;
  abandonmentThreshold: number;
  expiryAlert: boolean;
  expiryThreshold: number;
  highValueAlert: boolean;
  highValueThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Guest cart history
 */
export interface GuestCartHistory extends BaseEntity, Timestamp {
  id: ID;
  cartId: ID;
  sessionId: string;
  userId?: ID;
  action:
    | 'create'
    | 'update'
    | 'add_item'
    | 'remove_item'
    | 'update_item'
    | 'abandon'
    | 'convert'
    | 'merge'
    | 'expire';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Guest cart validation
 */
export interface GuestCartValidation {
  isValid: boolean;
  cartId: ID;
  sessionId: string;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Guest cart export
 */
export interface GuestCartExport extends BaseEntity, Timestamp {
  id: ID;
  sessionId: string;
  userId?: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: GuestCartFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Guest cart merge
 */
export interface GuestCartMerge extends BaseEntity, Timestamp {
  id: ID;
  guestCartId: ID;
  userCartId: ID;
  userId: ID;
  strategy: 'newest' | 'oldest' | 'largest' | 'smallest';
  mergedItems: {
    guestItemId: ID;
    userItemId: ID;
    productId: ID;
    variantId?: ID;
    quantity: number;
    price: number;
  }[];
  mergedAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Cart Core
  CartType,
  CartCategory,
  CartStatus,
  CartPriority,
  // Cart Item
  CartItemType,
  CartItemStatus,
};
