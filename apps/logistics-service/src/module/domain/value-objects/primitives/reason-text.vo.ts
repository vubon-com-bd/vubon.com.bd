/**
 * ReasonText Value Object — free-form reason for cancels/fails
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ReasonTextVO extends BaseVO<string> {
  private static readonly MAX_LENGTH = 500;
  private static readonly MIN_LENGTH = 2;

  private constructor(value: string) { super(value); }

  static create(raw: string): ReasonTextVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Reason must be a string', 'reason');
    }
    const trimmed = raw.trim();
    if (trimmed.length < ReasonTextVO.MIN_LENGTH) {
      throw new ValidationError(`Reason must be at least ${ReasonTextVO.MIN_LENGTH} chars`, 'reason');
    }
    if (trimmed.length > ReasonTextVO.MAX_LENGTH) {
      throw new ValidationError(`Reason exceeds max ${ReasonTextVO.MAX_LENGTH} chars`, 'reason');
    }
    return new ReasonTextVO(trimmed);
  }

  static reconstitute(raw: string): ReasonTextVO { return new ReasonTextVO(raw); }

  get length(): number { return this.value.length; }
  static max(): number { return ReasonTextVO.MAX_LENGTH; }
}
