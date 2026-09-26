/**
 * FaqIdVO — FAQ entry identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'faq_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class FaqIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): FaqIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('FaqId must be a string', 'faqId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `FaqId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'faqId',
      );
    }
    return new FaqIdVO(trimmed);
  }

  static generate(): FaqIdVO {
    const suffix = Date.now().toString(36);
    return FaqIdVO.create(`${PREFIX}${suffix}`);
  }
}
