/**
 * Vendor Settlement Application Errors
 * @module vendor-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class SettlementValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'SettlementValidationError';
  }
}

export class CreateSettlementError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Settlement creation for vendor "${vendorId}" failed: ${reason}`, 'CreateSettlement');
    this.name = 'CreateSettlementError';
  }
}

export class CompleteSettlementError extends CommandError {
  constructor(settlementId: string, reason: string) {
    super(`Settlement "${settlementId}" completion failed: ${reason}`, 'CompleteSettlement');
    this.name = 'CompleteSettlementError';
  }
}

export class SettlementBelowMinimumApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;
  constructor(vendorId: string, amount: number, min: number) {
    super(`Settlement amount ${amount} below minimum ${min} for vendor "${vendorId}"`, {
      vendorId,
      amount,
      min,
    });
    this.name = 'SettlementBelowMinimumApplicationError';
  }
}

export class SettlementNotEligibleApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;
  constructor(vendorId: string, reason: string) {
    super(`Vendor "${vendorId}" not eligible for settlement: ${reason}`, { vendorId, reason });
    this.name = 'SettlementNotEligibleApplicationError';
  }
}
