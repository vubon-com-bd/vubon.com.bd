/**
 * GatewayReference Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * External ID assigned by the payment gateway (e.g. Stripe charge ID,
 * bKash trxID). Never the internal PaymentId.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TRANSACTION_LIMIT } from '@vubon/shared-constants/business/payment';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const REF_PATTERN = /^[A-Za-z0-9._:-]+$/;

export class GatewayReferenceVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): GatewayReferenceVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('GatewayReference cannot be empty', 'gatewayReference');
    }
    const trimmed = raw.trim();
    if (trimmed.length > TRANSACTION_LIMIT.REFERENCE_MAX_LENGTH) {
      throw new ValidationError(
        `GatewayReference exceeds ${TRANSACTION_LIMIT.REFERENCE_MAX_LENGTH} chars`,
        'gatewayReference',
      );
    }
    if (!REF_PATTERN.test(trimmed)) {
      throw new ValidationError(
        'GatewayReference may contain A-Z, 0-9, ".", "_", ":", "-"',
        'gatewayReference',
      );
    }
    return new GatewayReferenceVO(trimmed);
  }

  static reconstitute(raw: string): GatewayReferenceVO {
    return new GatewayReferenceVO(raw);
  }
}
