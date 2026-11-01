/**
 * ProviderMessageId Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 1;
const MAX_LENGTH = 256;

export class ProviderMessageIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProviderMessageIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ProviderMessageId cannot be empty', 'providerMessageId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new ValidationError(`ProviderMessageId too short`, 'providerMessageId');
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`ProviderMessageId exceeds ${MAX_LENGTH} chars`, 'providerMessageId');
    }
    return new ProviderMessageIdVO(trimmed);
  }

  static reconstitute(raw: string): ProviderMessageIdVO {
    return new ProviderMessageIdVO(raw);
  }
}
