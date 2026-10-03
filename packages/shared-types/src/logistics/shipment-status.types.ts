/**
 * Shipment Status Value Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/shipment.constants থেকে।
 */

import type { SHIPMENT_STATUS, SHIPMENT_PRIORITY } from '@vubon/shared-constants/logistics';

export type ShipmentStatusValue = (typeof SHIPMENT_STATUS)[keyof typeof SHIPMENT_STATUS];

export type ShipmentPriorityValue = (typeof SHIPMENT_PRIORITY)[keyof typeof SHIPMENT_PRIORITY];

export interface ShipmentStatusMetadata {
  readonly value: ShipmentStatusValue;
  readonly label: string;
  readonly isFinal: boolean;
  readonly isInTransit: boolean;
}
