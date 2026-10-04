/**
 * Referral Status Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/referral.constants থেকে।
 */

import { z } from 'zod';
import {
  REFERRAL_STATUS,
  REFERRAL_TYPE,
  REFERRAL_REWARD_TYPE,
} from '@vubon/shared-constants/marketing';

export const ReferralStatusSchema = z.enum(Object.values(REFERRAL_STATUS) as [string, ...string[]]);

export const ReferralTypeSchema = z.enum(Object.values(REFERRAL_TYPE) as [string, ...string[]]);

export const ReferralRewardTypeSchema = z.enum(
  Object.values(REFERRAL_REWARD_TYPE) as [string, ...string[]]
);

export type ReferralStatusSchemaType = z.infer<typeof ReferralStatusSchema>;
export type ReferralTypeSchemaType = z.infer<typeof ReferralTypeSchema>;
export type ReferralRewardTypeSchemaType = z.infer<typeof ReferralRewardTypeSchema>;
