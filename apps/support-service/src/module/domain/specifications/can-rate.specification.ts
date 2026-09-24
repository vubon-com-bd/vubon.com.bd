import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { TicketEntity } from '../entities/ticket.entity';

export class CanRateSpecification extends Specification<TicketEntity> {
  isSatisfiedBy(candidate: TicketEntity): boolean {
    return ['resolved', 'closed'].includes(candidate.status.value);
  }
}
