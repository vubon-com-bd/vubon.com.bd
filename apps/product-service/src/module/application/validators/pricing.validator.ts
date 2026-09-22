import { z } from 'zod';

export class PricingValidator {
  static validateUpdatePrice(input: unknown) {
    return z
      .object({
        amount: z.number().nonnegative(),
        currency: z.string().length(3).optional(),
      })
      .parse(input);
  }
}
