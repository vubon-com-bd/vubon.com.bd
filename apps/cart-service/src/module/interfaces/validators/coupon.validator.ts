import { z } from 'zod';

export const ApplyCouponHttpSchema = z.object({
  code: z.string().min(4).max(32).transform((v) => v.toUpperCase()),
}).strict();

export class CouponValidator {
  static validateApply(input: unknown): void {
    ApplyCouponHttpSchema.parse(input);
  }
}
