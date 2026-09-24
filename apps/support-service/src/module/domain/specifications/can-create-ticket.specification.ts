import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { TicketEntity } from '../entities/ticket.entity';

export class CanCreateTicketSpecification extends Specification<TicketEntity> {
  isSatisfiedBy(candidate: TicketEntity): boolean {
    if (candidate.isDeleted()) return false;
    return candidate.userId.value.length > 0;
  }
}
