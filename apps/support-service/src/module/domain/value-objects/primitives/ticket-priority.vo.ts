/**
 * TicketPriorityVO — Ticket priority level
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  TICKET_PRIORITY,
  TICKET_PRIORITY_WEIGHT,
} from '@vubon/shared-constants/support';

export type TicketPriorityValue =
  (typeof TICKET_PRIORITY)[keyof typeof TICKET_PRIORITY];

const PRIORITY_SET: ReadonlySet<string> = new Set(
  Object.values(TICKET_PRIORITY),
);

export class TicketPriorityVO extends BaseTypeVO<TicketPriorityValue> {
  private constructor(value: TicketPriorityValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return PRIORITY_SET;
  }

  static create(raw: string): TicketPriorityVO {
    const normalized = raw.trim().toLowerCase();
    if (!PRIORITY_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid ticket priority: ${raw}`,
        'ticketPriority',
      );
    }
    return new TicketPriorityVO(normalized as TicketPriorityValue);
  }

  static default(): TicketPriorityVO {
    return new TicketPriorityVO(TICKET_PRIORITY.NORMAL);
  }

  get weight(): number {
    return TICKET_PRIORITY_WEIGHT[this.value] ?? 0;
  }

  isHigherThan(other: TicketPriorityVO): boolean {
    return this.weight > other.weight;
  }

  isUrgentOrHigher(): boolean {
    return (
      this.value === TICKET_PRIORITY.URGENT ||
      this.value === TICKET_PRIORITY.CRITICAL
    );
  }

  escalate(): TicketPriorityVO {
    const order: TicketPriorityValue[] = [
      TICKET_PRIORITY.LOW,
      TICKET_PRIORITY.NORMAL,
      TICKET_PRIORITY.HIGH,
      TICKET_PRIORITY.URGENT,
      TICKET_PRIORITY.CRITICAL,
    ];
    const idx = order.indexOf(this.value);
    if (idx === -1 || idx === order.length - 1) {
      return this;
    }
    return new TicketPriorityVO(order[idx + 1]);
  }
}
