/**
 * CanEscalateSpecification — escalation eligibility
 * @module support-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { TicketEntity } from '../entities/ticket.entity';
import { TicketEscalationLevelVO } from '../value-objects/primitives/ticket-escalation-level.vo';

export interface CanEscalateContext {
  readonly ticket: TicketEntity;
  readonly currentLevel?: TicketEscalationLevelVO;
}

export class CanEscalateSpecification extends Specification<CanEscalateContext> {
  isSatisfiedBy(ctx: CanEscalateContext): boolean {
    if (!ctx.ticket) return false;
    if (ctx.ticket.isTerminal) return false;
    if (ctx.currentLevel?.isHighest()) return false;
    return true;
  }
}
