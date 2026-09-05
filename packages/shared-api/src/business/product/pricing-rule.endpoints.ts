/**
 * Pricing Rule Endpoints
 * প্রাইসিং রুল সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PRODUCT } from '@vubon/shared-constants';
import type { PricingRule } from '@vubon/shared-types';

export const pricingRuleEndpoints = {
  list: baseEndpoints.list,
  detail: (id: string): string => `/pricing-rules/${id}`,
  create: baseEndpoints.create,
  update: (id: string): string => `/pricing-rules/${id}`,
  delete: (id: string): string => `/pricing-rules/${id}`,
  active: '/pricing-rules/active',
  byProduct: (productId: string): string => `/pricing-rules/product/${productId}`,
  apply: (id: string): string => `/pricing-rules/${id}/apply`,
  simulate: '/pricing-rules/simulate',
  // PRODUCT.PRICING_RULE থেকে কনস্ট্যান্টস ব্যবহার
  maxRules: PRODUCT.PRICING_RULE.MAX_RULES,
  priorityMin: PRODUCT.PRICING_RULE.PRIORITY_MIN,
  priorityMax: PRODUCT.PRICING_RULE.PRIORITY_MAX,
  maxConditions: PRODUCT.PRICING_RULE.MAX_CONDITIONS,
  maxAdjustments: PRODUCT.PRICING_RULE.MAX_ADJUSTMENTS,
} as const;

export type PricingRuleEndpoint = {
  endpoints: typeof pricingRuleEndpoints;
  response: PricingRule;
};

export type PricingRuleEndpointKey = keyof typeof pricingRuleEndpoints;
