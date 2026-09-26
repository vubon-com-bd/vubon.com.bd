/**
 * FeedbackIdVO — Feedback record identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'fb_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class FeedbackIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): FeedbackIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('FeedbackId must be a string', 'feedbackId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `FeedbackId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'feedbackId',
      );
    }
    return new FeedbackIdVO(trimmed);
  }

  static generate(): FeedbackIdVO {
    const suffix = Date.now().toString(36);
    return FeedbackIdVO.create(`${PREFIX}${suffix}`);
  }
}
