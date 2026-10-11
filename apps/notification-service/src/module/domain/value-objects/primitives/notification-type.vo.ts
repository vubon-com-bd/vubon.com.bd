/**
 * NotificationType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_TYPE } from '@vubon/shared-constants/platform/notification';
import { InvalidNotificationTypeError } from '../../errors/notification.errors.js';

type TypeValue = (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];
const ALLOWED = Object.values(NOTIFICATION_TYPE) as readonly string[];

export class NotificationTypeVO extends BaseTypeVO<TypeValue> {
  private constructor(value: TypeValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): NotificationTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidNotificationTypeError(raw, ALLOWED);
    }
    return new NotificationTypeVO(raw as TypeValue);
  }

  static reconstitute(raw: string): NotificationTypeVO {
    return new NotificationTypeVO(raw as TypeValue);
  }

  // Named constructors
  static transactional(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.TRANSACTIONAL); }
  static promotional(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.PROMOTIONAL); }
  static system(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.SYSTEM); }
  static security(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.SECURITY); }
  static reminder(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.REMINDER); }
  static alert(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.ALERT); }
  static welcome(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.WELCOME); }
  static orderUpdate(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.ORDER_UPDATE); }
  static paymentUpdate(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.PAYMENT_UPDATE); }
  static shippingUpdate(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.SHIPPING_UPDATE); }
  static accountUpdate(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.ACCOUNT_UPDATE); }
  static marketing(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.MARKETING); }
  static announcement(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.ANNOUNCEMENT); }
  static verification(): NotificationTypeVO { return new NotificationTypeVO(NOTIFICATION_TYPE.VERIFICATION); }

  // Predicates
  isTransactional(): boolean { return this.value === NOTIFICATION_TYPE.TRANSACTIONAL; }
  isPromotional(): boolean { return this.value === NOTIFICATION_TYPE.PROMOTIONAL; }
  isSystem(): boolean { return this.value === NOTIFICATION_TYPE.SYSTEM; }
  isSecurity(): boolean { return this.value === NOTIFICATION_TYPE.SECURITY; }
  isReminder(): boolean { return this.value === NOTIFICATION_TYPE.REMINDER; }
  isAlert(): boolean { return this.value === NOTIFICATION_TYPE.ALERT; }
  isWelcome(): boolean { return this.value === NOTIFICATION_TYPE.WELCOME; }
  isOrderUpdate(): boolean { return this.value === NOTIFICATION_TYPE.ORDER_UPDATE; }
  isPaymentUpdate(): boolean { return this.value === NOTIFICATION_TYPE.PAYMENT_UPDATE; }
  isShippingUpdate(): boolean { return this.value === NOTIFICATION_TYPE.SHIPPING_UPDATE; }
  isAccountUpdate(): boolean { return this.value === NOTIFICATION_TYPE.ACCOUNT_UPDATE; }
  isMarketing(): boolean { return this.value === NOTIFICATION_TYPE.MARKETING; }
  isAnnouncement(): boolean { return this.value === NOTIFICATION_TYPE.ANNOUNCEMENT; }
  isVerification(): boolean { return this.value === NOTIFICATION_TYPE.VERIFICATION; }

  /** Transactional types cannot be opted out by user. */
  canOptOut(): boolean {
    return this.isPromotional() || this.isMarketing() || this.isAnnouncement() || this.isReminder();
  }
}
