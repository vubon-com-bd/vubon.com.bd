import { BaseEntity } from '../../common/base.types';
import { Money } from '../../common/money.types';
import { FLASH_SALE_PRICE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-price.constants';
import { Product } from '../product/product.types';
import { FlashSale } from './flash-sale.types';

export interface FlashSalePrice extends BaseEntity {
  priceId: string;
  flashSaleId: string;
  flashSale: FlashSale;
  productId: string;
  product: Product;
  type: keyof typeof FLASH_SALE_PRICE.PRICE_TYPES | string;
  originalPrice: Money;
  flashPrice: Money;
  discountAmount: Money;
  discountPercentage: number;
  isActive: boolean;
  isValid: boolean;
  startsAt: Date;
  endsAt: Date;
  metadata: Record<string, unknown>;
}
