export const VENDOR_PAYOUT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  APPROVED: 'approved',
  PAID: 'paid',
  FAILED: 'failed',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  ON_HOLD: 'on_hold',
} as const;

export type VendorPayoutStatusType =
  (typeof VENDOR_PAYOUT_STATUS)[keyof typeof VENDOR_PAYOUT_STATUS];
