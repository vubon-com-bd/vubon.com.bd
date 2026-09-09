import { BaseEntity } from '../../common/base.types';
import { FLASH_SALE_SHARE } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-share.constants';
import { FlashSale } from './flash-sale.types';
import { User } from '../../user/user.types';

export interface FlashSaleShare extends BaseEntity {
  shareId: string;
  flashSaleId: string;
  flashSale: FlashSale;
  userId: string;
  user: User;
  type: keyof typeof FLASH_SALE_SHARE.TYPES | string;
  platform: keyof typeof FLASH_SALE_SHARE.SOCIAL_MEDIA | string;
  url: string;
  shareAt: Date;
  clicks: number;
  shares: number;
  metadata: Record<string, unknown>;
}
