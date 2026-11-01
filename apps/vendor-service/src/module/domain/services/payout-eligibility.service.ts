/**
 * PayoutEligibilityService — Real business logic
 * @module vendor-service/domain/services
 *
 * Responsibilities:
 *  - Check vendor eligibility for payout request
 *  - Enforce min/max amount, hold days, daily limits
 *  - Check bank account verification
 *  - Handle vendor status + tier requirements
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { VENDOR_PAYOUT } from '@vubon/shared-constants/business';
import type { VendorEntity } from '../entities/vendor.entity.js';
import type { VendorBankAccountEntity } from '../entities/vendor-bank-account.entity.js';

// ─── Payout Eligibility Context ───────────
export interface PayoutEligibilityContext {
  readonly vendor: VendorEntity;
  readonly bankAccount: VendorBankAccountEntity;
  readonly requestedAmount: number;
  readonly availableBalance: number;
  readonly pendingPayoutCount: number;
  readonly payoutsToday: number;
  readonly lastPayoutAt?: string;
}

// ─── Eligibility Result ───────────────────
export interface PayoutEligibilityResult {
  readonly eligible: boolean;
  readonly reasons: readonly string[];
  readonly warnings: readonly string[];
  readonly availableAmount: number;
  readonly maxAllowedAmount: number;
  readonly minRequiredAmount: number;
  readonly holdDaysRemaining: number;
  readonly dailyPayoutsRemaining: number;
}

export class PayoutEligibilityService {
  /**
   * Vendor payout request করার জন্য eligible কিনা।
   */
  static check(ctx: PayoutEligibilityContext): PayoutEligibilityResult {
    this.validateContext(ctx);

    const reasons: string[] = [];
    const warnings: string[] = [];

    const { vendor, bankAccount, requestedAmount, availableBalance } = ctx;

    // ─── Vendor Status Checks ───
    if (vendor.isDeleted()) {
      reasons.push('Vendor is deleted');
    }
    if (vendor.isBlocked()) {
      reasons.push('Vendor is blocked');
    }
    if (vendor.isSuspended()) {
      reasons.push('Vendor is suspended');
    }
    if (!vendor.isActive()) {
      reasons.push(`Vendor status "${vendor.status.value}" is not active`);
    }
    if (!vendor.isVerified()) {
      reasons.push('Vendor is not verified');
    }

    // ─── Bank Account Checks ───
    if (!bankAccount.isVerified) {
      reasons.push('Bank account is not verified');
    }
    if (bankAccount.needsReverification()) {
      warnings.push('Bank account verification is older than 1 year');
    }

    // ─── Amount Checks ───
    const minRequiredAmount = VENDOR_PAYOUT.MIN_AMOUNT;
    const maxAllowedAmount = Math.min(
      VENDOR_PAYOUT.MAX_AMOUNT,
      availableBalance,
    );

    if (requestedAmount < minRequiredAmount) {
      reasons.push(
        `Requested amount ${requestedAmount} is below minimum ${minRequiredAmount}`,
      );
    }
    if (requestedAmount > VENDOR_PAYOUT.MAX_AMOUNT) {
      reasons.push(
        `Requested amount ${requestedAmount} exceeds maximum ${VENDOR_PAYOUT.MAX_AMOUNT}`,
      );
    }
    if (requestedAmount > availableBalance) {
      reasons.push(
        `Requested ${requestedAmount} exceeds available balance ${availableBalance}`,
      );
    }

    // ─── Hold Period Check ───
    const holdDaysRemaining = this.computeHoldDaysRemaining(
      ctx.lastPayoutAt,
      VENDOR_PAYOUT.HOLD_DAYS,
    );
    if (holdDaysRemaining > 0) {
      reasons.push(
        `Payout on hold for ${holdDaysRemaining} more day(s)`,
      );
    }

    // ─── Daily Limit Check ───
    const dailyPayoutsRemaining = Math.max(
      0,
      VENDOR_PAYOUT.MAX_PAYOUTS_PER_DAY - ctx.payoutsToday,
    );
    if (dailyPayoutsRemaining === 0) {
      reasons.push(
        `Daily payout limit reached (${VENDOR_PAYOUT.MAX_PAYOUTS_PER_DAY})`,
      );
    }

    // ─── Pending Payout Check ───
    if (ctx.pendingPayoutCount > 0) {
      warnings.push(
        `Vendor has ${ctx.pendingPayoutCount} pending payout(s)`,
      );
    }

    return {
      eligible: reasons.length === 0,
      reasons,
      warnings,
      availableAmount: availableBalance,
      maxAllowedAmount,
      minRequiredAmount,
      holdDaysRemaining,
      dailyPayoutsRemaining,
    };
  }

  /**
   * Eligible না হলে throw করো।
   */
  static assertEligible(ctx: PayoutEligibilityContext): void {
    const result = this.check(ctx);
    if (!result.eligible) {
      throw new BusinessRuleError(
        `Payout not eligible: ${result.reasons.join('; ')}`,
        'PAYOUT_NOT_ELIGIBLE',
        {
          vendorId: ctx.vendor.id,
          requestedAmount: ctx.requestedAmount,
          reasons: result.reasons,
        },
      );
    }
  }

  /**
   * Max allowable payout amount calculate করো (current balance + limits)।
   */
  static computeMaxPayoutAmount(availableBalance: number): number {
    if (!Number.isFinite(availableBalance) || availableBalance < 0) {
      throw new BusinessRuleError(
        'availableBalance must be a non-negative finite number',
        'INVALID_BALANCE',
        { availableBalance },
      );
    }
    return Math.min(
      VENDOR_PAYOUT.MAX_AMOUNT,
      Math.floor(availableBalance * 100) / 100,
    );
  }

  /**
   * Vendor tier থেকে payout cycle (কত দিনে payout পাবে) বের করো।
   */
  static getPayoutCycleDaysForTier(tier: string): number {
    // From tier benefits
    const cycleMap: Record<string, number> = {
      bronze: 14,
      silver: 10,
      gold: 7,
      platinum: 5,
      diamond: 3,
    };
    return cycleMap[tier] ?? 14;
  }

  // ═══════════════════════════════════════════
  // PRIVATE HELPERS
  // ═══════════════════════════════════════════

  private static computeHoldDaysRemaining(
    lastPayoutAt: string | undefined,
    holdDays: number,
  ): number {
    if (!lastPayoutAt) return 0;
    const last = new Date(lastPayoutAt).getTime();
    const holdMs = holdDays * 24 * 60 * 60 * 1000;
    const unlockAt = last + holdMs;
    const now = Date.now();
    if (now >= unlockAt) return 0;
    return Math.ceil((unlockAt - now) / (24 * 60 * 60 * 1000));
  }

  private static validateContext(ctx: PayoutEligibilityContext): void {
    if (!Number.isFinite(ctx.requestedAmount) || ctx.requestedAmount < 0) {
      throw new BusinessRuleError(
        'requestedAmount must be a non-negative finite number',
        'INVALID_REQUESTED_AMOUNT',
        { requestedAmount: ctx.requestedAmount },
      );
    }
    if (!Number.isFinite(ctx.availableBalance) || ctx.availableBalance < 0) {
      throw new BusinessRuleError(
        'availableBalance must be a non-negative finite number',
        'INVALID_AVAILABLE_BALANCE',
        { availableBalance: ctx.availableBalance },
      );
    }
    if (!Number.isInteger(ctx.payoutsToday) || ctx.payoutsToday < 0) {
      throw new BusinessRuleError(
        'payoutsToday must be a non-negative integer',
        'INVALID_PAYOUTS_TODAY',
        { payoutsToday: ctx.payoutsToday },
      );
    }
    if (!Number.isInteger(ctx.pendingPayoutCount) || ctx.pendingPayoutCount < 0) {
      throw new BusinessRuleError(
        'pendingPayoutCount must be a non-negative integer',
        'INVALID_PENDING_COUNT',
        { pendingPayoutCount: ctx.pendingPayoutCount },
      );
    }
  }
}
