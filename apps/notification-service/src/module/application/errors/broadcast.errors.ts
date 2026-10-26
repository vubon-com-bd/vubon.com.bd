/**
 * Broadcast Application Errors
 * @module notification-service/application/errors
 */
import {
  ApplicationNotFoundError,
  ApplicationValidationError,
  CommandError,
  QueryError,
} from '@vubon/shared-kernel/application/errors';

export class BroadcastNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(broadcastId: string) {
    super('Broadcast', broadcastId);
    this.name = 'BroadcastNotFoundApplicationError';
  }
}

export class BroadcastValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'BroadcastValidationError';
  }
}

export class BroadcastCreationError extends CommandError {
  constructor(reason: string) {
    super(`Broadcast creation failed: ${reason}`, 'CreateBroadcast');
    this.name = 'BroadcastCreationError';
  }
}

export class BroadcastStartError extends CommandError {
  constructor(broadcastId: string, reason: string) {
    super(`Broadcast "${broadcastId}" start failed: ${reason}`, 'StartBroadcast');
    this.name = 'BroadcastStartError';
  }
}

export class BroadcastCancelError extends CommandError {
  constructor(broadcastId: string, reason: string) {
    super(`Broadcast "${broadcastId}" cancel failed: ${reason}`, 'CancelBroadcast');
    this.name = 'BroadcastCancelError';
  }
}

export class BroadcastQueryError extends QueryError {
  constructor(reason: string) {
    super(`Broadcast query failed: ${reason}`, 'BroadcastQuery');
    this.name = 'BroadcastQueryError';
  }
}
