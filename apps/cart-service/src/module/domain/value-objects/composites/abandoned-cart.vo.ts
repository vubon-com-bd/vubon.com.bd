/**
 * AbandonedCart Composite VO
 * @module cart-service/domain/value-objects/composites
 *
 * Business rules:
 * - Reminder count cannot exceed MAX_REMINDERS
 * - Recovered carts are terminal
 * - Cart value must be positive to be abandoned
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ABANDONED_CART } from '@vubon/shared-constants/business/cart';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { AbandonedCartIdVO } from '../primitives/abandoned-cart-id.vo.js';
import { AbandonedCartStatusVO } from '../primitives/abandoned-cart-status.vo.js';
import { AbandonedCartReminderVO } from '../primitives/abandoned-cart-reminder.vo.js';
import { CartIdVO } from '../primitives/cart-id.vo.js';
import { CartUserIdVO } from '../primitives/user-id.vo.js';

export interface AbandonedCartProps {
  readonly id: AbandonedCartIdVO;
  readonly cartId: CartIdVO;
  readonly userId?: CartUserIdVO;
  readonly email?: string;
  readonly status: AbandonedCartStatusVO;
  readonly reminderType: AbandonedCartReminderVO;
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
  readonly abandonedAt: string;
  readonly remindersSent: number;
  readonly lastReminderAt?: string;
  readonly recoveredAt?: string;
  readonly recoveredOrderId?: string;
}

export class AbandonedCartCompositeVO extends BaseVO<AbandonedCartProps> {
  private constructor(props: AbandonedCartProps) {
    super(props);
  }

  static create(props: AbandonedCartProps): AbandonedCartCompositeVO {
    if (props.itemCount <= 0) {
      throw new ValidationError('Abandoned cart must have items', 'itemCount');
    }
    if (props.cartValue <= 0) {
      throw new ValidationError('Abandoned cart value must be positive', 'cartValue');
    }
    if (props.remindersSent < 0 || props.remindersSent > ABANDONED_CART.MAX_REMINDERS) {
      throw new ValidationError(
        `remindersSent must be 0..${ABANDONED_CART.MAX_REMINDERS}`,
        'remindersSent',
      );
    }
    return new AbandonedCartCompositeVO(props);
  }

  static reconstitute(props: AbandonedCartProps): AbandonedCartCompositeVO {
    return new AbandonedCartCompositeVO(props);
  }

  get id(): AbandonedCartIdVO { return this.value.id; }
  get cartId(): CartIdVO { return this.value.cartId; }
  get userId(): CartUserIdVO | undefined { return this.value.userId; }
  get email(): string | undefined { return this.value.email; }
  get status(): AbandonedCartStatusVO { return this.value.status; }
  get reminderType(): AbandonedCartReminderVO { return this.value.reminderType; }
  get itemCount(): number { return this.value.itemCount; }
  get cartValue(): number { return this.value.cartValue; }
  get currency(): string { return this.value.currency; }
  get abandonedAt(): string { return this.value.abandonedAt; }
  get remindersSent(): number { return this.value.remindersSent; }
  get lastReminderAt(): string | undefined { return this.value.lastReminderAt; }
  get recoveredAt(): string | undefined { return this.value.recoveredAt; }
  get recoveredOrderId(): string | undefined { return this.value.recoveredOrderId; }

  isRecovered(): boolean {
    return this.value.status.isRecovered();
  }

  canSendAnotherReminder(): boolean {
    return (
      this.value.status.canSendReminder() &&
      this.value.remindersSent < ABANDONED_CART.MAX_REMINDERS &&
      !this.value.reminderType.isDisabled()
    );
  }

  /** Hours since abandonment */
  hoursSinceAbandoned(now: Date = new Date()): number {
    const ms = now.getTime() - Date.parse(this.value.abandonedAt);
    return Math.floor(ms / (1000 * 60 * 60));
  }

  /** Next reminder tier to send based on hours elapsed */
  nextReminderTier(): number | null {
    const hours = this.hoursSinceAbandoned();
    const tiers = [
      ABANDONED_CART.FIRST_REMINDER_HOURS,
      ABANDONED_CART.SECOND_REMINDER_HOURS,
      ABANDONED_CART.THIRD_REMINDER_HOURS,
      ABANDONED_CART.FINAL_REMINDER_HOURS,
    ];
    if (this.value.remindersSent >= tiers.length) return null;
    const next = tiers[this.value.remindersSent];
    return hours >= next ? next : null;
  }

  /** Suggested recovery discount % */
  suggestedRecoveryDiscount(): number {
    return ABANDONED_CART.DISCOUNT_PERCENTAGE;
  }
}
