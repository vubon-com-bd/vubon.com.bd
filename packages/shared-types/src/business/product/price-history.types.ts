import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { PRICE_HISTORY } from '@vubon/shared-constants/src/business/product/price-history.constants';
import { Product } from './product.types';
import { Variant } from './variant.types';

export interface PriceHistory extends BaseEntity {
  historyId: string;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: Variant;
  type: keyof typeof PRICE_HISTORY.TYPES | string;
  oldPrice: Money;
  newPrice: Money;
  changedBy: string;
  reason: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
