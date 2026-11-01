import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateReturnReasonRequestDTO,
  UpdateReturnReasonRequestDTO,
  ReturnReasonActionRequestDTO,
  DeactivateReturnReasonRequestDTO,
} from '@application/dtos/requests/return-reason/index.js';

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
const RRType = z.enum(['defective', 'not_as_described', 'wrong_item', 'size_issue', 'changed_mind', 'damaged_in_transit', 'late_delivery', 'quality_issue', 'refused', 'other']);
const LabelSchema = z.object({
  en: z.string().min(2).max(200),
  bn: z.string().min(2).max(200).optional(),
});

const CreateSchema = z.object({
  code: z.string().min(2).max(50),
  type: RRType,
  label: LabelSchema,
  description: z.string().max(2000).optional(),
  requiresPhoto: z.boolean(),
  autoApprove: z.boolean(),
  priority: z.number().int().nonnegative().optional(),
});
const UpdateSchema = z.object({
  reasonId: UuidSchema,
  label: LabelSchema.optional(),
  description: z.string().max(2000).optional(),
  requiresPhoto: z.boolean().optional(),
  autoApprove: z.boolean().optional(),
  priority: z.number().int().nonnegative().optional(),
});
const IdOnlySchema = z.object({ reasonId: UuidSchema });
const DeactivateSchema = z.object({
  reasonId: UuidSchema,
  reason: z.string().max(1000).optional(),
});

export class ReturnReasonValidator {
  static validateCreate(input: unknown): CreateReturnReasonRequestDTO {
    try { return CreateSchema.parse(input) as CreateReturnReasonRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ReturnReason.create'); throw e; }
  }
  static validateUpdate(input: unknown): UpdateReturnReasonRequestDTO {
    try { return UpdateSchema.parse(input) as UpdateReturnReasonRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ReturnReason.update'); throw e; }
  }
  static validateAction(input: unknown): ReturnReasonActionRequestDTO {
    try { return IdOnlySchema.parse(input) as ReturnReasonActionRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ReturnReason.action'); throw e; }
  }
  static validateDeactivate(input: unknown): DeactivateReturnReasonRequestDTO {
    try { return DeactivateSchema.parse(input) as DeactivateReturnReasonRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ReturnReason.deactivate'); throw e; }
  }
}
