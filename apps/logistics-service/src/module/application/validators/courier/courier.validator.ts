/**
 * CourierValidator — Zod-based validation
 * @module logistics-service/application/validators/courier
 */
import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

import type {
  CreateCourierRequestDTO,
  UpdateCourierRequestDTO,
  ActivateCourierRequestDTO,
  DeactivateCourierRequestDTO,
  SuspendCourierRequestDTO,
  TerminateCourierRequestDTO,
  AssignCourierToShipmentRequestDTO,
} from '@application/dtos/requests/courier/index.js';

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
const UrlOptional = z.string().url().optional();
const EmailOptional = z.string().email().optional();
const CourierTypeEnum = z.enum([
  'local',
  'national',
  'international',
  'third_party',
  'in_house',
  'marketplace',
]);

const CreateCourierSchema = z.object({
  code: z.string().min(2).max(50),
  name: z.string().min(2).max(100),
  displayName: z.string().min(2).max(200),
  type: CourierTypeEnum,
  logoUrl: UrlOptional,
  website: UrlOptional,
  contactPhone: z.string().min(5).max(20).optional(),
  contactEmail: EmailOptional,
  trackingUrlTemplate: z.string().max(500).optional(),
  apiEnabled: z.boolean(),
  coverageZones: z.array(z.string().min(1).max(100)).max(100).optional(),
  supportsCOD: z.boolean(),
  supportsInsurance: z.boolean(),
  supportsInternational: z.boolean(),
  averageDeliveryDays: z.number().int().min(0).max(90),
  isDefault: z.boolean().optional(),
  priority: z.number().int().min(0).optional(),
});

const UpdateCourierSchema = z.object({
  courierId: UuidSchema,
  displayName: z.string().min(2).max(200).optional(),
  logoUrl: UrlOptional,
  website: UrlOptional,
  contactPhone: z.string().min(5).max(20).optional(),
  contactEmail: EmailOptional,
  trackingUrlTemplate: z.string().max(500).optional(),
  apiEnabled: z.boolean().optional(),
  coverageZones: z.array(z.string().min(1).max(100)).max(100).optional(),
  supportsCOD: z.boolean().optional(),
  supportsInsurance: z.boolean().optional(),
  supportsInternational: z.boolean().optional(),
  averageDeliveryDays: z.number().int().min(0).max(90).optional(),
  isDefault: z.boolean().optional(),
  priority: z.number().int().min(0).optional(),
});

const ActivateSchema = z.object({ courierId: UuidSchema });
const DeactivateSchema = z.object({
  courierId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const SuspendSchema = z.object({
  courierId: UuidSchema,
  reason: z.string().min(1).max(1000),
});
const TerminateSchema = z.object({
  courierId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const AssignSchema = z.object({
  shipmentId: UuidSchema,
  courierId: UuidSchema,
  courierTrackingNumber: z.string().min(1).max(200).optional(),
});

export class CourierValidator {
  static validateCreate(input: unknown): CreateCourierRequestDTO {
    try {
      return CreateCourierSchema.parse(input) as CreateCourierRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Courier.create');
      throw e;
    }
  }
  static validateUpdate(input: unknown): UpdateCourierRequestDTO {
    try {
      return UpdateCourierSchema.parse(input) as UpdateCourierRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Courier.update');
      throw e;
    }
  }
  static validateActivate(input: unknown): ActivateCourierRequestDTO {
    try {
      return ActivateSchema.parse(input) as ActivateCourierRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Courier.activate');
      throw e;
    }
  }
  static validateDeactivate(input: unknown): DeactivateCourierRequestDTO {
    try {
      return DeactivateSchema.parse(input) as DeactivateCourierRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Courier.deactivate');
      throw e;
    }
  }
  static validateSuspend(input: unknown): SuspendCourierRequestDTO {
    try {
      return SuspendSchema.parse(input) as SuspendCourierRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Courier.suspend');
      throw e;
    }
  }
  static validateTerminate(input: unknown): TerminateCourierRequestDTO {
    try {
      return TerminateSchema.parse(input) as TerminateCourierRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Courier.terminate');
      throw e;
    }
  }
  static validateAssign(input: unknown): AssignCourierToShipmentRequestDTO {
    try {
      return AssignSchema.parse(input) as AssignCourierToShipmentRequestDTO;
    } catch (e) {
      if (isZodError(e)) throw toAppError(e, 'Courier.assignToShipment');
      throw e;
    }
  }
}
