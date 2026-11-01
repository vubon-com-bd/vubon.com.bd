/**
 * DeliveryValidator — Zod-based validation
 */
import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

import type {
  CreateDeliveryRequestDTO,
  ScheduleDeliveryRequestDTO,
  AssignDeliveryRequestDTO,
  PickUpDeliveryRequestDTO,
  DeliveryStartTransitRequestDTO,
  DeliveryOutForDeliveryRequestDTO,
  ArriveDeliveryRequestDTO,
  CompleteDeliveryRequestDTO,
  FailDeliveryRequestDTO,
  RescheduleDeliveryRequestDTO,
  CancelDeliveryRequestDTO,
  RefuseDeliveryRequestDTO,
} from '@application/dtos/requests/delivery/index.js';

interface ZodIssueLike {
  readonly path: (string | number)[];
  readonly message: string;
}
function isZodError(e: unknown): e is { issues: ZodIssueLike[] } {
  if (!e || typeof e !== 'object') return false;
  const obj = e as Record<string, unknown>;
  return obj['name'] === 'ZodError' && Array.isArray(obj['issues']);
}
function toAppError(err: { issues: ZodIssueLike[] }, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({ field: i.path.join('.'), message: i.message })),
  );
}

const UuidSchema = z.string().uuid();
const DeliveryTypeEnum = z.enum([
  'standard',
  'express',
  'same_day',
  'scheduled',
  'contactless',
  'pickup_point',
  'locker',
  'door',
]);
const DeliveryWindowSchema = z.object({
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
});

const CreateSchema = z.object({
  shipmentId: UuidSchema,
  orderId: UuidSchema,
  userId: UuidSchema.optional(),
  type: DeliveryTypeEnum,
  deliveryAddress: z.string().min(5).max(500),
  recipientName: z.string().min(1).max(255).optional(),
  recipientPhone: z.string().min(5).max(20).optional(),
  window: DeliveryWindowSchema.optional(),
  scheduledAt: z.string().datetime().optional(),
  driverId: UuidSchema.optional(),
  vehicleId: UuidSchema.optional(),
  routeId: UuidSchema.optional(),
  notes: z.string().max(2000).optional(),
});
const ScheduleSchema = z.object({
  deliveryId: UuidSchema,
  window: DeliveryWindowSchema.optional(),
  scheduledAt: z.string().datetime().optional(),
});
const AssignSchema = z.object({
  deliveryId: UuidSchema,
  driverId: UuidSchema,
  vehicleId: UuidSchema.optional(),
  routeId: UuidSchema.optional(),
});
const IdOnlySchema = z.object({ deliveryId: UuidSchema });
const CompleteSchema = z.object({
  deliveryId: UuidSchema,
  recipientName: z.string().min(1).max(255).optional(),
  signedBy: z.string().min(1).max(255).optional(),
});
const FailSchema = z.object({
  deliveryId: UuidSchema,
  reason: z.string().min(1).max(1000),
});
const RescheduleSchema = z.object({
  deliveryId: UuidSchema,
  window: DeliveryWindowSchema.optional(),
});
const CancelSchema = z.object({
  deliveryId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const RefuseSchema = z.object({
  deliveryId: UuidSchema,
  reason: z.string().max(1000).optional(),
});

export class DeliveryValidator {
  static validateCreate(input: unknown): CreateDeliveryRequestDTO {
    try { return CreateSchema.parse(input) as CreateDeliveryRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Delivery.create'); throw e; }
  }
  static validateSchedule(input: unknown): ScheduleDeliveryRequestDTO {
    try { return ScheduleSchema.parse(input) as ScheduleDeliveryRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Delivery.schedule'); throw e; }
  }
  static validateAssign(input: unknown): AssignDeliveryRequestDTO {
    try { return AssignSchema.parse(input) as AssignDeliveryRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Delivery.assign'); throw e; }
  }
  static validatePickUp(input: unknown): PickUpDeliveryRequestDTO {
    try { return IdOnlySchema.parse(input) as PickUpDeliveryRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Delivery.pickUp'); throw e; }
  }
  static validateStartTransit(input: unknown): DeliveryStartTransitRequestDTO {
    try { return IdOnlySchema.parse(input) as DeliveryStartTransitRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Delivery.startTransit'); throw e; }
  }
  static validateOutForDelivery(input: unknown): DeliveryOutForDeliveryRequestDTO {
    try { return IdOnlySchema.parse(input) as DeliveryOutForDeliveryRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Delivery.outForDelivery'); throw e; }
  }
  static validateArrive(input: unknown): ArriveDeliveryRequestDTO {
    try { return IdOnlySchema.parse(input) as ArriveDeliveryRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Delivery.arrive'); throw e; }
  }
  static validateComplete(input: unknown): CompleteDeliveryRequestDTO {
    try { return CompleteSchema.parse(input) as CompleteDeliveryRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Delivery.complete'); throw e; }
  }
  static validateFail(input: unknown): FailDeliveryRequestDTO {
    try { return FailSchema.parse(input) as FailDeliveryRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Delivery.fail'); throw e; }
  }
  static validateReschedule(input: unknown): RescheduleDeliveryRequestDTO {
    try { return RescheduleSchema.parse(input) as RescheduleDeliveryRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Delivery.reschedule'); throw e; }
  }
  static validateCancel(input: unknown): CancelDeliveryRequestDTO {
    try { return CancelSchema.parse(input) as CancelDeliveryRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Delivery.cancel'); throw e; }
  }
  static validateRefuse(input: unknown): RefuseDeliveryRequestDTO {
    try { return RefuseSchema.parse(input) as RefuseDeliveryRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Delivery.refuse'); throw e; }
  }
}
