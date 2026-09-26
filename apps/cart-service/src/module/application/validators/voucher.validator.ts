import { VoucherSchema } from '@vubon/shared-schemas/cart';

export class VoucherValidator {
  static validate(input: unknown) {
    return VoucherSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return VoucherSchema.safeParse(input);
  }
}
