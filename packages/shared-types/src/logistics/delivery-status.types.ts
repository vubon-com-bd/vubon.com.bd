/**
 * Delivery Status Value Types
 * @module shared-types/logistics
 */

import type { DELIVERY_STATUS, DELIVERY_ATTEMPT_STATUS } from '@vubon/shared-constants/logistics';

export type DeliveryStatusValue = (typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS];

export type DeliveryAttemptStatusValue =
  (typeof DELIVERY_ATTEMPT_STATUS)[keyof typeof DELIVERY_ATTEMPT_STATUS];

export interface DeliveryStatusMetadata {
  readonly value: DeliveryStatusValue;
  readonly label: string;
  readonly isFinal: boolean;
  readonly isSuccessful: boolean;
}
