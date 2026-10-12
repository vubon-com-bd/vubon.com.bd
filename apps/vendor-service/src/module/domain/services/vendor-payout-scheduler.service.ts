/**
 * VendorPayoutSchedulerService
 * @module vendor-service/domain/services
 *
 * Pure scheduling logic — when is a vendor due for a payout,
 * what should the amount be, and is it blocked by holds/limits.
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PayoutCycleVO } from '../value-objects/primitives/payout-cycle.vo.js';
import { PayoutAmountVO } from '../value-objects/primitives/payout-amount.vo.js';
import { VENDOR_PAYOUT } from '@vubon/shared-constants/business';

export interface PayoutScheduleInput {
  readonly cycle: PayoutCycleVO;
  readonly lastPayoutAt?: string;
  readonly now?: Date;
}

export interface PayoutSchedule {
  readonly nextPayoutAt: string;
  readonly isDue: boolean;
  readonly daysUntilDue: number;
  readonly hoursUntilDue: number;
}

export interface PayoutEligibility {
  readonly eligible: boolean;
  readonly reason?: string;
  readonly netPayout: number;
}

export interface PayoutCalculationInput {
  readonly grossAmount: number;
  readonly currency: string;
  readonly fee?: number;
  readonly hasPendingDisputes: boolean;
  readonly accountOnHold: boolean;
  readonly bankAccountVerified: boolean;
}

export class VendorPayoutSchedulerService {
  /** Compute next payout date based on cycle + last payout. */
  static nextPayoutAt(input: PayoutScheduleInput): PayoutSchedule {
    const now = input.now ?? new Date();
    if (input.cycle.isOnDemand()) {
      return {
        nextPayoutAt: now.toISOString(),
        isDue: true,
        daysUntilDue: 0,
        hoursUntilDue: 0,
      };
    }
    const reference = input.lastPayoutAt ? new Date(input.lastPayoutAt) : new Date(now);
    const hoursPerCycle = input.cycle.toHours();
    const next = new Date(reference.getTime() + hoursPerCycle * 60 * 60 * 1000);
    const diffMs = next.getTime() - now.getTime();
    const hoursUntilDue = Math.max(0, Math.ceil(diffMs / (60 * 60 * 1000)));
    const daysUntilDue = Math.ceil(hoursUntilDue / 24);
    return {
      nextPayoutAt: next.toISOString(),
      isDue: diffMs <= 0,
      daysUntilDue,
      hoursUntilDue,
    };
  }

  /** Check whether a payout is due right now. */
  static isDue(input: PayoutScheduleInput): boolean {
    return VendorPayoutSchedulerService.nextPayoutAt(input).isDue;
  }

  /** Add hold period (chargeback / fraud protection window). */
  static applyHold(fromDate: Date = new Date()): Date {
    return new Date(fromDate.getTime() + VENDOR_PAYOUT.HOLD_DAYS * 24 * 60 * 60 * 1000);
  }

  /** When does a sale become payout-eligible? */
  static eligibilityDate(saleAt: Date): Date {
    return VendorPayoutSchedulerService.applyHold(saleAt);
  }

  /**
   * Check eligibility of a payout request.
   */
  static checkEligibility(input: PayoutCalculationInput): PayoutEligibility {
    if (!Number.isFinite(input.grossAmount) || input.grossAmount < 0) {
      throw new ValidationError('Gross amount must be non-negative', 'grossAmount');
    }
    if (!input.bankAccountVerified) {
      return { eligible: false, reason: 'bank_account_not_verified', netPayout: 0 };
    }
    if (input.accountOnHold) {
      return { eligible: false, reason: 'account_on_hold', netPayout: 0 };
    }
    if (input.hasPendingDisputes) {
      return { eligible: false, reason: 'pending_disputes', netPayout: 0 };
    }
    const fee = input.fee ?? 0;
    const netPayout = Math.round((input.grossAmount - fee) * 100) / 100;
    if (netPayout < VENDOR_PAYOUT.MIN_AMOUNT) {
      return {
        eligible: false,
        reason: `below_minimum (${netPayout} < ${VENDOR_PAYOUT.MIN_AMOUNT})`,
        netPayout,
      };
    }
    if (netPayout > VENDOR_PAYOUT.MAX_AMOUNT) {
      return {
        eligible: false,
        reason: `above_maximum (${netPayout} > ${VENDOR_PAYOUT.MAX_AMOUNT})`,
        netPayout,
      };
    }
    return { eligible: true, netPayout };
  }

  /**
   * Cap the payout amount if it exceeds max; returns splittable amounts.
   */
  static capAmount(amount: number, currency: string): {
    payable: number;
    remainder: number;
  } {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new ValidationError('Amount must be non-negative', 'amount');
    }
    if (amount <= VENDOR_PAYOUT.MAX_AMOUNT) {
      return { payable: amount, remainder: 0 };
    }
    const payable = VENDOR_PAYOUT.MAX_AMOUNT;
    const remainder = Math.round((amount - payable) * 100) / 100;
    return { payable, remainder };
  }

  /** Compute processing deadline (approve → paid). */
  static processingDeadline(from: Date = new Date()): Date {
    return new Date(from.getTime() + VENDOR_PAYOUT.PROCESSING_DAYS * 24 * 60 * 60 * 1000);
  }

  /** Is the payout past processing SLA? */
  static isProcessingSlaBreached(startedAt: Date, at: Date = new Date()): boolean {
    return at.getTime() > VendorPayoutSchedulerService.processingDeadline(startedAt).getTime();
  }

  /**
   * Given a list of unrequested sale amounts (with their hold dates),
   * compute how much is available to pay out right now.
   */
  static availableBalance(
    sales: ReadonlyArray<{ amount: number; saleAt: string }>,
    currency: string,
    now: Date = new Date(),
  ): PayoutAmountVO {
    let available = 0;
    for (const s of sales) {
      const holdEnd = VendorPayoutSchedulerService.eligibilityDate(new Date(s.saleAt));
      if (holdEnd.getTime() <= now.getTime()) {
        available += s.amount;
      }
    }
    const rounded = Math.round(available * 100) / 100;
    return rounded >= VENDOR_PAYOUT.MIN_AMOUNT
      ? PayoutAmountVO.create(rounded, currency)
      : PayoutAmountVO.minimum(currency);
  }

  /**
   * Group sales into "cycles" so multiple vendors with the same cycle
   * can be processed together.
   */
  static groupByCycle<T extends { cycle: PayoutCycleVO }>(
    vendors: readonly T[],
  ): ReadonlyMap<string, readonly T[]> {
    const groups = new Map<string, T[]>();
    for (const v of vendors) {
      const key = v.cycle.value;
      const list = groups.get(key) ?? [];
      list.push(v);
      groups.set(key, list);
    }
    return groups;
  }
}
