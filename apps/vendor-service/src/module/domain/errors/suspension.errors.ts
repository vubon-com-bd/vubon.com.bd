/**
 * Vendor Suspension Errors
 * @module vendor-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VendorSuspensionNotFoundError extends NotFoundError {
  constructor(suspensionId: string) {
    super('VendorSuspension', suspensionId);
    this.name = 'VendorSuspensionNotFoundError';
  }
}

export class InvalidSuspensionStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid suspension status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidSuspensionStatusError';
  }
}

export class InvalidSuspensionReasonError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid suspension reason "${value}". Allowed: ${allowed.join(', ')}`, 'reason');
    this.name = 'InvalidSuspensionReasonError';
  }
}

export class SuspensionAlreadyLiftedError extends BusinessRuleError {
  constructor(suspensionId: string) {
    super(
      `Suspension "${suspensionId}" is already lifted`,
      'SUSPENSION_ALREADY_LIFTED',
      { suspensionId },
    );
    this.name = 'SuspensionAlreadyLiftedError';
  }
}

export class SuspensionAppealWindowClosedError extends BusinessRuleError {
  constructor(suspensionId: string, closedAt: string) {
    super(
      `Suspension "${suspensionId}" appeal window closed at ${closedAt}`,
      'SUSPENSION_APPEAL_WINDOW_CLOSED',
      { suspensionId, closedAt },
    );
    this.name = 'SuspensionAppealWindowClosedError';
  }
}
