/**
 * SuspensionPolicyService — Real business logic
 * @module vendor-service/domain/services
 *
 * Responsibilities:
 *  - Decide suspension duration based on reason severity
 *  - Decide if auto-lift is applicable
 *  - Decide appeal window
 *  - Enforce suspension limits (max duration)
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { VENDOR_SUSPENSION } from '@vubon/shared-constants/business';
import type { SuspensionReasonValue } from '../value-objects/primitives/suspension-reason.vo.js';

// ─── Duration Policy ──────────────────────
interface DurationPolicy {
  readonly defaultDays: number;
  readonly minDays: number;
  readonly maxDays: number;
  readonly autoLift: boolean;
  readonly appealWindowDays: number;
}

const REASON_POLICY: Record<SuspensionReasonValue, DurationPolicy> = {
  policy_violation: {
    defaultDays: 30,
    minDays: 7,
    maxDays: 180,
    autoLift: false,
    appealWindowDays: 14,
  },
  fraud: {
    defaultDays: 365,
    minDays: 180,
    maxDays: 365,
    autoLift: false,
    appealWindowDays: 30,
  },
  non_payment: {
    defaultDays: 14,
    minDays: 3,
    maxDays: 60,
    autoLift: true,
    appealWindowDays: 7,
  },
  poor_performance: {
    defaultDays: 21,
    minDays: 7,
    maxDays: 90,
    autoLift: false,
    appealWindowDays: 14,
  },
  customer_complaints: {
    defaultDays: 14,
    minDays: 3,
    maxDays: 90,
    autoLift: false,
    appealWindowDays: 14,
  },
  document_expired: {
    defaultDays: 30,
    minDays: 7,
    maxDays: 90,
    autoLift: true,
    appealWindowDays: 7,
  },
  inappropriate_content: {
    defaultDays: 30,
    minDays: 7,
    maxDays: 180,
    autoLift: false,
    appealWindowDays: 14,
  },
  other: {
    defaultDays: 14,
    minDays: 1,
    maxDays: 90,
    autoLift: false,
    appealWindowDays: 14,
  },
};

// ─── Suspension Decision ──────────────────
export interface SuspensionDecision {
  readonly reason: SuspensionReasonValue;
  readonly durationDays: number;
  readonly autoLift: boolean;
  readonly appealWindowDays: number;
  readonly isSevere: boolean;
  readonly requiresManualReview: boolean;
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
  readonly description: string;
}

// ─── Auto-Lift Eligibility ────────────────
export interface AutoLiftContext {
  readonly reason: SuspensionReasonValue;
  readonly suspendedAt: string;
  readonly durationDays: number;
  readonly isResolved: boolean;
}

// ─── Suspension Severity Classification ───
const SEVERITY_MAP: Record<SuspensionReasonValue, 'low' | 'medium' | 'high' | 'critical'> = {
  policy_violation: 'high',
  fraud: 'critical',
  non_payment: 'low',
  poor_performance: 'medium',
  customer_complaints: 'medium',
  document_expired: 'low',
  inappropriate_content: 'high',
  other: 'medium',
};

export class SuspensionPolicyService {
  /**
   * Suspension decide করো reason থেকে।
   */
  static decide(
    reason: SuspensionReasonValue,
    overrideDurationDays?: number,
  ): SuspensionDecision {
    const policy = REASON_POLICY[reason];
    if (!policy) {
      throw new BusinessRuleError(
        `No policy found for suspension reason "${reason}"`,
        'NO_SUSPENSION_POLICY',
        { reason },
      );
    }

    let durationDays = policy.defaultDays;
    if (overrideDurationDays !== undefined) {
      if (
        !Number.isInteger(overrideDurationDays) ||
        overrideDurationDays < policy.minDays ||
        overrideDurationDays > policy.maxDays
      ) {
        throw new BusinessRuleError(
          `Override duration must be ${policy.minDays}-${policy.maxDays} days`,
          'INVALID_SUSPENSION_DURATION',
          { reason, min: policy.minDays, max: policy.maxDays, value: overrideDurationDays },
        );
      }
      durationDays = overrideDurationDays;
    }

    const severity = SEVERITY_MAP[reason];
    const isSevere = severity === 'high' || severity === 'critical';
    const requiresManualReview = severity === 'critical' || reason === 'fraud';

    return {
      reason,
      durationDays,
      autoLift: policy.autoLift,
      appealWindowDays: policy.appealWindowDays,
      isSevere,
      requiresManualReview,
      severity,
      description: this.buildDescription(reason, severity, durationDays),
    };
  }

  /**
   * Auto-lift eligibility check।
   */
  static canAutoLift(ctx: AutoLiftContext): {
    readonly eligible: boolean;
    readonly reason: string;
  } {
    const policy = REASON_POLICY[ctx.reason];
    if (!policy.autoLift) {
      return {
        eligible: false,
        reason: 'Reason does not support auto-lift',
      };
    }
    if (!ctx.isResolved) {
      return {
        eligible: false,
        reason: 'Underlying issue not resolved',
      };
    }

    const suspendedAt = new Date(ctx.suspendedAt).getTime();
    const elapsedMs = Date.now() - suspendedAt;
    const elapsedDays = Math.floor(elapsedMs / (24 * 60 * 60 * 1000));

    if (elapsedDays < ctx.durationDays) {
      return {
        eligible: false,
        reason: `Suspension duration not elapsed (${elapsedDays}/${ctx.durationDays} days)`,
      };
    }

    return { eligible: true, reason: 'Auto-lift conditions met' };
  }

  /**
   * Max allowed suspension duration for a reason।
   */
  static maxDuration(reason: SuspensionReasonValue): number {
    const policy = REASON_POLICY[reason];
    return Math.min(policy.maxDays, VENDOR_SUSPENSION.MAX_DURATION_DAYS);
  }

  /**
   * Appeal window শেষ হয়েছে কিনা।
   */
  static isAppealWindowClosed(
    reason: SuspensionReasonValue,
    suspendedAt: string,
  ): boolean {
    const policy = REASON_POLICY[reason];
    const suspended = new Date(suspendedAt).getTime();
    const windowMs = policy.appealWindowDays * 24 * 60 * 60 * 1000;
    return Date.now() > suspended + windowMs;
  }

  /**
   * Appeal deadline compute করো।
   */
  static computeAppealDeadline(
    reason: SuspensionReasonValue,
    suspendedAt: string,
  ): string {
    const policy = REASON_POLICY[reason];
    const suspended = new Date(suspendedAt).getTime();
    const deadline = suspended + policy.appealWindowDays * 24 * 60 * 60 * 1000;
    return new Date(deadline).toISOString();
  }

  /**
   * Expected lift date compute করো।
   */
  static computeExpectedLiftDate(
    reason: SuspensionReasonValue,
    suspendedAt: string,
    durationDaysOverride?: number,
  ): string {
    const decision = this.decide(reason, durationDaysOverride);
    const suspended = new Date(suspendedAt).getTime();
    const liftAt = suspended + decision.durationDays * 24 * 60 * 60 * 1000;
    return new Date(liftAt).toISOString();
  }

  /**
   * Vendor suspension pattern check (repeat offender detection)।
   */
  static isRepeatOffender(
    previousSuspensionCount: number,
    withinDays = 90,
  ): {
    readonly isRepeat: boolean;
    readonly escalationFactor: number;
    readonly message: string;
  } {
    if (previousSuspensionCount < 2) {
      return {
        isRepeat: false,
        escalationFactor: 1,
        message: 'First-time or minor offender',
      };
    }
    const escalationFactor = Math.min(3, 1 + previousSuspensionCount * 0.25);
    return {
      isRepeat: true,
      escalationFactor,
      message: `Repeat offender (${previousSuspensionCount} previous within ${withinDays} days) — escalate duration`,
    };
  }

  /**
   * All policies snapshot।
   */
  static allPolicies(): readonly {
    readonly reason: SuspensionReasonValue;
    readonly defaultDays: number;
    readonly minDays: number;
    readonly maxDays: number;
    readonly autoLift: boolean;
    readonly appealWindowDays: number;
  }[] {
    return (Object.entries(REASON_POLICY) as [SuspensionReasonValue, DurationPolicy][]).map(
      ([reason, p]) => ({ reason, ...p }),
    );
  }

  // ═══════════════════════════════════════════
  // PRIVATE HELPERS
  // ═══════════════════════════════════════════

  private static buildDescription(
    reason: SuspensionReasonValue,
    severity: string,
    days: number,
  ): string {
    return `Suspension of ${days} day(s) for reason "${reason}" (severity: ${severity})`;
  }
}
