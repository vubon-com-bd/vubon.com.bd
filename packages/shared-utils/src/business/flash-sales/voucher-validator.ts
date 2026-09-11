import { FLASH_SALE_VOUCHER } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-voucher.constants';

export interface VoucherInput {
  userId: string;
  code: string;
  status: string;
}

export const validateVoucher = (
  voucher: Partial<VoucherInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!voucher.userId) errors.push('User ID is required');
  if (!voucher.code) errors.push('Voucher code is required');
  if (voucher.status && !Object.keys(FLASH_SALE_VOUCHER.STATUS).includes(voucher.status)) {
    errors.push('Invalid voucher status');
  }
  return { isValid: errors.length === 0, errors };
};
