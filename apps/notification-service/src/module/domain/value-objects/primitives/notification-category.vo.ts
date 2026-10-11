/**
 * NotificationCategory Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_CATEGORY } from '@vubon/shared-constants/platform/notification';
import { InvalidNotificationCategoryError } from '../../errors/notification.errors.js';

type CategoryValue = (typeof NOTIFICATION_CATEGORY)[keyof typeof NOTIFICATION_CATEGORY];
const ALLOWED = Object.values(NOTIFICATION_CATEGORY) as readonly string[];

const SYSTEM_CATEGORIES: readonly string[] = [
  NOTIFICATION_CATEGORY.SYSTEM,
  NOTIFICATION_CATEGORY.SECURITY,
  NOTIFICATION_CATEGORY.AUTH,
];

export class NotificationCategoryVO extends BaseTypeVO<CategoryValue> {
  private constructor(value: CategoryValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): NotificationCategoryVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidNotificationCategoryError(raw, ALLOWED);
    }
    return new NotificationCategoryVO(raw as CategoryValue);
  }

  static reconstitute(raw: string): NotificationCategoryVO {
    return new NotificationCategoryVO(raw as CategoryValue);
  }

  // ─── Named constructors ───
  static auth(): NotificationCategoryVO { return new NotificationCategoryVO(NOTIFICATION_CATEGORY.AUTH); }
  static user(): NotificationCategoryVO { return new NotificationCategoryVO(NOTIFICATION_CATEGORY.USER); }
  static order(): NotificationCategoryVO { return new NotificationCategoryVO(NOTIFICATION_CATEGORY.ORDER); }
  static payment(): NotificationCategoryVO { return new NotificationCategoryVO(NOTIFICATION_CATEGORY.PAYMENT); }
  static shipping(): NotificationCategoryVO { return new NotificationCategoryVO(NOTIFICATION_CATEGORY.SHIPPING); }
  static product(): NotificationCategoryVO { return new NotificationCategoryVO(NOTIFICATION_CATEGORY.PRODUCT); }
  static promotion(): NotificationCategoryVO { return new NotificationCategoryVO(NOTIFICATION_CATEGORY.PROMOTION); }
  static support(): NotificationCategoryVO { return new NotificationCategoryVO(NOTIFICATION_CATEGORY.SUPPORT); }
  static system(): NotificationCategoryVO { return new NotificationCategoryVO(NOTIFICATION_CATEGORY.SYSTEM); }
  static security(): NotificationCategoryVO { return new NotificationCategoryVO(NOTIFICATION_CATEGORY.SECURITY); }
  static marketing(): NotificationCategoryVO { return new NotificationCategoryVO(NOTIFICATION_CATEGORY.MARKETING); }
  static reminder(): NotificationCategoryVO { return new NotificationCategoryVO(NOTIFICATION_CATEGORY.REMINDER); }

  // ─── Predicates ───
  isAuth(): boolean { return this.value === NOTIFICATION_CATEGORY.AUTH; }
  isUser(): boolean { return this.value === NOTIFICATION_CATEGORY.USER; }
  isOrder(): boolean { return this.value === NOTIFICATION_CATEGORY.ORDER; }
  isPayment(): boolean { return this.value === NOTIFICATION_CATEGORY.PAYMENT; }
  isShipping(): boolean { return this.value === NOTIFICATION_CATEGORY.SHIPPING; }
  isProduct(): boolean { return this.value === NOTIFICATION_CATEGORY.PRODUCT; }
  isPromotion(): boolean { return this.value === NOTIFICATION_CATEGORY.PROMOTION; }
  isSupport(): boolean { return this.value === NOTIFICATION_CATEGORY.SUPPORT; }
  isSystem(): boolean { return this.value === NOTIFICATION_CATEGORY.SYSTEM; }
  isSecurity(): boolean { return this.value === NOTIFICATION_CATEGORY.SECURITY; }
  isMarketing(): boolean { return this.value === NOTIFICATION_CATEGORY.MARKETING; }
  isReminder(): boolean { return this.value === NOTIFICATION_CATEGORY.REMINDER; }

  isSystemCategory(): boolean {
    return SYSTEM_CATEGORIES.includes(this.value);
  }

  canBeDisabledByUser(): boolean {
    return !this.isSystemCategory();
  }
}
