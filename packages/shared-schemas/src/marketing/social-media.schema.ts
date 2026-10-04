/**
 * Social Media Marketing Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/social-media.constants থেকে।
 */

import { z } from 'zod';
import {
  SOCIAL_MEDIA_PLATFORM,
  SOCIAL_MEDIA_POST_TYPE,
  SOCIAL_MEDIA_STATUS,
  SOCIAL_MEDIA,
} from '@vubon/shared-constants/marketing';

export const SocialMediaPlatformSchema = z.enum(
  Object.values(SOCIAL_MEDIA_PLATFORM) as [string, ...string[]]
);

export const SocialMediaPostTypeSchema = z.enum(
  Object.values(SOCIAL_MEDIA_POST_TYPE) as [string, ...string[]]
);

export const SocialMediaStatusSchema = z.enum(
  Object.values(SOCIAL_MEDIA_STATUS) as [string, ...string[]]
);

export const SocialMediaMetricsSchema = z.object({
  impressions: z.number().int().nonnegative(),
  reach: z.number().int().nonnegative(),
  likes: z.number().int().nonnegative(),
  comments: z.number().int().nonnegative(),
  shares: z.number().int().nonnegative(),
  clicks: z.number().int().nonnegative(),
  engagementRate: z.number().min(0).max(1),
});

export const SocialMediaPostSchema = z.object({
  id: z.string().min(1),
  platform: SocialMediaPlatformSchema,
  type: SocialMediaPostTypeSchema,
  status: SocialMediaStatusSchema,
  content: z.string().min(1).max(SOCIAL_MEDIA.CAPTION_MAX_LENGTH),
  mediaUrls: z.array(z.string().url()).max(10).optional(),
  hashtags: z.array(z.string().max(100)).max(SOCIAL_MEDIA.HASHTAG_MAX_COUNT).optional(),
  mentions: z.array(z.string().max(100)).max(SOCIAL_MEDIA.MENTION_MAX_COUNT).optional(),
  linkUrl: z.string().url().optional(),
  scheduledAt: z.string().datetime().optional(),
  publishedAt: z.string().datetime().optional(),
  platformPostId: z.string().max(255).optional(),
  metrics: SocialMediaMetricsSchema.optional(),
  createdBy: z.string().min(1),
  createdAt: z.string().datetime(),
});

export const SocialMediaAccountSchema = z.object({
  id: z.string().min(1),
  platform: SocialMediaPlatformSchema,
  accountName: z.string().min(1).max(200),
  accountId: z.string().min(1).max(255),
  isConnected: z.boolean(),
  isActive: z.boolean(),
  lastSyncedAt: z.string().datetime().optional(),
});

export type SocialMediaPlatformSchemaType = z.infer<typeof SocialMediaPlatformSchema>;
export type SocialMediaPostTypeSchemaType = z.infer<typeof SocialMediaPostTypeSchema>;
export type SocialMediaStatusSchemaType = z.infer<typeof SocialMediaStatusSchema>;
export type SocialMediaPostSchemaType = z.infer<typeof SocialMediaPostSchema>;
export type SocialMediaAccountSchemaType = z.infer<typeof SocialMediaAccountSchema>;
