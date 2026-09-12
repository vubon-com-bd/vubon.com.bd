import { StatusObject } from '../common/status.types';
import { FAQ_STATUS } from '@vubon/shared-constants/src/content/faq-status.constants';

export interface FaqStatus extends StatusObject {
  type: keyof typeof FAQ_STATUS | string;
  category: 'faq';
  isDraft: boolean;
  isPublished: boolean;
  isArchived: boolean;
}

export type FaqStatusKey = keyof typeof FAQ_STATUS;
