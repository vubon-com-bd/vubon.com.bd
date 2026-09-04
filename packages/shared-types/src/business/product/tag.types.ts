/**
 * Tag Types
 * ট্যাগ সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';

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

// Remove empty interface - সরাসরি Partial<TagCreateInput> ব্যবহার করা যেতে পারে
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
