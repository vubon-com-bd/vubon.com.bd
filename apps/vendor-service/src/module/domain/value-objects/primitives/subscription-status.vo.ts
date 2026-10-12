/**
 * SubscriptionStatus Value Object — includes transition state machine
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { VENDOR_SUBSCRIPTION_STATUS } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_SUBSCRIPTION_STATUS) as readonly string[];

export class SubscriptionStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SubscriptionStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid subscription status "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'status',
      );
    }
    return new SubscriptionStatusVO(raw);
  }

  static trial(): SubscriptionStatusVO { return new SubscriptionStatusVO(VENDOR_SUBSCRIPTION_STATUS.TRIAL); }
  static active(): SubscriptionStatusVO { return new SubscriptionStatusVO(VENDOR_SUBSCRIPTION_STATUS.ACTIVE); }
  static pastDue(): SubscriptionStatusVO { return new SubscriptionStatusVO(VENDOR_SUBSCRIPTION_STATUS.PAST_DUE); }
  static cancelled(): SubscriptionStatusVO { return new SubscriptionStatusVO(VENDOR_SUBSCRIPTION_STATUS.CANCELLED); }
  static expired(): SubscriptionStatusVO { return new SubscriptionStatusVO(VENDOR_SUBSCRIPTION_STATUS.EXPIRED); }
  static suspended(): SubscriptionStatusVO { return new SubscriptionStatusVO(VENDOR_SUBSCRIPTION_STATUS.SUSPENDED); }

  static reconstitute(raw: string): SubscriptionStatusVO {
    return new SubscriptionStatusVO(raw);
  }

  isTrial(): boolean { return this.value === VENDOR_SUBSCRIPTION_STATUS.TRIAL; }
  isActive(): boolean { return this.value === VENDOR_SUBSCRIPTION_STATUS.ACTIVE; }
  isPastDue(): boolean { return this.value === VENDOR_SUBSCRIPTION_STATUS.PAST_DUE; }
  isCancelled(): boolean { return this.value === VENDOR_SUBSCRIPTION_STATUS.CANCELLED; }
  isExpired(): boolean { return this.value === VENDOR_SUBSCRIPTION_STATUS.EXPIRED; }
  isSuspended(): boolean { return this.value === VENDOR_SUBSCRIPTION_STATUS.SUSPENDED; }

  /** Can the vendor currently use the paid features? */
  isUsable(): boolean {
    return this.value === VENDOR_SUBSCRIPTION_STATUS.ACTIVE || this.value === VENDOR_SUBSCRIPTION_STATUS.TRIAL;
  }

  /** Requires user action (payment). */
  needsPayment(): boolean {
    return this.value === VENDOR_SUBSCRIPTION_STATUS.PAST_DUE;
  }

  isTerminal(): boolean {
    return this.value === VENDOR_SUBSCRIPTION_STATUS.EXPIRED;
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [VENDOR_SUBSCRIPTION_STATUS.TRIAL]: [
        VENDOR_SUBSCRIPTION_STATUS.ACTIVE,
        VENDOR_SUBSCRIPTION_STATUS.EXPIRED,
        VENDOR_SUBSCRIPTION_STATUS.CANCELLED,
      ],
      [VENDOR_SUBSCRIPTION_STATUS.ACTIVE]: [
        VENDOR_SUBSCRIPTION_STATUS.PAST_DUE,
        VENDOR_SUBSCRIPTION_STATUS.CANCELLED,
        VENDOR_SUBSCRIPTION_STATUS.SUSPENDED,
      ],
      [VENDOR_SUBSCRIPTION_STATUS.PAST_DUE]: [
        VENDOR_SUBSCRIPTION_STATUS.ACTIVE,
        VENDOR_SUBSCRIPTION_STATUS.SUSPENDED,
        VENDOR_SUBSCRIPTION_STATUS.CANCELLED,
      ],
      [VENDOR_SUBSCRIPTION_STATUS.CANCELLED]: [
        VENDOR_SUBSCRIPTION_STATUS.ACTIVE,
        VENDOR_SUBSCRIPTION_STATUS.EXPIRED,
      ],
      [VENDOR_SUBSCRIPTION_STATUS.SUSPENDED]: [
        VENDOR_SUBSCRIPTION_STATUS.ACTIVE,
        VENDOR_SUBSCRIPTION_STATUS.EXPIRED,
      ],
      [VENDOR_SUBSCRIPTION_STATUS.EXPIRED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
