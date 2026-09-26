import { PromotionSchema } from '@vubon/shared-schemas/marketing';

export class PromotionValidator {
  static validate(input: unknown) {
    return PromotionSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return PromotionSchema.safeParse(input);
  }
}
