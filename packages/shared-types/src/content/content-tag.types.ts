import { BaseEntity } from '../common/base.types';
import { CONTENT_TAG } from '@vubon/shared-constants/src/content/content-tag.constants';

export interface ContentTag extends BaseEntity {
  tagId: string;
  name: string;
  slug: string;
  type: keyof typeof CONTENT_TAG.TYPES | string;
  contentCount: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
