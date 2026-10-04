/**
 * Order Channel & Source Schema
 * @module shared-schemas/business/order
 */
import { z } from 'zod';
import { ORDER_CHANNEL, ORDER_SOURCE } from '@vubon/shared-constants/business';

export const OrderChannelSchema = z.enum(
  Object.values(ORDER_CHANNEL) as [string, ...string[]],
);

export const OrderSourceSchema = z.enum(
  Object.values(ORDER_SOURCE) as [string, ...string[]],
);

export type OrderChannelSchemaType = z.infer<typeof OrderChannelSchema>;
export type OrderSourceSchemaType = z.infer<typeof OrderSourceSchema>;
