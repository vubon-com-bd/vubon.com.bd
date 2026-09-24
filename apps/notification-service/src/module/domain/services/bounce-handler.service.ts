import { NotificationDeliveryEntity } from '../entities/notification-delivery.entity';

export interface BounceInfo {
  readonly notificationId: string;
  readonly bounceType: 'hard' | 'soft' | 'complaint';
  readonly reason: string;
}

export class BounceHandlerService {
  shouldDisableDevice(bounce: BounceInfo): boolean {
    return bounce.bounceType === 'hard' || bounce.bounceType === 'complaint';
  }

  shouldRetry(bounce: BounceInfo): boolean {
    return bounce.bounceType === 'soft';
  }

  apply(delivery: NotificationDeliveryEntity, bounce: BounceInfo): NotificationDeliveryEntity {
    void bounce;
    return delivery;
  }
}
