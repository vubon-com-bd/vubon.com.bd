/**
 * Tracking Application Errors
 * @module order-service/application/errors
 */
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class TrackingNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(trackingId: string) {
    super('OrderTracking', trackingId);
    this.name = 'TrackingNotFoundApplicationError';
  }
}

export class TrackingAddError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Cannot add tracking for order ${orderId}: ${reason}`, 'TrackingAdd');
    this.name = 'TrackingAddError';
  }
}

export class TrackingUpdateError extends CommandError {
  constructor(trackingId: string, reason: string) {
    super(`Cannot update tracking ${trackingId}: ${reason}`, 'TrackingUpdate');
    this.name = 'TrackingUpdateError';
  }
}
