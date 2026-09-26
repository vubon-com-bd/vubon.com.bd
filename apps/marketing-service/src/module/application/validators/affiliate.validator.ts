import { AffiliateSchema } from '@vubon/shared-schemas/marketing';

export class AffiliateValidator {
  static validate(input: unknown) {
    return AffiliateSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return AffiliateSchema.safeParse(input);
  }
}
