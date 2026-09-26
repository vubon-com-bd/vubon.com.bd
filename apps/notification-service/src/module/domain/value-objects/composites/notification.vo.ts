import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { NotificationIdVO } from '../primitives/notification-id.vo';
import { NotificationTypeVO } from '../primitives/notification-type.vo';
import { NotificationChannelVO } from '../primitives/notification-channel.vo';
import { NotificationStatusVO } from '../primitives/notification-status.vo';
import { NotificationPriorityVO } from '../primitives/notification-priority.vo';
import { NotificationCategoryVO } from '../primitives/notification-category.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface NotificationProps {
  readonly id: NotificationIdVO;
  readonly userId: UserIdVO;
  readonly type: NotificationTypeVO;
  readonly channel: NotificationChannelVO;
  readonly status: NotificationStatusVO;
  readonly priority: NotificationPriorityVO;
  readonly category: NotificationCategoryVO;
  readonly createdAt: Date;
}

export class NotificationVO extends BaseVO<NotificationProps> {
  private constructor(props: NotificationProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: NotificationProps): NotificationVO {
    return new NotificationVO(props);
  }

  get id(): NotificationIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): NotificationTypeVO { return this.value.type; }
  get channel(): NotificationChannelVO { return this.value.channel; }
  get status(): NotificationStatusVO { return this.value.status; }
  get priority(): NotificationPriorityVO { return this.value.priority; }
  get category(): NotificationCategoryVO { return this.value.category; }
  get createdAt(): Date { return this.value.createdAt; }
}
