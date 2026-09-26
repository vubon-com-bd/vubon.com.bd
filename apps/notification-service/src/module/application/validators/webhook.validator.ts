import { CreateWebhookSchema, UpdateWebhookSchema } from '../dtos/requests/webhook';

export class WebhookValidator {
  static validateCreate(input: unknown) {
    return CreateWebhookSchema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return UpdateWebhookSchema.parse(input);
  }
}
