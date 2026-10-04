/**
 * Return Application Errors
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
    super(`Return request failed: ${reason}`, 'ReturnRequest');
    void orderId;
    this.name = 'ReturnRequestError';
  }
}

export class ReturnApproveError extends CommandError {
  constructor(returnId: string, reason: string) {
    super(`Return approve failed: ${reason}`, 'ReturnApprove');
    void returnId;
    this.name = 'ReturnApproveError';
  }
}

export class ReturnRejectError extends CommandError {
  constructor(returnId: string, reason: string) {
    super(`Return reject failed: ${reason}`, 'ReturnReject');
    void returnId;
    this.name = 'ReturnRejectError';
  }
}

export class ReturnCompleteError extends CommandError {
  constructor(returnId: string, reason: string) {
    super(`Return complete failed: ${reason}`, 'ReturnComplete');
    void returnId;
    this.name = 'ReturnCompleteError';
  }
}
