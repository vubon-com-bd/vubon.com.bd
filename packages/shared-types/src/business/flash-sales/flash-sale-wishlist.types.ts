import { BaseEntity } from '../../common/base.types';
import { FLASH_SALE_WISHLIST } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-wishlist.constants';
import { FlashSale } from './flash-sale.types';
import { User } from '../../user/user.types';
import { Product } from '../product/product.types';

export interface FlashSaleWishlist extends BaseEntity {
  wishlistId: string;
  flashSaleId: string;
  flashSale: FlashSale;
  userId: string;
  user: User;
  productId: string;
  product: Product;
  status: keyof typeof FLASH_SALE_WISHLIST.STATUS | string;
  type: keyof typeof FLASH_SALE_WISHLIST.WISHLIST_TYPES | string;
  addedAt: Date;
  removedAt?: Date;
  notifiedAt?: Date;
  metadata: Record<string, unknown>;
}
