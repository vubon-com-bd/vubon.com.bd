import { BaseEntity } from '../common/base.types';
import { BLOG_TAG } from '@vubon/shared-constants/src/content/blog-tag.constants';

export interface BlogTag extends BaseEntity {
  tagId: string;
  name: string;
  slug: string;
  type: keyof typeof BLOG_TAG.TYPES | string;
  blogCount: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
