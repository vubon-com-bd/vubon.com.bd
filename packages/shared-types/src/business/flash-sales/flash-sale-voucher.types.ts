import { BaseEntity } from '../../common/base.types';
import { FLASH_SALE_VOUCHER } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-voucher.constants';
import { FlashSale } from './flash-sale.types';
import { User } from '../../user/user.types';

export interface FlashSaleVoucher extends BaseEntity {
  voucherId: string;
  flashSaleId: string;
  flashSale: FlashSale;
  userId: string;
  user: User;
  code: string;
  status: keyof typeof FLASH_SALE_VOUCHER.STATUS | string;
  type: keyof typeof FLASH_SALE_VOUCHER.TYPES | string;
  value: number;
  isUsed: boolean;
  usedAt?: Date;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
