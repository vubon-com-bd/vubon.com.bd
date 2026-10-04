/**
 * Fulfillment Application Errors
 */
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class FulfillmentNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(fulfillmentId: string) {
    super('OrderFulfillment', fulfillmentId);
    this.name = 'FulfillmentNotFoundApplicationError';
  }
}

export class FulfillmentStartError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Fulfillment start failed: ${reason}`, 'FulfillmentStart');
    void orderId;
    this.name = 'FulfillmentStartError';
  }
}

export class FulfillmentPackError extends CommandError {
  constructor(fulfillmentId: string, reason: string) {
    super(`Fulfillment pack failed: ${reason}`, 'FulfillmentPack');
    void fulfillmentId;
    this.name = 'FulfillmentPackError';
  }
}

export class FulfillmentShipError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Fulfillment ship failed: ${reason}`, 'FulfillmentShip');
    void orderId;
    this.name = 'FulfillmentShipError';
  }
}

export class FulfillmentCompleteError extends CommandError {
  constructor(fulfillmentId: string, reason: string) {
    super(`Fulfillment complete failed: ${reason}`, 'FulfillmentComplete');
    void fulfillmentId;
    this.name = 'FulfillmentCompleteError';
  }
}
