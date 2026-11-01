import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateVehicleRequestDTO,
  UpdateVehicleRequestDTO,
  VehicleActionRequestDTO,
  AssignVehicleRequestDTO,
  StartVehicleMaintenanceRequestDTO,
  RetireVehicleRequestDTO,
  AssignDriverToVehicleRequestDTO,
} from '@application/dtos/requests/vehicle/index.js';

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
const VType = z.enum(['motorcycle', 'bicycle', 'car', 'van', 'pickup', 'truck_small', 'truck_medium', 'truck_large', 'container', 'refrigerated']);
const VFuel = z.enum(['petrol', 'diesel', 'cng', 'electric', 'hybrid', 'lpg']);

const CreateSchema = z.object({
  registrationNumber: z.string().min(5).max(30),
  type: VType,
  fuelType: VFuel,
  make: z.string().min(1).max(100),
  model: z.string().min(1).max(100),
  year: z.number().int().min(2000).max(2100),
  color: z.string().max(50).optional(),
  maxWeightKg: z.number().positive(),
  maxVolumeM3: z.number().positive().optional(),
  capacity: z.number().int().positive().optional(),
  mileageKm: z.number().nonnegative().optional(),
  insuranceExpiresAt: z.string().datetime().optional(),
  registrationExpiresAt: z.string().datetime().optional(),
  warehouseId: UuidSchema.optional(),
});
const UpdateSchema = z.object({
  vehicleId: UuidSchema,
  color: z.string().max(50).optional(),
  maxWeightKg: z.number().positive().optional(),
  maxVolumeM3: z.number().positive().optional(),
  capacity: z.number().int().positive().optional(),
  mileageKm: z.number().nonnegative().optional(),
  insuranceExpiresAt: z.string().datetime().optional(),
  registrationExpiresAt: z.string().datetime().optional(),
  warehouseId: UuidSchema.optional(),
});
const IdOnlySchema = z.object({ vehicleId: UuidSchema });
const AssignSchema = z.object({
  vehicleId: UuidSchema,
  dispatchId: UuidSchema.optional(),
  driverId: UuidSchema.optional(),
});
const MaintenanceSchema = z.object({
  vehicleId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const RetireSchema = z.object({
  vehicleId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const AssignDriverSchema = z.object({
  vehicleId: UuidSchema,
  driverId: UuidSchema,
});

export class VehicleValidator {
  static validateCreate(input: unknown): CreateVehicleRequestDTO {
    try { return CreateSchema.parse(input) as CreateVehicleRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Vehicle.create'); throw e; }
  }
  static validateUpdate(input: unknown): UpdateVehicleRequestDTO {
    try { return UpdateSchema.parse(input) as UpdateVehicleRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Vehicle.update'); throw e; }
  }
  static validateAction(input: unknown): VehicleActionRequestDTO {
    try { return IdOnlySchema.parse(input) as VehicleActionRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Vehicle.action'); throw e; }
  }
  static validateAssign(input: unknown): AssignVehicleRequestDTO {
    try { return AssignSchema.parse(input) as AssignVehicleRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Vehicle.assign'); throw e; }
  }
  static validateStartMaintenance(input: unknown): StartVehicleMaintenanceRequestDTO {
    try { return MaintenanceSchema.parse(input) as StartVehicleMaintenanceRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Vehicle.startMaintenance'); throw e; }
  }
  static validateRetire(input: unknown): RetireVehicleRequestDTO {
    try { return RetireSchema.parse(input) as RetireVehicleRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Vehicle.retire'); throw e; }
  }
  static validateAssignDriver(input: unknown): AssignDriverToVehicleRequestDTO {
    try { return AssignDriverSchema.parse(input) as AssignDriverToVehicleRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Vehicle.assignDriver'); throw e; }
  }
}
