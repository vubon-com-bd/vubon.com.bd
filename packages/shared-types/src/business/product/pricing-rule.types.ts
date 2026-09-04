/**
 * Pricing Rule Types
 * প্রাইসিং রুল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { PRICING_TYPES } from '@vubon/shared-constants';

export interface PricingRule extends BaseEntity {
  name: string;
  nameBangla?: string;
  description?: string;
  type: (typeof PRICING_TYPES)[keyof typeof PRICING_TYPES];
  priority: number;
  isActive: boolean;
  conditions: {
    field: string;
    operator: string;
    value: unknown;
  }[];
  adjustments: {
    type: 'fixed' | 'percentage' | 'override';
    value: number;
    currency?: string;
  }[];
  startDate?: Date;
  endDate?: Date;
  appliesTo: {
    productIds?: string[];
    categoryIds?: string[];
    brandIds?: string[];
    vendorIds?: string[];
    allProducts?: boolean;
  };
  usageCount: number;
  maxUsage?: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface PricingRuleCreateInput {
  name: string;
  nameBangla?: string;
  description?: string;
  type: (typeof PRICING_TYPES)[keyof typeof PRICING_TYPES];
  priority?: number;
  conditions: {
    field: string;
    operator: string;
    value: unknown;
  }[];
  adjustments: {
    type: 'fixed' | 'percentage' | 'override';
    value: number;
    currency?: string;
  }[];
  startDate?: Date;
  endDate?: Date;
  appliesTo: {
    productIds?: string[];
    categoryIds?: string[];
    brandIds?: string[];
    vendorIds?: string[];
    allProducts?: boolean;
  };
  maxUsage?: number;
}

export interface PricingRuleUpdateInput extends Partial<PricingRuleCreateInput> {
  isActive?: boolean;
}

export interface PricingRuleResponse {
  pricingRule: PricingRule;
}
