/**
 * Shipment Type Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/shipment.constants থেকে।
 */

import { z } from 'zod';
import { SHIPMENT_TYPE } from '@vubon/shared-constants/logistics';

export const ShipmentTypeSchema = z.enum(Object.values(SHIPMENT_TYPE) as [string, ...string[]]);

export type ShipmentTypeSchemaType = z.infer<typeof ShipmentTypeSchema>;
