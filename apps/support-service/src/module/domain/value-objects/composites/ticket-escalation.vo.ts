import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { TicketEscalationIdVO } from '../primitives/ticket-escalation-id.vo';
import { TicketEscalationLevelVO } from '../primitives/ticket-escalation-level.vo';
import { TicketIdVO } from '../primitives/ticket-id.vo';

export interface TicketEscalationProps {
  readonly id: TicketEscalationIdVO;
  readonly ticketId: TicketIdVO;
  readonly level: TicketEscalationLevelVO;
  readonly reason: string;
  readonly escalatedAt: Date;
}

export class TicketEscalationVO extends BaseVO<TicketEscalationProps> {
  private constructor(props: TicketEscalationProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TicketEscalationProps): TicketEscalationVO {
    return new TicketEscalationVO(props);
  }

  get id(): TicketEscalationIdVO { return this.value.id; }
  get ticketId(): TicketIdVO { return this.value.ticketId; }
  get level(): TicketEscalationLevelVO { return this.value.level; }
  get reason(): string { return this.value.reason; }
  get escalatedAt(): Date { return this.value.escalatedAt; }
}
