import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { PAGE_STATUS } from '@vubon/shared-constants/src/content/page-status.constants';
import { PAGE } from '@vubon/shared-constants/src/content/page.constants';
import { PageTemplate } from './page-template.types';
import { PageLayout } from './page-layout.types';

export interface PageMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  lastEditedAt?: Date;
  editedBy?: string;
}

export interface Page extends BaseEntity {
  pageId: string;
  title: string;
  slug: string;
  content: string;
  status: keyof typeof PAGE_STATUS | string;
  type: keyof typeof PAGE.PAGE_TYPES | string;
  template: PageTemplate;
  layout: PageLayout;
  authorId: string;
  author: User;
  featuredImage?: string;
  viewCount: number;
  isHomepage: boolean;
  isPublished: boolean;
  isScheduled: boolean;
  scheduledAt?: Date;
  publishedAt?: Date;
  metadata: PageMetadata;
}
