/**
 * Social Media Marketing Types
 * @module shared-types/marketing
 */

import type {
  SOCIAL_MEDIA_PLATFORM,
  SOCIAL_MEDIA_POST_TYPE,
  SOCIAL_MEDIA_STATUS,
} from '@vubon/shared-constants/marketing';

export type SocialMediaPlatformValue =
  (typeof SOCIAL_MEDIA_PLATFORM)[keyof typeof SOCIAL_MEDIA_PLATFORM];

export type SocialMediaPostTypeValue =
  (typeof SOCIAL_MEDIA_POST_TYPE)[keyof typeof SOCIAL_MEDIA_POST_TYPE];

export type SocialMediaStatusValue = (typeof SOCIAL_MEDIA_STATUS)[keyof typeof SOCIAL_MEDIA_STATUS];

export interface SocialMediaPost {
  readonly id: string;
  readonly platform: SocialMediaPlatformValue;
  readonly type: SocialMediaPostTypeValue;
  readonly status: SocialMediaStatusValue;
  readonly content: string;
  readonly mediaUrls?: readonly string[];
  readonly hashtags?: readonly string[];
  readonly mentions?: readonly string[];
  readonly linkUrl?: string;
  readonly scheduledAt?: string;
  readonly publishedAt?: string;
  readonly platformPostId?: string;
  readonly metrics?: SocialMediaMetrics;
  readonly createdBy: string;
  readonly createdAt: string;
}

export interface SocialMediaMetrics {
  readonly impressions: number;
  readonly reach: number;
  readonly likes: number;
  readonly comments: number;
  readonly shares: number;
  readonly clicks: number;
  readonly engagementRate: number;
}

export interface SocialMediaAccount {
  readonly id: string;
  readonly platform: SocialMediaPlatformValue;
  readonly accountName: string;
  readonly accountId: string;
  readonly isConnected: boolean;
  readonly isActive: boolean;
  readonly lastSyncedAt?: string;
}
