import { NotificationDeliveryEntity } from '../entities/notification-delivery.entity';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo';
import { DeliveryErrorVO } from '../value-objects/primitives/delivery-error.vo';
import { ProviderMessageIdVO } from '../value-objects/primitives/provider-message-id.vo';

export class DeliveryTrackerService {
  recordSuccess(
    delivery: NotificationDeliveryEntity,
    providerMessageId: string,
  ): NotificationDeliveryEntity {
    return delivery.markDelivered(ProviderMessageIdVO.create(providerMessageId));
  }

  recordFailure(
    delivery: NotificationDeliveryEntity,
    error: string,
  ): NotificationDeliveryEntity {
    return delivery.recordFailure(DeliveryErrorVO.create(error));
  }

  isFinal(delivery: NotificationDeliveryEntity): boolean {
    return (
      delivery.status.isDelivered() ||
      delivery.status.value === DeliveryStatusVO.create('failed').value
    );
  }
}
