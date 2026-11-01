import { z } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import type {
  CreateShippingMethodRequestDTO,
  UpdateShippingMethodRequestDTO,
  ShippingMethodActionRequestDTO,
  DeactivateShippingMethodRequestDTO,
  SuspendShippingMethodRequestDTO,
} from '@application/dtos/requests/shipping-method/index.js';

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
const SMType = z.enum(['standard', 'express', 'same_day', 'next_day', 'overnight', 'economy', 'international', 'freight', 'pickup', 'local_delivery']);
const SMRate = z.enum(['flat', 'weight_based', 'price_based', 'quantity_based', 'distance_based', 'tiered']);

const CreateSchema = z.object({
  name: z.string().min(2).max(150),
  code: z.string().min(2).max(50),
  displayName: z.string().min(2).max(200),
  type: SMType,
  rateType: SMRate,
  baseCost: z.number().nonnegative(),
  freeAbove: z.number().nonnegative().optional(),
  currency: z.string().min(3).max(5),
  minDeliveryDays: z.number().int().nonnegative(),
  maxDeliveryDays: z.number().int().positive(),
  maxWeightKg: z.number().positive().optional(),
  maxDimensionsCm: z.number().positive().optional(),
  codEnabled: z.boolean(),
  trackingEnabled: z.boolean(),
  coverageZones: z.array(z.string()).max(100).optional(),
  couriers: z.array(z.string()).max(50).optional(),
  isDefault: z.boolean().optional(),
});
const UpdateSchema = z.object({
  methodId: UuidSchema,
  displayName: z.string().min(2).max(200).optional(),
  baseCost: z.number().nonnegative().optional(),
  freeAbove: z.number().nonnegative().optional(),
  minDeliveryDays: z.number().int().nonnegative().optional(),
  maxDeliveryDays: z.number().int().positive().optional(),
  maxWeightKg: z.number().positive().optional(),
  maxDimensionsCm: z.number().positive().optional(),
  codEnabled: z.boolean().optional(),
  trackingEnabled: z.boolean().optional(),
  coverageZones: z.array(z.string()).max(100).optional(),
  couriers: z.array(z.string()).max(50).optional(),
  isDefault: z.boolean().optional(),
});
const IdOnlySchema = z.object({ methodId: UuidSchema });
const ReasonSchema = z.object({
  methodId: UuidSchema,
  reason: z.string().max(1000).optional(),
});
const SuspendSchema = z.object({
  methodId: UuidSchema,
  reason: z.string().min(1).max(1000),
});

export class ShippingMethodValidator {
  static validateCreate(input: unknown): CreateShippingMethodRequestDTO {
    try { return CreateSchema.parse(input) as CreateShippingMethodRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ShippingMethod.create'); throw e; }
  }
  static validateUpdate(input: unknown): UpdateShippingMethodRequestDTO {
    try { return UpdateSchema.parse(input) as UpdateShippingMethodRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ShippingMethod.update'); throw e; }
  }
  static validateAction(input: unknown): ShippingMethodActionRequestDTO {
    try { return IdOnlySchema.parse(input) as ShippingMethodActionRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ShippingMethod.action'); throw e; }
  }
  static validateDeactivate(input: unknown): DeactivateShippingMethodRequestDTO {
    try { return ReasonSchema.parse(input) as DeactivateShippingMethodRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ShippingMethod.deactivate'); throw e; }
  }
  static validateSuspend(input: unknown): SuspendShippingMethodRequestDTO {
    try { return SuspendSchema.parse(input) as SuspendShippingMethodRequestDTO; }
    catch (e) { if (isZodError(e)) throw toAppError(e, 'ShippingMethod.suspend'); throw e; }
  }
}
