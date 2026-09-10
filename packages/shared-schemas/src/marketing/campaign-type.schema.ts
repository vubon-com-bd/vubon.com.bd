import { z } from 'zod';
import { CAMPAIGN_TYPE } from '@vubon/shared-constants/src/marketing/campaign-type.constants';

const campaignTypeKeys = Object.keys(CAMPAIGN_TYPE.TYPES) as [string, ...string[]];
const campaignCategoryKeys = Object.keys(CAMPAIGN_TYPE.CAMPAIGN_CATEGORIES) as [
  string,
  ...string[],
];

export const CampaignTypeSchema = z.object({
  type: z.enum(campaignTypeKeys),
  category: z.enum(campaignCategoryKeys),
  isSeasonal: z.boolean().default(false),
  isHoliday: z.boolean().default(false),
  isProductLaunch: z.boolean().default(false),
  isBrandAwareness: z.boolean().default(false),
  isRetargeting: z.boolean().default(false),
  isAcquisition: z.boolean().default(false),
  isRetention: z.boolean().default(false),
  isReferral: z.boolean().default(false),
  isLoyalty: z.boolean().default(false),
  isFlashSale: z.boolean().default(false),
  isClearance: z.boolean().default(false),
  isSocialMedia: z.boolean().default(false),
  isEmail: z.boolean().default(false),
  isSms: z.boolean().default(false),
  isInfluencer: z.boolean().default(false),
  isContent: z.boolean().default(false),
  isEvent: z.boolean().default(false),
  isCustom: z.boolean().default(false),
});

export const CampaignTypeEnumSchema = z.enum(campaignTypeKeys);
