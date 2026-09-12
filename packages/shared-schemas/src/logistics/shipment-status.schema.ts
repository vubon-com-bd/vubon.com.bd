import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { SHIPMENT_STATUS } from '@vubon/shared-constants/src/logistics/shipment-status.constants';

const shipmentStatusKeys = Object.keys(SHIPMENT_STATUS) as [string, ...string[]];

export const ShipmentStatusSchema = StatusSchema.extend({
  status: z.enum(shipmentStatusKeys),
  category: z.literal('shipment'),
  isCreated: z.boolean().default(false),
  isPending: z.boolean().default(false),
  isProcessing: z.boolean().default(false),
  isShipped: z.boolean().default(false),
  isDelivered: z.boolean().default(false),
  isReturned: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  isFailed: z.boolean().default(false),
  isLost: z.boolean().default(false),
  isDamaged: z.boolean().default(false),
});

export const ShipmentStatusEnumSchema = z.enum(shipmentStatusKeys);
