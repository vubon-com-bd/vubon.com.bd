import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateDriverRequestDTO,
  UpdateDriverRequestDTO,
  DriverActionRequestDTO,
  DeactivateDriverRequestDTO,
  SuspendDriverRequestDTO,
  OnLeaveDriverRequestDTO,
  AssignVehicleToDriverRequestDTO,
  CollectCashRequestDTO,
  DepositCashRequestDTO,
  RecordDeliveryRequestDTO,
} from '@application/dtos/requests/driver/index.js';

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
const DType = z.enum(['full_time', 'part_time', 'contract', 'freelance', 'third_party']);
const DLType = z.enum(['motorcycle', 'light', 'medium', 'heavy', 'professional']);

const CreateSchema = z.object({
  userId: UuidSchema.optional(),
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  email: z.string().email().optional(),
  type: DType,
  licenseNumber: z.string().min(7).max(30),
  licenseType: DLType,
  licenseExpiresAt: z.string().datetime(),
  dateOfBirth: z.string().datetime().optional(),
  address: z.string().max(500).optional(),
  warehouseId: UuidSchema.optional(),
  cashLimit: z.number().nonnegative().optional(),
});
const UpdateSchema = z.object({
  driverId: UuidSchema,
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  address: z.string().max(500).optional(),
  warehouseId: UuidSchema.optional(),
  cashLimit: z.number().nonnegative().optional(),
});
const IdOnlySchema = z.object({ driverId: UuidSchema });
const DeactivateSchema = z.object({
  driverId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const SuspendSchema = z.object({
  driverId: UuidSchema,
  reason: z.string().min(1).max(1000),
});
const OnLeaveSchema = z.object({
  driverId: UuidSchema,
  leaveEndAt: z.string().datetime().optional(),
});
const AssignVehicleSchema = z.object({
  driverId: UuidSchema,
  vehicleId: UuidSchema,
});
const CashSchema = z.object({
  driverId: UuidSchema,
  amount: z.number().positive(),
  currency: z.string().min(3).max(5).optional(),
});
const RecordDeliverySchema = z.object({
  driverId: UuidSchema,
  deliveryId: UuidSchema,
  distanceKm: z.number().nonnegative().optional(),
});

export class DriverValidator {
  static validateCreate(input: unknown): CreateDriverRequestDTO {
    try { return CreateSchema.parse(input) as CreateDriverRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Driver.create'); throw e; }
  }
  static validateUpdate(input: unknown): UpdateDriverRequestDTO {
    try { return UpdateSchema.parse(input) as UpdateDriverRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Driver.update'); throw e; }
  }
  static validateAction(input: unknown): DriverActionRequestDTO {
    try { return IdOnlySchema.parse(input) as DriverActionRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Driver.action'); throw e; }
  }
  static validateDeactivate(input: unknown): DeactivateDriverRequestDTO {
    try { return DeactivateSchema.parse(input) as DeactivateDriverRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Driver.deactivate'); throw e; }
  }
  static validateSuspend(input: unknown): SuspendDriverRequestDTO {
    try { return SuspendSchema.parse(input) as SuspendDriverRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Driver.suspend'); throw e; }
  }
  static validateOnLeave(input: unknown): OnLeaveDriverRequestDTO {
    try { return OnLeaveSchema.parse(input) as OnLeaveDriverRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Driver.onLeave'); throw e; }
  }
  static validateAssignVehicle(input: unknown): AssignVehicleToDriverRequestDTO {
    try { return AssignVehicleSchema.parse(input) as AssignVehicleToDriverRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Driver.assignVehicle'); throw e; }
  }
  static validateCollectCash(input: unknown): CollectCashRequestDTO {
    try { return CashSchema.parse(input) as CollectCashRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Driver.collectCash'); throw e; }
  }
  static validateDepositCash(input: unknown): DepositCashRequestDTO {
    try { return CashSchema.parse(input) as DepositCashRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Driver.depositCash'); throw e; }
  }
  static validateRecordDelivery(input: unknown): RecordDeliveryRequestDTO {
    try { return RecordDeliverySchema.parse(input) as RecordDeliveryRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Driver.recordDelivery'); throw e; }
  }
}
