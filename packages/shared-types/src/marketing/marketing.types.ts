/**
 * Marketing Core Types
 * @module shared-types/marketing
 *
 * Marketing entity + aggregator।
 */

import type { Campaign } from './campaign.types';
import type { Promotion } from './promotion.types';
import type { Affiliate } from './affiliate.types';
import type { Referral } from './referral.types';
import type { Loyalty } from './loyalty.types';
import type { Lead } from './lead-generation.types';
import type { MarketingAutomation } from './marketing-automation.types';

export interface MarketingStats {
  readonly period: string;
  readonly campaignCount: number;
  readonly activeCampaignCount: number;
  readonly promotionCount: number;
  readonly affiliateCount: number;
  readonly referralCount: number;
  readonly loyaltyMemberCount: number;
  readonly leadCount: number;
  readonly totalRevenue: number;
  readonly totalSpend: number;
  readonly roas: number;
  readonly roi: number;
  readonly currency: string;
}

export interface MarketingOverview {
  readonly campaigns: readonly Campaign[];
  readonly promotions: readonly Promotion[];
  readonly affiliates: readonly Affiliate[];
  readonly referrals: readonly Referral[];
  readonly loyalty: readonly Loyalty[];
  readonly leads: readonly Lead[];
  readonly automations: readonly MarketingAutomation[];
  readonly stats: MarketingStats;
  readonly generatedAt: string;
}

export interface MarketingListFilter {
  readonly campaignStatus?: string;
  readonly promotionStatus?: string;
  readonly affiliateStatus?: string;
  readonly referralStatus?: string;
  readonly loyaltyStatus?: string;
  readonly leadStatus?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}
