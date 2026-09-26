import { PreferenceMatrixVO } from '../value-objects/composites/preference-matrix.vo';
import { NotificationPriorityVO } from '../value-objects/primitives/notification-priority.vo';

export interface SelectChannelsInput {
  readonly preferences: PreferenceMatrixVO;
  readonly priority: NotificationPriorityVO;
  readonly availableChannels: readonly string[];
}

const PRIORITY_CHANNEL_MAP: Readonly<Record<string, readonly string[]>> = {
  critical: ['in_app', 'push', 'email', 'sms', 'webhook'],
  high: ['in_app', 'push', 'email'],
  normal: ['in_app', 'push', 'email'],
  low: ['in_app', 'email'],
  silent: ['in_app'],
};

export class ChannelSelectorService {
  select(input: SelectChannelsInput): readonly string[] {
    const allowed = PRIORITY_CHANNEL_MAP[input.priority.value] ?? ['in_app'];
    return input.availableChannels.filter(
      (ch) => allowed.includes(ch) && input.preferences.isOptedIn(ch),
    );
  }
}
