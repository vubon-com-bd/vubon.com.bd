import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { NotificationEntity } from '../entities/notification.entity';
import { PreferenceMatrixEntity } from '../entities/preference-matrix.entity';

export interface CanSendCandidate {
  readonly notification: NotificationEntity;
  readonly preferences: PreferenceMatrixEntity | null;
}

export class CanSendSpecification extends Specification<CanSendCandidate> {
  isSatisfiedBy(candidate: CanSendCandidate): boolean {
    const { notification, preferences } = candidate;
    if (!notification) return false;
    if (preferences && !preferences.isOptedIn(notification.channel.value)) {
      return false;
    }
    return true;
  }
}
