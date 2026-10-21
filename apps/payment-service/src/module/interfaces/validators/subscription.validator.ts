/**
 * SubscriptionHttpValidator — wraps Application validator → BadRequestException
 * @module payment-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';
import { SubscriptionValidator as AppSubscriptionValidator } from '@application/validators/subscription.validator';

export class SubscriptionHttpValidator {
  static validateCreate(body: unknown): void {
    try {
      AppSubscriptionValidator.validateCreate(body);
    } catch (err) {
      throw toBadRequest(err, 'Invalid subscription payload');
    }
  }
}

function toBadRequest(err: unknown, fallback: string): BadRequestException {
  const message = err instanceof Error ? err.message : fallback;
  return new BadRequestException(message);
}
