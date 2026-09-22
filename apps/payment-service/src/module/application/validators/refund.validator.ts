import { RefundPaymentRequestSchema } from '@vubon/shared-schemas/business/payment';

export class RefundValidator {
  static validateRequest(input: unknown) {
    return RefundPaymentRequestSchema.parse(input);
  }

  static safeValidateRequest(input: unknown) {
    return RefundPaymentRequestSchema.safeParse(input);
  }
}
