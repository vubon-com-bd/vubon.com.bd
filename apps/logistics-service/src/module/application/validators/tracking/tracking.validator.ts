import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateTrackingRequestDTO,
  AddTrackingEventRequestDTO,
  ActivateTrackingRequestDTO,
  CompleteTrackingRequestDTO,
  FailTrackingRequestDTO,
  ExpireTrackingRequestDTO,
} from '@application/dtos/requests/tracking/index.js';

interface ZodIssueLike { readonly path: (string | number)[]; readonly message: string }
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
const TrackingSourceEnum = z.enum(['courier_api', 'webhook', 'manual', 'internal', 'third_party']);

const CreateSchema = z.object({
  trackingNumber: z.string().min(10).max(32),
  shipmentId: UuidSchema.optional(),
  orderId: UuidSchema.optional(),
  courierCode: z.string().min(1).max(50).optional(),
  source: TrackingSourceEnum,
  estimatedDeliveryAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
});
const AddEventSchema = z.object({
  trackingId: UuidSchema,
  eventId: z.string().min(1).max(100),
  eventType: z.string().min(1).max(100),
  eventStatus: z.string().min(1).max(50),
  currentLocation: z.string().max(255).optional(),
});
const IdOnlySchema = z.object({ trackingId: UuidSchema });
const FailSchema = z.object({
  trackingId: UuidSchema,
  reason: z.string().min(1).max(1000),
});

export class TrackingValidator {
  static validateCreate(input: unknown): CreateTrackingRequestDTO {
    try { return CreateSchema.parse(input) as CreateTrackingRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Tracking.create'); throw e; }
  }
  static validateAddEvent(input: unknown): AddTrackingEventRequestDTO {
    try { return AddEventSchema.parse(input) as AddTrackingEventRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Tracking.addEvent'); throw e; }
  }
  static validateActivate(input: unknown): ActivateTrackingRequestDTO {
    try { return IdOnlySchema.parse(input) as ActivateTrackingRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Tracking.activate'); throw e; }
  }
  static validateComplete(input: unknown): CompleteTrackingRequestDTO {
    try { return IdOnlySchema.parse(input) as CompleteTrackingRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Tracking.complete'); throw e; }
  }
  static validateFail(input: unknown): FailTrackingRequestDTO {
    try { return FailSchema.parse(input) as FailTrackingRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Tracking.fail'); throw e; }
  }
  static validateExpire(input: unknown): ExpireTrackingRequestDTO {
    try { return IdOnlySchema.parse(input) as ExpireTrackingRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Tracking.expire'); throw e; }
  }
}
