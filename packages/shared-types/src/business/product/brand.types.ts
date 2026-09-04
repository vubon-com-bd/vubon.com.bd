/**
 * Brand Types
 * ব্র্যান্ড সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { BRAND_STATUS } from '@vubon/shared-constants';

export interface Brand extends BaseEntity {
  name: string;
  nameBangla?: string;
  slug: string;
  description?: string;
  descriptionBangla?: string;
  logo?: string;
  coverImage?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: (typeof BRAND_STATUS)[keyof typeof BRAND_STATUS];
  isActive: boolean;
  productCount: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface BrandCreateInput {
  name: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  logo?: string;
  coverImage?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
}

export interface BrandUpdateInput extends Partial<BrandCreateInput> {
  status?: (typeof BRAND_STATUS)[keyof typeof BRAND_STATUS];
}

export interface BrandResponse {
  brand: Brand;
}
