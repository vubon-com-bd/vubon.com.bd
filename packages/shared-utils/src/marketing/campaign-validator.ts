import { CAMPAIGN_STATUS } from '@vubon/shared-constants/src/marketing/campaign-status.constants';
import { CAMPAIGN } from '@vubon/shared-constants/src/marketing/campaign.constants';

export interface CampaignInput {
  name: string;
  slug: string;
  status: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export const validateCampaign = (
  campaign: Partial<CampaignInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!campaign.name) errors.push('Campaign name is required');
  if (!campaign.slug) errors.push('Campaign slug is required');
  if (campaign.status && !Object.keys(CAMPAIGN_STATUS).includes(campaign.status)) {
    errors.push('Invalid campaign status');
  }
  if (campaign.goal && !Object.keys(CAMPAIGN.CAMPAIGN_GOALS).includes(campaign.goal)) {
    errors.push('Invalid campaign goal');
  }
  if (
    campaign.startDate &&
    campaign.endDate &&
    new Date(campaign.startDate) > new Date(campaign.endDate)
  ) {
    errors.push('Start date must be before end date');
  }
  return { isValid: errors.length === 0, errors };
};

export const isCampaignLive = (campaign: CampaignInput): boolean => {
  const now = new Date();
  return (
    campaign.isActive &&
    campaign.status === 'live' &&
    now >= campaign.startDate &&
    now <= campaign.endDate
  );
};
