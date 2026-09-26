/**
 * FaqAnswerVO — FAQ answer body
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VALIDATION } from '@vubon/shared-constants/common';

const MIN_LENGTH = 10;
const MAX_LENGTH = VALIDATION.DESCRIPTION_MAX_LENGTH;

export class FaqAnswerVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): FaqAnswerVO {
    BaseCodeVO.validateNonEmpty(raw, 'FaqAnswer');
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new ValidationError(
        `FaqAnswer too short (min ${MIN_LENGTH})`,
        'faqAnswer',
      );
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `FaqAnswer too long (max ${MAX_LENGTH})`,
        'faqAnswer',
      );
    }
    return new FaqAnswerVO(trimmed);
  }

  get wordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }

  get isDetailed(): boolean {
    return this.wordCount > 100;
  }
}
