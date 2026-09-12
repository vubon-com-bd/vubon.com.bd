import { StatusObject } from '../common/status.types';
import { E_BOOK_STATUS } from '@vubon/shared-constants/src/content/e-book-status.constants';

export interface EBookStatus extends StatusObject {
  type: keyof typeof E_BOOK_STATUS | string;
  category: 'ebook';
  isDraft: boolean;
  isPublished: boolean;
  isArchived: boolean;
}

export type EBookStatusKey = keyof typeof E_BOOK_STATUS;
