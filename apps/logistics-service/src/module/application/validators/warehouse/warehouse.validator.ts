import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateWarehouseRequestDTO,
  UpdateWarehouseRequestDTO,
  ActivateWarehouseRequestDTO,
  DeactivateWarehouseRequestDTO,
  StartMaintenanceRequestDTO,
  EndMaintenanceRequestDTO,
  CloseWarehouseRequestDTO,
  ArchiveWarehouseRequestDTO,
  UpdateCapacityRequestDTO,
} from '@application/dtos/requests/warehouse/index.js';

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

const CreateSchema = z.object({
  code: z.string().min(3).max(20),
  name: z.string().min(3).max(150),
  type: z.string().min(1).max(50),
  address: z.string().min(5).max(500),
  contactName: z.string().min(1).max(200).optional(),
  contactPhone: z.string().min(5).max(20).optional(),
  contactEmail: z.string().email().optional(),
  managerId: UuidSchema.optional(),
  capacityM3: z.number().nonnegative().optional(),
  capacityKg: z.number().nonnegative().optional(),
  maxSkus: z.number().int().nonnegative().optional(),
  zone: z.string().min(1).max(100),
  operatingHoursStart: z.number().int().min(0).max(23).optional(),
  operatingHoursEnd: z.number().int().min(0).max(23).optional(),
  timezone: z.string().min(1).max(64),
  isDefault: z.boolean().optional(),
});
const UpdateSchema = z.object({
  warehouseId: UuidSchema,
  address: z.string().min(5).max(500).optional(),
  contactName: z.string().min(1).max(200).optional(),
  contactPhone: z.string().min(5).max(20).optional(),
  contactEmail: z.string().email().optional(),
  managerId: UuidSchema.optional(),
  maxSkus: z.number().int().nonnegative().optional(),
  operatingHoursStart: z.number().int().min(0).max(23).optional(),
  operatingHoursEnd: z.number().int().min(0).max(23).optional(),
  isDefault: z.boolean().optional(),
});
const IdOnlySchema = z.object({ warehouseId: UuidSchema });
const ReasonSchema = z.object({
  warehouseId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const MaintenanceSchema = z.object({
  warehouseId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const CapacitySchema = z.object({
  warehouseId: UuidSchema,
  capacityM3: z.number().nonnegative().optional(),
  capacityKg: z.number().nonnegative().optional(),
  usedCapacityM3: z.number().nonnegative().optional(),
  usedCapacityKg: z.number().nonnegative().optional(),
});

export class WarehouseValidator {
  static validateCreate(input: unknown): CreateWarehouseRequestDTO {
    try { return CreateSchema.parse(input) as CreateWarehouseRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Warehouse.create'); throw e; }
  }
  static validateUpdate(input: unknown): UpdateWarehouseRequestDTO {
    try { return UpdateSchema.parse(input) as UpdateWarehouseRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Warehouse.update'); throw e; }
  }
  static validateActivate(input: unknown): ActivateWarehouseRequestDTO {
    try { return IdOnlySchema.parse(input) as ActivateWarehouseRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Warehouse.activate'); throw e; }
  }
  static validateDeactivate(input: unknown): DeactivateWarehouseRequestDTO {
    try { return ReasonSchema.parse(input) as DeactivateWarehouseRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Warehouse.deactivate'); throw e; }
  }
  static validateStartMaintenance(input: unknown): StartMaintenanceRequestDTO {
    try { return MaintenanceSchema.parse(input) as StartMaintenanceRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Warehouse.startMaintenance'); throw e; }
  }
  static validateEndMaintenance(input: unknown): EndMaintenanceRequestDTO {
    try { return IdOnlySchema.parse(input) as EndMaintenanceRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Warehouse.endMaintenance'); throw e; }
  }
  static validateClose(input: unknown): CloseWarehouseRequestDTO {
    try { return ReasonSchema.parse(input) as CloseWarehouseRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Warehouse.close'); throw e; }
  }
  static validateArchive(input: unknown): ArchiveWarehouseRequestDTO {
    try { return ReasonSchema.parse(input) as ArchiveWarehouseRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Warehouse.archive'); throw e; }
  }
  static validateCapacity(input: unknown): UpdateCapacityRequestDTO {
    try { return CapacitySchema.parse(input) as UpdateCapacityRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Warehouse.updateCapacity'); throw e; }
  }
}
