import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { VehicleSchema } from './vehicle.schema';
import { DriverSchema } from './driver.schema';
import { RouteSchema } from './route.schema';
import { ShipmentSchema } from './shipment.schema';
import { DISPATCH } from '@vubon/shared-constants/src/logistics/dispatch.constants';

const dispatchStatusKeys = Object.keys(DISPATCH.STATUS) as [string, ...string[]];
const dispatchTypeKeys = Object.keys(DISPATCH.DISPATCH_TYPES) as [string, ...string[]];
const dispatchPriorityKeys = Object.keys(DISPATCH.DISPATCH_PRIORITY) as [string, ...string[]];

export const DispatchSchema = BaseSchema.extend({
  dispatchId: z.string().uuid(),
  dispatchNumber: z.string().min(1).max(50),
  status: z.enum(dispatchStatusKeys),
  type: z.enum(dispatchTypeKeys),
  priority: z.enum(dispatchPriorityKeys),
  vehicle: VehicleSchema,
  driver: DriverSchema,
  route: RouteSchema,
  shipments: z.array(ShipmentSchema),
  shipmentCount: z.number().int().min(0).default(0),
  totalItems: z.number().int().min(0).default(0),
  totalWeight: z.number().min(0).default(0),
  scheduledAt: z.date(),
  departedAt: z.date().optional(),
  arrivedAt: z.date().optional(),
  completedAt: z.date().optional(),
  isCompleted: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  notes: z.string().optional(),
  metadata: z.object({
    isUrgent: z.boolean().default(false),
    isScheduled: z.boolean().default(false),
    temperatureControlled: z.boolean().default(false),
    requiresSignature: z.boolean().default(false),
    requiresPhoto: z.boolean().default(false),
  }),
});
