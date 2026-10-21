/**
 * Payment Method Application Errors
 * @module payment-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class PaymentMethodNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(methodId: string) {
    super('PaymentMethod', methodId);
    this.name = 'PaymentMethodNotFoundApplicationError';
  }
}

export class PaymentMethodAddError extends CommandError {
  constructor(reason: string) {
    super(`Failed to add payment method: ${reason}`, 'AddPaymentMethod');
    this.name = 'PaymentMethodAddError';
  }
}

export class PaymentMethodUpdateError extends CommandError {
  constructor(methodId: string, reason: string) {
    super(`Failed to update payment method "${methodId}": ${reason}`, 'UpdatePaymentMethod');
    this.name = 'PaymentMethodUpdateError';
  }
}

export class PaymentMethodDeleteError extends CommandError {
  constructor(methodId: string, reason: string) {
    super(`Failed to delete payment method "${methodId}": ${reason}`, 'DeletePaymentMethod');
    this.name = 'PaymentMethodDeleteError';
  }
}

export class PaymentMethodInUseError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(methodId: string) {
    super(`Payment method "${methodId}" is currently in use`, { methodId });
    this.name = 'PaymentMethodInUseError';
  }
}

export class SetDefaultMethodError extends CommandError {
  constructor(methodId: string, reason: string) {
    super(`Failed to set default method "${methodId}": ${reason}`, 'SetDefaultMethod');
    this.name = 'SetDefaultMethodError';
  }
}
