import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { WHITE_PAPER_STATUS } from '@vubon/shared-constants/src/content/white-paper-status.constants';
import { WHITE_PAPER } from '@vubon/shared-constants/src/content/white-paper.constants';

export interface WhitePaperMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  industry?: string;
  researchDate?: Date;
  version: number;
}

export interface WhitePaper extends BaseEntity {
  whitePaperId: string;
  title: string;
  slug: string;
  content: string;
  status: keyof typeof WHITE_PAPER_STATUS | string;
  type: keyof typeof WHITE_PAPER.WHITE_PAPER_TYPES | string;
  authorId: string;
  author: User;
  featuredImage?: string;
  pdfUrl?: string;
  wordCount: number;
  viewCount: number;
  downloadCount: number;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: Date;
  metadata: WhitePaperMetadata;
}
