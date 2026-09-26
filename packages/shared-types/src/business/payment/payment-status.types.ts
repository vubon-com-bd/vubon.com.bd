/**
 * Payment Status Value Types
 * @module shared-types/business/payment
 *
 * Values আসে shared-constants/business/payment/payment-status.constants থেকে।
 */

import type { PAYMENT_STATUS } from '@vubon/shared-constants/business';

export type PaymentStatusValue = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export interface PaymentStatusMetadata {
  readonly value: PaymentStatusValue;
  readonly label: string;
  readonly isSuccessful: boolean;
  readonly isFinal: boolean;
}
