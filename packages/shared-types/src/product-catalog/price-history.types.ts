/**
 * Price History Types
 * Type definitions for price history based on shared-constants
 * @module PriceHistoryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants product
// ============================================================
import {
  // Pricing
  ProductPricingType,
  ProductPriceStatus,
  ProductCurrency,
  ProductTaxClass,
} from '@vubon/shared-constants';

// ============================================================
// Price History Extended Types
// ============================================================

/**
 * Price history entry
 */
export interface PriceHistoryEntry extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  variantId?: ID;
  price: number;
  currency: ProductCurrency;
  compareAtPrice?: number;
  cost?: number;
  taxClass: ProductTaxClass;
  type: ProductPricingType;
  status: ProductPriceStatus;
  reason:
    | 'initial'
    | 'promotion'
    | 'sale'
    | 'restock'
    | 'adjustment'
    | 'seasonal'
    | 'clearance'
    | 'manual';
  changedBy: ID;
  metadata?: Metadata;
}

/**
 * Price history filter
 */
export interface PriceHistoryFilter {
  ids?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  types?: ProductPricingType[];
  statuses?: ProductPriceStatus[];
  currencies?: ProductCurrency[];
  taxClasses?: ProductTaxClass[];
  reasons?: (
    | 'initial'
    | 'promotion'
    | 'sale'
    | 'restock'
    | 'adjustment'
    | 'seasonal'
    | 'clearance'
    | 'manual'
  )[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minPrice?: number;
  maxPrice?: number;
  minCompareAtPrice?: number;
  maxCompareAtPrice?: number;
  minCost?: number;
  maxCost?: number;
  searchTerm?: string;
  changedBy?: ID;
}

/**
 * Price history statistics
 */
export interface PriceHistoryStatistics {
  productId: ID;
  totalEntries: number;
  priceChanges: number;
  costChanges: number;
  comparePriceChanges: number;
  byType: Record<ProductPricingType, number>;
  byStatus: Record<ProductPriceStatus, number>;
  byCurrency: Record<ProductCurrency, number>;
  byTaxClass: Record<ProductTaxClass, number>;
  byReason: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePrice: number;
  maxPrice: number;
  minPrice: number;
  averageCost: number;
  maxCost: number;
  minCost: number;
  averageCompareAtPrice: number;
  maxCompareAtPrice: number;
  minCompareAtPrice: number;
  priceVolatility: number;
  mostFrequentReason: string;
  mostFrequentType: ProductPricingType;
}

/**
 * Price history summary
 */
export interface PriceHistorySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalEntries: number;
  priceChanges: number;
  costChanges: number;
  comparePriceChanges: number;
  byType: Record<ProductPricingType, number>;
  byStatus: Record<ProductPriceStatus, number>;
  byCurrency: Record<ProductCurrency, number>;
  byTaxClass: Record<ProductTaxClass, number>;
  byReason: Record<string, number>;
  priceTrend: {
    date: Date;
    price: number;
    compareAtPrice: number;
    cost: number;
  }[];
  topReasons: {
    reason: string;
    count: number;
    label: string;
  }[];
  topTypes: {
    type: ProductPricingType;
    count: number;
    label: string;
  }[];
  priceMetrics: {
    averagePrice: number;
    maxPrice: number;
    minPrice: number;
    priceRange: number;
    volatility: number;
  };
  costMetrics: {
    averageCost: number;
    maxCost: number;
    minCost: number;
    averageMargin: number;
  };
}

/**
 * Price history configuration
 */
export interface PriceHistoryConfiguration {
  enabled: boolean;
  trackAllChanges: boolean;
  trackPriceChanges: boolean;
  trackCostChanges: boolean;
  trackComparePriceChanges: boolean;
  trackTaxClassChanges: boolean;
  trackCurrencyChanges: boolean;
  retentionDays: number;
  autoArchive: boolean;
  archiveAfterDays: number;
  notificationOnPriceChange: boolean;
  notificationOnCostChange: boolean;
  notificationOnSignificantChange: boolean;
  significantChangeThreshold: number;
  alertConfig?: PriceHistoryAlertConfig;
}

/**
 * Price history alert configuration
 */
export interface PriceHistoryAlertConfig {
  enabled: boolean;
  significantPriceChangeAlert: boolean;
  significantCostChangeAlert: boolean;
  frequentPriceChangeAlert: boolean;
  frequentChangeThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  significantChangeThreshold: number;
}

/**
 * Price history validation
 */
export interface PriceHistoryValidation {
  isValid: boolean;
  entryId: ID;
  productId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Price history export
 */
export interface PriceHistoryExport extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PriceHistoryFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Price history analysis
 */
export interface PriceHistoryAnalysis {
  productId: ID;
  period: {
    start: Date;
    end: Date;
  };
  totalPriceChanges: number;
  averagePriceChange: number;
  maxPriceIncrease: number;
  maxPriceDecrease: number;
  priceTrend: 'up' | 'down' | 'stable' | 'volatile';
  priceStability: number;
  seasonalPatterns: {
    month: number;
    averagePrice: number;
    priceChange: number;
  }[];
  promotionImpact: {
    promotionId: string;
    priceBefore: number;
    priceDuring: number;
    priceAfter: number;
    salesImpact: number;
  }[];
  recommendations: string[];
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Pricing
  ProductPricingType,
  ProductPriceStatus,
  ProductCurrency,
  ProductTaxClass,
};
