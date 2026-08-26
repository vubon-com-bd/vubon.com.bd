/**
 * Price Types
 * Type definitions for product pricing based on shared-constants
 * @module PriceTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// Import from shared-constants product
import {
  PRODUCTPRICING,
  ProductPricingType,
  ProductPriceStatus,
  ProductCurrency,
  ProductTaxClass,
  ProductPricingDefault,
  ProductPricingLimit,
  productpricingGetTypeLabel,
  productpricingGetStatusLabel,
  productpricingGetCurrencySymbol,
  productpricingGetTaxClassLabel,
  productpricingIsActive,
  productpricingIsFixed,
  productpricingIsDynamic,
  productpricingIsTiered,
  productpricingGetDefaultCurrency,
  productpricingGetDefaultTaxClass,
} from '@vubon/shared-constants';

// Price Extended Types (শুধুমাত্র নতুন টাইপ)
export interface PriceFilter {
  ids?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  types?: ProductPricingType[];
  statuses?: ProductPriceStatus[];
  currencies?: ProductCurrency[];
  taxClasses?: ProductTaxClass[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isFixed?: boolean;
  isDynamic?: boolean;
  isTiered?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minCost?: number;
  maxCost?: number;
  minCompareAtPrice?: number;
  maxCompareAtPrice?: number;
  searchTerm?: string;
}

export interface PriceStatistics {
  productId: ID;
  totalPrices: number;
  activePrices: number;
  fixedPrices: number;
  dynamicPrices: number;
  tieredPrices: number;
  byType: Record<ProductPricingType, number>;
  byStatus: Record<ProductPriceStatus, number>;
  byCurrency: Record<ProductCurrency, number>;
  byTaxClass: Record<ProductTaxClass, number>;
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
  mostFrequentType: ProductPricingType;
  mostFrequentCurrency: ProductCurrency;
  mostFrequentTaxClass: ProductTaxClass;
}

export interface PriceSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPrices: number;
  active: number;
  fixed: number;
  dynamic: number;
  tiered: number;
  byType: Record<ProductPricingType, number>;
  byStatus: Record<ProductPriceStatus, number>;
  byCurrency: Record<ProductCurrency, number>;
  byTaxClass: Record<ProductTaxClass, number>;
  priceTrend: {
    date: Date;
    averagePrice: number;
    maxPrice: number;
    minPrice: number;
  }[];
  topTypes: {
    type: ProductPricingType;
    count: number;
    label: string;
  }[];
  topCurrencies: {
    currency: ProductCurrency;
    count: number;
    label: string;
  }[];
  topTaxClasses: {
    taxClass: ProductTaxClass;
    count: number;
    label: string;
  }[];
  priceMetrics: {
    averagePrice: number;
    maxPrice: number;
    minPrice: number;
    priceRange: number;
  };
  costMetrics: {
    averageCost: number;
    maxCost: number;
    minCost: number;
    averageMargin: number;
  };
}

export interface PriceConfiguration {
  enabled: boolean;
  defaultType: ProductPricingType;
  defaultCurrency: ProductCurrency;
  defaultTaxClass: ProductTaxClass;
  defaultPrice: number;
  defaultCost: number;
  requirePrice: boolean;
  requireCurrency: boolean;
  requireTaxClass: boolean;
  allowDynamicPricing: boolean;
  allowTieredPricing: boolean;
  allowCompareAtPrice: boolean;
  autoCalculateTax: boolean;
  notificationOnPriceChange: boolean;
  notificationOnCostChange: boolean;
  notificationOnCurrencyChange: boolean;
  alertConfig?: PriceAlertConfig;
}

export interface PriceAlertConfig {
  enabled: boolean;
  priceIncreaseAlert: boolean;
  priceDropAlert: boolean;
  costIncreaseAlert: boolean;
  marginDropAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  priceIncreaseThreshold: number;
  priceDropThreshold: number;
  marginDropThreshold: number;
}

export interface PriceHistory extends BaseEntity, Timestamp {
  id: ID;
  priceId: ID;
  productId: ID;
  variantId?: ID;
  action:
    | 'create'
    | 'update'
    | 'price_change'
    | 'cost_change'
    | 'compare_price_change'
    | 'currency_change'
    | 'tax_class_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

export interface PriceValidation {
  isValid: boolean;
  priceId: ID;
  productId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

export interface PriceTier extends BaseEntity, Timestamp {
  id: ID;
  priceId: ID;
  productId: ID;
  variantId?: ID;
  minQuantity: number;
  maxQuantity?: number;
  price: number;
  currency: ProductCurrency;
  isActive: boolean;
  metadata?: Metadata;
}

export interface PriceCalculation extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  variantId?: ID;
  basePrice: number;
  quantity: number;
  tierPrice?: number;
  finalPrice: number;
  discountAmount?: number;
  discountPercentage?: number;
  taxAmount: number;
  totalPrice: number;
  currency: ProductCurrency;
  calculatedAt: Date;
  metadata?: Metadata;
}

export interface PriceExport extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PriceFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// Re-export Everything (শুধুমাত্র নতুন টাইপ - ProductPricing এবং ProductTierPricing product.types থেকে আসছে)
export {
  PRODUCTPRICING,
  ProductPricingType,
  ProductPriceStatus,
  ProductCurrency,
  ProductTaxClass,
  ProductPricingDefault,
  ProductPricingLimit,
  productpricingGetTypeLabel,
  productpricingGetStatusLabel,
  productpricingGetCurrencySymbol,
  productpricingGetTaxClassLabel,
  productpricingIsActive,
  productpricingIsFixed,
  productpricingIsDynamic,
  productpricingIsTiered,
  productpricingGetDefaultCurrency,
  productpricingGetDefaultTaxClass,
};
