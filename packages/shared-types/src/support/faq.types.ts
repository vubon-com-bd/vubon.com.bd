import { BaseEntity } from '../common/base.types';
import { SUPPORT_FAQ } from '@vubon/shared-constants/src/support/faq.constants';
import { FAQ_CATEGORY } from '@vubon/shared-constants/src/content/faq-category.constants';

export interface SupportFaq extends BaseEntity {
  faqId: string;
  question: string;
  answer: string;
  status: keyof typeof SUPPORT_FAQ.STATUS | string;
  type: keyof typeof SUPPORT_FAQ.FAQ_TYPES | string;
  category: keyof typeof FAQ_CATEGORY.TYPES | string;
  order: number;
  viewCount: number;
  helpfulCount: number;
  notHelpfulCount: number;
  isActive: boolean;
  isPublished: boolean;
  metadata: Record<string, unknown>;
}
