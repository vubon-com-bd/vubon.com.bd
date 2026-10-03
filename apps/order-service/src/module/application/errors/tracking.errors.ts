/**
 * Tracking Application Errors
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
    super(`Tracking add failed: ${reason}`, 'TrackingAdd');
    void orderId;
    this.name = 'TrackingAddError';
  }
}

export class TrackingUpdateError extends CommandError {
  constructor(trackingId: string, reason: string) {
    super(`Tracking update failed: ${reason}`, 'TrackingUpdate');
    void trackingId;
    this.name = 'TrackingUpdateError';
  }
}
