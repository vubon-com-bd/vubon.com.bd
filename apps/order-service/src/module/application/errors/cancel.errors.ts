/**
 * Cancel Application Errors
 */
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class CancelNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(cancelId: string) {
    super('OrderCancel', cancelId);
    this.name = 'CancelNotFoundApplicationError';
  }
}

export class CancelRequestError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Cancel request failed: ${reason}`, 'CancelRequest');
    void orderId;
    this.name = 'CancelRequestError';
  }
}

export class CancelApproveError extends CommandError {
  constructor(cancelId: string, reason: string) {
    super(`Cancel approve failed: ${reason}`, 'CancelApprove');
    void cancelId;
    this.name = 'CancelApproveError';
  }
}

export class CancelRejectError extends CommandError {
  constructor(cancelId: string, reason: string) {
    super(`Cancel reject failed: ${reason}`, 'CancelReject');
    void cancelId;
    this.name = 'CancelRejectError';
  }
}
