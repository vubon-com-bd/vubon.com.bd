import { CartItemSchema } from '@vubon/shared-schemas/cart';

export class CartItemValidator {
  static validate(input: unknown) {
    return CartItemSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return CartItemSchema.safeParse(input);
  }
}
