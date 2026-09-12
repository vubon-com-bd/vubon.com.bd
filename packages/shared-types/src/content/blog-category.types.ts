import { BaseEntity } from '../common/base.types';
import { BLOG_CATEGORY } from '@vubon/shared-constants/src/content/blog-category.constants';

export interface BlogCategory extends BaseEntity {
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  type: keyof typeof BLOG_CATEGORY.TYPES | string;
  parentId?: string;
  parent?: BlogCategory;
  children: BlogCategory[];
  blogCount: number;
  order: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
