/**
 * VendorSuspensionPolicyService
 * @module vendor-service/domain/services
 *
 * Policy rules for issuing / lifting suspensions.
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SuspensionReasonVO } from '../value-objects/primitives/suspension-reason.vo.js';
import { VENDOR_SUSPENSION } from '@vubon/shared-constants/business';

export interface SuspensionPolicy {
  readonly defaultDuration: number;
  readonly maxDuration: number;
  readonly appealWindow: number;
  readonly autoLift: boolean;
}

export interface SuspensionRecommendation {
  readonly shouldSuspend: boolean;
  readonly reason?: SuspensionReasonVO;
  readonly duration: number;
  readonly notes?: string;
}

export class VendorSuspensionPolicyService {
  private static readonly REASON_DURATIONS: Readonly<Record<string, number>> = {
    policy_violation: 60,
    fraud: 365,
    non_payment: 30,
    poor_performance: 14,
    customer_complaints: 14,
    document_expired: 7,
    inappropriate_content: 90,
    other: 14,
  };

  /** Default policy values. */
  static defaultPolicy(): SuspensionPolicy {
    return {
      defaultDuration: VENDOR_SUSPENSION.DEFAULT_DURATION_DAYS,
      maxDuration: VENDOR_SUSPENSION.MAX_DURATION_DAYS,
      appealWindow: VENDOR_SUSPENSION.APPEAL_WINDOW_DAYS,
      autoLift: VENDOR_SUSPENSION.AUTO_LIFT_ON_RESOLUTION,
    };
  }

  /**
   * Suggested suspension duration for a given reason.
   */
  static durationFor(reason: SuspensionReasonVO): number {
    return VendorSuspensionPolicyService.REASON_DURATIONS[reason.value]
      ?? VENDOR_SUSPENSION.DEFAULT_DURATION_DAYS;
  }

  /**
   * Should the vendor be suspended based on performance score + flags?
   */
  static recommend(params: {
    performanceScore: number;
    orderCount: number;
    openDisputes: number;
    reason?: SuspensionReasonVO;
  }): SuspensionRecommendation {
    if (params.reason) {
      return {
        shouldSuspend: true,
        reason: params.reason,
        duration: VendorSuspensionPolicyService.durationFor(params.reason),
        notes: 'manual suspension',
      };
    }

    if (params.performanceScore < 40 && params.orderCount >= 10) {
      return {
        shouldSuspend: true,
        reason: SuspensionReasonVO.create('poor_performance'),
        duration: VendorSuspensionPolicyService.durationFor(SuspensionReasonVO.create('poor_performance')),
        notes: `score ${params.performanceScore} critically low`,
      };
    }

    if (params.openDisputes >= 5) {
      return {
        shouldSuspend: true,
        reason: SuspensionReasonVO.create('customer_complaints'),
        duration: VendorSuspensionPolicyService.durationFor(SuspensionReasonVO.create('customer_complaints')),
        notes: `${params.openDisputes} open disputes`,
      };
    }

    return { shouldSuspend: false, duration: 0 };
  }

  /**
   * Validate proposed duration against policy limits.
   */
  static validateDuration(durationDays: number): void {
    if (!Number.isInteger(durationDays) || durationDays <= 0) {
      throw new ValidationError('Duration must be a positive integer', 'durationDays');
    }
    if (durationDays > VENDOR_SUSPENSION.MAX_DURATION_DAYS) {
      throw new ValidationError(
        `Duration cannot exceed ${VENDOR_SUSPENSION.MAX_DURATION_DAYS} days`,
        'durationDays',
      );
    }
  }

  /**
   * Auto-lift decision: should the suspension lift on resolution?
   */
  static shouldAutoLift(reason: SuspensionReasonVO, disputesResolved: boolean): boolean {
    if (!disputesResolved) return false;
    // Auto-lift only for non-severe reasons
    return !reason.isSevere();
  }

  /**
   * Should the appeal be accepted based on prior history?
   */
  static canAcceptAppeal(params: {
    reason: SuspensionReasonVO;
    appealReason: string;
    daysSinceSuspension: number;
  }): boolean {
    if (params.daysSinceSuspension > VENDOR_SUSPENSION.APPEAL_WINDOW_DAYS) return false;
    if (params.appealReason.trim().length < 20) return false;
    // Severe reasons require manual review (return true to route to queue)
    return true;
  }

  /**
   * Classify severity for escalation.
   */
  static severity(
    reason: SuspensionReasonVO,
    duration: number,
  ): 'low' | 'medium' | 'high' | 'critical' {
    if (reason.isSevere() || duration >= 90) return 'critical';
    if (duration >= 30) return 'high';
    if (duration >= 14) return 'medium';
    return 'low';
  }

  /**
   * Recommend the next action when a suspension expires.
   */
  static onExpiry(params: {
    performanceScore: number;
    hasOpenDisputes: boolean;
    appealPending: boolean;
  }): 'lift' | 'extend' | 'block' {
    if (params.appealPending) return 'extend';
    if (params.hasOpenDisputes) return 'extend';
    if (params.performanceScore < 40) return 'block';
    return 'lift';
  }

  /**
   * Compute days remaining on a suspension.
   */
  static daysRemaining(suspendedAt: string, durationDays: number, now: Date = new Date()): number {
    const end = new Date(Date.parse(suspendedAt) + durationDays * 24 * 60 * 60 * 1000);
    const diff = end.getTime() - now.getTime();
    return diff <= 0 ? 0 : Math.ceil(diff / (24 * 60 * 60 * 1000));
  }
}
