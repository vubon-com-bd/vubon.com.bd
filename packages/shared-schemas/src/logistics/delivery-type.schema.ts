/**
 * Delivery Type Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/delivery.constants থেকে।
 */

import { z } from 'zod';
import { DELIVERY_TYPE } from '@vubon/shared-constants/logistics';

export const DeliveryTypeSchema = z.enum(Object.values(DELIVERY_TYPE) as [string, ...string[]]);

export type DeliveryTypeSchemaType = z.infer<typeof DeliveryTypeSchema>;
