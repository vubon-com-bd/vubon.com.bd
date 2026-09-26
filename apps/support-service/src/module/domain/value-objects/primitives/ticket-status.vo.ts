/**
 * TicketStatusVO — Ticket lifecycle status
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseStatusVO
 * Values: TICKET_STATUS from @shared/constants/support
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TICKET_STATUS } from '@vubon/shared-constants/support';

export type TicketStatusValue =
  (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];

const TICKET_STATUS_SET: ReadonlySet<string> = new Set(
  Object.values(TICKET_STATUS),
);

const TERMINAL_STATUSES: ReadonlySet<string> = new Set<string>([
  TICKET_STATUS.CLOSED,
  TICKET_STATUS.CANCELLED,
]);

const ACTIVE_STATUSES: ReadonlySet<string> = new Set<string>([
  TICKET_STATUS.OPEN,
  TICKET_STATUS.PENDING,
  TICKET_STATUS.IN_PROGRESS,
  TICKET_STATUS.ON_HOLD,
  TICKET_STATUS.WAITING_CUSTOMER,
  TICKET_STATUS.WAITING_AGENT,
  TICKET_STATUS.REOPENED,
]);

const TRANSITIONS: Readonly<Record<string, ReadonlySet<string>>> = {
  [TICKET_STATUS.OPEN]: new Set<string>([
    TICKET_STATUS.PENDING,
    TICKET_STATUS.IN_PROGRESS,
    TICKET_STATUS.ON_HOLD,
    TICKET_STATUS.WAITING_AGENT,
    TICKET_STATUS.CANCELLED,
  ]),
  [TICKET_STATUS.PENDING]: new Set<string>([
    TICKET_STATUS.IN_PROGRESS,
    TICKET_STATUS.WAITING_CUSTOMER,
    TICKET_STATUS.WAITING_AGENT,
    TICKET_STATUS.ON_HOLD,
    TICKET_STATUS.CANCELLED,
  ]),
  [TICKET_STATUS.IN_PROGRESS]: new Set<string>([
    TICKET_STATUS.ON_HOLD,
    TICKET_STATUS.WAITING_CUSTOMER,
    TICKET_STATUS.WAITING_AGENT,
    TICKET_STATUS.RESOLVED,
    TICKET_STATUS.CANCELLED,
  ]),
  [TICKET_STATUS.ON_HOLD]: new Set<string>([
    TICKET_STATUS.IN_PROGRESS,
    TICKET_STATUS.WAITING_CUSTOMER,
    TICKET_STATUS.WAITING_AGENT,
    TICKET_STATUS.CANCELLED,
  ]),
  [TICKET_STATUS.WAITING_CUSTOMER]: new Set<string>([
    TICKET_STATUS.IN_PROGRESS,
    TICKET_STATUS.WAITING_AGENT,
    TICKET_STATUS.RESOLVED,
    TICKET_STATUS.CANCELLED,
  ]),
  [TICKET_STATUS.WAITING_AGENT]: new Set<string>([
    TICKET_STATUS.IN_PROGRESS,
    TICKET_STATUS.WAITING_CUSTOMER,
    TICKET_STATUS.RESOLVED,
    TICKET_STATUS.CANCELLED,
  ]),
  [TICKET_STATUS.RESOLVED]: new Set<string>([
    TICKET_STATUS.CLOSED,
    TICKET_STATUS.REOPENED,
  ]),
  [TICKET_STATUS.REOPENED]: new Set<string>([
    TICKET_STATUS.IN_PROGRESS,
    TICKET_STATUS.ON_HOLD,
    TICKET_STATUS.WAITING_AGENT,
    TICKET_STATUS.CANCELLED,
  ]),
  [TICKET_STATUS.CLOSED]: new Set<string>([TICKET_STATUS.REOPENED]),
  [TICKET_STATUS.CANCELLED]: new Set<string>([]),
};

export class TicketStatusVO extends BaseStatusVO<TicketStatusValue> {
  private constructor(value: TicketStatusValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TICKET_STATUS_SET;
  }

  static create(raw: string): TicketStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!TICKET_STATUS_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid ticket status: ${raw}`,
        'ticketStatus',
      );
    }
    return new TicketStatusVO(normalized as TicketStatusValue);
  }

  static open(): TicketStatusVO {
    return new TicketStatusVO(TICKET_STATUS.OPEN);
  }

  static closed(): TicketStatusVO {
    return new TicketStatusVO(TICKET_STATUS.CLOSED);
  }

  isTerminal(): boolean {
    return TERMINAL_STATUSES.has(this.value);
  }

  isActive(): boolean {
    return ACTIVE_STATUSES.has(this.value);
  }

  canTransitionTo(next: TicketStatusVO): boolean {
    if (this.isTerminal()) return false;
    if (next.equals(this)) return false;
    const allowed = TRANSITIONS[this.value];
    if (!allowed) return false;
    return allowed.has(next.value);
  }
}
