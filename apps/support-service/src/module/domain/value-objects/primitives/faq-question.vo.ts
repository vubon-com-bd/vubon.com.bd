/**
 * FaqQuestionVO — FAQ question text
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 5;
const MAX_LENGTH = 500;

export class FaqQuestionVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): FaqQuestionVO {
    BaseCodeVO.validateNonEmpty(raw, 'FaqQuestion');
    const trimmed = raw.trim().replace(/\s+/g, ' ');
    if (trimmed.length < MIN_LENGTH) {
      throw new ValidationError(
        `FaqQuestion too short (min ${MIN_LENGTH})`,
        'faqQuestion',
      );
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `FaqQuestion too long (max ${MAX_LENGTH})`,
        'faqQuestion',
      );
    }
    return new FaqQuestionVO(trimmed);
  }

  get isQuestion(): boolean {
    return this.value.trim().endsWith('?');
  }

  get wordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }
}
