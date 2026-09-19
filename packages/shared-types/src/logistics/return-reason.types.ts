/**
 * Return Reason Value Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/return-shipment.constants থেকে।
 */

import type {
  RETURN_SHIPMENT_STATUS,
  RETURN_SHIPMENT_TYPE,
  RETURN_SHIPMENT_REASON,
} from '@vubon/shared-constants/logistics';

export type ReturnShipmentStatusValue =
  (typeof RETURN_SHIPMENT_STATUS)[keyof typeof RETURN_SHIPMENT_STATUS];

export type ReturnShipmentTypeValue =
  (typeof RETURN_SHIPMENT_TYPE)[keyof typeof RETURN_SHIPMENT_TYPE];

export type ReturnReasonValue =
  (typeof RETURN_SHIPMENT_REASON)[keyof typeof RETURN_SHIPMENT_REASON];

export interface ReturnReasonMetadata {
  readonly value: ReturnReasonValue;
  readonly label: string;
  readonly requiresPhotos: boolean;
  readonly restockable: boolean;
}
