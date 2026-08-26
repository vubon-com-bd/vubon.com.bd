/**
 * Cart Promotion Types
 * Type definitions for cart promotions based on shared-constants
 * @module CartPromotionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import CartPromotion from cart.types
// ============================================================
import type { CartPromotion } from './cart.types';

// ============================================================
// Import from shared-constants cart
// ============================================================
import {
  // Cart Promotion
  CART_PROMOTION,
  CartPromotionType,
  CartPromotionCategory,
  CartPromotionStatus,
  CartPromotionTrigger,
  CartPromotionAction,
  CartPromotionPriority,
  CartPromotionDefault,
  CartPromotionLimit,
  CartPromotionError,
  cartpromotionGetTypeLabel,
  cartpromotionGetCategoryLabel,
  cartpromotionGetStatusLabel,
  cartpromotionGetTriggerLabel,
  cartpromotionGetActionLabel,
  cartpromotionGetErrorLabel,
  cartpromotionIsActive,
  cartpromotionIsAutoType,
  cartpromotionIsCodeType,
  cartpromotionIsFlashSale,
} from '@vubon/shared-constants';

// ============================================================
// Cart Promotion Extended Types
// ============================================================

/**
 * Cart promotion filter
 */
export interface CartPromotionFilter {
  cartIds?: ID[];
  userIds?: ID[];
  types?: CartPromotionType[];
  categories?: CartPromotionCategory[];
  statuses?: CartPromotionStatus[];
  triggers?: CartPromotionTrigger[];
  actions?: CartPromotionAction[];
  priorities?: CartPromotionPriority[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minDiscount?: number;
  maxDiscount?: number;
  isActive?: boolean;
  isAutoType?: boolean;
  isCodeType?: boolean;
  isFlashSale?: boolean;
  searchTerm?: string;
}

/**
 * Cart promotion statistics
 */
export interface CartPromotionStatistics {
  cartId: ID;
  totalPromotions: number;
  activePromotions: number;
  autoPromotions: number;
  codePromotions: number;
  flashSales: number;
  byType: Record<CartPromotionType, number>;
  byCategory: Record<CartPromotionCategory, number>;
  byStatus: Record<CartPromotionStatus, number>;
  byTrigger: Record<CartPromotionTrigger, number>;
  byAction: Record<CartPromotionAction, number>;
  byPriority: Record<CartPromotionPriority, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalDiscount: number;
  averageDiscount: number;
  maxDiscount: number;
  minDiscount: number;
  mostFrequentType: CartPromotionType;
  mostFrequentCategory: CartPromotionCategory;
  mostFrequentTrigger: CartPromotionTrigger;
}

/**
 * Cart promotion summary
 */
export interface CartPromotionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPromotions: number;
  active: number;
  auto: number;
  code: number;
  flashSale: number;
  byType: Record<CartPromotionType, number>;
  byCategory: Record<CartPromotionCategory, number>;
  byStatus: Record<CartPromotionStatus, number>;
  byTrigger: Record<CartPromotionTrigger, number>;
  byAction: Record<CartPromotionAction, number>;
  byPriority: Record<CartPromotionPriority, number>;
  promotionTrend: {
    date: Date;
    total: number;
    active: number;
    applied: number;
  }[];
  topTypes: {
    type: CartPromotionType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: CartPromotionCategory;
    count: number;
    label: string;
  }[];
  topTriggers: {
    trigger: CartPromotionTrigger;
    count: number;
    label: string;
  }[];
  financialImpact: {
    totalDiscount: number;
    averageDiscount: number;
    maxDiscount: number;
    minDiscount: number;
  };
}

/**
 * Cart promotion configuration
 */
export interface CartPromotionConfiguration {
  enabled: boolean;
  defaultType: CartPromotionType;
  defaultCategory: CartPromotionCategory;
  defaultPriority: CartPromotionPriority;
  defaultTrigger: CartPromotionTrigger;
  defaultAction: CartPromotionAction;
  maxPromotionsPerCart: number;
  allowStacking: boolean;
  stackingStrategy: 'sequential' | 'best' | 'combined';
  requireCode: boolean;
  codeLength: number;
  codePrefix: string;
  autoApply: boolean;
  flashSaleDuration: number;
  notificationOnApply: boolean;
  notificationOnExpiry: boolean;
  alertConfig?: CartPromotionAlertConfig;
}

/**
 * Cart promotion alert configuration
 */
export interface CartPromotionAlertConfig {
  enabled: boolean;
  expiryAlert: boolean;
  thresholdAlert: boolean;
  codeGenerationAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  expiryThreshold: number;
}

/**
 * Cart promotion history
 */
export interface CartPromotionHistory extends BaseEntity, Timestamp {
  id: ID;
  promotionId: ID;
  cartId: ID;
  userId: ID;
  action: 'apply' | 'remove' | 'expire' | 'update' | 'code_generate' | 'code_redeem';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Cart promotion validation
 */
export interface CartPromotionValidation {
  isValid: boolean;
  promotion: CartPromotion;
  cartId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Cart promotion code
 */
export interface CartPromotionCode extends BaseEntity, Timestamp {
  id: ID;
  promotionId: ID;
  code: string;
  isUsed: boolean;
  usedAt?: Date;
  usedBy?: ID;
  expiresAt?: Date;
  maxUses: number;
  usedCount: number;
  metadata?: Metadata;
}

/**
 * Cart promotion rule
 */
export interface CartPromotionRule extends BaseEntity, Timestamp {
  id: ID;
  promotionId: ID;
  condition: string;
  operator:
    | 'eq'
    | 'ne'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'nin'
    | 'contains'
    | 'startsWith'
    | 'endsWith';
  value: unknown;
  priority: number;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Cart promotion export
 */
export interface CartPromotionExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CartPromotionFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Cart Promotion
  CART_PROMOTION,
  CartPromotionType,
  CartPromotionCategory,
  CartPromotionStatus,
  CartPromotionTrigger,
  CartPromotionAction,
  CartPromotionPriority,
  CartPromotionDefault,
  CartPromotionLimit,
  CartPromotionError,
  cartpromotionGetTypeLabel,
  cartpromotionGetCategoryLabel,
  cartpromotionGetStatusLabel,
  cartpromotionGetTriggerLabel,
  cartpromotionGetActionLabel,
  cartpromotionGetErrorLabel,
  cartpromotionIsActive,
  cartpromotionIsAutoType,
  cartpromotionIsCodeType,
  cartpromotionIsFlashSale,
};
