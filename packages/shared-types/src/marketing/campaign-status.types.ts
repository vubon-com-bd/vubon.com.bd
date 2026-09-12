import { StatusObject } from '../common/status.types';
import { CAMPAIGN_STATUS } from '@vubon/shared-constants/src/marketing/campaign-status.constants';

export interface CampaignStatus extends StatusObject {
  type: keyof typeof CAMPAIGN_STATUS | string;
  category: 'campaign';
  isDraft: boolean;
  isPendingReview: boolean;
  isApproved: boolean;
  isRejected: boolean;
  isScheduled: boolean;
  isLive: boolean;
  isPaused: boolean;
  isEnded: boolean;
  isCancelled: boolean;
  isArchived: boolean;
}

export type CampaignStatusKey = keyof typeof CAMPAIGN_STATUS;
