import { PreferenceMatrixEntity } from '../entities/preference-matrix.entity';
import { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo';

export class PreferenceCheckerService {
  canSend(matrix: PreferenceMatrixEntity | null, channel: NotificationChannelVO): boolean {
    if (!matrix) return true;
    return matrix.isOptedIn(channel.value);
  }

  canSendAny(matrix: PreferenceMatrixEntity | null, channels: readonly NotificationChannelVO[]): boolean {
    if (!matrix) return true;
    return channels.some((ch) => matrix.isOptedIn(ch.value));
  }
}
