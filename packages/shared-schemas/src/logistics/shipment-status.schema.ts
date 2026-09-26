/**
 * Shipment Status Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/shipment.constants থেকে।
 */

import { z } from 'zod';
import { SHIPMENT_STATUS, SHIPMENT_PRIORITY } from '@vubon/shared-constants/logistics';

export const ShipmentStatusSchema = z.enum(Object.values(SHIPMENT_STATUS) as [string, ...string[]]);

export const ShipmentPrioritySchema = z.enum(
  Object.values(SHIPMENT_PRIORITY) as [string, ...string[]]
);

export type ShipmentStatusSchemaType = z.infer<typeof ShipmentStatusSchema>;
export type ShipmentPrioritySchemaType = z.infer<typeof ShipmentPrioritySchema>;
