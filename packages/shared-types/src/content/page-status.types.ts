import { StatusObject } from '../common/status.types';
import { PAGE_STATUS } from '@vubon/shared-constants/src/content/page-status.constants';

export interface PageStatus extends StatusObject {
  type: keyof typeof PAGE_STATUS | string;
  category: 'page';
  isDraft: boolean;
  isPublished: boolean;
  isUnpublished: boolean;
  isArchived: boolean;
  isDeleted: boolean;
}

export type PageStatusKey = keyof typeof PAGE_STATUS;
