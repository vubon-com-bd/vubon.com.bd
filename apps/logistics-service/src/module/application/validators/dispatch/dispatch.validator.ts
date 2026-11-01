import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateDispatchRequestDTO,
  AssignDispatchRequestDTO,
  DispatchActionRequestDTO,
  DispatchWithManifestRequestDTO,
  FailDispatchRequestDTO,
  CancelDispatchRequestDTO,
  ReturnDispatchRequestDTO,
} from '@application/dtos/requests/dispatch/index.js';

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
const DispatchTypeEnum = z.enum(['single', 'batch', 'bulk', 'urgent', 'scheduled']);

const CreateSchema = z.object({
  type: DispatchTypeEnum,
  shipmentIds: z.array(UuidSchema).min(1).max(500),
  courierId: z.string().min(1).max(100).optional(),
  vehicleId: UuidSchema.optional(),
  driverId: UuidSchema.optional(),
  warehouseId: UuidSchema.optional(),
  totalWeight: z.number().nonnegative().optional(),
  estimatedArrivalAt: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
});
const AssignSchema = z.object({
  dispatchId: UuidSchema,
  courierId: z.string().min(1).max(100).optional(),
  vehicleId: UuidSchema.optional(),
  driverId: UuidSchema.optional(),
});
const IdOnlySchema = z.object({ dispatchId: UuidSchema });
const ManifestSchema = z.object({
  dispatchId: UuidSchema,
  manifestUrl: z.string().url().optional(),
});
const FailSchema = z.object({
  dispatchId: UuidSchema,
  reason: z.string().min(1).max(1000),
});
const CancelSchema = z.object({
  dispatchId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const ReturnSchema = z.object({
  dispatchId: UuidSchema,
  reason: z.string().max(1000).optional(),
});

export class DispatchValidator {
  static validateCreate(input: unknown): CreateDispatchRequestDTO {
    try { return CreateSchema.parse(input) as CreateDispatchRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Dispatch.create'); throw e; }
  }
  static validateAssign(input: unknown): AssignDispatchRequestDTO {
    try { return AssignSchema.parse(input) as AssignDispatchRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Dispatch.assign'); throw e; }
  }
  static validateDispatch(input: unknown): DispatchWithManifestRequestDTO {
    try { return ManifestSchema.parse(input) as DispatchWithManifestRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Dispatch.dispatch'); throw e; }
  }
  static validateAction(input: unknown): DispatchActionRequestDTO {
    try { return IdOnlySchema.parse(input) as DispatchActionRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Dispatch.action'); throw e; }
  }
  static validateFail(input: unknown): FailDispatchRequestDTO {
    try { return FailSchema.parse(input) as FailDispatchRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Dispatch.fail'); throw e; }
  }
  static validateCancel(input: unknown): CancelDispatchRequestDTO {
    try { return CancelSchema.parse(input) as CancelDispatchRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Dispatch.cancel'); throw e; }
  }
  static validateReturn(input: unknown): ReturnDispatchRequestDTO {
    try { return ReturnSchema.parse(input) as ReturnDispatchRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Dispatch.return'); throw e; }
  }
}
