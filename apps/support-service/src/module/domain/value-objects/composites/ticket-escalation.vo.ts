/**
 * TicketEscalationVO — Composite view of an escalation
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TicketEscalationIdVO } from '../primitives/ticket-escalation-id.vo';
import { TicketEscalationLevelVO } from '../primitives/ticket-escalation-level.vo';
import { AgentIdVO } from '../primitives/agent-id.vo';

export interface TicketEscalationVOProps {
  readonly id: TicketEscalationIdVO;
  readonly level: TicketEscalationLevelVO;
  readonly reason: string;
  readonly escalatedBy?: AgentIdVO;
}

export class TicketEscalationVO extends BaseVO<Readonly<TicketEscalationVOProps>> {
  private constructor(props: TicketEscalationVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: TicketEscalationVOProps): TicketEscalationVO {
    if (!props.id || !props.level) {
      throw new ValidationError(
        'TicketEscalationVO requires id and level',
        'ticketEscalation',
      );
    }
    if (typeof props.reason !== 'string' || props.reason.trim().length === 0) {
      throw new ValidationError(
        'TicketEscalationVO reason required',
        'ticketEscalation',
      );
    }
    return new TicketEscalationVO(props);
  }

  get id(): TicketEscalationIdVO {
    return this.value.id;
  }

  get level(): TicketEscalationLevelVO {
    return this.value.level;
  }

  get reason(): string {
    return this.value.reason;
  }

  get isHighest(): boolean {
    return this.value.level.isHighest();
  }

  get isFirstLevel(): boolean {
    return this.value.level.isFirst();
  }
}
