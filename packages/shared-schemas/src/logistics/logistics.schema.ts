import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { LOGISTICS } from '@vubon/shared-constants/src/logistics/logistics.constants';
import { ShipmentSchema } from './shipment.schema';
import { LogisticsDeliverySchema } from './logistics-delivery.schema';
import { WarehouseSchema } from './warehouse.schema';
import { FulfillmentSchema } from './fulfillment.schema';

const logisticsStatusKeys = Object.keys(LOGISTICS.STATUS) as [string, ...string[]];

export const LogisticsSchema: z.ZodObject<z.ZodRawShape> = BaseSchema.extend({
  logisticsId: z.string().uuid(),
  shipments: z.array(ShipmentSchema),
  deliveries: z.array(LogisticsDeliverySchema),
  warehouses: z.array(WarehouseSchema),
  fulfillments: z.array(FulfillmentSchema),
  status: z.enum(logisticsStatusKeys),
  totalShipments: z.number().int().min(0).default(0),
  totalDeliveries: z.number().int().min(0).default(0),
  totalWarehouses: z.number().int().min(0).default(0),
  totalFulfillments: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  metadata: z.object({
    timezone: z.string(),
    currency: z.string().min(3).max(3),
    defaultWarehouse: z.string().optional(),
    defaultCourier: z.string().optional(),
    shippingZones: z.array(z.string()),
    holidays: z.array(
      z.object({
        date: z.date(),
        name: z.string(),
        isClosed: z.boolean(),
      })
    ),
  }),
});

export const LogisticsCreateSchema: z.ZodObject<z.ZodRawShape> = LogisticsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  totalShipments: true,
  totalDeliveries: true,
  totalWarehouses: true,
  totalFulfillments: true,
});

export const LogisticsUpdateSchema: z.ZodObject<z.ZodRawShape> = LogisticsCreateSchema.partial();

export type LogisticsSchemaType = z.infer<typeof LogisticsSchema>;
