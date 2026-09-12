import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { CONTENT_STATUS } from '@vubon/shared-constants/src/content/content-status.constants';
import { CONTENT_TYPE } from '@vubon/shared-constants/src/content/content-type.constants';
import { ContentCategory } from './content-category.types';
import { ContentTag } from './content-tag.types';
import { ContentFormat } from './content-format.types';
import { ContentLanguage } from './content-language.types';
import { ContentLicense } from './content-license.types';

export interface ContentMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  readingTime?: number;
  wordCount?: number;
  lastEditedAt?: Date;
  editedBy?: string;
}

export interface Content extends BaseEntity {
  contentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  body: string;
  status: keyof typeof CONTENT_STATUS | string;
  type: keyof typeof CONTENT_TYPE | string;
  categories: ContentCategory[];
  tags: ContentTag[];
  format: ContentFormat;
  language: ContentLanguage;
  license: ContentLicense;
  authorId: string;
  author: User;
  editorId?: string;
  editor?: User;
  featuredImage?: string;
  images: string[];
  attachments: string[];
  viewCount: number;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  isFeatured: boolean;
  isPublished: boolean;
  isScheduled: boolean;
  scheduledAt?: Date;
  publishedAt?: Date;
  metadata: ContentMetadata;
}
