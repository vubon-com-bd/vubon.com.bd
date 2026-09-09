import { BaseEntity } from '../../common/base.types';
import { Product } from '../../business/product/product.types';
import { PRODUCT_ANALYTICS } from '@vubon/shared-constants/src/platform/analytics/product-analytics.constants';

export interface ProductAnalytics extends BaseEntity {
  analyticsId: string;
  productId: string;
  product: Product;
  type: keyof typeof PRODUCT_ANALYTICS.TYPES | string;
  metric: keyof typeof PRODUCT_ANALYTICS.METRICS | string;
  value: number;
  indicator: keyof typeof PRODUCT_ANALYTICS.PERFORMANCE_INDICATORS | string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
