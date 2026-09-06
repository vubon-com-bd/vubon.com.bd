/**
 * Flash Sale Voucher Endpoints
 * ফ্ল্যাশ সেল ভাউচার সম্পর্কিত এন্ডপয়েন্ট
 */

import { baseEndpoints } from '../../common';
import { HTTP_STATUS } from '@vubon/shared-constants';
import { FLASH_VOUCHER } from '@vubon/shared-constants';
import type { FlashSaleVoucher } from '@vubon/shared-types';

export const flashSaleVoucherEndpoints = {
  list: (flashSaleId: string) => `/flash-sales/${flashSaleId}/vouchers`,
  create: (flashSaleId: string) => `/flash-sales/${flashSaleId}/vouchers`,
  update: (id: string) => `/flash-sales/vouchers/${id}`,
  delete: (id: string) => `/flash-sales/vouchers/${id}`,
  get: (id: string) => `/flash-sales/vouchers/${id}`,
  validate: '/flash-sales/vouchers/validate',
} as const;

export type FlashSaleVoucherEndpointKey = keyof typeof flashSaleVoucherEndpoints;
