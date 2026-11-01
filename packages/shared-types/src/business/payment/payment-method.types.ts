/**
 * Payment Method Value Types
 * @module shared-types/business/payment
 *
 * Values আসে shared-constants/business/payment/payment-method.constants থেকে।
 */

import type { PAYMENT_METHOD, PAYMENT_METHOD_TYPE } from '@vubon/shared-constants/business';

export type PaymentMethodValue = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export type PaymentMethodTypeValue = (typeof PAYMENT_METHOD_TYPE)[keyof typeof PAYMENT_METHOD_TYPE];

export interface PaymentMethodMetadata {
  readonly value: PaymentMethodValue;
  readonly label: string;
  readonly type: PaymentMethodTypeValue;
  readonly isOnline: boolean;
  readonly requiresGateway: boolean;
}
