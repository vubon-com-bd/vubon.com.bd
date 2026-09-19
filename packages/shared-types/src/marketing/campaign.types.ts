/**
 * Campaign Core Types
 * @module shared-types/marketing
 */

import type { BaseEntity } from '../common/base';
import type { UserId, Url } from '../common/primitives';
import type { CampaignTypeValue } from './campaign-type.types';
import type { CampaignStatusValue, CampaignGoalValue } from './campaign-status.types';
import type { CampaignChannel } from './campaign-channel.types';
import type { CampaignBudget } from './campaign-budget.types';

export interface Campaign extends BaseEntity<string> {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly type: CampaignTypeValue;
  readonly status: CampaignStatusValue;
  readonly goal: CampaignGoalValue;
  readonly channels: readonly CampaignChannel[];
  readonly budget: CampaignBudget;
  readonly audiences: readonly string[];
  readonly segments?: readonly string[];
  readonly contentId?: string;
  readonly landingUrl?: Url;
  readonly bannerUrl?: Url;
  readonly startAt: string;
  readonly endAt?: string;
  readonly metrics?: CampaignMetrics;
  readonly createdBy: UserId;
  readonly approvedBy?: UserId;
  readonly approvedAt?: string;
  readonly tags?: readonly string[];
}

export interface CampaignMetrics {
  readonly impressions: number;
  readonly reach: number;
  readonly clicks: number;
  readonly ctr: number;
  readonly conversions: number;
  readonly conversionRate: number;
  readonly cpc: number;
  readonly cpa: number;
  readonly roas: number;
  readonly revenue: number;
  readonly spend: number;
  readonly currency: string;
}

export interface CampaignPublic {
  readonly id: string;
  readonly name: string;
  readonly type: CampaignTypeValue;
  readonly status: CampaignStatusValue;
  readonly goal: CampaignGoalValue;
  readonly startAt: string;
  readonly endAt?: string;
  readonly bannerUrl?: Url;
  readonly metrics?: CampaignMetrics;
}

export interface CampaignSummary {
  readonly id: string;
  readonly name: string;
  readonly type: CampaignTypeValue;
  readonly status: CampaignStatusValue;
  readonly startAt: string;
  readonly endAt?: string;
}

export interface CampaignCreateInput {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly type: CampaignTypeValue;
  readonly goal: CampaignGoalValue;
  readonly channels: readonly CampaignChannel[];
  readonly budget: Omit<CampaignBudget, 'spent' | 'remaining' | 'dailySpent' | 'isPaused'>;
  readonly startAt: string;
  readonly endAt?: string;
  readonly landingUrl?: string;
  readonly bannerUrl?: string;
}

export interface CampaignListFilter {
  readonly type?: CampaignTypeValue;
  readonly status?: CampaignStatusValue;
  readonly goal?: CampaignGoalValue;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}
