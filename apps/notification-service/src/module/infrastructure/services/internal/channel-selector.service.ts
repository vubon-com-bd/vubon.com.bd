import { Injectable } from '@nestjs/common';
import type { NotificationChannelVO } from '../../../domain/value-objects/primitives/notification-channel.vo';
import type { PreferenceMatrixEntity } from '../../../domain/entities/preference-matrix.entity';

@Injectable()
export class ChannelSelectorService {
  select(
    requested: readonly NotificationChannelVO[],
    preferences: PreferenceMatrixEntity | null,
  ): readonly NotificationChannelVO[] {
    if (!preferences) return requested;
    return requested.filter((ch) => preferences.isOptedIn(ch.value));
  }
}
