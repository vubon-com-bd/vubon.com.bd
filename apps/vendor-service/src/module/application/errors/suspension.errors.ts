/**
 * Vendor Suspension Application Errors
 * @module vendor-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class SuspensionNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(suspensionId: string) {
    super('VendorSuspension', suspensionId);
    this.name = 'SuspensionNotFoundApplicationError';
  }
}

export class SuspensionValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'SuspensionValidationError';
  }
}

export class SuspendVendorError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Vendor "${vendorId}" suspension failed: ${reason}`, 'SuspendVendor');
    this.name = 'SuspendVendorError';
  }
}

export class ReinstateVendorError extends CommandError {
  constructor(vendorId: string, reason: string) {
    super(`Vendor "${vendorId}" reinstate failed: ${reason}`, 'ReinstateVendor');
    this.name = 'ReinstateVendorError';
  }
}

export class AppealSuspensionError extends CommandError {
  constructor(suspensionId: string, reason: string) {
    super(`Suspension "${suspensionId}" appeal failed: ${reason}`, 'AppealSuspension');
    this.name = 'AppealSuspensionError';
  }
}

export class SuspensionAlreadyLiftedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(suspensionId: string) {
    super(`Suspension "${suspensionId}" is already lifted`, { suspensionId });
    this.name = 'SuspensionAlreadyLiftedApplicationError';
  }
}

export class SuspensionAppealWindowClosedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(suspensionId: string) {
    super(`Suspension "${suspensionId}" appeal window has closed`, { suspensionId });
    this.name = 'SuspensionAppealWindowClosedApplicationError';
  }
}
