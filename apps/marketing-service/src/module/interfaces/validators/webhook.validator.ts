import { z } from 'zod';

export const WebhookPayloadSchema = z.object({
  event: z.string().min(1),
  data: z.record(z.unknown()),
  timestamp: z.string().datetime().optional(),
});

export class WebhookValidator {
  static validate(input: unknown) {
    return WebhookPayloadSchema.parse(input);
  }

  static safeValidate(input: unknown) {
    return WebhookPayloadSchema.safeParse(input);
  }
}
