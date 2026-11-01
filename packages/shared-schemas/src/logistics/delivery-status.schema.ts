/**
 * Delivery Status Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/delivery.constants থেকে।
 */

import { z } from 'zod';
import { DELIVERY_STATUS, DELIVERY_ATTEMPT_STATUS } from '@vubon/shared-constants/logistics';

export const DeliveryStatusSchema = z.enum(Object.values(DELIVERY_STATUS) as [string, ...string[]]);

export const DeliveryAttemptStatusSchema = z.enum(
  Object.values(DELIVERY_ATTEMPT_STATUS) as [string, ...string[]]
);

export type DeliveryStatusSchemaType = z.infer<typeof DeliveryStatusSchema>;
export type DeliveryAttemptStatusSchemaType = z.infer<typeof DeliveryAttemptStatusSchema>;
