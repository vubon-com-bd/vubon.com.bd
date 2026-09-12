import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { OrderSchema } from '../business/checkout/order.schema';
import { ShipmentSchema } from './shipment.schema';
import { CourierSchema } from './courier.schema';
import { ReturnReasonSchema } from './return-reason.schema';
import { RETURN_SHIPMENT } from '@vubon/shared-constants/src/logistics/return-shipment.constants';

const returnShipmentStatusKeys = Object.keys(RETURN_SHIPMENT.STATUS) as [string, ...string[]];
const returnShipmentTypeKeys = Object.keys(RETURN_SHIPMENT.RETURN_SHIPMENT_TYPES) as [
  string,
  ...string[],
];
const returnShippingCostKeys = Object.keys(RETURN_SHIPMENT.RETURN_SHIPPING_COST) as [
  string,
  ...string[],
];

export const ReturnShipmentSchema: z.ZodObject<z.ZodRawShape> = BaseSchema.extend({
  returnShipmentId: z.string().uuid(),
  orderId: z.string().uuid(),
  order: OrderSchema,
  originalShipmentId: z.string().uuid(),
  originalShipment: ShipmentSchema,
  status: z.enum(returnShipmentStatusKeys),
  type: z.enum(returnShipmentTypeKeys),
  reason: ReturnReasonSchema,
  items: z.array(
    z.object({
      itemId: z.string().uuid(),
      productId: z.string().uuid(),
      productName: z.string(),
      quantity: z.number().int().min(1),
      reason: z.string(),
      condition: z.string(),
      refundAmount: MoneySchema,
    })
  ),
  totalItems: z.number().int().min(0).default(0),
  totalWeight: z.number().min(0).default(0),
  returnCost: MoneySchema,
  shippingCost: z.enum(returnShippingCostKeys),
  courier: CourierSchema,
  trackingNumber: z.string(),
  requestedAt: z.date(),
  approvedAt: z.date().optional(),
  pickedUpAt: z.date().optional(),
  receivedAt: z.date().optional(),
  inspectedAt: z.date().optional(),
  completedAt: z.date().optional(),
  isCompleted: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});

export type ReturnShipmentSchemaType = z.infer<typeof ReturnShipmentSchema>;
