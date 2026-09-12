import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { BLOG_STATUS } from '@vubon/shared-constants/src/content/blog-status.constants';
import { BLOG } from '@vubon/shared-constants/src/content/blog.constants';
import { BlogCategory } from './blog-category.types';
import { BlogTag } from './blog-tag.types';

export interface BlogMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  lastEditedAt?: Date;
  editedBy?: string;
}

export interface Blog extends BaseEntity {
  blogId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: keyof typeof BLOG_STATUS | string;
  type: keyof typeof BLOG.BLOG_TYPES | string;
  categories: BlogCategory[];
  tags: BlogTag[];
  authorId: string;
  author: User;
  featuredImage?: string;
  images: string[];
  readingTime: number;
  wordCount: number;
  viewCount: number;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  isFeatured: boolean;
  isPublished: boolean;
  isScheduled: boolean;
  scheduledAt?: Date;
  publishedAt?: Date;
  metadata: BlogMetadata;
}
