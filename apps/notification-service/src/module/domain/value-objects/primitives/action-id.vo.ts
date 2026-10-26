/**
 * ActionId Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 64;

export class ActionIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ActionIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ActionId cannot be empty', 'actionId');
    }
    const trimmed = raw.trim();
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`ActionId exceeds ${MAX_LENGTH} chars`, 'actionId');
    }
    return new ActionIdVO(trimmed);
  }

  static reconstitute(raw: string): ActionIdVO {
    return new ActionIdVO(raw);
  }
}
