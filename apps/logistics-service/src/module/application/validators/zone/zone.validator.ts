import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateZoneRequestDTO,
  UpdateZoneRequestDTO,
  ZoneActionRequestDTO,
  DeactivateZoneRequestDTO,
  RestrictZoneRequestDTO,
  SuspendZoneRequestDTO,
  ClassifyPostalCodeRequestDTO,
} from '@application/dtos/requests/zone/index.js';

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
const ZType = z.enum(['national', 'division', 'district', 'upazila', 'city', 'area', 'postal_code', 'custom_polygon']);
const ZPricing = z.enum(['flat', 'weight_based', 'distance_based', 'tiered', 'zone_based']);

const CreateSchema = z.object({
  code: z.string().min(2).max(50),
  name: z.string().min(2).max(150),
  type: ZType,
  pricingType: ZPricing,
  parentId: UuidSchema.optional(),
  postalCodes: z.array(z.string()).max(1000).optional(),
  districts: z.array(z.string()).max(64).optional(),
  divisions: z.array(z.string()).max(8).optional(),
  shippingCost: z.number().nonnegative(),
  freeAbove: z.number().nonnegative().optional(),
  currency: z.string().min(3).max(5),
  minDeliveryDays: z.number().int().nonnegative(),
  maxDeliveryDays: z.number().int().positive(),
  codEnabled: z.boolean(),
  codCharge: z.number().nonnegative().optional(),
  codMaxAmount: z.number().nonnegative().optional(),
  isRemote: z.boolean(),
});
const UpdateSchema = z.object({
  zoneId: UuidSchema,
  name: z.string().min(2).max(150).optional(),
  shippingCost: z.number().nonnegative().optional(),
  freeAbove: z.number().nonnegative().optional(),
  minDeliveryDays: z.number().int().nonnegative().optional(),
  maxDeliveryDays: z.number().int().positive().optional(),
  codEnabled: z.boolean().optional(),
  codCharge: z.number().nonnegative().optional(),
  codMaxAmount: z.number().nonnegative().optional(),
  postalCodes: z.array(z.string()).max(1000).optional(),
  districts: z.array(z.string()).max(64).optional(),
  divisions: z.array(z.string()).max(8).optional(),
  isRemote: z.boolean().optional(),
});
const IdOnlySchema = z.object({ zoneId: UuidSchema });
const ReasonSchema = z.object({
  zoneId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const RestrictSchema = z.object({
  zoneId: UuidSchema,
  reason: z.string().min(1).max(1000),
});
const ClassifySchema = z.object({
  postalCode: z.string().max(20).optional(),
  district: z.string().max(100).optional(),
  division: z.string().max(100).optional(),
});

export class ZoneValidator {
  static validateCreate(input: unknown): CreateZoneRequestDTO {
    try { return CreateSchema.parse(input) as CreateZoneRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Zone.create'); throw e; }
  }
  static validateUpdate(input: unknown): UpdateZoneRequestDTO {
    try { return UpdateSchema.parse(input) as UpdateZoneRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Zone.update'); throw e; }
  }
  static validateAction(input: unknown): ZoneActionRequestDTO {
    try { return IdOnlySchema.parse(input) as ZoneActionRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Zone.action'); throw e; }
  }
  static validateDeactivate(input: unknown): DeactivateZoneRequestDTO {
    try { return ReasonSchema.parse(input) as DeactivateZoneRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Zone.deactivate'); throw e; }
  }
  static validateRestrict(input: unknown): RestrictZoneRequestDTO {
    try { return RestrictSchema.parse(input) as RestrictZoneRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Zone.restrict'); throw e; }
  }
  static validateSuspend(input: unknown): SuspendZoneRequestDTO {
    try { return ReasonSchema.parse(input) as SuspendZoneRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Zone.suspend'); throw e; }
  }
  static validateClassify(input: unknown): ClassifyPostalCodeRequestDTO {
    try { return ClassifySchema.parse(input) as ClassifyPostalCodeRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'Zone.classify'); throw e; }
  }
}
