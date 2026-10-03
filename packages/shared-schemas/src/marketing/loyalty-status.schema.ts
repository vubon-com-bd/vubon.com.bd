/**
 * Loyalty Status Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/loyalty.constants থেকে।
 */

import { z } from 'zod';
import {
  LOYALTY_STATUS,
  LOYALTY_TIER,
  LOYALTY_POINT_TYPE,
  LOYALTY_EARN_RULE,
} from '@vubon/shared-constants/marketing';

export const LoyaltyStatusSchema = z.enum(Object.values(LOYALTY_STATUS) as [string, ...string[]]);

export const LoyaltyTierSchema = z.enum(Object.values(LOYALTY_TIER) as [string, ...string[]]);

export const LoyaltyPointTypeSchema = z.enum(
  Object.values(LOYALTY_POINT_TYPE) as [string, ...string[]]
);

export const LoyaltyEarnRuleSchema = z.enum(
  Object.values(LOYALTY_EARN_RULE) as [string, ...string[]]
);

export type LoyaltyStatusSchemaType = z.infer<typeof LoyaltyStatusSchema>;
export type LoyaltyTierSchemaType = z.infer<typeof LoyaltyTierSchema>;
export type LoyaltyPointTypeSchemaType = z.infer<typeof LoyaltyPointTypeSchema>;
export type LoyaltyEarnRuleSchemaType = z.infer<typeof LoyaltyEarnRuleSchema>;
