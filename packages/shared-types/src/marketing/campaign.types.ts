import { BaseEntity } from '../common/base.types';
import { CAMPAIGN_STATUS } from '@vubon/shared-constants/src/marketing/campaign-status.constants';
import { CAMPAIGN } from '@vubon/shared-constants/src/marketing/campaign.constants';
import { CampaignType } from './campaign-type.types';
import { CampaignChannel } from './campaign-channel.types';
import { CampaignBudget } from './campaign-budget.types';
import { Product } from '../business/product/product.types';
import { Promotion } from './promotion.types';

export interface CampaignMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  bannerImage?: string;
  bannerVideo?: string;
  targetAudience: string[];
  targetLocations: string[];
  targetDevices: string[];
}

export interface Campaign extends BaseEntity {
  campaignId: string;
  name: string;
  slug: string;
  description?: string;
  status: keyof typeof CAMPAIGN_STATUS | string;
  type: CampaignType;
  goal: keyof typeof CAMPAIGN.CAMPAIGN_GOALS | string;
  channels: CampaignChannel[];
  budget: CampaignBudget;
  promotions: Promotion[];
  products: Product[];
  productCount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: Date;
  metadata: CampaignMetadata;
}
