import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { Product } from '../../business/product/product.types';
import { BUNDLE } from '@vubon/shared-constants/src/platform/discovery/bundle.constants';
import { PRODUCT_STATUS } from '@vubon/shared-constants/src/business/product/product-status.constants';

export interface DiscoveryBundleProduct {
  productId: string;
  product: Product;
  quantity: number;
  price: Money;
}

export interface DiscoveryBundle extends BaseEntity {
  bundleId: string;
  name: string;
  description?: string;
  type: keyof typeof BUNDLE.TYPES | string;
  products: DiscoveryBundleProduct[];
  productCount: number;
  originalPrice: Money;
  bundlePrice: Money;
  discount: number;
  discountPercentage: number;
  isActive: boolean;
  isFeatured: boolean;
  status: keyof typeof PRODUCT_STATUS | string;
  validUntil: Date;
  metadata: Record<string, unknown>;
}
