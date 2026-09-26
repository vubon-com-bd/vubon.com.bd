/**
 * CanRateSpecification — satisfaction rating eligibility
 * @module support-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { TicketEntity } from '../entities/ticket.entity';
import { TICKET_STATUS } from '@vubon/shared-constants/support';

export interface CanRateContext {
  readonly ticket: TicketEntity;
  readonly alreadyRated: boolean;
  readonly ratedByUserId?: string;
  readonly raterUserId?: string;
}

export class CanRateSpecification extends Specification<CanRateContext> {
  isSatisfiedBy(ctx: CanRateContext): boolean {
    if (!ctx.ticket) return false;
    if (ctx.alreadyRated) return false;
    const status = ctx.ticket.status.value;
    if (status !== TICKET_STATUS.RESOLVED && status !== TICKET_STATUS.CLOSED) {
      return false;
    }
    if (ctx.raterUserId && ctx.ratedByUserId && ctx.raterUserId !== ctx.ratedByUserId) {
      return false;
    }
    return true;
  }
}
