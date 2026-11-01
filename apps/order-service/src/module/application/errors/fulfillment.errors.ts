/**
 * Fulfillment Application Errors
 * @module order-service/application/errors
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
    super(`Cannot start fulfillment for order ${orderId}: ${reason}`, 'FulfillmentStart');
    this.name = 'FulfillmentStartError';
  }
}

export class FulfillmentPackError extends CommandError {
  constructor(fulfillmentId: string, reason: string) {
    super(`Cannot pack fulfillment ${fulfillmentId}: ${reason}`, 'FulfillmentPack');
    this.name = 'FulfillmentPackError';
  }
}

export class FulfillmentShipError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Cannot ship order ${orderId}: ${reason}`, 'FulfillmentShip');
    this.name = 'FulfillmentShipError';
  }
}

export class FulfillmentCompleteError extends CommandError {
  constructor(fulfillmentId: string, reason: string) {
    super(`Cannot complete fulfillment ${fulfillmentId}: ${reason}`, 'FulfillmentComplete');
    this.name = 'FulfillmentCompleteError';
  }
}
