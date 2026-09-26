import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { NotificationDeliveryEntity } from '../entities/notification-delivery.entity';

export class CanRetrySpecification extends Specification<NotificationDeliveryEntity> {
  isSatisfiedBy(candidate: NotificationDeliveryEntity): boolean {
    if (candidate.status.isDelivered()) return false;
    if (candidate.attemptCount.hasExceededLimit()) return false;
    return true;
  }
}
