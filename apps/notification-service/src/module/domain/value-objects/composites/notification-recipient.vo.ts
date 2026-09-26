import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { EmailAddressVO } from '../primitives/email-address.vo';
import { PhoneNumberVO } from '../primitives/phone-number.vo';

export interface NotificationRecipientProps {
  readonly userId: UserIdVO;
  readonly email: EmailAddressVO | null;
  readonly phone: PhoneNumberVO | null;
  readonly deviceTokens: readonly string[];
}

export class NotificationRecipientVO extends BaseVO<NotificationRecipientProps> {
  private constructor(props: NotificationRecipientProps) {
    super(
      Object.freeze({
        ...props,
        deviceTokens: Object.freeze([...props.deviceTokens]),
      }),
    );
  }

  static create(props: NotificationRecipientProps): NotificationRecipientVO {
    return new NotificationRecipientVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get email(): EmailAddressVO | null { return this.value.email; }
  get phone(): PhoneNumberVO | null { return this.value.phone; }
  get deviceTokens(): readonly string[] { return this.value.deviceTokens; }
}
