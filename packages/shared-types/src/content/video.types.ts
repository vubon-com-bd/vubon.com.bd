import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { VIDEO_STATUS } from '@vubon/shared-constants/src/content/video-status.constants';
import { CONTENT_VIDEO } from '@vubon/shared-constants/src/content/content-video.constants';
import { Media } from './media.types';

export interface VideoMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  captions?: string;
  transcript?: string;
  tags: string[];
}

export interface Video extends BaseEntity {
  videoId: string;
  title: string;
  slug: string;
  description?: string;
  url: string;
  thumbnail?: string;
  status: keyof typeof VIDEO_STATUS | string;
  type: keyof typeof CONTENT_VIDEO.VIDEO_TYPES | string;
  duration: number;
  width: number;
  height: number;
  size: number;
  format: string;
  uploadedBy: string;
  uploadedByUser: User;
  media?: Media;
  viewCount: number;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: Date;
  metadata: VideoMetadata;
}
