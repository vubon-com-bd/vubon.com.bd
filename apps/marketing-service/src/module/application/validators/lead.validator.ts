import { LeadCreateInputSchema } from '@vubon/shared-schemas/marketing';

export class LeadValidator {
  static validateCreate(input: unknown) {
    return LeadCreateInputSchema.parse(input);
  }

  static safeValidateCreate(input: unknown) {
    return LeadCreateInputSchema.safeParse(input);
  }
}
