import { WebhookCreateRequestSchema } from '../dtos/requests';

export class WebhookValidator {
  static validate(input: unknown) {
    return WebhookCreateRequestSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return WebhookCreateRequestSchema.safeParse(input);
  }
}
