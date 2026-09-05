/**
 * Comparison Types
 * তুলনা সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { PRODUCT } from '@vubon/shared-constants';

export interface ComparisonItem {
  productId: string;
  attributes: Record<string, string | number | boolean>;
  addedAt: Date;
}

export interface Comparison extends BaseEntity {
  userId: string;
  user: User;
  name?: string;
  items: ComparisonItem[];
  isPublic: boolean;
  shareToken?: string;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComparisonCreateInput {
  name?: string;
  productIds: string[];
  isPublic?: boolean;
}

export type ComparisonUpdateInput = Partial<ComparisonCreateInput>;

export interface ComparisonResponse {
  comparison: Comparison;
}

// Constants from PRODUCT
export const COMPARISON_CONSTANTS = {
  MAX_ITEMS: PRODUCT.COMPARISON.MAX_ITEMS,
  DEFAULT_ITEMS: PRODUCT.COMPARISON.DEFAULT_ITEMS,
  MAX_ATTRIBUTES: PRODUCT.COMPARISON.MAX_ATTRIBUTES,
  SHARE_EXPIRY: PRODUCT.COMPARISON.SHARE_EXPIRY,
};
