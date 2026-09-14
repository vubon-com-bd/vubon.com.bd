/**
 * Analytics Campaign Types
 * @module shared-types/platform/analytics
 */

import type {
  ANALYTICS_CAMPAIGN_TYPE,
  ANALYTICS_UTM_PARAM,
} from '@vubon/shared-constants/platform';

export type AnalyticsCampaignTypeValue =
  (typeof ANALYTICS_CAMPAIGN_TYPE)[keyof typeof ANALYTICS_CAMPAIGN_TYPE];

export type AnalyticsUtmParamValue = (typeof ANALYTICS_UTM_PARAM)[keyof typeof ANALYTICS_UTM_PARAM];

export interface AnalyticsCampaign {
  readonly id: string;
  readonly name: string;
  readonly type: AnalyticsCampaignTypeValue;
  readonly utmSource: string;
  readonly utmMedium: string;
  readonly utmCampaign: string;
  readonly utmTerm?: string;
  readonly utmContent?: string;
  readonly utmId?: string;
  readonly startAt: string;
  readonly endAt?: string;
  readonly isActive: boolean;
}

export interface AnalyticsCampaignPublic {
  readonly id: string;
  readonly name: string;
  readonly type: AnalyticsCampaignTypeValue;
  readonly startAt: string;
  readonly endAt?: string;
}
