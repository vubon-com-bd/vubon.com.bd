import { CouponSchema } from '@vubon/shared-schemas/cart';

export class CouponValidator {
  static validate(input: unknown) {
    return CouponSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return CouponSchema.safeParse(input);
  }
}
