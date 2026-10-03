/**
 * Shipment Type Value Types
 * @module shared-types/logistics
 */

import type { SHIPMENT_TYPE } from '@vubon/shared-constants/logistics';

export type ShipmentTypeValue = (typeof SHIPMENT_TYPE)[keyof typeof SHIPMENT_TYPE];

export interface ShipmentTypeMetadata {
  readonly value: ShipmentTypeValue;
  readonly label: string;
  readonly isInternational: boolean;
  readonly defaultDeliveryDays: number;
}
