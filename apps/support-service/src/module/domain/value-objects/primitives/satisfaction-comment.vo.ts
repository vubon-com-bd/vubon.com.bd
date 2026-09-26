/**
 * SatisfactionCommentVO — Optional feedback comment
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VALIDATION } from '@vubon/shared-constants/common';

const MIN_LENGTH = 3;
const MAX_LENGTH = VALIDATION.COMMENT_MAX_LENGTH;

export class SatisfactionCommentVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SatisfactionCommentVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('SatisfactionComment must be a string', 'satisfactionComment');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new ValidationError(
        `SatisfactionComment too short (min ${MIN_LENGTH})`,
        'satisfactionComment',
      );
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `SatisfactionComment too long (max ${MAX_LENGTH})`,
        'satisfactionComment',
      );
    }
    return new SatisfactionCommentVO(trimmed);
  }

  static empty(): SatisfactionCommentVO {
    return new SatisfactionCommentVO('');
  }

  get isEmpty(): boolean {
    return this.value.length === 0;
  }

  get isNegative(): boolean {
    const negWords = ['bad', 'worst', 'terrible', 'awful', 'poor', 'useless'];
    const lower = this.value.toLowerCase();
    return negWords.some((w) => lower.includes(w));
  }
}
