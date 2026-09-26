import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { EmailAddressVO } from '../value-objects/primitives/email-address.vo';
import { PhoneNumberVO } from '../value-objects/primitives/phone-number.vo';
import { DeviceTokenVO } from '../value-objects/primitives/device-token.vo';

export interface NotificationRecipientEntityProps {
  readonly notificationId: NotificationIdVO;
  readonly userId: UserIdVO;
  readonly email: EmailAddressVO | null;
  readonly phone: PhoneNumberVO | null;
  readonly deviceTokens: readonly DeviceTokenVO[];
}

export class NotificationRecipientEntity extends BaseEntity<string> {
  private readonly _notificationId: NotificationIdVO;
  private readonly _userId: UserIdVO;
  private readonly _email: EmailAddressVO | null;
  private readonly _phone: PhoneNumberVO | null;
  private readonly _deviceTokens: readonly DeviceTokenVO[];

  private constructor(
    id: string,
    props: NotificationRecipientEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._notificationId = props.notificationId;
    this._userId = props.userId;
    this._email = props.email;
    this._phone = props.phone;
    this._deviceTokens = Object.freeze([...props.deviceTokens]);
  }

  static create(props: NotificationRecipientEntityProps): NotificationRecipientEntity {
    const now = new Date().toISOString();
    return new NotificationRecipientEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: NotificationRecipientEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): NotificationRecipientEntity {
    return new NotificationRecipientEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get notificationId(): NotificationIdVO { return this._notificationId; }
  get userId(): UserIdVO { return this._userId; }
  get email(): EmailAddressVO | null { return this._email; }
  get phone(): PhoneNumberVO | null { return this._phone; }
  get deviceTokens(): readonly DeviceTokenVO[] { return this._deviceTokens; }
}
