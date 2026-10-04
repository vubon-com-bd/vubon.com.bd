/**
 * GatewayPaymentId Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX = 255;

export class GatewayPaymentIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): GatewayPaymentIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Gateway payment id must be a string', 'gatewayPaymentId');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('Gateway payment id cannot be empty', 'gatewayPaymentId');
    }
    if (trimmed.length > MAX) {
      throw new ValidationError(`Gateway payment id exceeds ${MAX} chars`, 'gatewayPaymentId');
    }
    return new GatewayPaymentIdVO(trimmed);
  }

  static reconstitute(raw: string): GatewayPaymentIdVO {
    return new GatewayPaymentIdVO(raw);
  }
}
