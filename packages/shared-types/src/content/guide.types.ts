import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { GUIDE_STATUS } from '@vubon/shared-constants/src/content/guide-status.constants';
import { GUIDE } from '@vubon/shared-constants/src/content/guide.constants';

export interface GuideMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  lastUpdatedAt?: Date;
  version: number;
}

export interface Guide extends BaseEntity {
  guideId: string;
  title: string;
  slug: string;
  content: string;
  status: keyof typeof GUIDE_STATUS | string;
  type: keyof typeof GUIDE.GUIDE_TYPES | string;
  authorId: string;
  author: User;
  featuredImage?: string;
  readingTime: number;
  wordCount: number;
  viewCount: number;
  likeCount: number;
  shareCount: number;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: Date;
  metadata: GuideMetadata;
}
