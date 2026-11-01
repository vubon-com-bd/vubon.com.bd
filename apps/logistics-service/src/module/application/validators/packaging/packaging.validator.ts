import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreatePackagingRequestDTO,
  UpdatePackagingRequestDTO,
  PackagingActionRequestDTO,
  DeactivatePackagingRequestDTO,
  DiscontinuePackagingRequestDTO,
  AddStockRequestDTO,
  ConsumeStockRequestDTO,
  UpdateSizeRequestDTO,
} from '@application/dtos/requests/packaging/index.js';

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
const PType = z.enum(['box', 'envelope', 'bubble_wrap', 'poly_bag', 'paper_bag', 'tube', 'pallet', 'crate', 'custom']);
const PMaterial = z.enum(['cardboard', 'plastic', 'paper', 'wood', 'metal', 'glass', 'biodegradable', 'recycled']);

const CreateSchema = z.object({
  name: z.string().min(2).max(150),
  code: z.string().min(2).max(50),
  type: PType,
  material: PMaterial,
  lengthCm: z.number().positive().max(300),
  widthCm: z.number().positive().max(300),
  heightCm: z.number().positive().max(300),
  maxWeightKg: z.number().positive().max(500),
  cost: z.number().nonnegative().optional(),
  currency: z.string().min(3).max(5).optional(),
  imageUrl: z.string().url().optional(),
  isFragile: z.boolean(),
  isTemperatureControlled: z.boolean(),
  isRecyclable: z.boolean(),
  stock: z.number().int().nonnegative(),
  isDefault: z.boolean().optional(),
});
const UpdateSchema = z.object({
  packagingId: UuidSchema,
  name: z.string().min(2).max(150).optional(),
  cost: z.number().nonnegative().optional(),
  imageUrl: z.string().url().optional(),
  lengthCm: z.number().positive().max(300).optional(),
  widthCm: z.number().positive().max(300).optional(),
  heightCm: z.number().positive().max(300).optional(),
  maxWeightKg: z.number().positive().max(500).optional(),
  isFragile: z.boolean().optional(),
  isTemperatureControlled: z.boolean().optional(),
  isRecyclable: z.boolean().optional(),
  isDefault: z.boolean().optional(),
});
const IdOnlySchema = z.object({ packagingId: UuidSchema });
const ReasonSchema = z.object({
  packagingId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const StockSchema = z.object({
  packagingId: UuidSchema,
  quantity: z.number().int().positive(),
});
const SizeSchema = z.object({
  packagingId: UuidSchema,
  lengthCm: z.number().positive().max(300),
  widthCm: z.number().positive().max(300),
  heightCm: z.number().positive().max(300),
  maxWeightKg: z.number().positive().max(500),
});

export class PackagingValidator {
  static validateCreate(input: unknown): CreatePackagingRequestDTO {
    try { return CreateSchema.parse(input) as CreatePackagingRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Packaging.create'); throw e; }
  }
  static validateUpdate(input: unknown): UpdatePackagingRequestDTO {
    try { return UpdateSchema.parse(input) as UpdatePackagingRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Packaging.update'); throw e; }
  }
  static validateAction(input: unknown): PackagingActionRequestDTO {
    try { return IdOnlySchema.parse(input) as PackagingActionRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Packaging.action'); throw e; }
  }
  static validateDeactivate(input: unknown): DeactivatePackagingRequestDTO {
    try { return ReasonSchema.parse(input) as DeactivatePackagingRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Packaging.deactivate'); throw e; }
  }
  static validateDiscontinue(input: unknown): DiscontinuePackagingRequestDTO {
    try { return ReasonSchema.parse(input) as DiscontinuePackagingRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Packaging.discontinue'); throw e; }
  }
  static validateAddStock(input: unknown): AddStockRequestDTO {
    try { return StockSchema.parse(input) as AddStockRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Packaging.addStock'); throw e; }
  }
  static validateConsumeStock(input: unknown): ConsumeStockRequestDTO {
    try { return StockSchema.parse(input) as ConsumeStockRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Packaging.consumeStock'); throw e; }
  }
  static validateUpdateSize(input: unknown): UpdateSizeRequestDTO {
    try { return SizeSchema.parse(input) as UpdateSizeRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Packaging.updateSize'); throw e; }
  }
}
