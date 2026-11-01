/**
 * ReturnReason Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ReturnReasonNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('ReturnReason', id); this.name = 'ReturnReasonNotFoundApplicationError'; }
}
export class ReturnReasonByCodeNotFoundError extends ApplicationNotFoundError {
  constructor(code: string) { super('ReturnReason', `code:${code}`); this.name = 'ReturnReasonByCodeNotFoundError'; }
}

export class CreateReturnReasonError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[ReturnReason.create] ${msg}`, field); this.name = 'CreateReturnReasonError'; }
}
export class UpdateReturnReasonError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[ReturnReason.update] ${msg}`, field); this.name = 'UpdateReturnReasonError'; }
}
export class ReturnReasonActionError extends ApplicationValidationError {
  constructor(action: string, msg: string, field?: string) { super(`[ReturnReason.${action}] ${msg}`, field); this.name = 'ReturnReasonActionError'; }
}

export class ReturnReasonAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 409;
  constructor(code: string) { super(`Return reason "${code}" already exists`, { code }); this.name = 'ReturnReasonAlreadyExistsError'; }
}
export class ReturnReasonStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.SHIPMENT_CANNOT_BE_MODIFIED;
  readonly httpStatus = 409;
  constructor(id: string, action: string) {
    super(`Return reason "${id}" cannot perform "${action}"`, { id, action });
    this.name = 'ReturnReasonStateConflictError';
  }
}
export class ReturnReasonOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`ReturnReason.${op} failed: ${cause}`, { op }); this.name = 'ReturnReasonOperationError'; }
}
