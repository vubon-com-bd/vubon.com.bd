/**
 * SupportSummaryVO — Human-readable support summary
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TicketIdVO } from '../primitives/ticket-id.vo';
import { TicketStatusVO } from '../primitives/ticket-status.vo';
import { TicketPriorityVO } from '../primitives/ticket-priority.vo';

export interface SupportSummaryVOProps {
  readonly ticketId: TicketIdVO;
  readonly status: TicketStatusVO;
  readonly priority: TicketPriorityVO;
  readonly summary: string;
  readonly agentName?: string;
  readonly lastUpdatedAt: string;
}

export class SupportSummaryVO extends BaseVO<Readonly<SupportSummaryVOProps>> {
  private constructor(props: SupportSummaryVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SupportSummaryVOProps): SupportSummaryVO {
    if (!props.ticketId || !props.status) {
      throw new ValidationError(
        'SupportSummaryVO requires ticketId and status',
        'supportSummary',
      );
    }
    if (typeof props.summary !== 'string' || props.summary.trim().length === 0) {
      throw new ValidationError(
        'SupportSummaryVO summary required',
        'supportSummary',
      );
    }
    return new SupportSummaryVO(props);
  }

  get ticketId(): TicketIdVO {
    return this.value.ticketId;
  }

  get status(): TicketStatusVO {
    return this.value.status;
  }

  get isOpen(): boolean {
    return this.value.status.isActive();
  }

  get isUrgent(): boolean {
    return this.value.priority.isUrgentOrHigher();
  }

  get hasAgent(): boolean {
    return this.value.agentName !== undefined;
  }

  toDisplayString(): string {
    const agent = this.value.agentName ? ` by ${this.value.agentName}` : '';
    return `[${this.value.status.value}] ${this.value.summary}${agent}`;
  }
}
