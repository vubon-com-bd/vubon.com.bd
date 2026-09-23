import { CampaignCreateInputSchema } from '@vubon/shared-schemas/marketing';

export class CampaignValidator {
  static validateCreate(input: unknown) {
    return CampaignCreateInputSchema.parse(input);
  }

  static safeValidateCreate(input: unknown) {
    return CampaignCreateInputSchema.safeParse(input);
  }
}
