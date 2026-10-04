/**
 * GatewaySignature Value Object — used for webhook/callback verification
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX = 500;

export class GatewaySignatureVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): GatewaySignatureVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Signature must be a string', 'signature');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('Signature cannot be empty', 'signature');
    }
    if (trimmed.length > MAX) {
      throw new ValidationError(`Signature exceeds ${MAX} chars`, 'signature');
    }
    return new GatewaySignatureVO(trimmed);
  }

  static reconstitute(raw: string): GatewaySignatureVO {
    return new GatewaySignatureVO(raw);
  }
}
