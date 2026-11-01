/**
 * Tracking Application Errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class TrackingNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(trackingId: string) { super('Tracking', trackingId); this.name = 'TrackingNotFoundApplicationError'; }
}
export class TrackingByNumberNotFoundError extends ApplicationNotFoundError {
  constructor(num: string) { super('Tracking', `number:${num}`); this.name = 'TrackingByNumberNotFoundError'; }
}
export class TrackingByShipmentNotFoundError extends ApplicationNotFoundError {
  constructor(shipmentId: string) { super('Tracking', `shipment:${shipmentId}`); this.name = 'TrackingByShipmentNotFoundError'; }
}

export class CreateTrackingError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Tracking.create] ${msg}`, field); this.name = 'CreateTrackingError'; }
}
export class AddTrackingEventError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Tracking.addEvent] ${msg}`, field); this.name = 'AddTrackingEventError'; }
}
export class ActivateTrackingError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Tracking.activate] ${msg}`, field); this.name = 'ActivateTrackingError'; }
}
export class CompleteTrackingError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Tracking.complete] ${msg}`, field); this.name = 'CompleteTrackingError'; }
}
export class FailTrackingError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Tracking.fail] ${msg}`, field); this.name = 'FailTrackingError'; }
}
export class ExpireTrackingError extends ApplicationValidationError {
  constructor(msg: string, field?: string) { super(`[Tracking.expire] ${msg}`, field); this.name = 'ExpireTrackingError'; }
}

export class TrackingAlreadyExistsError extends ApplicationError {
  readonly code = ERROR_CODE.TRACKING_NOT_FOUND;
  readonly httpStatus = 409;
  constructor(num: string) { super(`Tracking "${num}" already exists`, { num }); this.name = 'TrackingAlreadyExistsError'; }
}
export class TrackingStateConflictError extends ApplicationError {
  readonly code = ERROR_CODE.TRACKING_UPDATE_FAILED;
  readonly httpStatus = 409;
  constructor(id: string, status: string, action: string) {
    super(`Tracking "${id}" in status "${status}" cannot perform "${action}"`, { id, status, action });
    this.name = 'TrackingStateConflictError';
  }
}
export class TrackingMaxEventsError extends ApplicationError {
  readonly code = ERROR_CODE.TRACKING_UPDATE_FAILED;
  readonly httpStatus = 400;
  constructor(id: string, current: number, max: number) {
    super(`Tracking "${id}" exceeded max events (${current}/${max})`, { id, current, max });
    this.name = 'TrackingMaxEventsError';
  }
}
export class TrackingOperationError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 500;
  constructor(op: string, cause: string) { super(`Tracking.${op} failed: ${cause}`, { op }); this.name = 'TrackingOperationError'; }
}
