import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { QuantitySchema } from '../common/quantity.schema';
import { OrderSchema } from '../business/checkout/order.schema';
import { VendorSchema } from '../business/vendor/vendor.schema';
import { CourierSchema } from './courier.schema';
import { TrackingSchema } from './tracking.schema';
import { PackagingSchema } from './packaging.schema';
import { SHIPMENT_STATUS } from '@vubon/shared-constants/src/logistics/shipment-status.constants';
import { SHIPMENT } from '@vubon/shared-constants/src/logistics/shipment.constants';

const shipmentStatusKeys = Object.keys(SHIPMENT_STATUS) as [string, ...string[]];
const shipmentTypeKeys = Object.keys(SHIPMENT.SHIPMENT_TYPES) as [string, ...string[]];
const shipmentPriorityKeys = Object.keys(SHIPMENT.SHIPMENT_PRIORITY) as [string, ...string[]];

export const ShipmentSchema = BaseSchema.extend({
  shipmentId: z.string().uuid(),
  shipmentNumber: z.string().min(1).max(50),
  orderId: z.string().uuid(),
  order: OrderSchema,
  vendorId: z.string().uuid().optional(),
  vendor: VendorSchema.optional(),
  status: z.enum(shipmentStatusKeys),
  type: z.enum(shipmentTypeKeys),
  priority: z.enum(shipmentPriorityKeys),
  courier: CourierSchema,
  tracking: TrackingSchema,
  items: z.array(
    z.object({
      itemId: z.string().uuid(),
      productId: z.string().uuid(),
      productName: z.string(),
      sku: z.string(),
      quantity: QuantitySchema,
      weight: z.number().positive(),
      dimensions: z.object({
        length: z.number().positive(),
        width: z.number().positive(),
        height: z.number().positive(),
      }),
      price: MoneySchema,
    })
  ),
  totalItems: z.number().int().min(0).default(0),
  totalWeight: z.number().min(0).default(0),
  totalVolume: z.number().min(0).default(0),
  packaging: PackagingSchema,
  originAddress: z.object({
    name: z.string(),
    phone: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    postalCode: z.string(),
    country: z.string(),
  }),
  destinationAddress: z.object({
    name: z.string(),
    phone: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    city: z.string(),
    state: z.string().optional(),
    postalCode: z.string(),
    country: z.string(),
  }),
  shippingCost: MoneySchema,
  insuranceCost: MoneySchema,
  totalCost: MoneySchema,
  estimatedDeliveryDate: z.date(),
  actualDeliveryDate: z.date().optional(),
  isDelivered: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  isReturned: z.boolean().default(false),
  metadata: z.object({
    notes: z.string().optional(),
    specialInstructions: z.string().optional(),
    isFragile: z.boolean().default(false),
    isHazardous: z.boolean().default(false),
    temperatureSensitive: z.boolean().default(false),
    temperatureRange: z.string().optional(),
  }),
});

export const ShipmentCreateSchema = ShipmentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  totalItems: true,
  totalWeight: true,
  totalVolume: true,
  totalCost: true,
  isDelivered: true,
  isCancelled: true,
  isReturned: true,
});
