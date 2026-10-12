/**
 * AttemptNumber Value Object — 1-based delivery attempt counter
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DELIVERY } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class AttemptNumberVO extends BaseVO<number> {
  private constructor(value: number) { super(value); }

  static create(raw: number): AttemptNumberVO {
    if (!Number.isInteger(raw) || raw < 1) {
      throw new ValidationError('Attempt number must be a positive integer (1-based)', 'attemptNumber');
    }
    if (raw > DELIVERY.MAX_ATTEMPTS) {
      throw new ValidationError(`Attempt number exceeds max ${DELIVERY.MAX_ATTEMPTS}`, 'attemptNumber');
    }
    return new AttemptNumberVO(raw);
  }

  static reconstitute(raw: number): AttemptNumberVO { return new AttemptNumberVO(raw); }

  static first(): AttemptNumberVO { return new AttemptNumberVO(1); }

  next(): AttemptNumberVO { return AttemptNumberVO.create(this.value + 1); }
  isFirst(): boolean { return this.value === 1; }
  isLast(): boolean { return this.value === DELIVERY.MAX_ATTEMPTS; }

  static max(): number { return DELIVERY.MAX_ATTEMPTS; }
}
