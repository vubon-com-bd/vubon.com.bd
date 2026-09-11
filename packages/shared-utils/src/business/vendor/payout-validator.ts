import { VENDOR_PAYOUT } from '@vubon/shared-constants/src/business/vendor/vendor-payout.constants';

export interface PayoutInput {
  vendorId: string;
  amount: number;
  status: string;
}

export const validatePayout = (
  payout: Partial<PayoutInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!payout.vendorId) errors.push('Vendor ID is required');
  if (payout.amount !== undefined && payout.amount < 0) {
    errors.push('Amount cannot be negative');
  }
  if (payout.status && !Object.keys(VENDOR_PAYOUT.STATUS).includes(payout.status)) {
    errors.push('Invalid payout status');
  }
  return { isValid: errors.length === 0, errors };
};
