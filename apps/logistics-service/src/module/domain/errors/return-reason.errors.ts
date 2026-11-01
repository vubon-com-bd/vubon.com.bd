/**
 * ReturnReason Domain Errors
 * @module logistics-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ReturnReasonNotFoundError extends NotFoundError {
  constructor(reasonId: string) {
    super('ReturnReason', reasonId);
    this.name = 'ReturnReasonNotFoundError';
  }
}

export class ReturnReasonCodeAlreadyExistsError extends ConflictError {
  constructor(code: string) {
    super(`Return reason with code "${code}" already exists`, 'code');
    this.name = 'ReturnReasonCodeAlreadyExistsError';
  }
}

export class InvalidReturnReasonCodeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid return reason code "${value}". Allowed: ${allowed.join(', ')}`,
      'code',
    );
    this.name = 'InvalidReturnReasonCodeError';
  }
}

export class ReturnReasonInactiveError extends BusinessRuleError {
  constructor(reasonId: string) {
    super(
      `Return reason "${reasonId}" is inactive and cannot be used`,
      'RETURN_REASON_INACTIVE',
      { reasonId },
    );
    this.name = 'ReturnReasonInactiveError';
  }
}

export class ReturnReasonNotApplicableError extends BusinessRuleError {
  constructor(reasonId: string, shipmentType: string) {
    super(
      `Return reason "${reasonId}" not applicable for shipment type "${shipmentType}"`,
      'RETURN_REASON_NOT_APPLICABLE',
      { reasonId, shipmentType },
    );
    this.name = 'ReturnReasonNotApplicableError';
  }
}
