/**
 * VerificationPolicyService — Real business logic
 * @module vendor-service/domain/services
 *
 * Responsibilities:
 *  - Determine required verification steps per vendor type
 *  - Check if vendor is fully verified
 *  - Compute verification SLA
 *  - Enforce re-verification policy
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { VENDOR_VERIFICATION } from '@vubon/shared-constants/business';
import type { VerificationType } from '../value-objects/composites/vendor-verification.vo.js';
export type { VerificationType };

// ─── Requirement Rule ────────────────────
export interface VerificationRequirement {
  readonly type: VerificationType;
  readonly required: boolean;
  readonly reason: string;
}

// ─── Verification Checklist Item ─────────
export interface VerificationChecklistItem {
  readonly type: VerificationType;
  readonly required: boolean;
  readonly completed: boolean;
  readonly status: string;
}

// ─── Verification Context ────────────────
export interface VerificationContext {
  readonly vendorType: string;
  readonly businessType: string;
  readonly hasWebsite: boolean;
  readonly verificationStatuses: Readonly<Record<VerificationType, string>>;
}

// ─── Verification Result ─────────────────
export interface VerificationPolicyResult {
  readonly fullyVerified: boolean;
  readonly requiredCount: number;
  readonly completedCount: number;
  readonly missing: readonly VerificationType[];
  readonly pending: readonly VerificationType[];
  readonly rejected: readonly VerificationType[];
  readonly progressPercent: number;
  readonly estimatedSlaHours: number;
}

// ─── Re-verification Context ─────────────
export interface ReverificationContext {
  readonly lastVerifiedAt: string;
  readonly type: VerificationType;
}

export class VerificationPolicyService {
  /**
   * Vendor type + business type থেকে required verification steps compute করো।
   */
  static getRequirements(ctx: {
    readonly vendorType: string;
    readonly businessType: string;
    readonly hasWebsite: boolean;
  }): readonly VerificationRequirement[] {
    const reqs: VerificationRequirement[] = [];

    // Always required
    reqs.push({ type: 'email', required: true, reason: 'Baseline contact method' });
    reqs.push({ type: 'phone', required: true, reason: 'Baseline contact method' });
    reqs.push({ type: 'identity', required: true, reason: 'Regulatory requirement' });
    reqs.push({ type: 'bank_account', required: true, reason: 'Payout requirement' });
    reqs.push({ type: 'address', required: true, reason: 'Logistics requirement' });

    // Business type specific
    const needsLicense =
      ctx.businessType === 'manufacturer' ||
      ctx.businessType === 'wholesaler' ||
      ctx.businessType === 'distributor';
    reqs.push({
      type: 'business_license',
      required: needsLicense,
      reason: needsLicense ? 'Regulated business type' : 'Not required for this business type',
    });

    reqs.push({
      type: 'tax_id',
      required: needsLicense,
      reason: needsLicense ? 'Tax registration required' : 'Not required for this business type',
    });

    // Optional (recommended)
    reqs.push({
      type: 'website',
      required: false,
      reason: ctx.hasWebsite ? 'Provided' : 'Optional but improves trust',
    });

    return reqs;
  }

  /**
   * Full verification evaluation।
   */
  static evaluate(ctx: VerificationContext): VerificationPolicyResult {
    const requirements = this.getRequirements({
      vendorType: ctx.vendorType,
      businessType: ctx.businessType,
      hasWebsite: ctx.hasWebsite,
    });

    const required = requirements.filter((r) => r.required);
    const missing: VerificationType[] = [];
    const pending: VerificationType[] = [];
    const rejected: VerificationType[] = [];
    let completed = 0;

    for (const req of required) {
      const status = ctx.verificationStatuses[req.type] ?? 'not_started';
      if (status === 'approved') {
        completed++;
      } else if (status === 'pending' || status === 'in_review' || status === 'resubmitted') {
        pending.push(req.type);
      } else if (status === 'rejected' || status === 'expired') {
        rejected.push(req.type);
      } else {
        missing.push(req.type);
      }
    }

    const fullyVerified =
      missing.length === 0 && pending.length === 0 && rejected.length === 0;

    const progressPercent = required.length === 0
      ? 100
      : this.round((completed / required.length) * 100);

    const estimatedSlaHours = this.computeSlaHours({
      totalPending: pending.length,
      hasRejected: rejected.length > 0,
    });

    return {
      fullyVerified,
      requiredCount: required.length,
      completedCount: completed,
      missing,
      pending,
      rejected,
      progressPercent,
      estimatedSlaHours,
    };
  }

  /**
   * Re-verification প্রয়োজন কিনা।
   */
  static needsReverification(ctx: ReverificationContext): {
    readonly needs: boolean;
    readonly reason: string;
    readonly daysUntilExpiry: number;
  } {
    const lastVerified = new Date(ctx.lastVerifiedAt).getTime();
    const expiryMs = VENDOR_VERIFICATION.EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    const expiryAt = lastVerified + expiryMs;
    const now = Date.now();
    const daysUntilExpiry = Math.ceil((expiryAt - now) / (24 * 60 * 60 * 1000));

    if (now > expiryAt) {
      return {
        needs: true,
        reason: 'Verification expired',
        daysUntilExpiry: daysUntilExpiry,
      };
    }
    if (daysUntilExpiry <= 30) {
      return {
        needs: true,
        reason: `Expiring in ${daysUntilExpiry} days`,
        daysUntilExpiry,
      };
    }
    return {
      needs: false,
      reason: 'Still valid',
      daysUntilExpiry,
    };
  }

  /**
   * Checklist (UI-ready)।
   */
  static getChecklist(ctx: VerificationContext): readonly VerificationChecklistItem[] {
    const requirements = this.getRequirements({
      vendorType: ctx.vendorType,
      businessType: ctx.businessType,
      hasWebsite: ctx.hasWebsite,
    });

    return requirements.map((r) => {
      const status = ctx.verificationStatuses[r.type] ?? 'not_started';
      return {
        type: r.type,
        required: r.required,
        completed: status === 'approved',
        status,
      };
    });
  }

  /**
   * Missing steps থেকে next-best action suggest করো।
   */
  static suggestNextAction(
    result: VerificationPolicyResult,
  ): { readonly action: string; readonly priority: 'high' | 'medium' | 'low' } {
    if (result.rejected.length > 0) {
      return {
        action: `Resubmit rejected documents: ${result.rejected.join(', ')}`,
        priority: 'high',
      };
    }
    if (result.missing.length > 0) {
      return {
        action: `Submit required documents: ${result.missing.join(', ')}`,
        priority: 'high',
      };
    }
    if (result.pending.length > 0) {
      return {
        action: `Wait for review of: ${result.pending.join(', ')}`,
        priority: 'low',
      };
    }
    return { action: 'All verifications complete', priority: 'low' };
  }

  /**
   * Verification SLA (hours)।
   */
  static computeSlaHours(input: {
    readonly totalPending: number;
    readonly hasRejected: boolean;
  }): number {
    const base = VENDOR_VERIFICATION.REVIEW_SLA_HOURS;
    const perItem = base * Math.max(1, input.totalPending * 0.5);
    const rejectedMultiplier = input.hasRejected ? 1.5 : 1;
    return Math.round(perItem * rejectedMultiplier);
  }

  // ═══════════════════════════════════════════
  // PRIVATE HELPERS
  // ═══════════════════════════════════════════

  private static round(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
