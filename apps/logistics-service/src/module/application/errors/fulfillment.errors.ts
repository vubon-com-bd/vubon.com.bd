/**
 * Fulfillment Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class FulfillmentNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(id: string) { super('Fulfillment', id); this.name = 'FulfillmentNotFoundApplicationError'; }
}
export class FulfillmentByOrderNotFoundError extends ApplicationNotFoundError {
  constructor(orderId: string) { super('Fulfillment', `order:${orderId}`); this.name = 'FulfillmentByOrderNotFoundError'; }
}

export class CreateFulfillmentError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Fulfillment.create] ${msg}`, field); this.name = 'CreateFulfillmentError'; }
}
export class StartFulfillmentError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Fulfillment.start] ${msg}`, field); this.name = 'StartFulfillmentError'; }
}
export class BeginPickingError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Fulfillment.beginPicking] ${msg}`, field); this.name = 'BeginPickingError'; }
}
export class BeginPackingError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Fulfillment.beginPacking] ${msg}`, field); this.name = 'BeginPackingError'; }
}
export class MarkReadyToShipError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Fulfillment.markReadyToShip] ${msg}`, field); this.name = 'MarkReadyToShipError'; }
}
export class ShipFulfillmentError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Fulfillment.ship] ${msg}`, field); this.name = 'ShipFulfillmentError'; }
}
export class FulfillError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Fulfillment.fulfill] ${msg}`, field); this.name = 'FulfillError'; }
}
export class PartiallyFulfillError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Fulfillment.partiallyFulfill] ${msg}`, field); this.name = 'PartiallyFulfillError'; }
}
export class CancelFulfillmentError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Fulfillment.cancel] ${msg}`, field); this.name = 'CancelFulfillmentError'; }
}
export class FailFulfillmentError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Fulfillment.fail] ${msg}`, field); this.name = 'FailFulfillmentError'; }
}
export class PutOnHoldFulfillmentError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Fulfillment.putOnHold] ${msg}`, field); this.name = 'PutOnHoldFulfillmentError'; }
}

export class FulfillmentAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.FULFILLMENT_FAILED;
  readonly httpStatus = 409;
  constructor(orderId: string) { super(`Fulfillment already exists for order "${orderId}"`, { orderId }); this.name = 'FulfillmentAlreadyExistsError'; }
}
export class FulfillmentStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.INVALID_FULFILLMENT_STATUS_TRANSITION;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Fulfillment "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'FulfillmentStateConflictError';
  }
}
export class FulfillmentSlaBreachedError extends ApplicationError {
  readonly code = ERROR_CODE.FULFILLMENT_SLA_BREACHED;
  readonly httpStatus = 400;
  constructor(id: string, slaDueAt: string) {
    super(`Fulfillment "${id}" breached SLA at ${slaDueAt}`, { id, slaDueAt });
    this.name = 'FulfillmentSlaBreachedError';
  }
}
export class FulfillmentOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`Fulfillment.${op} failed: ${cause}`, { op }); this.name = 'FulfillmentOperationError'; }
}
