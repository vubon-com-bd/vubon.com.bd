import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { PODCAST_STATUS } from '@vubon/shared-constants/src/content/podcast-status.constants';
import { PODCAST } from '@vubon/shared-constants/src/content/podcast.constants';
import { Media } from './media.types';

export interface PodcastMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  transcript?: string;
  tags: string[];
  season?: number;
  episode?: number;
}

export interface Podcast extends BaseEntity {
  podcastId: string;
  title: string;
  slug: string;
  description?: string;
  audioUrl: string;
  coverImage?: string;
  status: keyof typeof PODCAST_STATUS | string;
  type: keyof typeof PODCAST.PODCAST_TYPES | string;
  duration: number;
  size: number;
  format: string;
  uploadedBy: string;
  uploadedByUser: User;
  media?: Media;
  playCount: number;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: Date;
  metadata: PodcastMetadata;
}
