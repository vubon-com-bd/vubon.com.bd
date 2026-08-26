/**
 * Saved for Later Types
 * Type definitions for saved items (wishlist/save for later) based on shared-constants
 * @module SavedForLaterTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants cart
// ============================================================
import {
  // Cart Item
  CartItemType,
  CartItemStatus,
} from '@vubon/shared-constants';

// ============================================================
// Saved for Later Extended Types
// ============================================================

/**
 * Saved item
 */
export interface SavedItem extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
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
  savedAt: Date;
  notes?: string;
  metadata?: Metadata;
}

/**
 * Saved for later filter
 */
export interface SavedForLaterFilter {
  userIds?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  types?: CartItemType[];
  statuses?: CartItemStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  isInStock?: boolean;
  searchTerm?: string;
  sku?: string;
}

/**
 * Saved for later statistics
 */
export interface SavedForLaterStatistics {
  userId: ID;
  totalSavedItems: number;
  uniqueProducts: number;
  totalValue: number;
  averagePrice: number;
  maxPrice: number;
  minPrice: number;
  byType: Record<CartItemType, number>;
  byStatus: Record<CartItemStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentProduct: {
    productId: ID;
    count: number;
  };
  averageItemsPerUser: number;
}

/**
 * Saved for later summary
 */
export interface SavedForLaterSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSavedItems: number;
  uniqueUsers: number;
  uniqueProducts: number;
  totalValue: number;
  averageValue: number;
  byType: Record<CartItemType, number>;
  byStatus: Record<CartItemStatus, number>;
  savedTrend: {
    date: Date;
    total: number;
    added: number;
    removed: number;
  }[];
  topProducts: {
    productId: ID;
    name: string;
    saveCount: number;
  }[];
  topUsers: {
    userId: ID;
    saveCount: number;
  }[];
}

/**
 * Saved for later configuration
 */
export interface SavedForLaterConfiguration {
  enabled: boolean;
  maxItemsPerUser: number;
  allowDuplicateItems: boolean;
  autoRemoveOutOfStock: boolean;
  notificationOnPriceDrop: boolean;
  notificationOnBackInStock: boolean;
  notificationOnAvailability: boolean;
  priceDropThreshold: number;
  backInStockThreshold: number;
  alertConfig?: SavedForLaterAlertConfig;
}

/**
 * Saved for later alert configuration
 */
export interface SavedForLaterAlertConfig {
  enabled: boolean;
  priceDropAlert: boolean;
  backInStockAlert: boolean;
  availabilityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'push' | 'in_app')[];
  cooldownMinutes: number;
}

/**
 * Saved for later history
 */
export interface SavedForLaterHistory extends BaseEntity, Timestamp {
  id: ID;
  savedItemId: ID;
  userId: ID;
  action: 'save' | 'remove' | 'move_to_cart' | 'update' | 'price_change' | 'stock_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Saved for later validation
 */
export interface SavedForLaterValidation {
  isValid: boolean;
  savedItemId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Saved for later export
 */
export interface SavedForLaterExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SavedForLaterFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Saved for later notification
 */
export interface SavedForLaterNotification extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  savedItemId: ID;
  type: 'price_drop' | 'back_in_stock' | 'availability' | 'promotion';
  message: string;
  oldValue?: number;
  newValue?: number;
  sentAt: Date;
  isRead: boolean;
  readAt?: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Cart Item
  CartItemType,
  CartItemStatus,
};
