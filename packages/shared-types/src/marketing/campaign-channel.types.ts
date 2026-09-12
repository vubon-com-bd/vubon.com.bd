import { TypeObject } from '../common/types.types';
import { CAMPAIGN_CHANNEL } from '@vubon/shared-constants/src/marketing/campaign-channel.constants';

export interface CampaignChannel extends TypeObject {
  type: keyof typeof CAMPAIGN_CHANNEL.TYPES | string;
  category: keyof typeof CAMPAIGN_CHANNEL.CHANNEL_CATEGORIES | string;
  isEmail: boolean;
  isSms: boolean;
  isWhatsApp: boolean;
  isFacebook: boolean;
  isInstagram: boolean;
  isTwitter: boolean;
  isLinkedIn: boolean;
  isYouTube: boolean;
  isTikTok: boolean;
  isSnapchat: boolean;
  isGoogleAds: boolean;
  isFacebookAds: boolean;
  isInstagramAds: boolean;
  isTikTokAds: boolean;
  isYouTubeAds: boolean;
  isDisplayAds: boolean;
  isNativeAds: boolean;
  isAffiliate: boolean;
  isInfluencer: boolean;
  isContent: boolean;
  isSeo: boolean;
  isPpc: boolean;
}

export type CampaignChannelKey = keyof typeof CAMPAIGN_CHANNEL.TYPES;
