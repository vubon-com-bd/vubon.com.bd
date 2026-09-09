import { BaseEntity } from '../common/base.types';
import { FAQ_STATUS } from '@vubon/shared-constants/src/content/faq-status.constants';
import { FaqCategory } from './faq-category.types';

export interface Faq extends BaseEntity {
  faqId: string;
  question: string;
  answer: string;
  status: keyof typeof FAQ_STATUS | string;
  category: FaqCategory;
  order: number;
  isActive: boolean;
  isPublished: boolean;
  viewCount: number;
  helpfulCount: number;
  notHelpfulCount: number;
  metadata: Record<string, unknown>;
}
