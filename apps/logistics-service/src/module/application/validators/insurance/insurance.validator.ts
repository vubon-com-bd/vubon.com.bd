import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateInsuranceRequestDTO,
  InsuranceActionRequestDTO,
  CancelInsuranceRequestDTO,
  SubmitClaimRequestDTO,
  ReviewClaimRequestDTO,
  ApproveClaimRequestDTO,
  RejectClaimRequestDTO,
  PayClaimRequestDTO,
} from '@application/dtos/requests/insurance/index.js';

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
const IType = z.enum(['basic', 'standard', 'premium', 'full_coverage', 'third_party']);
const ICov = z.enum(['loss', 'damage', 'theft', 'delay', 'partial_loss', 'total_loss', 'natural_disaster']);

const CreateSchema = z.object({
  shipmentId: UuidSchema.optional(),
  orderId: UuidSchema.optional(),
  userId: UuidSchema.optional(),
  type: IType,
  coverages: z.array(ICov).min(1).max(7),
  declaredValue: z.number().positive(),
  currency: z.string().min(3).max(5),
  startsAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  provider: z.string().max(100).optional(),
  notes: z.string().max(2000).optional(),
});
const IdOnlySchema = z.object({ insuranceId: UuidSchema });
const CancelSchema = z.object({
  insuranceId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const ClaimSchema = z.object({
  insuranceId: UuidSchema,
  claimId: UuidSchema,
  claimNumber: z.string().min(1).max(50),
  reason: z.string().min(1).max(1000),
  description: z.string().max(2000).optional(),
  images: z.array(z.string().url()).max(5).optional(),
  amount: z.number().positive(),
});
const ReviewSchema = z.object({
  insuranceId: UuidSchema,
  claimId: z.string().min(1),
});
const ApproveSchema = z.object({
  insuranceId: UuidSchema,
  claimId: z.string().min(1),
  approvedAmount: z.number().nonnegative(),
});
const RejectSchema = z.object({
  insuranceId: UuidSchema,
  claimId: z.string().min(1),
  reason: z.string().min(1).max(1000),
});
const PaySchema = z.object({
  insuranceId: UuidSchema,
  claimId: z.string().min(1),
});

export class InsuranceValidator {
  static validateCreate(input: unknown): CreateInsuranceRequestDTO {
    try { return CreateSchema.parse(input) as CreateInsuranceRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Insurance.create'); throw e; }
  }
  static validateAction(input: unknown): InsuranceActionRequestDTO {
    try { return IdOnlySchema.parse(input) as InsuranceActionRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Insurance.action'); throw e; }
  }
  static validateCancel(input: unknown): CancelInsuranceRequestDTO {
    try { return CancelSchema.parse(input) as CancelInsuranceRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Insurance.cancel'); throw e; }
  }
  static validateSubmitClaim(input: unknown): SubmitClaimRequestDTO {
    try { return ClaimSchema.parse(input) as SubmitClaimRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Insurance.submitClaim'); throw e; }
  }
  static validateReviewClaim(input: unknown): ReviewClaimRequestDTO {
    try { return ReviewSchema.parse(input) as ReviewClaimRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Insurance.reviewClaim'); throw e; }
  }
  static validateApproveClaim(input: unknown): ApproveClaimRequestDTO {
    try { return ApproveSchema.parse(input) as ApproveClaimRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Insurance.approveClaim'); throw e; }
  }
  static validateRejectClaim(input: unknown): RejectClaimRequestDTO {
    try { return RejectSchema.parse(input) as RejectClaimRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Insurance.rejectClaim'); throw e; }
  }
  static validatePayClaim(input: unknown): PayClaimRequestDTO {
    try { return PaySchema.parse(input) as PayClaimRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Insurance.payClaim'); throw e; }
  }
}
