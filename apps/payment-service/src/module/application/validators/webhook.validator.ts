import { z } from 'zod';

export const WebhookPayloadSchema = z.object({
  event: z.string().min(1),
  gateway: z.string().min(1),
  signature: z.string().min(1),
  payload: z.record(z.string(), z.unknown()),
}).strict();

export class WebhookValidator {
  static validate(input: unknown) {
    return WebhookPayloadSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return WebhookPayloadSchema.safeParse(input);
  }
}
