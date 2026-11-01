/**
 * PricingValidator — inline Zod for pricing-specific rules
 * @module product-service/application/validators
 *
 * Note: shared-schemas doesn't cover pricing commands — inline here.
 */
import { z, ZodError } from 'zod';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { PRICING, PRICING_TYPE } from '@vubon/shared-constants/business';

const UpdatePriceSchema = z
  .object({
    productId: z.string().min(1),
    variantId: z.string().min(1).optional(),
    sellingPrice: z.number().min(PRICING.MIN_PRICE).max(PRICING.MAX_PRICE),
    compareAtPrice: z.number().min(0).optional(),
    costPrice: z.number().min(0).optional(),
    reason: z.string().max(500).optional(),
    actorId: z.string().optional(),
    actorRole: z.enum(['admin', 'vendor', 'staff']).optional(),
    bypassMinMargin: z.boolean().optional(),
  })
  .strict();

const CreatePricingRuleSchema = z
  .object({
    name: z.string().min(1).max(150),
    type: z.enum(Object.values(PRICING_TYPE) as [string, ...string[]]),
    conditions: z.record(z.string(), z.unknown()),
    priceAdjustment: z.number(),
    isPercent: z.boolean(),
    priority: z.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
    actorId: z.string().optional(),
  })
  .strict();

function zodToAppError(err: ZodError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    })),
  );
}

export class PricingValidator {
  static validateUpdatePrice(input: unknown) {
    try {
      return UpdatePriceSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Pricing.update');
      throw e;
    }
  }

  static validateCreateRule(input: unknown) {
    try {
      return CreatePricingRuleSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Pricing.createRule');
      throw e;
    }
  }
}
