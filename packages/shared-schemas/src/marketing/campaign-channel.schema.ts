import { z } from 'zod';
import { CAMPAIGN_CHANNEL } from '@vubon/shared-constants/src/marketing/campaign-channel.constants';

const campaignChannelTypeKeys = Object.keys(CAMPAIGN_CHANNEL.TYPES) as [string, ...string[]];
const campaignChannelCategoryKeys = Object.keys(CAMPAIGN_CHANNEL.CHANNEL_CATEGORIES) as [
  string,
  ...string[],
];

export const CampaignChannelSchema = z.object({
  channel: z.enum(campaignChannelTypeKeys),
  category: z.enum(campaignChannelCategoryKeys),
  isEmail: z.boolean().default(false),
  isSms: z.boolean().default(false),
  isWhatsApp: z.boolean().default(false),
  isFacebook: z.boolean().default(false),
  isInstagram: z.boolean().default(false),
  isTwitter: z.boolean().default(false),
  isLinkedIn: z.boolean().default(false),
  isYouTube: z.boolean().default(false),
  isTikTok: z.boolean().default(false),
  isSnapchat: z.boolean().default(false),
  isGoogleAds: z.boolean().default(false),
  isFacebookAds: z.boolean().default(false),
  isInstagramAds: z.boolean().default(false),
  isTikTokAds: z.boolean().default(false),
  isYouTubeAds: z.boolean().default(false),
  isDisplayAds: z.boolean().default(false),
  isNativeAds: z.boolean().default(false),
  isAffiliate: z.boolean().default(false),
  isInfluencer: z.boolean().default(false),
  isContent: z.boolean().default(false),
  isSeo: z.boolean().default(false),
  isPpc: z.boolean().default(false),
});

export const CampaignChannelEnumSchema = z.enum(campaignChannelTypeKeys);
