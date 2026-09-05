/**
 * Tag Types
 * ট্যাগ সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { PRODUCT } from '@vubon/shared-constants';

export interface Tag extends BaseEntity {
  name: string;
  nameBangla?: string;
  slug: string;
  description?: string;
  isActive: boolean;
  productCount: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface TagCreateInput {
  name: string;
  nameBangla?: string;
  description?: string;
  isActive?: boolean;
}

export type TagUpdateInput = Partial<TagCreateInput>;

export interface TagResponse {
  tag: Tag;
}

export interface TagBulkCreateInput {
  tags: string[];
  isActive?: boolean;
}

export interface TagBulkResponse {
  created: Tag[];
  existing: Tag[];
  failed: {
    name: string;
    reason: string;
  }[];
}

// Constants from PRODUCT
export const TAG_CONSTANTS = {
  MAX_TAGS_PER_PRODUCT: PRODUCT.TAG.MAX_TAGS_PER_PRODUCT,
  MAX_TAGS_PER_BULK: PRODUCT.TAG.MAX_TAGS_PER_BULK,
  MIN_LENGTH: PRODUCT.TAG.MIN_LENGTH,
  MAX_LENGTH: PRODUCT.TAG.MAX_LENGTH,
  ALLOWED_CHARS: PRODUCT.TAG.ALLOWED_CHARS,
};
