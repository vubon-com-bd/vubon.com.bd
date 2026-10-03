/**
 * AbandonedCartDetectorService — decide if a cart is abandoned
 * @module cart-service/domain/services
 */
import { CartEntity } from '../entities/cart.entity.js';
import { ABANDONED_CART } from '@vubon/shared-constants/business/cart';

export interface AbandonmentCriteria {
  readonly cart: CartEntity;
  readonly now?: Date;
  readonly thresholdHours?: number;
  readonly ignoreNonEmpty?: boolean;
}

export interface AbandonmentDecision {
  readonly abandoned: boolean;
  readonly hoursSinceActivity: number;
  readonly thresholdHours: number;
}

export class AbandonedCartDetectorService {
  detect(criteria: AbandonmentCriteria): AbandonmentDecision {
    const now = criteria.now ?? new Date();
    const threshold = criteria.thresholdHours ?? ABANDONED_CART.THRESHOLD_HOURS;

    const hoursSince = this.hoursBetween(criteria.cart.lastActivityAt, now);

    if (criteria.cart.isEmpty) {
      return { abandoned: false, hoursSinceActivity: hoursSince, thresholdHours: threshold };
    }
    if (!criteria.cart.isActive()) {
      return { abandoned: false, hoursSinceActivity: hoursSince, thresholdHours: threshold };
    }
    if (hoursSince < threshold) {
      return { abandoned: false, hoursSinceActivity: hoursSince, thresholdHours: threshold };
    }
    return { abandoned: true, hoursSinceActivity: hoursSince, thresholdHours: threshold };
  }

  /** Reminder tier to send based on hours elapsed. */
  nextReminderTier(hoursSinceActivity: number, remindersSent: number): number | null {
    const tiers = [
      ABANDONED_CART.FIRST_REMINDER_HOURS,
      ABANDONED_CART.SECOND_REMINDER_HOURS,
      ABANDONED_CART.THIRD_REMINDER_HOURS,
      ABANDONED_CART.FINAL_REMINDER_HOURS,
    ];
    if (remindersSent >= tiers.length) return null;
    const next = tiers[remindersSent];
    return hoursSinceActivity >= next ? next : null;
  }

  /** Suggested recovery discount percent. */
  recoveryDiscountPercent(): number {
    return ABANDONED_CART.DISCOUNT_PERCENTAGE;
  }

  /** Should we give up and mark cart as lost? */
  shouldMarkLost(hoursSinceActivity: number): boolean {
    return hoursSinceActivity >= ABANDONED_CART.EXPIRY_DAYS * 24;
  }

  private hoursBetween(iso: string, now: Date): number {
    const ms = now.getTime() - Date.parse(iso);
    return Math.floor(ms / (1000 * 60 * 60));
  }
}
