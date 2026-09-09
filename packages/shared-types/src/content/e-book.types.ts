import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { E_BOOK_STATUS } from '@vubon/shared-constants/src/content/e-book-status.constants';
import { E_BOOK } from '@vubon/shared-constants/src/content/e-book.constants';

export interface EBookMetadata {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  isbn?: string;
  publisher?: string;
  edition?: number;
  copyrightYear?: number;
}

export interface EBook extends BaseEntity {
  ebookId: string;
  title: string;
  slug: string;
  content: string;
  status: keyof typeof E_BOOK_STATUS | string;
  type: keyof typeof E_BOOK.E_BOOK_TYPES | string;
  authorId: string;
  author: User;
  featuredImage?: string;
  pdfUrl?: string;
  epubUrl?: string;
  mobiUrl?: string;
  pageCount: number;
  wordCount: number;
  viewCount: number;
  downloadCount: number;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: Date;
  metadata: EBookMetadata;
}
