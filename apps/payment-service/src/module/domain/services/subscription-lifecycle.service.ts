/**
 * SubscriptionLifecycleService
 * @module payment-service/domain/services
 *
 * Determines next action for a subscription based on state + dates.
 */
import type { SubscriptionEntity } from '@domain/entities/subscription.entity';
import { RecurringScheduleService } from '@domain/services/recurring-schedule.service';

export type SubscriptionAction =
  | 'none'
  | 'start_trial_reminder'
  | 'convert_to_active'
  | 'renew'
  | 'mark_past_due'
  | 'cancel'
  | 'expire';

export interface SubscriptionActionInput {
  readonly subscription: SubscriptionEntity;
  readonly referenceDate?: Date;
}

export interface SubscriptionActionResult {
  readonly action: SubscriptionAction;
  readonly reason: string;
  readonly nextPeriodEnd?: string;
}

export class SubscriptionLifecycleService {
  static determineNextAction(input: SubscriptionActionInput): SubscriptionActionResult {
    const { subscription, referenceDate = new Date() } = input;
    const now = referenceDate.getTime();

    if (subscription.status.isExpired()) {
      return { action: 'none', reason: 'Already expired' };
    }

    if (subscription.isInTrial() && subscription.trialEndsAt) {
      const trialEnd = new Date(subscription.trialEndsAt).getTime();
      if (now >= trialEnd) {
        return { action: 'convert_to_active', reason: 'Trial ended' };
      }
      const daysLeft = (trialEnd - now) / (1000 * 60 * 60 * 24);
      if (daysLeft <= 3) {
        return { action: 'start_trial_reminder', reason: `${Math.ceil(daysLeft)} days left in trial` };
      }
      return { action: 'none', reason: 'Trial in progress' };
    }

    const periodEnd = new Date(subscription.currentPeriodEnd).getTime();

    if (now >= periodEnd) {
      if (subscription.cancelAtPeriodEnd) {
        return { action: 'cancel', reason: 'Cancel-at-period-end reached' };
      }
      const nextEnd = RecurringScheduleService.advance(
        new Date(subscription.currentPeriodEnd),
        subscription.frequency,
      ).toISOString();
      return {
        action: 'renew',
        reason: 'Period ended, renewing',
        nextPeriodEnd: nextEnd,
      };
    }

    if (subscription.status.isPastDue()) {
      return { action: 'mark_past_due', reason: 'Still past due' };
    }

    return { action: 'none', reason: 'Active' };
  }

  /**
   * Monthly Recurring Revenue for a single subscription.
   */
  static computeMrr(subscription: SubscriptionEntity): number {
    const amount = subscription.price.amount;
    const monthlyFactor = this.toMonthlyFactor(subscription.frequency.interval, subscription.frequency.intervalCount);
    return Math.round((amount / monthlyFactor) * 100) / 100;
  }

  private static toMonthlyFactor(interval: string, count: number): number {
    switch (interval) {
      case 'daily':
        return 30.44 * count;
      case 'weekly':
        return 4.345 * count;
      case 'biweekly':
        return 2.172 * count;
      case 'monthly':
        return count;
      case 'quarterly':
        return 3 * count;
      case 'yearly':
        return 12 * count;
      default:
        return count;
    }
  }
}
