import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { NotificationChannelVO } from '../primitives/notification-channel.vo';

export interface NotificationSummaryProps {
  readonly userId: UserIdVO;
  readonly total: number;
  readonly unread: number;
  readonly byChannel: Readonly<Record<string, number>>;
  readonly lastNotificationAt: Date | null;
}

export class NotificationSummaryVO extends BaseVO<NotificationSummaryProps> {
  private constructor(props: NotificationSummaryProps) {
    super(
      Object.freeze({
        ...props,
        byChannel: Object.freeze({ ...props.byChannel }),
      }),
    );
  }

  static create(props: NotificationSummaryProps): NotificationSummaryVO {
    return new NotificationSummaryVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get total(): number { return this.value.total; }
  get unread(): number { return this.value.unread; }
  get byChannel(): Readonly<Record<string, number>> { return this.value.byChannel; }
  get lastNotificationAt(): Date | null { return this.value.lastNotificationAt; }

  countForChannel(channel: NotificationChannelVO): number {
    return this.value.byChannel[channel.value] ?? 0;
  }
}
