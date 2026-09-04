/**
 * Comparison Types
 * তুলনা সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';

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

export interface ComparisonUpdateInput extends Partial<ComparisonCreateInput> {
  productIds?: string[];
}

export interface ComparisonResponse {
  comparison: Comparison;
}
