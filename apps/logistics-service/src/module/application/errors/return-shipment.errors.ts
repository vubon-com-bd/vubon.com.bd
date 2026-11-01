/**
 * ReturnShipment Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ReturnShipmentNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('ReturnShipment', id); this.name = 'ReturnShipmentNotFoundApplicationError'; }
}
export class ReturnShipmentByRmaNotFoundError extends ApplicationNotFoundError {
  constructor(rma: string) { super('ReturnShipment', `rma:${rma}`); this.name = 'ReturnShipmentByRmaNotFoundError'; }
}

export class CreateReturnShipmentError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[ReturnShipment.create] ${msg}`, field); this.name = 'CreateReturnShipmentError'; }
}
export class ReturnShipmentActionError extends ApplicationValidationError {
  constructor(action: string, msg: string, field?: string) { super(`[ReturnShipment.${action}] ${msg}`, field); this.name = 'ReturnShipmentActionError'; }
}

export class ReturnShipmentAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.RETURN_SHIPMENT_NOT_FOUND;
  readonly httpStatus = 409;
  constructor(rma: string) { super(`Return shipment "${rma}" already exists`, { rma }); this.name = 'ReturnShipmentAlreadyExistsError'; }
}
export class ReturnShipmentStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.INVALID_RETURN_STATUS_TRANSITION;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Return shipment "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'ReturnShipmentStateConflictError';
  }
}
export class ReturnWindowExpiredError extends ApplicationError {
  readonly code = ERROR_CODE.RETURN_WINDOW_EXPIRED;
  readonly httpStatus = 400;
  constructor(id: string, windowEnd: string) {
    super(`Return window for "${id}" expired at ${windowEnd}`, { id, windowEnd });
    this.name = 'ReturnWindowExpiredError';
  }
}
export class ReturnShipmentOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`ReturnShipment.${op} failed: ${cause}`, { op }); this.name = 'ReturnShipmentOperationError'; }
}
