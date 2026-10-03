/**
 * Delivery Application Errors
 */
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class DeliveryNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(deliveryId: string) {
    super('Delivery', deliveryId);
    this.name = 'DeliveryNotFoundApplicationError';
  }
}

export class DeliveryScheduleError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Delivery schedule failed: ${reason}`, 'DeliverySchedule');
    void orderId;
    this.name = 'DeliveryScheduleError';
  }
}

export class DeliveryRescheduleError extends CommandError {
  constructor(deliveryId: string, reason: string) {
    super(`Delivery reschedule failed: ${reason}`, 'DeliveryReschedule');
    void deliveryId;
    this.name = 'DeliveryRescheduleError';
  }
}

export class DeliveryConfirmError extends CommandError {
  constructor(deliveryId: string, reason: string) {
    super(`Delivery confirm failed: ${reason}`, 'DeliveryConfirm');
    void deliveryId;
    this.name = 'DeliveryConfirmError';
  }
}

export class DeliveryMethodNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(methodId: string) {
    super('DeliveryMethod', methodId);
    this.name = 'DeliveryMethodNotFoundApplicationError';
  }
}
