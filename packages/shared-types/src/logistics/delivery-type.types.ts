/**
 * Delivery Type Value Types
 * @module shared-types/logistics
 */

import type { DELIVERY_TYPE } from '@vubon/shared-constants/logistics';

export type DeliveryTypeValue = (typeof DELIVERY_TYPE)[keyof typeof DELIVERY_TYPE];

export interface DeliveryTypeMetadata {
  readonly value: DeliveryTypeValue;
  readonly label: string;
  readonly isPickupPoint: boolean;
  readonly requiresSignature: boolean;
}
