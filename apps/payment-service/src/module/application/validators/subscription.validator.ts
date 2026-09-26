import { CreateSubscriptionRequestSchema } from '../dtos/requests/subscription/create-subscription.dto';

export class SubscriptionValidator {
  static validateCreate(input: unknown) {
    return CreateSubscriptionRequestSchema.parse(input);
  }

  static safeValidateCreate(input: unknown) {
    return CreateSubscriptionRequestSchema.safeParse(input);
  }
}
