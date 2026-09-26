/**
 * SLA application errors
 * @module support-service/application/errors
 *
 * Rule: `code` must be a known ERROR_CODE value
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class SlaNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly slaId: string) {
    super(`SLA not found: ${slaId}`, { slaId });
    this.name = 'SlaNotFoundException';
  }
}

export class SlaBreachedException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly slaId: string, public readonly ticketId: string) {
    super(`SLA breached for ticket ${ticketId}`, { slaId, ticketId });
    this.name = 'SlaBreachedException';
  }
}
