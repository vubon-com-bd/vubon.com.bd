import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateInventoryLocationRequestDTO,
  UpdateInventoryLocationRequestDTO,
  InventoryLocationActionRequestDTO,
  DeactivateInventoryLocationRequestDTO,
  QuarantineInventoryLocationRequestDTO,
  ArchiveInventoryLocationRequestDTO,
  AddInventoryStockRequestDTO,
  RemoveInventoryStockRequestDTO,
} from '@application/dtos/requests/inventory-location/index.js';

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
const CodeSchema = z.string().min(3).max(50).regex(/^[A-Z0-9][A-Z0-9-]{1,48}[A-Z0-9]$/);
const NameSchema = z.string().min(2).max(150);

const CreateSchema = z.object({
  warehouseId: UuidSchema,
  code: CodeSchema,
  name: NameSchema,
  zone: z.string().min(1).max(50),
  aisle: z.string().max(50).optional(),
  rack: z.string().max(50).optional(),
  shelf: z.string().max(50).optional(),
  bin: z.string().max(50).optional(),
  barcode: z.string().max(100).optional(),
  maxCapacityKg: z.number().nonnegative().optional(),
  maxCapacityM3: z.number().nonnegative().optional(),
  isPickable: z.boolean().optional(),
  priority: z.number().int().nonnegative().optional(),
});
const UpdateSchema = z.object({
  inventoryLocationId: UuidSchema,
  name: NameSchema.optional(),
  zone: z.string().min(1).max(50).optional(),
  aisle: z.string().max(50).optional(),
  rack: z.string().max(50).optional(),
  shelf: z.string().max(50).optional(),
  bin: z.string().max(50).optional(),
  barcode: z.string().max(100).optional(),
  maxCapacityKg: z.number().nonnegative().optional(),
  maxCapacityM3: z.number().nonnegative().optional(),
  isPickable: z.boolean().optional(),
  priority: z.number().int().nonnegative().optional(),
});
const IdOnlySchema = z.object({ inventoryLocationId: UuidSchema });
const ReasonOptionalSchema = z.object({
  inventoryLocationId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const ReasonRequiredSchema = z.object({
  inventoryLocationId: UuidSchema,
  reason: z.string().min(1).max(1000),
});
const StockSchema = z.object({
  inventoryLocationId: UuidSchema,
  weightKg: z.number().positive(),
  volumeM3: z.number().nonnegative().optional(),
});

export class InventoryLocationValidator {
  static validateCreate(input: unknown): CreateInventoryLocationRequestDTO {
    try { return CreateSchema.parse(input) as CreateInventoryLocationRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'InventoryLocation.create'); throw e; }
  }
  static validateUpdate(input: unknown): UpdateInventoryLocationRequestDTO {
    try { return UpdateSchema.parse(input) as UpdateInventoryLocationRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'InventoryLocation.update'); throw e; }
  }
  static validateAction(input: unknown): InventoryLocationActionRequestDTO {
    try { return IdOnlySchema.parse(input) as InventoryLocationActionRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'InventoryLocation.action'); throw e; }
  }
  static validateDeactivate(input: unknown): DeactivateInventoryLocationRequestDTO {
    try { return ReasonOptionalSchema.parse(input) as DeactivateInventoryLocationRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'InventoryLocation.deactivate'); throw e; }
  }
  static validateQuarantine(input: unknown): QuarantineInventoryLocationRequestDTO {
    try { return ReasonRequiredSchema.parse(input) as QuarantineInventoryLocationRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'InventoryLocation.quarantine'); throw e; }
  }
  static validateArchive(input: unknown): ArchiveInventoryLocationRequestDTO {
    try { return ReasonOptionalSchema.parse(input) as ArchiveInventoryLocationRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'InventoryLocation.archive'); throw e; }
  }
  static validateAddStock(input: unknown): AddInventoryStockRequestDTO {
    try { return StockSchema.parse(input) as AddInventoryStockRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'InventoryLocation.addStock'); throw e; }
  }
  static validateRemoveStock(input: unknown): RemoveInventoryStockRequestDTO {
    try { return StockSchema.parse(input) as RemoveInventoryStockRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'InventoryLocation.removeStock'); throw e; }
  }
}
