/**
 * Return Application Errors
 * @module order-service/application/errors
 */
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class ReturnNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(returnId: string) {
    super('OrderReturn', returnId);
    this.name = 'ReturnNotFoundApplicationError';
  }
}

export class ReturnRequestError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Cannot request return for order ${orderId}: ${reason}`, 'ReturnRequest');
    this.name = 'ReturnRequestError';
  }
}

export class ReturnApproveError extends CommandError {
  constructor(returnId: string, reason: string) {
    super(`Cannot approve return ${returnId}: ${reason}`, 'ReturnApprove');
    this.name = 'ReturnApproveError';
  }
}

export class ReturnRejectError extends CommandError {
  constructor(returnId: string, reason: string) {
    super(`Cannot reject return ${returnId}: ${reason}`, 'ReturnReject');
    this.name = 'ReturnRejectError';
  }
}

export class ReturnCompleteError extends CommandError {
  constructor(returnId: string, reason: string) {
    super(`Cannot complete return ${returnId}: ${reason}`, 'ReturnComplete');
    this.name = 'ReturnCompleteError';
  }
}
