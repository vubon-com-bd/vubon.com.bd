import { z } from 'zod';
import { SOCIAL_MEDIA } from '@vubon/shared-constants/src/marketing/social-media.constants';

const socialMediaTypeKeys = Object.keys(SOCIAL_MEDIA.TYPES) as [string, ...string[]];
const socialMediaPostTypeKeys = Object.keys(SOCIAL_MEDIA.POST_TYPES) as [string, ...string[]];

export const SocialMediaSchema = z.object({
  platform: z.enum(socialMediaTypeKeys),
  category: z.literal('social_media'),
  postType: z.enum(socialMediaPostTypeKeys),
  maxLength: z.number().int().min(0),
  isFacebook: z.boolean().default(false),
  isInstagram: z.boolean().default(false),
  isTwitter: z.boolean().default(false),
  isLinkedIn: z.boolean().default(false),
  isYouTube: z.boolean().default(false),
  isTikTok: z.boolean().default(false),
  isSnapchat: z.boolean().default(false),
  isPinterest: z.boolean().default(false),
  isWhatsApp: z.boolean().default(false),
  isTelegram: z.boolean().default(false),
  isDiscord: z.boolean().default(false),
  isReddit: z.boolean().default(false),
});

export const SocialMediaEnumSchema = z.enum(socialMediaTypeKeys);
