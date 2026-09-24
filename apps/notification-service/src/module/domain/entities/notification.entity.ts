import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';
import { NotificationTypeVO } from '../value-objects/primitives/notification-type.vo';
import { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo';
import { NotificationStatusVO } from '../value-objects/primitives/notification-status.vo';
import { NotificationPriorityVO } from '../value-objects/primitives/notification-priority.vo';
import { NotificationCategoryVO } from '../value-objects/primitives/notification-category.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { ReadStatusVO } from '../value-objects/primitives/read-status.vo';

export interface NotificationEntityProps {
  readonly userId: UserIdVO;
  readonly type: NotificationTypeVO;
  readonly channel: NotificationChannelVO;
  readonly status: NotificationStatusVO;
  readonly priority: NotificationPriorityVO;
  readonly category: NotificationCategoryVO;
  readonly readStatus: ReadStatusVO;
  readonly readAt: Date | null;
}

export class NotificationEntity extends AggregateRoot<NotificationIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: NotificationTypeVO;
  private readonly _channel: NotificationChannelVO;
  private readonly _status: NotificationStatusVO;
  private readonly _priority: NotificationPriorityVO;
  private readonly _category: NotificationCategoryVO;
  private readonly _readStatus: ReadStatusVO;
  private readonly _readAt: Date | null;

  private constructor(
    id: NotificationIdVO,
    props: NotificationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._channel = props.channel;
    this._status = props.status;
    this._priority = props.priority;
    this._category = props.category;
    this._readStatus = props.readStatus;
    this._readAt = props.readAt;
  }

  static create(props: NotificationEntityProps): NotificationEntity {
    const now = new Date().toISOString();
    const id = NotificationIdVO.create(crypto.randomUUID());
    return new NotificationEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: NotificationIdVO,
    props: NotificationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): NotificationEntity {
    return new NotificationEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markAsRead(): NotificationEntity {
    if (this._readStatus.isRead()) return this;
    const now = new Date();
    return new NotificationEntity(
      this.id,
      { ...this._toProps(), readStatus: ReadStatusVO.create('read'), readAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): NotificationTypeVO { return this._type; }
  get channel(): NotificationChannelVO { return this._channel; }
  get status(): NotificationStatusVO { return this._status; }
  get priority(): NotificationPriorityVO { return this._priority; }
  get category(): NotificationCategoryVO { return this._category; }
  get readStatus(): ReadStatusVO { return this._readStatus; }
  get readAt(): Date | null { return this._readAt; }
  get isRead(): boolean { return this._readStatus.isRead(); }

  private _toProps(): NotificationEntityProps {
    return {
      userId: this._userId,
      type: this._type,
      channel: this._channel,
      status: this._status,
      priority: this._priority,
      category: this._category,
      readStatus: this._readStatus,
      readAt: this._readAt,
    };
  }
}
