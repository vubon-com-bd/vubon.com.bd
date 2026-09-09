import { TypeObject } from '../common/types.types';
import { PAGE_TEMPLATE } from '@vubon/shared-constants/src/content/page-template.constants';

export interface PageTemplate extends TypeObject {
  type: keyof typeof PAGE_TEMPLATE.TYPES | string;
  category: keyof typeof PAGE_TEMPLATE.TEMPLATE_CATEGORIES | string;
  isDefault: boolean;
  isFullWidth: boolean;
  hasSidebar: boolean;
  isLanding: boolean;
}

export type PageTemplateKey = keyof typeof PAGE_TEMPLATE.TYPES;
