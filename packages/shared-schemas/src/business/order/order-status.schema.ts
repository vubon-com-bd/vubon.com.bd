/**
 * Order Status Schema
 * @module shared-schemas/business/order
 *
 * Values আসে shared-constants/business/order-status.constants থেকে।
 */

import { z } from 'zod';
import { ORDER_STATUS, ORDER_PRIORITY } from '@vubon/shared-constants/business';

export const OrderStatusSchema = z.enum(Object.values(ORDER_STATUS) as [string, ...string[]]);

export const OrderPrioritySchema = z.enum(Object.values(ORDER_PRIORITY) as [string, ...string[]]);

export type OrderStatusSchemaType = z.infer<typeof OrderStatusSchema>;
export type OrderPrioritySchemaType = z.infer<typeof OrderPrioritySchema>;
