import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { OrderSchema } from '../business/checkout/order.schema';
import { ShipmentSchema } from './shipment.schema';
import { DriverSchema } from './driver.schema';
import { VehicleSchema } from './vehicle.schema';
import { RouteSchema } from './route.schema';
import { DELIVERY_STATUS } from '@vubon/shared-constants/src/logistics/delivery-status.constants';
import { LOGISTICS_DELIVERY } from '@vubon/shared-constants/src/logistics/logistics-delivery.constants';

const deliveryStatusKeys = Object.keys(DELIVERY_STATUS) as [string, ...string[]];
const logisticsDeliveryTypeKeys = Object.keys(LOGISTICS_DELIVERY.DELIVERY_TYPES) as [
  string,
  ...string[],
];
const logisticsDeliveryWindowKeys = Object.keys(LOGISTICS_DELIVERY.DELIVERY_WINDOWS) as [
  string,
  ...string[],
];

const DeliveryItemSchema = z.object({
  itemId: z.string().uuid(),
  productId: z.string().uuid(),
  productName: z.string(),
  quantity: z.number().int().min(0),
  weight: z.number().positive(),
});

const DeliveryAttemptSchema = z.object({
  attemptNumber: z.number().int().min(1),
  attemptedAt: z.date(),
  status: z.enum(['attempted', 'delivered', 'failed']),
  reason: z.string().optional(),
  notes: z.string().optional(),
});

const DeliveryMetadataSchema = z.object({
  isPriority: z.boolean().default(false),
  isExpress: z.boolean().default(false),
  requiresSignature: z.boolean().default(false),
  requiresPhoto: z.boolean().default(false),
  requiresOtp: z.boolean().default(false),
  ageRestricted: z.boolean().default(false),
});

export const LogisticsDeliverySchema: z.ZodObject<z.ZodRawShape> = BaseSchema.extend({
  deliveryId: z.string().uuid(),
  deliveryNumber: z.string().min(1).max(50),
  orderId: z.string().uuid(),
  order: OrderSchema,
  shipmentId: z.string().uuid(),
  shipment: ShipmentSchema,
  status: z.enum(deliveryStatusKeys),
  type: z.enum(logisticsDeliveryTypeKeys),
  window: z.enum(logisticsDeliveryWindowKeys),
  driver: DriverSchema,
  vehicle: VehicleSchema,
  route: RouteSchema,
  items: z.array(DeliveryItemSchema),
  totalItems: z.number().int().min(0).default(0),
  totalWeight: z.number().min(0).default(0),
  deliveryCost: MoneySchema,
  codAmount: MoneySchema,
  isCod: z.boolean().default(false),
  isCollected: z.boolean().default(false),
  collectedAt: z.date().optional(),
  collectedBy: z.string().optional(),
  scheduledDate: z.date(),
  scheduledTime: z.string(),
  startedAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  deliveryAttempts: z.array(DeliveryAttemptSchema),
  maxAttempts: z.number().int().min(1).default(3),
  notes: z.string().optional(),
  signature: z.string().optional(),
  metadata: DeliveryMetadataSchema,
});

export type LogisticsDeliverySchemaType = z.infer<typeof LogisticsDeliverySchema>;
