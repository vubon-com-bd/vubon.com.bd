/**
 * CanReopenSpecification — reopen eligibility
 * @module support-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { TicketEntity } from '../entities/ticket.entity';
import { TICKET_STATUS } from '@vubon/shared-constants/support';

export interface CanReopenContext {
  readonly ticket: TicketEntity;
  readonly reopenWindowHours?: number;
  readonly closedAt?: string;
  readonly now?: string;
}

export class CanReopenSpecification extends Specification<CanReopenContext> {
  isSatisfiedBy(ctx: CanReopenContext): boolean {
    if (!ctx.ticket) return false;
    const status = ctx.ticket.status.value;
    if (status !== TICKET_STATUS.CLOSED && status !== TICKET_STATUS.RESOLVED) {
      return false;
    }
    if (!ctx.reopenWindowHours || !ctx.closedAt || !ctx.now) return true;
    const closedMs = Date.parse(ctx.closedAt);
    const nowMs = Date.parse(ctx.now);
    if (Number.isNaN(closedMs) || Number.isNaN(nowMs)) return true;
    const hoursOpen = (nowMs - closedMs) / (1000 * 60 * 60);
    return hoursOpen <= ctx.reopenWindowHours;
  }
}
