import { NotificationRecipientEntity } from '../entities/notification-recipient.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { EmailAddressVO } from '../value-objects/primitives/email-address.vo';
import { PhoneNumberVO } from '../value-objects/primitives/phone-number.vo';
import { DeviceTokenVO } from '../value-objects/primitives/device-token.vo';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';

export interface RecipientData {
  readonly notificationId: NotificationIdVO;
  readonly userId: UserIdVO;
  readonly email: string | null;
  readonly phone: string | null;
  readonly deviceTokens: readonly string[];
}

export class RecipientResolverService {
  resolve(data: RecipientData): NotificationRecipientEntity {
    return NotificationRecipientEntity.create({
      notificationId: data.notificationId,
      userId: data.userId,
      email: data.email ? EmailAddressVO.create(data.email) : null,
      phone: data.phone ? PhoneNumberVO.create(data.phone) : null,
      deviceTokens: data.deviceTokens.map((t) => DeviceTokenVO.create(t)),
    });
  }
}
