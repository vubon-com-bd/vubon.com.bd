/**
 * Collection Types
 * কালেকশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { COLLECTION_STATUS } from '@vubon/shared-constants';

export interface CollectionProduct {
  productId: string;
  position: number;
  addedAt: Date;
}

export interface Collection extends BaseEntity {
  name: string;
  nameBangla?: string;
  slug: string;
  description?: string;
  descriptionBangla?: string;
  status: (typeof COLLECTION_STATUS)[keyof typeof COLLECTION_STATUS];
  type: 'manual' | 'automated' | 'seasonal' | 'holiday' | 'promotional' | 'curated';
  products: CollectionProduct[];
  image?: string;
  coverImage?: string;
  startDate?: Date;
  endDate?: Date;
  conditions?: {
    type: 'all' | 'any' | 'none';
    rules: {
      field: string;
      operator: string;
      value: unknown;
    }[];
  };
  sortOrder: number;
  isActive: boolean;
  productCount: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface CollectionCreateInput {
  name: string;
  nameBangla?: string;
  description?: string;
  descriptionBangla?: string;
  type: 'manual' | 'automated' | 'seasonal' | 'holiday' | 'promotional' | 'curated';
  products?: string[];
  image?: string;
  coverImage?: string;
  startDate?: Date;
  endDate?: Date;
  conditions?: {
    type: 'all' | 'any' | 'none';
    rules: {
      field: string;
      operator: string;
      value: unknown;
    }[];
  };
  sortOrder?: number;
  isActive?: boolean;
}

export interface CollectionUpdateInput extends Partial<CollectionCreateInput> {
  status?: (typeof COLLECTION_STATUS)[keyof typeof COLLECTION_STATUS];
}

export interface CollectionResponse {
  collection: Collection;
}
