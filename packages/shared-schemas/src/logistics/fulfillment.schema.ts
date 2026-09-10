import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { QuantitySchema } from '../common/quantity.schema';
import { OrderSchema } from '../business/checkout/order.schema';
import { ProductSchema } from '../business/product/product.schema';
import { WarehouseSchema } from './warehouse.schema';
import { ShipmentSchema } from './shipment.schema';
import { FULFILLMENT } from '@vubon/shared-constants/src/logistics/fulfillment.constants';

const fulfillmentStatusKeys = Object.keys(FULFILLMENT.STATUS) as [string, ...string[]];
const fulfillmentTypeKeys = Object.keys(FULFILLMENT.FULFILLMENT_TYPES) as [string, ...string[]];
const pickingStrategyKeys = Object.keys(FULFILLMENT.PICKING_STRATEGIES) as [string, ...string[]];

export const FulfillmentSchema: z.ZodObject<z.ZodRawShape> = BaseSchema.extend({
  fulfillmentId: z.string().uuid(),
  orderId: z.string().uuid(),
  order: OrderSchema,
  status: z.enum(fulfillmentStatusKeys),
  type: z.enum(fulfillmentTypeKeys),
  strategy: z.enum(pickingStrategyKeys),
  warehouse: WarehouseSchema,
  shipment: ShipmentSchema,
  items: z.array(
    z.object({
      itemId: z.string().uuid(),
      productId: z.string().uuid(),
      product: ProductSchema,
      quantity: QuantitySchema,
      location: z.string(),
      status: z.enum(['pending', 'picked', 'packed', 'labeled', 'ready', 'shipped']),
    })
  ),
  totalItems: z.number().int().min(0).default(0),
  totalWeight: z.number().min(0).default(0),
  totalVolume: z.number().min(0).default(0),
  pickingStartedAt: z.date().optional(),
  pickingCompletedAt: z.date().optional(),
  packingStartedAt: z.date().optional(),
  packingCompletedAt: z.date().optional(),
  labelingStartedAt: z.date().optional(),
  labelingCompletedAt: z.date().optional(),
  readyToShipAt: z.date().optional(),
  shippedAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  notes: z.string().optional(),
  metadata: z.object({
    batchId: z.string().optional(),
    waveId: z.string().optional(),
    zoneId: z.string().optional(),
    pickerId: z.string().optional(),
    packerId: z.string().optional(),
    laborCost: MoneySchema,
    materialCost: MoneySchema,
  }),
});

export type FulfillmentSchemaType = z.infer<typeof FulfillmentSchema>;
