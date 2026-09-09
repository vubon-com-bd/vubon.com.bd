import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { MARKETING } from '@vubon/shared-constants/src/marketing/marketing.constants';
import { Campaign } from './campaign.types';
import { Promotion } from './promotion.types';
import { Affiliate } from './affiliate.types';
import { Referral } from './referral.types';
import { Loyalty } from './loyalty.types';
import { LeadGeneration } from './lead-generation.types';

export interface MarketingMetadata {
  timezone: string;
  currency: string;
  defaultCampaignType: string;
  defaultPromotionType: string;
  analyticsEnabled: boolean;
  trackingEnabled: boolean;
}

export interface Marketing extends BaseEntity {
  marketingId: string;
  campaigns: Campaign[];
  promotions: Promotion[];
  affiliates: Affiliate[];
  referrals: Referral[];
  loyalty: Loyalty;
  leads: LeadGeneration[];
  status: keyof typeof MARKETING.STATUS | string;
  totalCampaigns: number;
  totalPromotions: number;
  totalAffiliates: number;
  totalReferrals: number;
  totalLeads: number;
  totalBudget: Money;
  spentBudget: Money;
  remainingBudget: Money;
  isActive: boolean;
  metadata: MarketingMetadata;
}
