/**
 * CanAssignSpecification — check if agent can be assigned to a ticket
 * @module support-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { TicketEntity } from '../entities/ticket.entity';
import { SupportAgentEntity } from '../entities/support-agent.entity';

export interface CanAssignContext {
  readonly ticket: TicketEntity;
  readonly agent: SupportAgentEntity;
}

export class CanAssignSpecification extends Specification<CanAssignContext> {
  isSatisfiedBy(ctx: CanAssignContext): boolean {
    if (!ctx.ticket || !ctx.agent) return false;
    if (ctx.ticket.isTerminal) return false;
    if (!ctx.agent.canTakeTicket) return false;
    if (ctx.ticket.assignedAgentId?.equals(ctx.agent.id)) return false;
    return true;
  }
}
