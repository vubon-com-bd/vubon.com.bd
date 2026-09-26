/**
 * TicketSubjectVO — Short subject line
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const SUBJECT_MIN_LENGTH = 3;
const SUBJECT_MAX_LENGTH = 200;
const FORBIDDEN_PATTERNS = [/<script/i, /javascript:/i, /on\w+=/i];

export class TicketSubjectVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TicketSubjectVO {
    BaseCodeVO.validateNonEmpty(raw, 'TicketSubject');
    const trimmed = raw.trim().replace(/\s+/g, ' ');
    if (trimmed.length < SUBJECT_MIN_LENGTH) {
      throw new ValidationError(
        `TicketSubject too short (min ${SUBJECT_MIN_LENGTH})`,
        'ticketSubject',
      );
    }
    if (trimmed.length > SUBJECT_MAX_LENGTH) {
      throw new ValidationError(
        `TicketSubject too long (max ${SUBJECT_MAX_LENGTH})`,
        'ticketSubject',
      );
    }
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(trimmed)) {
        throw new ValidationError(
          'TicketSubject contains forbidden content',
          'ticketSubject',
        );
      }
    }
    return new TicketSubjectVO(trimmed);
  }

  get truncated(): string {
    return this.value.length > 50
      ? `${this.value.slice(0, 47)}...`
      : this.value;
  }
}
