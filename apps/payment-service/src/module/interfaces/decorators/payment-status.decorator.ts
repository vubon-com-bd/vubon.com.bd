/**
 * @PaymentStatus(...statuses) — restrict route to specific payment statuses
 * @module payment-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';
import type { PaymentStatusValue } from '@vubon/shared-types/business/payment';

export const PAYMENT_STATUS_METADATA_KEY = 'paymentStatus';

export const PaymentStatus = (
  ...statuses: readonly (PaymentStatusValue | string)[]
): MethodDecorator & ClassDecorator =>
  SetMetadata(PAYMENT_STATUS_METADATA_KEY, statuses);
