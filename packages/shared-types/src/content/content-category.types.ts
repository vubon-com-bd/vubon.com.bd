import { BaseEntity } from '../common/base.types';
import { CONTENT_CATEGORY } from '@vubon/shared-constants/src/content/content-category.constants';

export interface ContentCategory extends BaseEntity {
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  type: keyof typeof CONTENT_CATEGORY.TYPES | string;
  parentId?: string;
  parent?: ContentCategory;
  children: ContentCategory[];
  contentCount: number;
  order: number;
  icon?: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
