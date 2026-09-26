/**
 * CanCreateTicketSpecification — business rule for ticket creation
 * @module support-service/domain/specifications
 *
 * Registry: pure logic, no framework, no DB
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { TicketEntity } from '../entities/ticket.entity';

export interface CanCreateTicketContext {
  readonly ticket: TicketEntity;
  readonly userHasActiveBlock: boolean;
  readonly openTicketCount: number;
  readonly maxOpenTickets: number;
}

export class CanCreateTicketSpecification extends Specification<CanCreateTicketContext> {
  isSatisfiedBy(ctx: CanCreateTicketContext): boolean {
    if (!ctx.ticket) return false;
    if (ctx.userHasActiveBlock) return false;
    if (ctx.openTicketCount >= ctx.maxOpenTickets) return false;
    if (ctx.ticket.subject.value.trim().length === 0) return false;
    return true;
  }
}
