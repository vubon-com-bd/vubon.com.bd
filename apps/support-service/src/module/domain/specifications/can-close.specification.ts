/**
 * CanCloseSpecification — closure eligibility
 * @module support-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { TicketEntity } from '../entities/ticket.entity';
import { TICKET_STATUS } from '@vubon/shared-constants/support';

export interface CanCloseContext {
  readonly ticket: TicketEntity;
}

export class CanCloseSpecification extends Specification<CanCloseContext> {
  isSatisfiedBy(ctx: CanCloseContext): boolean {
    if (!ctx.ticket) return false;
    const status = ctx.ticket.status.value;
    if (status === TICKET_STATUS.CLOSED) return false;
    if (status === TICKET_STATUS.CANCELLED) return false;
    return true;
  }
}
