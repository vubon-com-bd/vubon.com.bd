/**
 * TicketDescriptionVO — Full description body
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VALIDATION } from '@vubon/shared-constants/common';

const DESCRIPTION_MIN_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = VALIDATION.DESCRIPTION_MAX_LENGTH;

export class TicketDescriptionVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TicketDescriptionVO {
    BaseCodeVO.validateNonEmpty(raw, 'TicketDescription');
    const trimmed = raw.trim();
    if (trimmed.length < DESCRIPTION_MIN_LENGTH) {
      throw new ValidationError(
        `TicketDescription too short (min ${DESCRIPTION_MIN_LENGTH})`,
        'ticketDescription',
      );
    }
    if (trimmed.length > DESCRIPTION_MAX_LENGTH) {
      throw new ValidationError(
        `TicketDescription too long (max ${DESCRIPTION_MAX_LENGTH})`,
        'ticketDescription',
      );
    }
    return new TicketDescriptionVO(trimmed);
  }

  get wordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }

  get isLong(): boolean {
    return this.wordCount > 500;
  }
}
