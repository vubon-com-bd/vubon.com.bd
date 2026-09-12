import { BaseEntity } from '../../common/base.types';
import { METRICS } from '@vubon/shared-constants/src/common/types.constants';
import { Product } from './product.types';

export interface BusinessProductAnalytics extends BaseEntity {
  analyticsId: string;
  productId: string;
  product: Product;
  metric: keyof typeof METRICS | string;
  value: number;
  period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export interface ProductPerformance {
  productId: string;
  views: number;
  uniqueViews: number;
  addToCart: number;
  purchases: number;
  revenue: number;
  conversionRate: number;
  averageRating: number;
  reviewCount: number;
  wishlistCount: number;
  shareCount: number;
}
