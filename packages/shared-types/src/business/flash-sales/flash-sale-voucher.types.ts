/**
 * Flash Sale Voucher Types
 * ফ্ল্যাশ সেল ভাউচার সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { FLASH_SALE_VOUCHER } from '@vubon/shared-constants';

export interface FlashSaleVoucher extends BaseEntity {
  flashSaleId: string;
  voucherId: string;
  code: string;
  type: (typeof FLASH_SALE_VOUCHER.TYPES)[keyof typeof FLASH_SALE_VOUCHER.TYPES];
  value: number;
  discountType: 'percentage' | 'fixed';
  maxDiscount?: number;
  minOrderAmount?: number;
  description?: string;
  status: (typeof FLASH_SALE_VOUCHER.STATUS)[keyof typeof FLASH_SALE_VOUCHER.STATUS];
  category?: (typeof FLASH_SALE_VOUCHER.CATEGORIES)[keyof typeof FLASH_SALE_VOUCHER.CATEGORIES];
  usageLimit: number;
  usedCount: number;
  perUserLimit: number;
  usedPerUser: number;
  startDate?: Date;
  endDate?: Date;
  metadata?: Record<string, string | number | boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSaleVoucherCreateInput {
  flashSaleId: string;
  voucherId: string;
  code: string;
  type: (typeof FLASH_SALE_VOUCHER.TYPES)[keyof typeof FLASH_SALE_VOUCHER.TYPES];
  value: number;
  discountType: 'percentage' | 'fixed';
  maxDiscount?: number;
  minOrderAmount?: number;
  description?: string;
  category?: (typeof FLASH_SALE_VOUCHER.CATEGORIES)[keyof typeof FLASH_SALE_VOUCHER.CATEGORIES];
  usageLimit?: number;
  perUserLimit?: number;
  startDate?: Date;
  endDate?: Date;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleVoucherUpdateInput {
  status?: (typeof FLASH_SALE_VOUCHER.STATUS)[keyof typeof FLASH_SALE_VOUCHER.STATUS];
  usedCount?: number;
  usedPerUser?: number;
  metadata?: Record<string, string | number | boolean>;
}

export interface FlashSaleVoucherResponse {
  flashSaleVoucher: FlashSaleVoucher;
}
