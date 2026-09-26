import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';
import { ActionTypeVO } from '../value-objects/primitives/action-type.vo';
import { ActionUrlVO } from '../value-objects/primitives/action-url.vo';

export interface NotificationActionEntityProps {
  readonly notificationId: NotificationIdVO;
  readonly type: ActionTypeVO;
  readonly url: ActionUrlVO;
  readonly label: string;
}

export class NotificationActionEntity extends BaseEntity<string> {
  private readonly _notificationId: NotificationIdVO;
  private readonly _type: ActionTypeVO;
  private readonly _url: ActionUrlVO;
  private readonly _label: string;

  private constructor(
    id: string,
    props: NotificationActionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._notificationId = props.notificationId;
    this._type = props.type;
    this._url = props.url;
    this._label = props.label;
  }

  static create(props: NotificationActionEntityProps): NotificationActionEntity {
    const now = new Date().toISOString();
    return new NotificationActionEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: NotificationActionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): NotificationActionEntity {
    return new NotificationActionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get notificationId(): NotificationIdVO { return this._notificationId; }
  get type(): ActionTypeVO { return this._type; }
  get url(): ActionUrlVO { return this._url; }
  get label(): string { return this._label; }
}
