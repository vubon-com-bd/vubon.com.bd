/**
 * AbandonedCartReminder Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ABANDONED_CART_REMINDER } from '@vubon/shared-constants/business/cart';
import { InvalidReminderTypeError } from '../../errors/abandoned-cart.errors.js';

const ALLOWED = Object.values(ABANDONED_CART_REMINDER) as readonly string[];

export class AbandonedCartReminderVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AbandonedCartReminderVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidReminderTypeError(String(raw), ALLOWED);
    }
    return new AbandonedCartReminderVO(raw);
  }

  static reconstitute(raw: string): AbandonedCartReminderVO {
    return new AbandonedCartReminderVO(raw);
  }

  isEmail(): boolean {
    return this.value === ABANDONED_CART_REMINDER.EMAIL;
  }

  isSms(): boolean {
    return this.value === ABANDONED_CART_REMINDER.SMS;
  }

  isPush(): boolean {
    return this.value === ABANDONED_CART_REMINDER.PUSH;
  }

  isMultiChannel(): boolean {
    return this.value === ABANDONED_CART_REMINDER.MULTI;
  }

  isDisabled(): boolean {
    return this.value === ABANDONED_CART_REMINDER.NONE;
  }
}
