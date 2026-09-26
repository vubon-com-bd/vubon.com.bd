/**
 * TicketTypeVO — Ticket classification type
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TICKET_TYPE } from '@vubon/shared-constants/support';

export type TicketTypeValue = (typeof TICKET_TYPE)[keyof typeof TICKET_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(Object.values(TICKET_TYPE));

const PRIORITY_TYPES: ReadonlySet<string> = new Set([
  'complaint' as TicketTypeValue,
  'refund' as TicketTypeValue,
  'technical' as TicketTypeValue,
].filter((v) => TYPE_SET.has(v)));

export class TicketTypeVO extends BaseTypeVO<TicketTypeValue> {
  private constructor(value: TicketTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): TicketTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid ticket type: ${raw}`,
        'ticketType',
      );
    }
    return new TicketTypeVO(normalized as TicketTypeValue);
  }

  isHighPriority(): boolean {
    return PRIORITY_TYPES.has(this.value);
  }
}
