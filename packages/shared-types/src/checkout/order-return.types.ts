/**
 * Order Return Types
 * Type definitions for order returns based on shared-constants
 * @module OrderReturnTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Order Status
  OrderStatusType,
  // Order Type
  OrderTypeType,
  OrderCategory,
  OrderPriority,
  // Delivery Status
  DeliveryStatusType,
} from '@vubon/shared-constants';

// ============================================================
// Order Return Extended Types
// ============================================================

/**
 * Order return filter
 */
export interface OrderReturnFilter {
  orderIds?: ID[];
  userIds?: ID[];
  itemIds?: ID[];
  statuses?: ('pending' | 'approved' | 'rejected' | 'completed')[];
  refundStatuses?: ('pending' | 'processed' | 'completed' | 'failed')[];
  reasons?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minQuantity?: number;
  maxQuantity?: number;
  minRefundAmount?: number;
  maxRefundAmount?: number;
  searchTerm?: string;
}

/**
 * Order return statistics
 */
export interface OrderReturnStatistics {
  userId: ID;
  totalReturns: number;
  pendingReturns: number;
  approvedReturns: number;
  rejectedReturns: number;
  completedReturns: number;
  byStatus: Record<string, number>;
  byRefundStatus: Record<string, number>;
  byReason: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalRefundAmount: number;
  averageRefundAmount: number;
  maxRefundAmount: number;
  minRefundAmount: number;
  averageReturnTime: number;
  minReturnTime: number;
  maxReturnTime: number;
  mostFrequentReason: string;
  mostFrequentStatus: string;
  returnRate: number;
}

/**
 * Order return summary
 */
export interface OrderReturnSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReturns: number;
  pending: number;
  approved: number;
  rejected: number;
  completed: number;
  byStatus: Record<string, number>;
  byRefundStatus: Record<string, number>;
  byReason: Record<string, number>;
  returnTrend: {
    date: Date;
    total: number;
    approved: number;
    rejected: number;
  }[];
  topReasons: {
    reason: string;
    count: number;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  financialImpact: {
    totalRefundAmount: number;
    averageRefundAmount: number;
    refundRate: number;
  };
}

/**
 * Order return configuration
 */
export interface OrderReturnConfiguration {
  enabled: boolean;
  allowReturns: boolean;
  returnWindowDays: number;
  requireApproval: boolean;
  requireReason: boolean;
  requireItemCondition: boolean;
  maxReturnsPerOrder: number;
  maxReturnsPerUser: number;
  refundMethod: 'original' | 'store_credit' | 'gift_card';
  restockingFee: number;
  allowPartialReturn: boolean;
  requireReturnShipping: boolean;
  notificationOnRequest: boolean;
  notificationOnApproval: boolean;
  notificationOnRejection: boolean;
  notificationOnCompletion: boolean;
  alertConfig?: OrderReturnAlertConfig;
}

/**
 * Order return alert configuration
 */
export interface OrderReturnAlertConfig {
  enabled: boolean;
  highReturnRateAlert: boolean;
  highReturnRateThreshold: number;
  fraudulentReturnAlert: boolean;
  delayedReturnAlert: boolean;
  delayedReturnThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Order return history
 */
export interface OrderReturnHistory extends BaseEntity, Timestamp {
  id: ID;
  returnId: ID;
  orderId: ID;
  userId: ID;
  action: 'request' | 'approve' | 'reject' | 'complete' | 'cancel' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Order return validation
 */
export interface OrderReturnValidation {
  isValid: boolean;
  returnId: ID;
  orderId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Order return export
 */
export interface OrderReturnExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: OrderReturnFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Order return reason
 */
export interface OrderReturnReason extends BaseEntity, Timestamp {
  id: ID;
  code: string;
  name: string;
  description?: string;
  category: 'product' | 'shipping' | 'customer' | 'other';
  requiresApproval: boolean;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Order return item detail
 */
export interface OrderReturnItemDetail extends BaseEntity, Timestamp {
  id: ID;
  returnId: ID;
  orderId: ID;
  userId: ID;
  itemId: ID;
  productId: ID;
  variantId?: ID;
  quantity: number;
  reason: string;
  condition: 'new' | 'used' | 'damaged' | 'defective';
  refundAmount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  metadata?: Metadata;
}

/**
 * Order return shipping
 */
export interface OrderReturnShipping extends BaseEntity, Timestamp {
  id: ID;
  returnId: ID;
  orderId: ID;
  userId: ID;
  method: string;
  trackingNumber?: string;
  cost: number;
  currency: string;
  status: DeliveryStatusType;
  shippedAt?: Date;
  deliveredAt?: Date;
  metadata?: Metadata;
}

/**
 * Order return analysis
 */
export interface OrderReturnAnalysis {
  period: {
    start: Date;
    end: Date;
  };
  totalReturns: number;
  returnRate: number;
  averageRefundAmount: number;
  totalRefundAmount: number;
  byReason: {
    reason: string;
    count: number;
    percentage: number;
  }[];
  byProduct: {
    productId: ID;
    name: string;
    returnCount: number;
    returnRate: number;
  }[];
  byCategory: {
    category: string;
    returnCount: number;
    returnRate: number;
  }[];
  trend: {
    date: Date;
    returns: number;
    refundAmount: number;
  }[];
  recommendations: string[];
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Order Status
  OrderStatusType,
  // Order Type
  OrderTypeType,
  OrderCategory,
  OrderPriority,
  // Delivery Status
  DeliveryStatusType,
};
