import { TypeObject } from '../common/types.types';
import { CAMPAIGN_TYPE } from '@vubon/shared-constants/src/marketing/campaign-type.constants';

export interface CampaignType extends TypeObject {
  type: keyof typeof CAMPAIGN_TYPE.TYPES | string;
  category: keyof typeof CAMPAIGN_TYPE.CAMPAIGN_CATEGORIES | string;
  isSeasonal: boolean;
  isHoliday: boolean;
  isProductLaunch: boolean;
  isBrandAwareness: boolean;
  isRetargeting: boolean;
  isAcquisition: boolean;
  isRetention: boolean;
  isReferral: boolean;
  isLoyalty: boolean;
  isFlashSale: boolean;
  isClearance: boolean;
  isSocialMedia: boolean;
  isEmail: boolean;
  isSms: boolean;
  isInfluencer: boolean;
  isContent: boolean;
  isEvent: boolean;
  isCustom: boolean;
}

export type CampaignTypeKey = keyof typeof CAMPAIGN_TYPE.TYPES;
