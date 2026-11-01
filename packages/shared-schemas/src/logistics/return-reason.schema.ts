/**
 * Return Reason Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/return-shipment.constants থেকে।
 */

import { z } from 'zod';
import {
  RETURN_SHIPMENT_STATUS,
  RETURN_SHIPMENT_TYPE,
  RETURN_SHIPMENT_REASON,
} from '@vubon/shared-constants/logistics';

export const ReturnShipmentStatusSchema = z.enum(
  Object.values(RETURN_SHIPMENT_STATUS) as [string, ...string[]]
);

export const ReturnShipmentTypeSchema = z.enum(
  Object.values(RETURN_SHIPMENT_TYPE) as [string, ...string[]]
);

export const ReturnReasonSchema = z.enum(
  Object.values(RETURN_SHIPMENT_REASON) as [string, ...string[]]
);

export type ReturnShipmentStatusSchemaType = z.infer<typeof ReturnShipmentStatusSchema>;
export type ReturnShipmentTypeSchemaType = z.infer<typeof ReturnShipmentTypeSchema>;
export type ReturnReasonSchemaType = z.infer<typeof ReturnReasonSchema>;
