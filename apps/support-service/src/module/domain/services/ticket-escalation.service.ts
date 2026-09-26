/**
 * TicketEscalationService — Decide and produce escalations
 * @module support-service/domain/services
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { TicketEntity } from '../entities/ticket.entity';
import { TicketEscalationEntity } from '../entities/ticket-escalation.entity';
import { TicketEscalationIdVO } from '../value-objects/primitives/ticket-escalation-id.vo';
import { TicketEscalationLevelVO } from '../value-objects/primitives/ticket-escalation-level.vo';
import { AgentIdVO } from '../value-objects/primitives/agent-id.vo';

export interface EscalationPolicy {
  readonly level: TicketEscalationLevelVO;
  readonly reason: string;
}

export class TicketEscalationService {
  /**
   * Determine if a ticket should be escalated based on state.
   */
  shouldEscalate(
    ticket: TicketEntity,
    elapsedMinutes: number,
    slaTargetMinutes: number,
  ): EscalationPolicy | null {
    if (ticket.isTerminal) return null;

    // Over SLA target → escalate to level 3
    if (elapsedMinutes > slaTargetMinutes) {
      return {
        level: TicketEscalationLevelVO.create(3),
        reason: 'sla_breach',
      };
    }

    // At risk (>= 80%) → level 1
    if (elapsedMinutes >= slaTargetMinutes * 0.8) {
      return {
        level: TicketEscalationLevelVO.create(1),
        reason: 'sla_at_risk',
      };
    }

    // Critical priority + still unassigned → level 2
    if (ticket.priority.isUrgentOrHigher() && !ticket.isAssigned) {
      return {
        level: TicketEscalationLevelVO.create(2),
        reason: 'critical_unassigned',
      };
    }

    return null;
  }

  /**
   * Produce an escalation entity from a policy.
   */
  createEscalation(
    ticket: TicketEntity,
    policy: EscalationPolicy,
    escalatedBy: AgentIdVO | undefined,
    now: string,
  ): TicketEscalationEntity {
    if (ticket.isTerminal) {
      throw new BusinessRuleError(
        'Cannot escalate terminal tickets',
        'ticketEscalation.terminal',
      );
    }
    return TicketEscalationEntity.create({
      id: TicketEscalationIdVO.generate(),
      ticketId: ticket.id,
      level: policy.level,
      reason: policy.reason,
      escalatedBy,
      now,
    });
  }
}
