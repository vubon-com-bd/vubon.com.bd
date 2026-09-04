/**
 * Category Types
 * ক্যাটাগরি সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { CATEGORY_STATUS } from '@vubon/shared-constants';

export interface Category extends BaseEntity {
  name: string;
  nameBangla?: string;
  slug: string;
  description?: string;
  descriptionBangla?: string;
  parentId?: string;
  status: (typeof CATEGORY_STATUS)[keyof typeof CATEGORY_STATUS];
  sortOrder: number;
  image?: string;
  icon?: string;
  isActive: boolean;
  children?: Category[];
  productCount: number;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface CategoryCreateInput {
  name: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  parentId?: string;
  sortOrder?: number;
  image?: string;
  icon?: string;
  isActive?: boolean;
}

export interface CategoryUpdateInput extends Partial<CategoryCreateInput> {
  status?: (typeof CATEGORY_STATUS)[keyof typeof CATEGORY_STATUS];
}

export interface CategoryResponse {
  category: Category;
}
