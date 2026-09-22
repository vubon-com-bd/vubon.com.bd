import { CartSchema } from '@vubon/shared-schemas/cart';

export class CartValidator {
  static validate(input: unknown) {
    return CartSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return CartSchema.safeParse(input);
  }
}
