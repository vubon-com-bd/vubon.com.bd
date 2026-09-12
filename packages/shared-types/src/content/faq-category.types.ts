import { BaseEntity } from '../common/base.types';
import { FAQ_CATEGORY } from '@vubon/shared-constants/src/content/faq-category.constants';

export interface FaqCategory extends BaseEntity {
  categoryId: string;
  name: keyof typeof FAQ_CATEGORY.TYPES | string;
  description?: string;
  order: number;
  faqCount: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
