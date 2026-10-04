/**
 * RefundHttpValidator
 * @module payment-service/interfaces/validators
 */
import { BadRequestException } from '@nestjs/common';

export interface RefundHttpValidationResult {
  readonly paymentId: string;
  readonly amount?: number;
  readonly reason?: string;
  readonly idempotencyKey?: string;
}

export class RefundHttpValidator {
  static validateRequest(body: unknown): RefundHttpValidationResult {
    if (typeof body !== 'object' || body === null) {
      throw new BadRequestException('Request body must be an object');
    }
    const b = body as Record<string, unknown>;
    const paymentId = b['paymentId'];
    if (typeof paymentId !== 'string' || paymentId.length === 0) {
      throw new BadRequestException('paymentId is required');
    }
    const amount = b['amount'];
    if (amount !== undefined) {
      if (typeof amount !== 'number' || amount <= 0) {
        throw new BadRequestException('amount must be a positive number');
      }
    }
    const reason = b['reason'];
    const idempotencyKey = b['idempotencyKey'];
    return {
      paymentId,
      amount: typeof amount === 'number' ? amount : undefined,
      reason: typeof reason === 'string' ? reason : undefined,
      idempotencyKey: typeof idempotencyKey === 'string' ? idempotencyKey : undefined,
    };
  }
}
