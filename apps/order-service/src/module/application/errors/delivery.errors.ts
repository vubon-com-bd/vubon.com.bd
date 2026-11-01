/**
 * Delivery Application Errors
 * @module order-service/application/errors
 */
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class DeliveryNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(deliveryId: string) {
    super('Delivery', deliveryId);
    this.name = 'DeliveryNotFoundApplicationError';
  }
}

export class DeliveryMethodNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(methodId: string) {
    super('DeliveryMethod', methodId);
    this.name = 'DeliveryMethodNotFoundApplicationError';
  }
}

export class DeliveryScheduleError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Cannot schedule delivery for order ${orderId}: ${reason}`, 'DeliverySchedule');
    this.name = 'DeliveryScheduleError';
  }
}

export class DeliveryRescheduleError extends CommandError {
  constructor(deliveryId: string, reason: string) {
    super(`Cannot reschedule delivery ${deliveryId}: ${reason}`, 'DeliveryReschedule');
    this.name = 'DeliveryRescheduleError';
  }
}

export class DeliveryConfirmError extends CommandError {
  constructor(deliveryId: string, reason: string) {
    super(`Cannot confirm delivery ${deliveryId}: ${reason}`, 'DeliveryConfirm');
    this.name = 'DeliveryConfirmError';
  }
}
