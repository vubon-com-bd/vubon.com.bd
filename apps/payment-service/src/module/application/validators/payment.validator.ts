import { ProcessPaymentRequestSchema } from '@vubon/shared-schemas/business/payment';

export class PaymentValidator {
  static validateInitiate(input: unknown) {
    return ProcessPaymentRequestSchema.parse(input);
  }

  static safeValidateInitiate(input: unknown) {
    return ProcessPaymentRequestSchema.safeParse(input);
  }
}
