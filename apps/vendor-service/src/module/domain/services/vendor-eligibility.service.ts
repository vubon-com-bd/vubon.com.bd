/**
 * VendorEligibilityService — Real business logic
 * @module vendor-service/domain/services
 *
 * Responsibilities:
 *  - Vendor onboarding eligibility
 *  - Vendor activation eligibility
 *  - Vendor feature gating (subscription/tier based)
 *  - Vendor status transition eligibility
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { VENDOR_LIMIT } from '@vubon/shared-constants/business';

import type { VendorEntity } from '../entities/vendor.entity.js';
import type { VendorVerificationEntity } from '../entities/vendor-verification.entity.js';
import type { VendorBusinessEntity } from '../entities/vendor-business.entity.js';
import type { VendorSubscriptionEntity } from '../entities/vendor-subscription.entity.js';
import type { VendorStatusVO } from '../value-objects/primitives/vendor-status.vo.js';
import type { VendorTierVO } from '../value-objects/primitives/vendor-tier.vo.js';

// ─── Eligibility Check Result ─────────────
export interface EligibilityResult {
  readonly eligible: boolean;
  readonly reasons: readonly string[];
  readonly warnings: readonly string[];
}

// ─── Eligibility Context ──────────────────
export interface VendorOnboardingContext {
  readonly nameProvided: boolean;
  readonly emailProvided: boolean;
  readonly phoneProvided: boolean;
  readonly addressProvided: boolean;
  readonly businessInfoProvided: boolean;
  readonly typeProvided: boolean;
  readonly businessTypeProvided: boolean;
}

export interface VendorActivationContext {
  readonly vendor: VendorEntity;
  readonly emailVerified: boolean;
  readonly phoneVerified: boolean;
  readonly hasAtLeastOneAddress: boolean;
  readonly hasBankAccount: boolean;
  readonly hasRequiredDocuments: boolean;
  readonly isBusinessVerified: boolean;
}

export class VendorEligibilityService {
  // ═══════════════════════════════════════════
  // ONBOARDING ELIGIBILITY
  // ═══════════════════════════════════════════
  /**
   * Vendor onboarding এর জন্য eligible কিনা।
   */
  static canRegister(ctx: VendorOnboardingContext): EligibilityResult {
    const reasons: string[] = [];
    const warnings: string[] = [];

    if (!ctx.nameProvided) reasons.push('Vendor name is required');
    if (!ctx.emailProvided) reasons.push('Email is required');
    if (!ctx.phoneProvided) reasons.push('Phone number is required');
    if (!ctx.typeProvided) reasons.push('Vendor type is required');
    if (!ctx.businessTypeProvided) reasons.push('Business type is required');

    if (!ctx.addressProvided) warnings.push('Address should be provided for faster approval');
    if (!ctx.businessInfoProvided) warnings.push('Business info should be provided');

    return {
      eligible: reasons.length === 0,
      reasons,
      warnings,
    };
  }

  // ═══════════════════════════════════════════
  // ACTIVATION ELIGIBILITY
  // ═══════════════════════════════════════════
  /**
   * Vendor কে activate করা যাবে কিনা।
   */
  static canActivate(ctx: VendorActivationContext): EligibilityResult {
    const reasons: string[] = [];
    const warnings: string[] = [];

    const { vendor } = ctx;

    if (vendor.isDeleted()) {
      reasons.push('Vendor is deleted');
    }
    if (vendor.isBlocked()) {
      reasons.push('Vendor is blocked');
    }
    if (vendor.isSuspended()) {
      reasons.push('Vendor is currently suspended');
    }
    if (!vendor.isApproved() && !vendor.isInactive()) {
      reasons.push(`Vendor status "${vendor.status.value}" cannot be activated`);
    }
    if (!vendor.isVerified()) {
      reasons.push('Vendor is not verified');
    }
    if (!ctx.emailVerified) {
      reasons.push('Email must be verified');
    }
    if (!ctx.phoneVerified) {
      reasons.push('Phone must be verified');
    }
    if (!ctx.hasAtLeastOneAddress) {
      reasons.push('At least one address is required');
    }
    if (!ctx.hasBankAccount) {
      reasons.push('At least one verified bank account is required');
    }
    if (!ctx.hasRequiredDocuments) {
      reasons.push('Required documents must be submitted');
    }

    if (!ctx.isBusinessVerified) {
      warnings.push('Business info verification pending');
    }

    return {
      eligible: reasons.length === 0,
      reasons,
      warnings,
    };
  }

  /**
   * Activate না হলে throw করো।
   */
  static assertCanActivate(ctx: VendorActivationContext): void {
    const result = this.canActivate(ctx);
    if (!result.eligible) {
      throw new BusinessRuleError(
        `Vendor cannot be activated: ${result.reasons.join('; ')}`,
        'VENDOR_CANNOT_BE_ACTIVATED',
        { vendorId: ctx.vendor.id, reasons: result.reasons },
      );
    }
  }

  // ═══════════════════════════════════════════
  // STATUS TRANSITION ELIGIBILITY
  // ═══════════════════════════════════════════
  /**
   * একটি status transition allowed কিনা।
   */
  static canTransition(
    current: VendorStatusVO,
    target: string,
    opts?: { readonly isVerified?: boolean },
  ): EligibilityResult {
    const reasons: string[] = [];
    const warnings: string[] = [];

    if (!current.canTransitionTo(target)) {
      reasons.push(
        `Invalid transition: "${current.value}" → "${target}"`,
      );
      return { eligible: false, reasons, warnings };
    }

    // Business-specific rules per target
    if (target === 'active' && opts?.isVerified === false) {
      reasons.push('Vendor must be verified to become active');
    }
    if (target === 'approved' && current.isRejected()) {
      warnings.push('Vendor previously rejected — requires careful review');
    }

    return {
      eligible: reasons.length === 0,
      reasons,
      warnings,
    };
  }

  // ═══════════════════════════════════════════
  // FEATURE GATING (Subscription/Tier based)
  // ═══════════════════════════════════════════
  /**
   * একটি feature vendor এর জন্য available কিনা।
   */
  static canAccessFeature(
    featureKey: string,
    ctx: {
      readonly tier: VendorTierVO;
      readonly subscription?: VendorSubscriptionEntity;
      readonly requiredTier?: string;
      readonly requiredPlan?: string;
    },
  ): EligibilityResult {
    const reasons: string[] = [];
    const warnings: string[] = [];

    if (ctx.requiredTier) {
      const requiredTierVO = ctx.tier.constructor === Object
        ? null
        : null;
      // Compare via string; deeper logic in TierCalculator
      if (ctx.tier.value !== ctx.requiredTier) {
        // Simple equality — could be improved with weight comparison
        warnings.push(
          `Feature "${featureKey}" requires tier "${ctx.requiredTier}" (current: "${ctx.tier.value}")`,
        );
      }
    }

    if (ctx.requiredPlan) {
      if (!ctx.subscription) {
        reasons.push(`Feature "${featureKey}" requires subscription plan "${ctx.requiredPlan}"`);
      } else if (ctx.subscription.plan.value !== ctx.requiredPlan) {
        warnings.push(
          `Feature "${featureKey}" requires plan "${ctx.requiredPlan}" (current: "${ctx.subscription.plan.value}")`,
        );
      } else if (!ctx.subscription.isEntitled()) {
        reasons.push('Subscription is not in an entitled state');
      }
    }

    return {
      eligible: reasons.length === 0,
      reasons,
      warnings,
    };
  }

  // ═══════════════════════════════════════════
  // PRODUCT LIMIT CHECK
  // ═══════════════════════════════════════════
  /**
   * Vendor আরো product add করতে পারবে কিনা।
   */
  static canAddProduct(
    currentProductCount: number,
    maxProducts: number,
  ): EligibilityResult {
    const reasons: string[] = [];
    const warnings: string[] = [];

    if (!Number.isInteger(currentProductCount) || currentProductCount < 0) {
      throw new BusinessRuleError(
        'currentProductCount must be a non-negative integer',
        'INVALID_PRODUCT_COUNT',
        { currentProductCount },
      );
    }
    if (!Number.isInteger(maxProducts) || maxProducts < 0) {
      throw new BusinessRuleError(
        'maxProducts must be a non-negative integer',
        'INVALID_PRODUCT_LIMIT',
        { maxProducts },
      );
    }

    if (currentProductCount >= maxProducts) {
      reasons.push(
        `Product limit reached (${currentProductCount}/${maxProducts}). Upgrade required.`,
      );
    } else if (currentProductCount >= maxProducts * 0.9) {
      warnings.push(
        `Product usage high (${currentProductCount}/${maxProducts}). Consider upgrading soon.`,
      );
    }

    return {
      eligible: reasons.length === 0,
      reasons,
      warnings,
    };
  }

  // ═══════════════════════════════════════════
  // TEAM MEMBER LIMIT CHECK
  // ═══════════════════════════════════════════
  static canAddTeamMember(currentMemberCount: number): EligibilityResult {
    const reasons: string[] = [];
    const warnings: string[] = [];

    if (currentMemberCount >= VENDOR_LIMIT.MAX_TEAM_MEMBERS) {
      reasons.push(
        `Team member limit reached (${currentMemberCount}/${VENDOR_LIMIT.MAX_TEAM_MEMBERS})`,
      );
    } else if (currentMemberCount >= VENDOR_LIMIT.MAX_TEAM_MEMBERS * 0.9) {
      warnings.push('Team is nearing limit');
    }

    return {
      eligible: reasons.length === 0,
      reasons,
      warnings,
    };
  }

  // ═══════════════════════════════════════════
  // SUSPENSION ELIGIBILITY
  // ═══════════════════════════════════════════
  static canBeSuspended(
    status: VendorStatusVO,
  ): EligibilityResult {
    const reasons: string[] = [];
    const warnings: string[] = [];

    if (status.isDeleted()) {
      reasons.push('Cannot suspend deleted vendor');
    }
    if (status.isSuspended()) {
      reasons.push('Vendor is already suspended');
    }
    if (!status.canTransitionTo('suspended')) {
      reasons.push(`Status "${status.value}" cannot transition to suspended`);
    }

    return {
      eligible: reasons.length === 0,
      reasons,
      warnings,
    };
  }

  // ═══════════════════════════════════════════
  // GENERIC ASSERT HELPERS
  // ═══════════════════════════════════════════
  static assertEligible(
    result: EligibilityResult,
    ruleCode: string,
    context?: Readonly<Record<string, unknown>>,
  ): void {
    if (!result.eligible) {
      throw new BusinessRuleError(
        result.reasons.join('; '),
        ruleCode,
        context,
      );
    }
  }

  static combine(...results: readonly EligibilityResult[]): EligibilityResult {
    const reasons: string[] = [];
    const warnings: string[] = [];
    for (const r of results) {
      reasons.push(...r.reasons);
      warnings.push(...r.warnings);
    }
    return {
      eligible: reasons.length === 0,
      reasons,
      warnings,
    };
  }
}
