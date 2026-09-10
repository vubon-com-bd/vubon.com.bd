import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';

export const CheckoutValidationSchema = BaseSchema.extend({
  validationId: z.string().uuid(),
  checkoutId: z.string().uuid(),
  rules: z.array(
    z.object({
      field: z.string(),
      rule: z.string(),
      params: z.array(z.unknown()).optional(),
      message: z.string(),
    })
  ),
  isValid: z.boolean().default(false),
  errors: z.array(
    z.object({
      field: z.string(),
      message: z.string(),
      code: z.string(),
      value: z.unknown().optional(),
    })
  ),
  warnings: z.array(
    z.object({
      field: z.string(),
      message: z.string(),
      code: z.string(),
      value: z.unknown().optional(),
    })
  ),
  validatedAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
