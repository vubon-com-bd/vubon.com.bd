/**
 * Vendor Tier Application Errors
 * @module vendor-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class TierValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'TierValidationError';
  }
}

export class TierUpgradeApplicationError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Tier upgrade for vendor "${vendorId}" failed: ${reason}`, 'UpgradeTier');
    this.name = 'TierUpgradeApplicationError';
  }
}

export class TierNotEligibleApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;
  constructor(vendorId: string, currentTier: string, targetTier: string, reason: string) {
    super(
      `Vendor "${vendorId}" not eligible for tier upgrade "${currentTier}" → "${targetTier}": ${reason}`,
      { vendorId, currentTier, targetTier, reason },
    );
    this.name = 'TierNotEligibleApplicationError';
  }
}

export class TierCannotBeDowngradedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;
  constructor(vendorId: string, currentTier: string, targetTier: string) {
    super(
      `Vendor "${vendorId}" tier cannot be downgraded from "${currentTier}" to "${targetTier}"`,
      { vendorId, currentTier, targetTier },
    );
    this.name = 'TierCannotBeDowngradedApplicationError';
  }
}
