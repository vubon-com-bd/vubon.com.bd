import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { BUNDLE_DEAL } from '@vubon/shared-constants/src/business/flash-sales/bundle-deal.constants';
import { Product } from '../product/product.types';
import { Deal } from './deal.types';

export interface BundleProduct {
  productId: string;
  product: Product;
  quantity: number;
  price: Money;
}

export interface BundleDeal extends BaseEntity {
  bundleDealId: string;
  dealId: string;
  deal: Deal;
  status: keyof typeof BUNDLE_DEAL.STATUS | string;
  type: keyof typeof BUNDLE_DEAL.TYPES | string;
  products: BundleProduct[];
  productCount: number;
  originalPrice: Money;
  bundlePrice: Money;
  discountAmount: Money;
  discountPercentage: number;
  minPurchaseAmount?: Money;
  maxPurchaseAmount?: Money;
  availableQuantity: number;
  soldQuantity: number;
  isActive: boolean;
  isSoldOut: boolean;
  metadata: Record<string, unknown>;
}
