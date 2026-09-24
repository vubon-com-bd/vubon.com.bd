import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { TicketEntity } from '../entities/ticket.entity';

export class CanCloseSpecification extends Specification<TicketEntity> {
  isSatisfiedBy(candidate: TicketEntity): boolean {
    return ['resolved', 'closed'].includes(candidate.status.value) === false
      ? candidate.status.value === 'resolved'
      : false;
  }
}
