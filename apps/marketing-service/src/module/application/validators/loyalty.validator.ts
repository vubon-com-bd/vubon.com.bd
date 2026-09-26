import { LoyaltySchema } from '@vubon/shared-schemas/marketing';

export class LoyaltyValidator {
  static validate(input: unknown) {
    return LoyaltySchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return LoyaltySchema.safeParse(input);
  }
}
