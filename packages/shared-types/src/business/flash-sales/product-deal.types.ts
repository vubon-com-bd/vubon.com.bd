import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { PRODUCT_DEAL } from '@vubon/shared-constants/src/business/flash-sales/product-deal.constants';
import { Product } from '../product/product.types';
import { Variant } from '../product/variant.types';
import { Deal } from './deal.types';

export interface ProductDeal extends BaseEntity {
  productDealId: string;
  dealId: string;
  deal: Deal;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: Variant;
  status: keyof typeof PRODUCT_DEAL.STATUS | string;
  originalPrice: Money;
  dealPrice: Money;
  discountAmount: Money;
  discountPercentage: number;
  minQuantity: number;
  maxQuantity: number;
  availableQuantity: number;
  soldQuantity: number;
  isActive: boolean;
  isSoldOut: boolean;
  metadata: Record<string, unknown>;
}
