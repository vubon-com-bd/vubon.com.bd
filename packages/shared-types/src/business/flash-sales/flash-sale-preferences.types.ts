import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';

export interface FlashSalePreferences extends BaseEntity {
  preferenceId: string;
  userId: string;
  user: User;
  notifyBeforeSale: boolean;
  notifyOnSaleStart: boolean;
  notifyOnPriceDrop: boolean;
  notifyOnStockAlert: boolean;
  favoriteCategories: string[];
  favoriteBrands: string[];
  maxPrice: number;
  minDiscount: number;
  language: string;
  timezone: string;
  metadata: Record<string, unknown>;
}
