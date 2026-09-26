/**
 * TicketNumberVO — Human-readable ticket number (TKT-xxxxx)
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const TICKET_NUMBER_PREFIX = 'TKT';
const TICKET_NUMBER_PAD = 6;
const TICKET_NUMBER_PATTERN = /^TKT-\d{6}$/;

export class TicketNumberVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TicketNumberVO {
    BaseCodeVO.validateNonEmpty(raw, 'TicketNumber');
    const trimmed = raw.trim().toUpperCase();
    if (!TICKET_NUMBER_PATTERN.test(trimmed)) {
      throw new ValidationError(
        'TicketNumber must match TKT-XXXXXX',
        'ticketNumber',
      );
    }
    return new TicketNumberVO(trimmed);
  }

  static fromSequence(sequence: number): TicketNumberVO {
    if (!Number.isInteger(sequence) || sequence < 1) {
      throw new ValidationError(
        'TicketNumber sequence must be a positive integer',
        'ticketNumber',
      );
    }
    const padded = String(sequence).padStart(TICKET_NUMBER_PAD, '0');
    return new TicketNumberVO(`${TICKET_NUMBER_PREFIX}-${padded}`);
  }

  get sequence(): number {
    return Number.parseInt(this.value.replace(`${TICKET_NUMBER_PREFIX}-`, ''), 10);
  }
}
