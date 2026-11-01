/**
 * Vendor Tier Errors
 * @module vendor-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class InvalidVendorTierValueError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid vendor tier "${value}". Allowed: ${allowed.join(', ')}`, 'tier');
    this.name = 'InvalidVendorTierValueError';
  }
}

export class TierCannotBeDowngradedError extends BusinessRuleError {
  constructor(vendorId: string, currentTier: string, targetTier: string) {
    super(
      `Vendor "${vendorId}" tier cannot be downgraded from "${currentTier}" to "${targetTier}"`,
      'TIER_CANNOT_BE_DOWNGRADED',
      { vendorId, currentTier, targetTier },
    );
    this.name = 'TierCannotBeDowngradedError';
  }
}

export class TierUpgradeNotEligibleError extends BusinessRuleError {
  constructor(vendorId: string, currentTier: string, targetTier: string, reason: string) {
    super(
      `Vendor "${vendorId}" not eligible for tier upgrade "${currentTier}" → "${targetTier}": ${reason}`,
      'TIER_UPGRADE_NOT_ELIGIBLE',
      { vendorId, currentTier, targetTier, reason },
    );
    this.name = 'TierUpgradeNotEligibleError';
  }
}
