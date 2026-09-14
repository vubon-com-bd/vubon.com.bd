/**
 * Flash Sale Voucher Types
 * @module shared-types/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sales/flash-sale-voucher.constants থেকে।
 */

import type {
  FLASH_SALE_VOUCHER_TYPE,
  FLASH_SALE_VOUCHER_STATUS,
} from '@vubon/shared-constants/business';
import type { Money } from '../../common/primitives';

export type FlashSaleVoucherTypeValue =
  (typeof FLASH_SALE_VOUCHER_TYPE)[keyof typeof FLASH_SALE_VOUCHER_TYPE];

export type FlashSaleVoucherStatusValue =
  (typeof FLASH_SALE_VOUCHER_STATUS)[keyof typeof FLASH_SALE_VOUCHER_STATUS];

export interface FlashSaleVoucher {
  readonly id: string;
  readonly flashSaleId: string;
  readonly code: string;
  readonly type: FlashSaleVoucherTypeValue;
  readonly status: FlashSaleVoucherStatusValue;
  readonly amount: Money;
  readonly currency: string;
  readonly maxUses: number;
  readonly usedCount: number;
  readonly expiresAt: string;
  readonly partialRedeemAllowed: boolean;
  readonly createdAt: string;
}

export interface FlashSaleVoucherRedeemResult {
  readonly success: boolean;
  readonly voucherId?: string;
  readonly redeemedAmount?: Money;
  readonly remainingAmount?: Money;
  readonly reason?: string;
}
