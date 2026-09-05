/**
 * Pricing Rule Endpoints
 * প্রাইসিং রুল সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { PRICING_RULE } from '@vubon/shared-constants';
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
  // PRICING_RULE ব্যবহার করা হয়েছে
  types: PRICING_RULE.TYPES || ['fixed', 'percentage', 'override'],
  maxRules: PRICING_RULE.MAX_RULES || 10,
  // baseEndpoints এর ভ্যালু ব্যবহার
  baseList: baseEndpoints.list,
  baseCreate: baseEndpoints.create,
} as const;

export type PricingRuleEndpoint = {
  endpoints: typeof pricingRuleEndpoints;
  response: PricingRule;
};

export type PricingRuleEndpointKey = keyof typeof pricingRuleEndpoints;
