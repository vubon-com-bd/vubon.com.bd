import type { SubscriptionEntity } from '../entities/subscription.entity';

export class SubscriptionLifecycleService {
  canRenew(subscription: SubscriptionEntity, now: Date = new Date()): boolean {
    if (subscription.status.value !== 'active') return false;
    return subscription.currentPeriodTo.getTime() <= now.getTime() + 86_400_000;
  }

  canCancel(subscription: SubscriptionEntity): boolean {
    return subscription.status.value !== 'cancelled';
  }
}
