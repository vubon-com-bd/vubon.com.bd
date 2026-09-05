/**
 * Pricing Rule Types
 * প্রাইসিং রুল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { PRODUCT } from '@vubon/shared-constants';

export interface PricingRule extends BaseEntity {
  name: string;
  nameBangla?: string;
  description?: string;
  type: 'fixed' | 'percentage' | 'tiered' | 'dynamic';
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
  type: 'fixed' | 'percentage' | 'tiered' | 'dynamic';
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

export type PricingRuleUpdateInput = Partial<PricingRuleCreateInput>;

export interface PricingRuleResponse {
  pricingRule: PricingRule;
}

// Constants from PRODUCT
export const PRICING_RULE_CONSTANTS = {
  MAX_RULES: PRODUCT.PRICING_RULE.MAX_RULES,
  PRIORITY_MIN: PRODUCT.PRICING_RULE.PRIORITY_MIN,
  PRIORITY_MAX: PRODUCT.PRICING_RULE.PRIORITY_MAX,
  MAX_CONDITIONS: PRODUCT.PRICING_RULE.MAX_CONDITIONS,
  MAX_ADJUSTMENTS: PRODUCT.PRICING_RULE.MAX_ADJUSTMENTS,
};
