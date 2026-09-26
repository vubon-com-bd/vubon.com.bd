/**
 * TicketIdVO — Ticket aggregate identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 * Rules: immutable, validated, no framework import
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const TICKET_ID_PREFIX = 'tkt_';
const TICKET_ID_MIN_LENGTH = 8;
const TICKET_ID_MAX_LENGTH = 64;
const TICKET_ID_PATTERN = /^[a-zA-Z0-9_-]+$/;

export class TicketIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TicketIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TicketId must be a string', 'ticketId');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('TicketId cannot be empty', 'ticketId');
    }
    if (trimmed.length < TICKET_ID_MIN_LENGTH) {
      throw new ValidationError(
        `TicketId too short (min ${TICKET_ID_MIN_LENGTH})`,
        'ticketId',
      );
    }
    if (trimmed.length > TICKET_ID_MAX_LENGTH) {
      throw new ValidationError(
        `TicketId too long (max ${TICKET_ID_MAX_LENGTH})`,
        'ticketId',
      );
    }
    if (!TICKET_ID_PATTERN.test(trimmed)) {
      throw new ValidationError(
        'TicketId contains invalid characters',
        'ticketId',
      );
    }
    return new TicketIdVO(trimmed);
  }

  static generate(seed: string): TicketIdVO {
    if (!seed || seed.trim().length === 0) {
      throw new ValidationError('TicketId seed required', 'ticketId');
    }
    const normalized = seed.trim().toLowerCase().replace(/\s+/g, '_');
    return TicketIdVO.create(`${TICKET_ID_PREFIX}${normalized}`);
  }

  get isGenerated(): boolean {
    return this.value.startsWith(TICKET_ID_PREFIX);
  }

  get short(): string {
    return this.value.slice(0, 12);
  }
}
