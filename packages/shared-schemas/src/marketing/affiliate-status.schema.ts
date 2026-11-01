/**
 * Affiliate Status Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/affiliate.constants থেকে।
 */

import { z } from 'zod';
import {
  AFFILIATE_STATUS,
  AFFILIATE_TYPE,
  AFFILIATE_COMMISSION_TYPE,
} from '@vubon/shared-constants/marketing';

export const AffiliateStatusSchema = z.enum(
  Object.values(AFFILIATE_STATUS) as [string, ...string[]]
);

export const AffiliateTypeSchema = z.enum(Object.values(AFFILIATE_TYPE) as [string, ...string[]]);

export const AffiliateCommissionTypeSchema = z.enum(
  Object.values(AFFILIATE_COMMISSION_TYPE) as [string, ...string[]]
);

export type AffiliateStatusSchemaType = z.infer<typeof AffiliateStatusSchema>;
export type AffiliateTypeSchemaType = z.infer<typeof AffiliateTypeSchema>;
export type AffiliateCommissionTypeSchemaType = z.infer<typeof AffiliateCommissionTypeSchema>;
