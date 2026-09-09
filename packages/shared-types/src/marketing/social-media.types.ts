import { TypeObject } from '../common/types.types';
import { SOCIAL_MEDIA } from '@vubon/shared-constants/src/marketing/social-media.constants';

export interface SocialMedia extends TypeObject {
  type: keyof typeof SOCIAL_MEDIA.TYPES | string;
  category: 'social_media';
  postType: keyof typeof SOCIAL_MEDIA.POST_TYPES | string;
  maxLength: number;
  isFacebook: boolean;
  isInstagram: boolean;
  isTwitter: boolean;
  isLinkedIn: boolean;
  isYouTube: boolean;
  isTikTok: boolean;
  isSnapchat: boolean;
  isPinterest: boolean;
  isWhatsApp: boolean;
  isTelegram: boolean;
  isDiscord: boolean;
  isReddit: boolean;
}

export type SocialMediaKey = keyof typeof SOCIAL_MEDIA.TYPES;
